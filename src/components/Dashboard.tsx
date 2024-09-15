// import React, { useEffect } from "react";
import BudgetForm from "./BudgetForm";
import BudgetHistory from "./BudgetHistory";
import LiveBudget from "./LiveBudget";
import BudgetChart from "./BudgetChart";
import Costs from "./Costs";
import DailyReport from "./DailyReport";
import { generateCosts, generateTotalMonthCosts } from "../helpers";
import { useState } from "react";
// import { useState } from "react";

export interface BudgetEntry {
  id: number;
  date: string;
  time: string;
  budget: number;
}

export interface CostEntry {
  date: string;
  costs: { amount: number; time: string }[];
}

export interface DailyReportProp {
  date: string;
  budget: number;
  costs: number;
}

type DashboardProps = {
  budgetHistory: BudgetEntry[];
  setBudgetHistory: (newBudgetHistory: BudgetEntry[]) => void;
  costHistory: CostEntry[];
  setCostHistory: (newCostHistory: CostEntry[]) => void;
  dailyReport: DailyReportProp[];
  setDailyReport: (newDailyReport: DailyReportProp[]) => void;
  addBudget: (newEntry: BudgetEntry) => void;
  removeBudget: (entry: BudgetEntry) => void;
  editBudget: (entry: BudgetEntry) => void;
  formData: BudgetEntry;
  setFormData: (newFormData: BudgetEntry) => void;
  liveBudget: number;
  setLiveBudget: (newLiveBudget: number) => void;
};

const Dashboard: React.FC<DashboardProps> = ({
  budgetHistory,
  setBudgetHistory,
  costHistory,
  setCostHistory,
  dailyReport,
  setDailyReport,
  addBudget,
  removeBudget,
  editBudget,
  formData,
  setFormData,
  liveBudget,
  setLiveBudget,
}) => {
  const [total, setTotal] = useState(0);
  const clearHistory = () => {
    localStorage.removeItem("budgetHistory");
    setBudgetHistory([]);
    setCostHistory([]);
    setDailyReport([]);
  };

  const generateDailyReport = () => {
    const report: DailyReportProp[] = [];
    let lastSetBudget = 0;

    costHistory.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

    for (const costEntry of costHistory) {
      const { date, costs } = costEntry;

      budgetHistory.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });

      const relevantBudgets = budgetHistory.filter((b) => b.date === date);

      let totalCosts = 0;
      let currentBudget = lastSetBudget;

      if (relevantBudgets.length > 0) {
        currentBudget = relevantBudgets[0].budget;
      }

      for (const cost of costs) {
        const costTime = cost.time.split(" ")[1];

        for (const budgetEntry of relevantBudgets) {
          if (budgetEntry.time <= costTime) {
            currentBudget = budgetEntry.budget;
          }
        }

        if (currentBudget > 0) {
          if (totalCosts + cost.amount <= currentBudget * 2) {
            totalCosts += cost.amount;
          } else {
            break;
          }
        }

        lastSetBudget = currentBudget;
      }

      const highestBudgetForDay =
        relevantBudgets.length > 0
          ? Math.max(...relevantBudgets.map((b) => b.budget))
          : lastSetBudget;

      report.push({
        date,
        budget: highestBudgetForDay,
        costs: +totalCosts.toFixed(2),
      });
    }
    report.reverse();
    setDailyReport(report);
    const totalMonthlyCostTest = generateTotalMonthCosts(report);
    setTotal(totalMonthlyCostTest);
  };

  const generateData = () => {
    const costs = generateCosts();
    setCostHistory(costs);
    generateDailyReport();
  };

  return (
    <div className="dashboard">
      <h1 className="font-bold text-3xl pb-10">
        AdWords Budget and Cost Tracker
      </h1>
      <LiveBudget
        addBudget={addBudget}
        liveBudget={liveBudget}
        setLiveBudget={setLiveBudget}
        totalMonthlyCost={total}
      />
      <div className="flex justify-between gap-6">
        <div className="w-full flex flex-col left">
          <BudgetForm
            addBudget={addBudget}
            formData={formData}
            setFormData={setFormData}
          />
          <div className="bg-white p-6 rounded-xl shadow-lg justify-between flex flex-col gap-6 flex-1">
            <BudgetHistory
              budgetHistory={budgetHistory}
              removeBudget={removeBudget}
              editBudget={editBudget}
            />
            {budgetHistory.length > 0 && (
              <div className="flex justify-end gap-4">
                <button
                  className="border-2 font-bold rounded-lg bg-red-800 text-white border-red-800 hover:bg-red-600 hover:text-white py-1 px-4"
                  onClick={clearHistory}
                >
                  Clear History
                </button>
                <button
                  className="border-2 font-bold rounded-lg bg-[#008000dc] text-white border-green hover:bg-green hover:text-white py-1 px-4"
                  onClick={generateData}
                >
                  Generate Daily Report
                </button>
              </div>
            )}
          </div>
        </div>
        <BudgetChart budgetEntries={budgetHistory} />
      </div>
      <div className="pt-6">
        <DailyReport dailyReport={dailyReport} />
        <Costs costEntries={costHistory} />
      </div>
    </div>
  );
};

export default Dashboard;
