import { LucideIcon } from 'lucide-react';

import React, { JSX } from 'react'
type StatDetail = {
    title:string;
    amount:string;
    changePercentage:number;
    IconComponent:LucideIcon

}
type StatCardDuesPendingOrdersProps = {
    title:string,
    primaryIcon:JSX.Element,
    details:StatDetail[],
    dateRange:string
}

const StatCardDuesPendingOrders = (
    {title,primaryIcon,details,dateRange}
    :StatCardDuesPendingOrdersProps) => {
        const formatPercentage=(value:number)=>{
            const signal = value >= 0 ? '+' : '';
            return `${signal}${value.toFixed()}%`;
        }
        const getChangeColor=(value:number)=>{
            return value >= 0 ? 'text-green-500' : 'text-red-500';
        }
  return (
    <div className="
      row-span-2 md:row-span-3
      xl:row-span-2
      bg-white/70 col-span-1 
      shadow-md rounded-2xl 
      justify-between" >
        {/* Header */}
        <div >
            <div className="flex justify-between mb-3 mt-4 px-4 ">
                <h2 className='font-semibold text-gray-700'>{title}</h2>
                <span className='text-xs text-gray-400'>
                    {dateRange}
                </span>
                
            </div>
            <hr/>
            
        </div>
        {/* Body */}
        <div className="flex mb-4 mt-2 justify-around item-center px-5 gap-5">
            <div className=" rounded-full mt-2 mb-2 p-5 bg-blue-50 border-green-300 border-[1px]">
                {primaryIcon}
            </div>
            {details.map((detail,index) => (
                <div key={index} 
                    className="flex flex-col items-center justify-center gap-1">
                    <span className="text-s text-gray-400">{detail.title}</span>
                    <span className="font-semibold text-gray-700">{detail.amount}</span>
                    <span className={`text-s ${getChangeColor(detail.changePercentage)}`}>{formatPercentage(detail.changePercentage)}</span>
                </div>    
            ))}
        </div>

    </div>
  )
}

export default StatCardDuesPendingOrders