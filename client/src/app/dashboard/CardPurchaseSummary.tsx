import React from 'react'
import { useGetDashboardMetricsQuery } from '@/state/api'
import numeral from 'numeral';
import { TrendingDown, TrendingUp } from "lucide-react";
import { ResponsiveContainer, AreaChart,Tooltip, Area, XAxis, YAxis, CartesianGrid, DefaultTooltipContent } from 'recharts';



const CardPurchaseSummary = () => {
const { data, isLoading} = useGetDashboardMetricsQuery();
const purchaseData = data?.purchaseSummary || [];
const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

return (
<div className="flex flex-col justify-between row-span-2 xl:row-span-6 col-span-1 md:col-span-2 xl:col-span-1 bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
  {isLoading ? (
    <div className="m-5 text-center text-gray-600">Loading...</div>
  ) : (
    <>
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold px-7 bg-blue-50 rounded-lg pt-5 pb-2">
          Purchase Summary
        </h2>
        <hr />
      </div>

      {/* Body */}
      <div className="mb-4 mt-7 px-7">
        <p className="text-gray-400 text-xs">Purchased goods of</p>

        <div className="flex items-center">
          <p className="text-3xl font-bold text-gray-800 transition-transform duration-300 hover:scale-105">
            {lastDataPoint ? numeral(lastDataPoint.totalPurchased).format("$0.00a") : "0"}
          </p>

          {lastDataPoint && (
            <p
              className={`text-sm ${
                lastDataPoint.changePercentage! >= 0
                  ? "text-green-500"
                  : "text-red-500"
              } flex items-center ml-3 transition-transform duration-300 hover:scale-110`}
            >
              {lastDataPoint.changePercentage! >= 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              {Math.abs(lastDataPoint.changePercentage!)}%
            </p>
          )}
        </div>
      </div>

      {/* Chart */}
      {purchaseData && (
        <ResponsiveContainer width="100%" height={350} className="px-7">
          <AreaChart
            data={purchaseData}
            margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis tick={false} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              }}
              formatter={(value: number) => [`$${value.toLocaleString("en")}`]}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
              }}
            />
            <Area
              type="monotone"
              dataKey="totalPurchased"
              fill="url(#colorUv)"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  )}
</div>
   
  
)}

export default CardPurchaseSummary