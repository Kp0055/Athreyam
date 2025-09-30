import React from "react";
import Button from "../../Reusable/button";
import Profile from "../../Reusable/profile";

function Sidebar() {
  return (
    <div>
      {/* Header Section */}
      <div className="bg-blue-500 p-2">
        <h1 className="font-semibold text-white">Discover</h1>
      </div>

      {/* Main Content Section */}
      <div className="shadow-lg rounded-b-xl p-6 bg-white">
        {/* Category Section */}
        <div className="bg-gray-200 mb-4 p-2 rounded-md">
          <h1 className="font-semibold">Explore doctors in the Psychology category</h1>
        </div>

        {/* Profile Section */}
        <Profile 
          className="mx-auto mt-6" 
          name="Prajeesh KP" 
          profession="Psychologist" 
          imgSrc="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
        />

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <Button 
            text="View Profile" 
            customClass="bg-blue-500 text-white  hover:bg-blue-600 transition duration-200 outline outline-blue-400 hover:outline-blue-600" 
          />
          <Button 
            text="Book Appointment" 
            customClass="bg-white text-black hover:bg-black hover:text-white outline outline-black transition duration-200" 
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
