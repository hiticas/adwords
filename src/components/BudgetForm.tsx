import React, { useState } from "react";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

interface BudgetEntry {
  id: number;
  date: string;
  time: string;
  budget: number;
}

const BudgetForm: React.FC<{
  addBudget: (entry: BudgetEntry) => void;
  formData: BudgetEntry;
  setFormData: (newFormData: BudgetEntry) => void;
}> = ({ addBudget, formData, setFormData }) => {
  const [date] = useState("");
  const [time] = useState("");
  const [budget] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDate = new Date(formData.date ? formData.date : date);
    const today = new Date();

    if (selectedDate > today) {
      alert("Date cannot be in the future");
      return;
    }

    addBudget({
      id: formData.id ? formData.id : Math.floor(1000 + Math.random() * 9000),
      date: formData.date ? formData.date : date,
      time: formData.time ? formData.time : time,
      budget: formData.budget ? formData.budget : budget,
    });
    setFormData({ id: 0, date: "", time: "", budget: 0 });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white mb-6 p-6 rounded-xl shadow-lg"
    >
      <h1 className="font-bold text-xl pb-4">
        {formData.id ? "Edit Budget" : "Add Budget"}
      </h1>
      <div className="flex gap-6">
        <div className="flex gap-6 flex-row justify-end items-end w-[50%]">
          <LiaFileInvoiceDollarSolid
            size={100}
            className="w-[100px] text-green"
          />
          <div>
            <label>Budget:</label>
            <input
              className="border-2 text-3xl w-full"
              type="number"
              value={formData.budget ? formData.budget : budget}
              onChange={(e) => {
                setFormData({ ...formData, budget: +e.target.value });
              }}
              required
            />
          </div>
        </div>
        <div className="w-[50%] flex flex-col gap-6">
          <div className="flex gap-6 justify-between">
            <div className="flex flex-col w-full">
              <label>Date:</label>
              <input
                type="date"
                className="border-2"
                value={formData.date ? formData.date : date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Time:</label>
              <input
                type="time"
                className="border-2"
                value={formData.time ? formData.time : time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button
            className="border-2 font-bold py-1 rounded-lg bg-[#008000dc] text-white border-green hover:bg-green hover:text-white w-full"
            type="submit"
          >
            {formData.id ? "Save Changes" : "Add Budget"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BudgetForm;
