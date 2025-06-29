import React from 'react'
import { useGetDashboardMetricsQuery } from '@/state/api'
import numeral from 'numeral';
import { TrendingDown, TrendingUp } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Tooltip } from '@mui/material';


const CardPurchaseSummary = () => {
const { data, isLoading} = useGetDashboardMetricsQuery();
const PurchaseData = data?.salesSummary || [];
const lastdataPoint = PurchaseData[PurchaseData.length - 1] || null;

return (
<div className='flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white-500 shadow-md rounded-2xl'>
    
    {isLoading ? (
        <div className="m-5">Loading...</div>
    ) : (
        <> 
        {/* Header */}
        <div>
            <h2 className="text-lg font-semibold px-7 bg-blue-50 rounded-lg pt-5 pb-2">
              Purchase Summary
            </h2>
            <hr />
        </div>

        {/*body*/}
        <div className='mb-4 mt-7 px-7'>
            <p className='text-gray-400 text-xs'></p>
            <div className='flex items-center'>
                <p className='text-2xl font-bold'> 
                {lastdataPoint ?
                numeral(lastdataPoint.totalValue).format("$0.00a")
                :"0"
                } 
                </p>
            
                {lastdataPoint && (
                <p 
                className={`text-sm ${
                    lastdataPoint.changePercentage! >= 0
                    ? "text-green-500"
                        : "text-red-500"} 
                        flex ml-3`}
                >
                    {lastdataPoint.changePercentage! >= 0 
                    ? (<TrendingUp className='w-5 h-5'/>) 
                    : (<TrendingDown className='w-5 h-5'/>) }
                    {Math.abs(lastdataPoint.changePercentage!)}%

                </p>
                )}

            </div>

        </div>

        {/*Chart*/}
         <ResponsiveContainer width="100%" height={350} className="px-7">
                      <AreaChart
                        data={PurchaseData}
                        margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return `${date.getMonth() + 1}/${date.getDate()}`;
                          }}
                        />
                        <YAxis
                          tickFormatter={(value) => {
                            return `$${(value / 1000000).toFixed(0)}m`;
                          }}
                          tick={{ fontSize: 12, dx: -1 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          formatter={(value: number) => [
                            `$${value.toLocaleString("en")}`,
                          ]}
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
                          dataKey="totalValue"
                          fill="#3182ce"
                          barSize={10}
                          radius={[10, 10, 0, 0]}
                        />
                      </AreaChart>
                    </ResponsiveContainer>

        
        </>
    )}
</div>
    
  
)}

export default CardPurchaseSummary