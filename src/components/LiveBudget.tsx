// import { useState } from "react";
import { useEffect, useState } from "react";
import { BudgetEntry } from "./Dashboard";

const LiveBudget: React.FC<{
  addBudget: (entry: BudgetEntry) => void;
  liveBudget: number;
  setLiveBudget: (newLiveBudget: number) => void;
  totalMonthlyCost: number;
}> = ({ addBudget, liveBudget, setLiveBudget, totalMonthlyCost }) => {
  const [currentLiveBudget, setCurrentLiveBudget] = useState(0);
  useEffect(() => {
    const storedBudgetHistory = localStorage.getItem("liveBudget");

    if (storedBudgetHistory) {
      setCurrentLiveBudget(JSON.parse(storedBudgetHistory));
    }
  }, [setLiveBudget, currentLiveBudget]);

  const today = new Date();
  const date = today.toISOString().split("T")[0];
  const time = today.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const addLiveBudget = () => {
    setLiveBudget(liveBudget);
    setCurrentLiveBudget(liveBudget);
    addBudget({
      id: Math.floor(1000 + Math.random() * 9000),
      date: date,
      time: time,
      budget: liveBudget,
    });
    localStorage.setItem("liveBudget", JSON.stringify(liveBudget));

    setLiveBudget(0);
  };

  const pauseLiveBudget = () => {
    setLiveBudget(0);
    setCurrentLiveBudget(0);
    addBudget({
      id: Math.floor(1000 + Math.random() * 9000),
      date: date,
      time: time,
      budget: 0,
    });
    localStorage.setItem("liveBudget", JSON.stringify(0));
  };

  return (
    <div className="w-full mb-12 flex justify-between gap-6">
      <div className="w-[33%] flex flex-col rounded-xl shadow-lg bg-brown p-6 gap-2 text-gray-200 text-sm">
        <h1 className="w-fit font-bold">Total Montly Cost So Far</h1>
        <h1 className="w-fit font-bold text-3xl">${totalMonthlyCost}</h1>
      </div>
      <div
        className={`w-[33%] flex flex-col  rounded-xl shadow-lg ${
          currentLiveBudget > 0 ? "bg-green" : "bg-gray-200"
        } p-6 gap-2 text-gray-200 text-sm`}
      >
        <h1
          className={`w-fit font-bold ${
            currentLiveBudget > 0 ? "" : "text-black"
          }`}
        >
          Curent Daily Budget:
        </h1>
        <h1
          className={`w-fit font-bold text-3xl ${
            currentLiveBudget > 0 ? "" : "text-black"
          }`}
        >
          ${currentLiveBudget}
        </h1>
      </div>
      <div className="flex flex-col w-[33%] rounded-xl shadow-lg bg-white p-6 gap-2">
        <div className="flex gap-2 items-center">
          <div className="text-sm w-[50%] font-bold">Start Campagne: </div>
          <input
            className="border-2 w-[50%]"
            type="number"
            value={liveBudget}
            onChange={(e) => {
              setLiveBudget(+e.target.value);
            }}
            required
          />
        </div>

        <div className="flex gap-2 justify-between">
          <button
            className="font-bold border-2 rounded-md bg-gray-500 text-white border-gray-600 w-full hover:bg-gray-600 hover:text-white"
            onClick={() => pauseLiveBudget()}
          >
            Pause
          </button>
          <button
            className="font-bold border-2 rounded-md bg-[#008000dc] text-white border-green hover:bg-green hover:text-white w-full"
            onClick={() => addLiveBudget()}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveBudget;
