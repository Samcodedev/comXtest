import React from "react";

const tradeLogData = [
  {
    security: "Soybeans (SSBS)",
    board: "X-Traded",
    orderType: "Buy",
    matchedPrice: "1792.65",
    quantity: "9265",
    date: "17 Oct, 2020",
    time: "07:38",
  },
  {
    security: "Paddy Rice (SPRL)",
    board: "X-Traded",
    orderType: "Buy",
    matchedPrice: "1792.65",
    quantity: "9265",
    date: "8 Sep, 2020",
    time: "02:02",
  },
  {
    security: "Maize (SMAZ)",
    board: "OTC",
    orderType: "Sell",
    matchedPrice: "1792.65",
    quantity: "9265",
    date: "24 May, 2020",
    time: "06:42",
  },
  {
    security: "Sorghum (SSGM)",
    board: "FI",
    orderType: "Sell",
    matchedPrice: "1792.65",
    quantity: "9265",
    date: "1 Feb, 2020",
    time: "01:09",
  },
  {
    security: "Soybeans (SSBS)",
    board: "X-Traded",
    orderType: "Buy",
    matchedPrice: "1792.65",
    quantity: "9265",
    date: "21 Sep, 2020",
    time: "07:59",
  },
  {
    security: "Soybeans (SSBS)",
    board: "X-Traded",
    orderType: "Buy",
    matchedPrice: "1792.65",
    quantity: "9265",
    date: "21 Sep, 2020",
    time: "07:59",
  },
  {
    security: "Soybeans (SSBS)",
    board: "X-Traded",
    orderType: "Buy",
    matchedPrice: "1792.65",
    quantity: "9265",
    date: "21 Sep, 2020",
    time: "07:59",
  },
  {
    security: "Soybeans (SSBS)",
    board: "X-Traded",
    orderType: "Buy",
    matchedPrice: "1792.65",
    quantity: "9265",
    date: "21 Sep, 2020",
    time: "07:59",
  },
  {
    security: "Soybeans (SSBS)",
    board: "X-Traded",
    orderType: "Buy",
    matchedPrice: "1792.65",
    quantity: "9265",
    date: "21 Sep, 2020",
    time: "07:59",
  },
  {
    security: "Soybeans (SSBS)",
    board: "X-Traded",
    orderType: "Buy",
    matchedPrice: "1792.65",
    quantity: "9265",
    date: "21 Sep, 2020",
    time: "07:59",
  },
];

const TradeLogTable = () => {
  return (
    <div className="overflow-x-auto py-4">
      <h2 className="text-sm font-semibold bg-white border-b border-gray-200 text-[#778CA2] p-3 uppercase">Trade Log</h2>
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr className="text-[#778CA2] text-sm border-b border-gray-200">
            <th className="p-3 pl-8 text-left">Security</th>
            <th className="p-3 text-left">Board</th>
            <th className="p-3 text-left">Order Type</th>
            <th className="p-3 text-left">Matched Price</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {tradeLogData.map((trade, index) => (
            <tr
              key={index}
              className="border-b font-bold border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
            >
              <td className="p-3 pl-8">{trade.security}</td>
              <td className="p-3">{trade.board}</td>
              <td className="p-3">{trade.orderType}</td>
              <td className="p-3">{trade.matchedPrice}</td>
              <td className="p-3">{trade.quantity}</td>
              <td className="p-3">{trade.date}</td>
              <td className="p-3">{trade.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeLogTable;
