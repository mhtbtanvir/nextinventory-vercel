 import React from 'react'
 import { useGetDashboardMetricsQuery } from '@/state/api'
import { ShoppingBag, Star } from 'lucide-react'
 
 
 const CardPopularProducts = () => {
    const {data:dashboardMetrics,isLoading} = useGetDashboardMetricsQuery()
   return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      
       {isLoading?(
        <div className='m-5'>isLoading</div>
       ):(
        <>
        <h3 className="text-lg font-semibold px-7 bg-blue-50 rounded-lg pt-5 pb-2">Popular Products</h3>
        <hr />
        <div className="overflow-auto  h-full">
            {dashboardMetrics?.popularProducts.map((product) => (
            <div
                key={product.productId}
                className="flex items-center justify-between gap-4 p-5 border-b shadow-sm hover:shadow-md hover:bg-gray-50 transition"
            >

                <div className="flex items-center gap-4">
                {/* Image placeholder */}
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">
                    IMG
                </div>

                <div className="flex flex-col justify-between gap-1">
                    <div className="font-semibold text-gray-800">{product.name}</div>

                    <div className="flex text-sm items-center text-gray-500">
                        <span className="font-bold text-blue-500 text-sm">
                            ${product.price}
                        </span>
                        <span className="mx-2">|</span>
                        
                        <span className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                            key={index}
                            className={index <= product.rating ? 'text-yellow-300 fill-yellow-100' : 'text-gray-200'}
                            size={16}
                            />
                        ))}
                        </span>
                    </div>
                </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                    <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition">
                        <ShoppingBag className="w-4 h-4 text-blue-600" />
                    </button>
                    <span className="text-gray-500">
                        {Math.round(product.stockQuantity / 1000)}k Sold
                    </span>
                </div>
            </div>
            ))}
        </div>
        </>

       )}
    </div>
   )
 }

 export default CardPopularProducts