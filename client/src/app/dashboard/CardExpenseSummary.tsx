import { ExpenseByCategorySummary, useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import { PieChart, ResponsiveContainer,Pie, Cell } from "recharts";

type ExpenseSums ={
    [category: string]: number;

}


const colors = ["#00C49F","#0088FE", "#FFBB28"]
const CardExpenseSummary = () => {
  const { data:dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  const expenseByCategorySummary = dashboardMetrics?.expenseByCategorySummary || []; 
  
  const  expenseSums = expenseByCategorySummary.reduce(
    (acc:ExpenseSums, item: ExpenseByCategorySummary) => {
        const category =item.category + "Expenses";
        const amount = (item.amount,10);
        if (!acc[category]) acc[category] = 0; 
        acc[category] += amount;
        return acc;
    },
    {}
  );
  
  const expenseCatagories = Object.entries(expenseSums).map(
    ([name, value]) => ({
    name,
    value,
  })
);
 const totalExpenses =expenseCatagories.reduce((acc, 
    category:{value: number}) => acc + category.value, 
    0);

 const formattedtotalExpenses = totalExpenses.toFixed( );
 const expenseSummary = dashboardMetrics?.expenseSummary [0];

return( 
    <div
        className="bg-white shadow-md 
        rounded-2xl flex flex-col
        justify-between row-span-3">

        {isLoading?(
            <div className='m-5'>isLoading</div>
        ):
        (
            <>
                {/*header*/}
                <div>
                    <h2 className="text-lg font-semibold px-7 bg-blue-50 rounded-lg pt-5 pb-2" >
                      Expense Summary
                    </h2>
                    <hr/>
                </div>

                {/*body*/}
                <div className = "xl:flex justify-between pr-7">
                     {/*chart*/}
                    <div className="relative basis-3/5">
                        <ResponsiveContainer width="100%" height={140}>
                            <PieChart>
                                <Pie data = {expenseCatagories} innerRadius={50} outerRadius={60} paddingAngle={5} fill="#8884d8" dataKey="value" nameKey="name" cx="50%" cy="50%">
                                    {expenseCatagories.map((entry, index) => (
                                        <Cell key={`cell-${index}`}
                                        fill={colors[index % colors.length]} />
                                    ))}


                                </Pie>
                            </PieChart>
                       
                        </ResponsiveContainer>

                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 basis-2/5 text-center">
                            <span className="font-bold text-xl">
                                ${formattedtotalExpenses}k
                            </span>
                             
                        </div>

                    </div>
                    {/*labels*/}
                    <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
                        {expenseCatagories.map((entry, index) => (
                            <li
                                key={`legend-${index}`}
                                className="flex  items-center text-xs"
                            >
                                <span
                                    className="mr-2 w-3 h-3 rounded-full"
                                    style={{ backgroundColor: colors[index % colors.length] }}
                                ></span>
                                
                                {entry.name}
                            </li>   
                        ))}
                    
                    </ul>

                </div>
                {/*footer*/}
                <div>
                <hr/>
                {expenseSummary && (
                    <div className ="mt-3 flex justify-between items-center px-7 mb-4">
                       <div className ="pt-2"> 
                         <p className="text-sm ">
                            Avarage = {" "}
                            <span>
                                ${expenseSummary.totalExpenses.toFixed(2)}
                            </span>
                         </p>
                        </div>
                        <span className="flex items-center mt-2">
                            <TrendingUp className="mr-2 text-green-500  " />
                            25%
                            
                        </span>

                    </div>
                    
                )}


                </div>
                
                
            </>
        )}


    </div>
)
  
}

export default CardExpenseSummary

