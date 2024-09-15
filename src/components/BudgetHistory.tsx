// import { useEffect } from "react";
import { BudgetEntry } from "./Dashboard";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";

type BudgetHistoryProps = {
  editable?: boolean;
  budgetHistory: BudgetEntry[];
  removeBudget?: (entry: BudgetEntry) => void;
  editBudget?: (entry: BudgetEntry) => void;
};

const BudgetHistory: React.FC<BudgetHistoryProps> = ({
  editable = true,
  budgetHistory,
  removeBudget,
  editBudget,
}) => {
  const handleEdit = (entry: BudgetEntry) => {
    if (editBudget) editBudget(entry);
  };

  const handleDelete = (entry: BudgetEntry) => {
    if (removeBudget) removeBudget(entry);
  };

  return (
    <div>
      <h2 className="font-bold text-xl pb-4">Budget History</h2>
      {!budgetHistory.length && <h2>No data.</h2>}
      <div>
        {budgetHistory.map((entry, index) => (
          <div
            key={index}
            className="flex gap-2 mb-6 pb-3 justify-between border-b-2"
          >
            <span>
              {entry.date} {entry.time} - Budget: {entry.budget}
            </span>
            {editable && (
              <div className="flex gap-2">
                <button className="" onClick={() => handleEdit(entry)}>
                  <MdEditSquare
                    size={24}
                    className="text-gray-500 hover:text-gray-900"
                  />
                </button>
                <button className="" onClick={() => handleDelete(entry)}>
                  <RiDeleteBin2Fill
                    size={24}
                    className="text-red-500 hover:text-red-900"
                  />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetHistory;
