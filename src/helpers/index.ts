import { CostEntry, DailyReportProp } from "../components/Dashboard";

export function generateRandomTime(): string {
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function generateCostsForDay(date: string) {
  const costs: { amount: number; time: string }[] = [];
  const numCosts = Math.floor(Math.random() * 10) + 1; // Generate between 1 and 10 costs

  for (let i = 0; i < numCosts; i++) {
    const randomCost = parseFloat((Math.random() * 10).toFixed(2)); // Random cost between 0 and 10
    const randomTime = generateRandomTime();
    costs.push({ amount: randomCost, time: randomTime });
  }

  // Sort costs by time
  costs.sort((a, b) => {
    const [hoursA, minutesA] = a.time.split(":").map(Number);
    const [hoursB, minutesB] = b.time.split(":").map(Number);
    return hoursA === hoursB ? minutesA - minutesB : hoursA - hoursB;
  });

  return { date, costs };
}

export function generateCosts() {
  const costs: CostEntry[] = [];

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  for (let i = 0; i <= 90; i++) {
    const date = new Date(currentYear, currentMonth - 1, currentDay - i + 1);
    const dateStr = date.toISOString().split("T")[0];
    const costsForDate = generateCostsForDay(dateStr);
    costs.push(costsForDate);
  }

  return costs;
}

export function generateTotalMonthCosts(report: DailyReportProp[]) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const currentDate = new Date(currentYear, currentMonth, today.getDate());
  const filteredCostHistory = report.filter((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getMonth() === currentMonth &&
      entryDate.getFullYear() === currentYear &&
      entryDate <= currentDate
    );
  });

  const totalMonthlyCost = filteredCostHistory.reduce(
    (acc, current) => acc + current.costs,
    0
  );

  totalMonthlyCost.toFixed(2);
  return totalMonthlyCost;
}
