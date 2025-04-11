import { NavLink } from 'react-router-dom';
import { Home, Film, Ticket, Users,Timer, Tickets, LucideTheater } from 'lucide-react';
// import logo from '../../assets/Images/Cruze_Black.png'

const Sidebar = () => {

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Movies', path: '/movies', icon: <Film size={20} /> },
    { name: 'Tickets', path: '/tickets', icon: <Ticket size={20} /> },
    { name: 'Showtimes', path: '/showtimes', icon: <Timer size={20} /> },
    { name: 'Bookings', path: '/bookings', icon: <Tickets size={20} /> },
    { name: 'Theaters', path: '/theater', icon: <LucideTheater size={20} /> },
    { name: 'Users', path: '/users', icon: <Users size={20} /> },
    { name: 'Coupons', path: '/coupons', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-percent-icon lucide-circle-percent"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/></svg> },
    { name: 'Payment', path: '/payment', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-dollar-sign-icon lucide-badge-dollar-sign"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>},
  ];

  return (
    <aside className="h-screen w-60 bg-[#FFFFFF] fixed top-0 left-0 shadow-lg">
      <div className="p-2 text-2xl font-bold border-b border-gray-200">
        {/* <img src={logo} alt="" className='w-[200px] h-[100px] p-4 ' /> */}
        <h1 className='mt-4 text-2xl font-bold text-center'><span className='text-green-500'>Ticket Booking</span> <br /> Management </h1>
      </div>
      <nav className="mt-4 space-y-2 ">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors text-black
              hover:bg-gray-100 hover:text-green-500 mx-4 rounded-lg  ${isActive ? 'bg-green-100 text-green-500 hover:text-green-500' : 'text-black'}`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
