
"use client"


const Dashboard = ( ) => {
  return (
    <div
    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 overflow-auto gap-10 pb-4 custom-grid-rows"
    >
    <div className="row-span-3 xl:row-span-6 bg-blue-500"/>
    <div className="row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-pink-500"/>
    <div className="row-span-3 xl:row-span-6 bg-gray-500"/>
    
    <div className="row-span-3 bg-pink-500" />
    <div className="row-span-2 md:row-span-3 xl:row-span-2  bg-blue-500" />
    <div className="row-span-2 md:row-span-3 xl:row-span-2  bg-pink-500" />
    <div className="row-span-2 md:row-span-3 xl:row-span-2  bg-gray-500" />
    
    </div>
  );
};

export default Dashboard;