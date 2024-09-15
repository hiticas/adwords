import { DailyReportProp } from "./Dashboard";

interface CostProps {
  dailyReport: DailyReportProp[];
}

const DailyReport: React.FC<CostProps> = ({ dailyReport }) => {
  return (
    <div className="bg-white p-6 rounded-lg mb-6 shadow-lg">
      <h2 className="font-bold">Daily History Report</h2>
      {!dailyReport.length && <h2>No data.</h2>}
      {dailyReport.length > 0 && (
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Budget</th>
              <th className="border border-gray-300 px-4 py-2">Costs</th>
            </tr>
          </thead>
          <tbody>
            {dailyReport.map((entry, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.budget}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.costs}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DailyReport;
