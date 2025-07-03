
"use client"

import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardsalesSummary from "./CardSalesSummary";
import CardExpenseSummary from "./CardExpenseSummary";
import StatCard from "./StatCard";
import { Package, TrendingDown, TrendingUp,Folder ,Gift} from "lucide-react";
import StatCardDuesPendingOrders from "./StatCardDues&PendingOrders";
import StatCardSalesDiscounts from "./StatCardSales&Discounts";

const Dashboard = ( ) => {
  return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 overflow-auto gap-10 pb-4 custom-grid-rows"
        >
        <CardPopularProducts/>
        <CardsalesSummary/>
        <CardPurchaseSummary/>
        <CardExpenseSummary />
        <StatCard
          title ="Customer & Expenses"
            
          primaryIcon={<Package className="text-blue-600 w-6 h-6"/>}

          details={[
            { 
              title:"Customar Growth",
              amount:"450",
              changePercentage:131,
              IconComponent:TrendingUp
            },
            {
              title:"Expenses",
              amount:"40",
              changePercentage:-31,
              IconComponent:TrendingDown
            },
          ]}
          dateRange="22 Jan, 2025 - 22 May, 2025"
        />
        <StatCardDuesPendingOrders
          title="Dues & Orders"

          primaryIcon={<Folder className="text-blue-600 w-6 h-6"/>}

          details={[
            { 
              title:"Dues",
              amount:"450",
              changePercentage:11,
              IconComponent:TrendingUp
            },
            {
              title:"Pending Orders",
              amount:"40",
              changePercentage:-41,
              IconComponent:TrendingDown
            },
            {
              title:"Completed Orders",
              amount:"3250",
              changePercentage:78,
              IconComponent:TrendingUp
            },
          ]}
          dateRange="22 Jan, 2025 - 22 june, 2025"

        />
        <StatCardSalesDiscounts
          title="Sales & Discounts"

          primaryIcon={<Gift className="text-blue-600 w-6 h-6"/>}

          details={[
           
            {
              title:"discounts",
              amount:"926",
              changePercentage:-29,
              IconComponent:TrendingDown
            },
            {
              title:"Sales",
              amount:"3250",
              changePercentage: 46,
              IconComponent:TrendingUp
            },
          ]}
          dateRange="22 Jan, 2025 - 22 june, 2025"

        />
        
       
      </div>
  );
};

export default Dashboard;