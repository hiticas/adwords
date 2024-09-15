import { Link, useLocation } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { HiArrowsUpDown } from "react-icons/hi2";
import { BiSolidReport } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar bg-brown pr-6 text-white  rounded-tr-[15px]">
      <div className="p-8 pb-12">
        <h1 className="text-3xl font-bold">SpendWise</h1>
      </div>
      <div className="flex flex-col gap-5 w-[275px]">
        <Link
          to="/"
          className={`sidebar_link flex gap-2 items-center hover:bg-[#F8F5F0] hover:text-black p-4 rounded-r-[10px] pl-14 font-bold ${
            location.pathname === "/"
              ? "bg-[#F8F5F0] text-gray-800 border-l-8 border-green"
              : "text-gray-300 border-l-8 border-gray-700"
          }`}
        >
          <IoMdHome
            size={24}
            className={`sidebar_icon ${
              location.pathname === "/" ? "text-green" : "text-gray-300"
            }`}
          />
          <p>Dashboard</p>
        </Link>
        <Link
          to="/budget-history"
          className={`sidebar_link flex gap-2 items-center hover:bg-[#F8F5F0] hover:text-black p-4 rounded-r-[10px] pl-14 font-bold  ${
            location.pathname === "/budget-history"
              ? "bg-[#F8F5F0] text-gray-800 border-l-8 border-green"
              : "text-gray-300 border-l-8 border-gray-700"
          }`}
        >
          <HiArrowsUpDown
            size={24}
            className={`sidebar_icon ${
              location.pathname === "/budget-history"
                ? "text-green"
                : "text-gray-300"
            }`}
          />
          <p>Budget History</p>
        </Link>
        <Link
          to="/daily-history-report"
          className={`sidebar_link flex gap-2 items-center hover:bg-[#F8F5F0] hover:text-black p-4 rounded-r-[10px] pl-14 font-bold ${
            location.pathname === "/daily-history-report"
              ? "bg-[#F8F5F0] text-gray-800 border-l-8 border-green"
              : "text-gray-300 border-l-8 border-gray-700"
          }`}
        >
          <BiSolidReport
            size={24}
            className={`sidebar_icon ${
              location.pathname === "/daily-history-report"
                ? "text-green"
                : "text-gray-300"
            }`}
          />
          <p>Daily History Report</p>
        </Link>
        <Link
          to="/generated-costs"
          className={`sidebar_link flex gap-2 items-center hover:bg-[#F8F5F0] hover:text-black p-4 rounded-r-[10px] pl-14 font-bold ${
            location.pathname === "/generated-costs"
              ? "bg-[#F8F5F0] text-gray-800 border-l-8 border-green"
              : "text-gray-300 border-l-8 border-gray-700"
          }`}
        >
          <FaFileInvoiceDollar
            size={24}
            className={`sidebar_icon ${
              location.pathname === "/generated-costs"
                ? "text-green"
                : "text-gray-300"
            }`}
          />
          <p>Generated Costs</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
