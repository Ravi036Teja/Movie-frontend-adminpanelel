import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from "../pages/Dashboard";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar/>
      <main className="ml-60 p-6 w-full  min-h-screen">
        {children}
        <Dashboard/>
      </main>
    </div>
  );
};

export default AdminLayout;
