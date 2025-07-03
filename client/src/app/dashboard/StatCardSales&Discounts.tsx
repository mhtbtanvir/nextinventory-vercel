import { LucideIcon } from 'lucide-react';
import React, { JSX } from 'react'
type StatDetail ={
    title:string;
    amount:string;
    changePercentage:number;
    IconComponent: LucideIcon
}
type StatCardSalesDiscounts = {
    title : string,
    primaryIcon: JSX.Element;
    details:StatDetail[];
    dateRange:string;

}

const StatCard = ({
    title,
    primaryIcon,
    details,
    dateRange,

}:StatCardSalesDiscounts) => {
    const formatPercentage =(value:number)=>{
        const signal = value >= 0 ? '+' : '';
        return `${signal}${value.toFixed()}%`;
    }
    const getChangeColor =(value:number)=>{
       return value >= 0 ? 'text-green-500' : 'text-red-500';
    }
  return (
    <div
     className='
      row-span-2 md:row-span-3
      xl:row-span-2
      bg-white/50 col-span-1 
      shadow-md rounded-2xl 
      justify-between'>
        {/* Header */}
       <div>
            <div className='flex justify-between mb-2 px-5 pt-4'>
                <h2 className='font-semibold text-gray-700'>
                    {title}
                </h2>
                <span className='text-xs text-gray-400'>
                    {dateRange}
                </span>

            </div>
            <hr/>
       </div>

       {/* Body */}
       <div className="flex mb-6 mt-2 pt-2 justify-around item-center px-5 gap-5">
            <div className=" rounded-full mt-2 mb-2 p-5 bg-blue-50 border-sky-300 border-[1px]">
                {primaryIcon}

            </div>
            <div className="flex-1 ">
                {details.map((detail,index)=>(
                <React.Fragment key={index}>
                    <div className="flex  item-center justify-between my-4">
                        <span className='text-gray-600'>
                            {detail.title}
                        </span>
                        <span className='font-bold text-gray-600'>
                            {detail.amount}
                        </span>
                        <div className="flex items-center gap-2">
                            <detail.IconComponent
                                className={`w-5 h-5 mr-1 ${getChangeColor(
                                    detail.changePercentage)}`}
                            />
                            <span className={`font-bold ${getChangeColor(
                                detail.changePercentage)}`}>
                                {formatPercentage(detail.changePercentage)}
                            </span>
                        
                        </div>
                    </div>

                </React.Fragment> 
                ))}
            </div>

        </div>
    </div>
  )
}

export default StatCard