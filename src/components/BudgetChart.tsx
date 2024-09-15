import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export interface BudgetEntry {
  date: string;
  time: string;
  budget: number;
}

interface BudgetChartProps {
  budgetEntries: BudgetEntry[];
}

interface BudgetFrequencyData {
  budget: number;
  sum: number;
  color: string;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

const BudgetChart: React.FC<BudgetChartProps> = ({ budgetEntries }) => {
  const [frequencyData, setFrequencyData] = useState<BudgetFrequencyData[]>([]);
  const budgetSum = budgetEntries.reduce((acc, entry) => acc + entry.budget, 0);
  useEffect(() => {
    const newFrequencyData = Object.values(budgetEntries)
      .reduce<BudgetFrequencyData[]>((acc, item) => {
        const existingEntry = acc.find((entry) => entry.budget === item.budget);
        if (existingEntry) {
          existingEntry.sum += item.budget;
        } else {
          acc.push({
            budget: item.budget,
            sum: item.budget,
            color: COLORS[acc.length % COLORS.length],
          });
        }
        return acc;
      }, [])
      .sort((a, b) => b.budget - a.budget);

    setFrequencyData(newFrequencyData);
  }, [budgetEntries]);

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg p-6 right">
      <h2 className="text-xl font-semibold mb-4">Budget Frequency</h2>
      <div className="relative">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={frequencyData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="sum"
            >
              {frequencyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold">{budgetSum}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        {frequencyData.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span>${item.budget}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetChart;
