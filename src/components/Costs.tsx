import { CostEntry } from "./Dashboard";

interface CostProps {
  costEntries: CostEntry[];
}

const Costs: React.FC<CostProps> = ({ costEntries }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="font-bold">Generated Costs</h2>
      {!costEntries.length && <h2>No data.</h2>}
      {costEntries.length > 0 && (
        <div>
          {costEntries.map((entry, index) => (
            <div key={index}>
              <div className="flex gap-2">
                <h3 className="font-bold">{entry.date}: </h3>
                {entry.costs.map((cost, costIndex) => (
                  <div key={costIndex}>
                    {cost.amount} ({cost.time});
                  </div>
                ))}
              </div>
              <p>
                Total Costs:{" "}
                {entry.costs
                  .reduce((sum, cost) => sum + cost.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Costs;
