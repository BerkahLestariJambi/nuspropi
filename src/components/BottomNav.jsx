// src/components/BottomNav.jsx
import { Link } from "react-router-dom";
import { HomeOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-[#1E293B]/90 backdrop-blur-md border-t border-white/10">
      <div className="max-w-[510px] mx-auto px-4 flex justify-between items-center h-16 text-white text-xs font-medium relative">
        {/* Home */}
        <Link to="/" className="flex flex-col items-center ml-[21px]">
          <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-sm">
            <HomeOutlined className="text-white text-base" />
          </div>
          <span className="mt-1">Home</span>
        </Link>

        {/* Mall */}
        <Link
          to="/mall"
          className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.15)] flex items-center justify-center relative">
            <ShoppingOutlined className="text-white text-2xl" />
          </div>
          <span className="mt-1 text-xs">Mall</span>
        </Link>

        {/* Profile */}
        <Link to="/profile" className="flex flex-col items-center mr-[21px]">
          <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-sm">
            <UserOutlined className="text-white text-base" />
          </div>
          <span className="mt-1 leading-none">Account</span>
        </Link>
      </div>
    </div>
  );
}
