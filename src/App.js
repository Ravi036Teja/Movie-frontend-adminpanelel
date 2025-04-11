import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'antd/dist/antd.min.css';
import AdminLayout from "./layouts/AdminLayout";
// import Bookings from "./pages/Bookings";
import Sidebar from "./components/Sidebar/Sidebar";
// import Navbar from "./components/Navbar/Navbar";
import SeatSelection from "./pages/SeatSelection";
// import Movies from "./pages/Movies";
import AdminCoupons from "./components/AdminCoupons";
import ShowtimingsManagement from "./pages/Showtimeings";
import PaymentManagement from "./pages/PaymentMangament";
import TheaterManagement from "./pages/TheaterManagement";
import MovieManagement from "./pages/Movies";

// import Dashboard from './pages/Dashboard';
// import Movies from './pages/Movies';
// import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Sidebar/>
      {/* <Navbar/> */}
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/tickets" element={<SeatSelection/>} />
        <Route path="/movies" element={<MovieManagement/>} />
        {/* <Route path="/movies" element={<MovieManagement />} /> */}
        <Route path="/coupons" element={<AdminCoupons/>} />
        <Route path="/showtimes" element={<ShowtimingsManagement/>} />
        <Route path="/payment" element={<PaymentManagement/>} />
        <Route path="/theater" element={<TheaterManagement/>} />
        {/* Admin Pages */}
        <Route
          path="/"
          element={<AdminLayout></AdminLayout>}
        />
        {/* <Route path="/bookings" element={<Bookings />} /> */}
        {/* Add more routes with layout */}
      </Routes>
    </Router>
  );
}

export default App;
