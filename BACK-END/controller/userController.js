const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, OTP } = require('../models/userModel');
const crypto = require("crypto");
const { sendEmail } = require('../middleware/handleMail');
const otpGenerator = require('otp-generator')


const registerUser = asyncHandler(async (req, res) => {
    try {
        const { 
            accountType, 
            email, 
            password,
            // Individual fields
            firstName,
            lastName,
            phoneNumber,
            // Corporate fields
            companyName,
            businessType,
            dateOfIncorporation
        } = req.body;

        // Validate account type first
        if (!accountType || !["individual", "corporate"].includes(accountType)) {
            res.status(400);
            throw new Error("Invalid account type");
        }

        // Validate common fields
        if (!email || !password) {
            res.status(400);
            throw new Error("Email and password are required");
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400);
            throw new Error("Invalid email format");
        }

        // Validate password
        if (password.length < 8) {
            res.status(400);
            throw new Error("Password must be at least 8 characters long");
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        // Account type specific validation
        if (accountType === "individual") {
            if (!firstName || !lastName || !phoneNumber) {
                res.status(400);
                throw new Error("First name, last name, and phone number are required for individual accounts");
            }
            // Validate phone number format (basic example)
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!phoneRegex.test(phoneNumber)) {
                res.status(400);
                throw new Error("Invalid phone number format");
            }
        } else { // corporate
            if (!companyName || !businessType || !dateOfIncorporation) {
                res.status(400);
                throw new Error("Company name, business type, and date of incorporation are required for corporate accounts");
            }
            // Validate date of incorporation
            const incorporationDate = new Date(dateOfIncorporation);
            if (isNaN(incorporationDate.getTime())) {
                res.status(400);
                throw new Error("Invalid date of incorporation");
            }
            // Ensure date is not in the future
            if (incorporationDate > new Date()) {
                res.status(400);
                throw new Error("Date of incorporation cannot be in the future");
            }
        }

        // Prepare user data
        let userData = {
            accountType,
            email,
            password: await bcrypt.hash(password, 10),
            isVerified: false
        };

        // Add type-specific fields
        if (accountType === "individual") {
            Object.assign(userData, { firstName, lastName, phoneNumber });
        } else {
            Object.assign(userData, { 
                companyName, 
                businessType, 
                dateOfIncorporation: new Date(dateOfIncorporation)
            });
        }

        // Create user first
        const user = await User.create(userData);

        // Generate OTP after user is created
        const otp = await user.generateOTP();

        // Send verification email with OTP
        await sendEmail(
            user.email,
            'verifyAccount',
            { otp: otp }
        );

        res.status(201).json({ 
            message: "Registration successful! Please check your email to verify your account."
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const verifyAccount = asyncHandler(async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Verify the OTP
        const isValid = await user.verifyOTP(otp);
        if (!isValid) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // Update user verification status
        await User.findByIdAndUpdate(user._id, { isVerified: true });

        res.status(200).json({ 
            message: "Account verified successfully",
            isVerified: true
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User does not exist");
    }

    if (!user.isVerified) {
        res.status(401);
        throw new Error("Please verify your email before logging in");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(400);
        throw new Error("Invalid password");
    }

    const token = jwt.sign(
        { userId: user._id, accountType: user.accountType }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: "15d" }
    );
    
    res.status(200).json({ token });
});

const getUser = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const user = await User.findById(userId)
    if(!user){
        res.status(400)
        throw new Error("User not found")
    }
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        accountType: user.accountType
    })
})

const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error("User not found")
    }
    const token = jwt.sign({ userId: user._id, accountType: user.accountType }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "15d" });
    await sendEmail(
        user.email,
        'resetPassword',
        { resetToken: token }
    );
    res.status(200).json({ token })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decoded.userId)
    if(!user){
        res.status(400)
        throw new Error("User not found")
    }
    user.password = newPassword
    await user.save()
    res.status(200).json({ message: "Password reset successfully" })
})

// Add this function to generate OTP during registration
const generateOTP = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const otp = await user.generateOTP();
        
        // Send email with OTP
        await sendEmail(
            user.email,
            'verifyAccount',
            { otp: otp }
        );

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a function to resend OTP if needed
const resendOTP = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const otp = await user.generateOTP();

        await sendEmail(
            user.email,
            'verifyAccount',
            { otp: otp }
        );

        res.status(200).json({
            message: "New OTP has been sent to your email"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { 
    registerUser, 
    loginUser, 
    getUser, 
    forgetPassword, 
    resetPassword,
    verifyAccount,
    resendOTP,
    generateOTP
};
