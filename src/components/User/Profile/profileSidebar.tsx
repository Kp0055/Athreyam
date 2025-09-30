import { Link, Outlet } from "react-router-dom";
import { useSelector, } from "react-redux";
import { RootState } from "../../../app/store";



function Profile() {


  const profile = useSelector((state:RootState)=> state.profile)


  return (
    <div className="border shadow-xl">
      <div className="p-5 flex justify-center">
        <img
          className="w-40 h-52 rounded-3xl"
          src="https://imgs.search.brave.com/wqdJPKWhJxDpF_Vv24dLluNVoIyy78Ie7L8dDgvX5vA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMTI2/MjMxNS5qcGc"
          alt="profile"
        />
      </div>

      <div className="border-b-2">
        <ul>
          <li className="text-center text-base">
            <strong>Name:</strong> {profile?.firstName} {profile?.lastName}
          </li>
          <li className="text-center text-base">
            <strong>Email:</strong> {profile?.email}
          </li>
        </ul>
      </div>

      <div>
        <ul className="pl-14 pr-14 pb-10 pt-5">
          <li className="text-center text-base p-2 hover:bg-blue-200 mt-3 border border-blue-500 rounded-full hover:border-black hover:text-blue-900">
            <Link to="profile">Profile</Link>
          </li>
          <li className="text-center text-base p-2 hover:bg-blue-200 mt-3 border border-blue-500 rounded-full hover:border-black hover:text-blue-900">
            <Link to="appointment">Appointment</Link>
          </li>
          <li className="text-center text-base p-2 hover:bg-blue-200 mt-3 border border-blue-500 rounded-full hover:border-black hover:text-blue-900">
            <Link to="medical-records">Medical Records</Link>
          </li>
          <li className="text-center text-base p-2 hover:bg-blue-200 mt-3 border border-blue-500 rounded-full hover:border-black hover:text-blue-900">
            <Link to="wallet">Wallet</Link>
          </li>
          <li className="text-center text-base p-2 hover:bg-blue-200 mt-3 border border-blue-500 rounded-full hover:border-black hover:text-blue-900">
            <Link to="saved-posts">Saved Posts</Link>
          </li>
          <li className="text-center text-base p-2 hover:bg-blue-200 mt-3 border border-blue-500 rounded-full hover:border-black hover:text-blue-900">
            <Link to="notifications">Notifications</Link>
          </li>
        </ul>
      </div>

      {/* Outlet to Render Nested Routes */}
      <Outlet />
    </div>
  );
}

export default Profile;
