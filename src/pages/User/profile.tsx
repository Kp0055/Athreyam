import Navbar from "../../components/User/Navbar/navbar";
import Sidebar from "../../components/User/Sidebar/sidebar";
import ProfileInfo from "../../components/User/Profile/profileInfo";
import ProfileSide from "../../components/User/Profile/profileSidebar";
import Wallet from '../../components/User/Profile/wallet';
import Appointment from "../../components/User/Profile/appointment";
import SavedPosts from "../../components/User/Profile/savedpost";

import { Routes, Route } from "react-router-dom";

function UserProfile() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </header>

      {/* Responsive Sidebar + Main Content Layout */}
      <div className="flex flex-1">
        {/* Sidebar (Visible on md and up) */}
        <aside className="hidden md:block md:w-64 bg-white shadow-md border-r h-screen sticky top-20">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full p-4 md:p-6 space-y-6 md:space-y-0 md:flex md:space-x-6">
          {/* Left Column: Profile Summary */}
          <div className="md:w-1/3 w-full">
            <ProfileSide />
          </div>

          {/* Right Column: Route-based content */}
          <div className="md:w-2/3 w-full">
            <Routes>
              <Route path="profile" element={<ProfileInfo />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="appointment" element={<Appointment />} />
              <Route path="saved-posts" element={<SavedPosts />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserProfile;
