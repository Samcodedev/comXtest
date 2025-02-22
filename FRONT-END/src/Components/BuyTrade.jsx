import React from "react";

const dummyData = [
  { product: "Soybeans (SSBS)", quantity: 2003, bidPrice: 1736.92 },
  { product: "Paddy Rice (SPRL)", quantity: 11293, bidPrice: 3627.00 },
  { product: "Maize (SMAZ)", quantity: 1832, bidPrice: 8294.01 },
  { product: "Sorghum (SSGM)", quantity: 29102, bidPrice: 8192.00 },
  { product: "Fair Trade ETC (FETC)", quantity: 3212, bidPrice: 1736.92 },
  { product: "Fair Trade ETC (FETC)", quantity: 3212, bidPrice: 1736.92 },
  { product: "Fair Trade ETC (FETC)", quantity: 3212, bidPrice: 1736.92 },
  { product: "Fair Trade ETC (FETC)", quantity: 3212, bidPrice: 1736.92 },
  { product: "Fair Trade ETC (FETC)", quantity: 3212, bidPrice: 1736.92 },
  { product: "Fair Trade ETC (FETC)", quantity: 3212, bidPrice: 1736.92 },
  { product: "Fair Trade ETC (FETC)", quantity: 3212, bidPrice: 1736.92 },
  { product: "Fair Trade ETC (FETC)", quantity: 3212, bidPrice: 1736.92 }
];

const BuyTrade = () => {
  return (
    <div className="overflow-x-auto scrollbar-hide w-full h-96">
      <table className="w-full border-collapse bg-white">
        <thead className="sticky top-0">
          <tr className="bg-white text-left text-[#778CA2] text-sm">
            <th className="p-3 pl-8">Products</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Bid Price</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item, index) => (
            <tr key={index} className="border-t border-t-[#F2F4F6] text-gray-700 text-sm">
              <td className="p-3 pl-8 font-bold">{item.product}</td>
              <td className="p-3 font-bold">{item.quantity}</td>
              <td className="p-3 font-bold text-[#52965E]">{item.bidPrice.toFixed(2)}</td>
              <td className="p-3 font-bold">
                <button className="border border-[#52965E] text-[#52965E] px-6 py-1 rounded-md cursor-pointer transition">
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyTrade;
