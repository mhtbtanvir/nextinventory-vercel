"use client";

import {
  ExpenseByCategorySummary,
  useGetExpensesByCategoryQuery,
} from "@/state/api";
import { useMemo, useState } from "react";
import Header from "@/app/(components)/Header";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Filter, PieChart as PieIcon } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  Office: "#34d399",
  Professional: "#60a5fa",
  Salaries: "#fbbf24",
  Other: "#a78bfa",
};

type AggregatedDataItem = {
  name: string;
  color: string;
  amount: number;
};

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();
  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          (!startDate && !endDate) ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce<Record<string, AggregatedDataItem>>((acc, data) => {
        if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            color: CATEGORY_COLORS[data.category] || CATEGORY_COLORS["Other"],
            amount: 0,
          };
        }
        acc[data.category].amount += Number(data.amount) || 0;
        return acc;
      }, {});

    return Object.values(filtered).sort((a, b) => b.amount - a.amount);
  }, [expenses, selectedCategory, startDate, endDate]);

  const totalExpenses = aggregatedData.reduce(
    (total, item) => total + (Number(item.amount) || 0),
    0,
  );

  const formattedTotal = Number.isFinite(totalExpenses)
    ? totalExpenses.toFixed(2)
    : "0.00";

  if (isLoading) {
    return <div className="py-10 text-center text-gray-500">Loading...</div>;
  }

  if (isError || !expensesData) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to fetch expenses. Please try again.
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <PieIcon className="w-8 h-8 text-blue-600" />
        <Header name="Expenses Overview" />
      </div>
      <p className="text-gray-500 mb-10 max-w-3xl">
        Analyze your expenses by category, timeframe, and more. Gain insights to
        make informed decisions.
      </p>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-gray-200 transition-transform hover:scale-[1.02]">
          <p className="text-gray-500 text-sm">Total Expenses</p>
          <h3 className="text-3xl font-extrabold text-gray-800">
            ${formattedTotal}
          </h3>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl shadow-sm border border-gray-200 transition-transform hover:scale-[1.02]">
          <p className="text-gray-500 text-sm">Categories</p>
          <h3 className="text-3xl font-extrabold text-gray-800">
            {aggregatedData.length}
          </h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-700">Filters</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option>All</option>
              <option>Office</option>
              <option>Professional</option>
              <option>Salaries</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        {aggregatedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-72 text-gray-500">
            <PieIcon className="w-12 h-12 mb-3" />
            <p>No expenses found for the selected filters.</p>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={420}>
              <PieChart>
                <Pie
                  data={aggregatedData}
                  cx="50%"
                  cy="50%"
                  label
                  outerRadius={160}
                  fill="#8884d8"
                  dataKey="amount"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  isAnimationActive={true}
                >
                  {aggregatedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? "rgb(29, 78, 216)" : entry.color
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="mt-6 text-center text-xl font-semibold text-gray-700">
              Total Expenses: ${formattedTotal}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Expenses;
