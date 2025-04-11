import BookingTable from "../components/BookingTable";
import RevenueChart from "../components/RevenueChart";
import SummaryCard from "../components/SummaryCard";
import { Ticket, Film, Users, IndianRupee } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="mt-48">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#FFFFFF]">
        <SummaryCard
          title="Total Bookings"
          value="12,340"
          icon={<Ticket size={28} />}
        />
        <SummaryCard
          title="Revenue"
          value="₹1,25,000"
          icon={<IndianRupee size={28} />}
          textColor="text-green-600"
        />
        <SummaryCard
          title="Active Movies"
          value="25"
          icon={<Film size={28} />}
        />
        <SummaryCard
          title="Registered Users"
          value="4,000"
          icon={<Users size={28} />}
        />
      </div>

      <BookingTable />
      <RevenueChart />
    </div>
  );
};

export default Dashboard;
