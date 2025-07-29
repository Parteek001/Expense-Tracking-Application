
import React from 'react';
import CARD from '../../assets/images/card.png';
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">
          Expense Tracking Application
        </h2>
        {children}
      </div>

      {/* Right Side */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">

        {/* Decorative Elements */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-purple-500 absolute -bottom-7 -left-5" />

        {/* Stats Card */}
        <div className="absolute z-20 top-10 right-10">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your Income & Expenses"
            value="430,000"
            color="bg-purple-600"
          />
        </div>

        {/* Image */}
        <img src={CARD} alt="Card Graphic" className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15" />
      </div>
    </div>
  );
};

export default AuthLayout;

// Card Component
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className="text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">₹{value}</span>
      </div>
    </div>
  );
};
