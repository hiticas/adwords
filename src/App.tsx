import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard, {
  BudgetEntry,
  CostEntry,
  DailyReportProp,
} from "./components/Dashboard";

import BudgetHistory from "./components/BudgetHistory";
import DailyReport from "./components/DailyReport";
import Costs from "./components/Costs";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [formData, setFormData] = useState<BudgetEntry>({
    id: 0,
    date: "",
    time: "",
    budget: 0,
  });
  const [liveBudget, setLiveBudget] = useState<number>(0);
  const [budgetHistory, setBudgetHistory] = useState<BudgetEntry[]>([]);
  const [costHistory, setCostHistory] = useState<CostEntry[]>([]);
  const [dailyReport, setDailyReport] = useState<DailyReportProp[]>([]);

  useEffect(() => {
    const storedBudgetHistory = localStorage.getItem("budgetHistory");
    if (storedBudgetHistory) {
      setBudgetHistory(JSON.parse(storedBudgetHistory));
    } else {
      setBudgetHistory([]);
    }
  }, []);

  const addBudget = (newEntry: BudgetEntry) => {
    const existingEntryIndex = budgetHistory.findIndex(
      (entry) => entry.id === newEntry.id
    );

    if (existingEntryIndex !== -1) {
      const updatedBudgetHistory = [...budgetHistory];
      updatedBudgetHistory[existingEntryIndex] = newEntry;
      setBudgetHistory(updatedBudgetHistory);
      localStorage.setItem(
        "budgetHistory",
        JSON.stringify(updatedBudgetHistory)
      );
    } else {
      const newBudgetHistory = [...budgetHistory, newEntry];
      setBudgetHistory(newBudgetHistory);
      localStorage.setItem("budgetHistory", JSON.stringify(newBudgetHistory));
    }
  };

  const removeBudget = (entry: BudgetEntry) => {
    const filteredBudgetHistory = budgetHistory.filter((e) => e !== entry);
    setBudgetHistory(filteredBudgetHistory);
    localStorage.setItem(
      "budgetHistory",
      JSON.stringify(filteredBudgetHistory)
    );
  };

  const editBudget = (entry: BudgetEntry) => {
    setFormData(entry);
  };

  return (
    <Router>
      <div className="app flex min-h-screen bg-pink">
        <Sidebar />
        <div className="main-content py-6 px-12 w-full">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  budgetHistory={budgetHistory}
                  setBudgetHistory={setBudgetHistory}
                  costHistory={costHistory}
                  setCostHistory={setCostHistory}
                  dailyReport={dailyReport}
                  setDailyReport={setDailyReport}
                  addBudget={addBudget}
                  removeBudget={removeBudget}
                  editBudget={editBudget}
                  formData={formData}
                  setFormData={setFormData}
                  liveBudget={liveBudget}
                  setLiveBudget={setLiveBudget}
                />
              }
            />
            <Route
              path="/budget-history"
              element={
                <BudgetHistory editable={false} budgetHistory={budgetHistory} />
              }
            />
            <Route
              path="/daily-history-report"
              element={<DailyReport dailyReport={dailyReport} />}
            />
            <Route
              path="/generated-costs"
              element={<Costs costEntries={costHistory} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
