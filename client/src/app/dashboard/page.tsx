
"use client"

import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardsalesSummary from "./CardSalesSummary";


const Dashboard = ( ) => {
  return (
    <div
    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 overflow-auto gap-10 pb-4 custom-grid-rows"
    >
    <CardPopularProducts/>
    <CardsalesSummary/>
    <CardPurchaseSummary/>
    <div className="row-span-3 bg-pink-500" />
    <div className="row-span-2 md:row-span-3 xl:row-span-2  bg-blue-500" />
    <div className="row-span-2 md:row-span-3 xl:row-span-2  bg-gray-500" />
    <div className="row-span-2 md:row-span-3 xl:row-span-2  bg-pink-500" />
    </div>
  );
};

export default Dashboard;