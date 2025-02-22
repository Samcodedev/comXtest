import React from 'react'

function QuickAccess() {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Hi Nazeer, what would you like to do today?</h2>
        <p className="text-gray-500 mb-4">Last login: 26/11/2024 14:39:58</p>
        <div className="flex space-x-4">
            <button className="flex-1 bg-blue-100 text-blue-600 py-2 px-4 rounded-lg flex items-center justify-between">
                <span>Manage a Card</span>
                <i className="fas fa-chevron-right"></i>
            </button>
            <button className="flex-1 bg-blue-100 text-blue-600 py-2 px-4 rounded-lg flex items-center justify-between">
                <span>Issue Instant Card</span>
                <i className="fas fa-chevron-right"></i>
            </button>
            <button className="flex-1 bg-blue-100 text-blue-600 py-2 px-4 rounded-lg flex items-center justify-between">
                <span>Issue Personalized Card</span>
                <i className="fas fa-chevron-right"></i>
            </button>
            <button className="flex-1 bg-blue-100 text-blue-600 py-2 px-4 rounded-lg flex items-center justify-between">
                <span>Review Card Requests</span>
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
  )
}

export default QuickAccess