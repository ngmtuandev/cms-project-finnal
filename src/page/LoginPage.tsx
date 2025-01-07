import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCommonStore } from "../store";
import { useNavigate } from "react-router-dom";
import path from "../utils/path";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const setIsLoggedIn = useCommonStore((state) => state.setIsLoggedIn);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData?.userName !== "tuan") {
      toast.warning("Bạn không có quyền truy cập");
      return;
    } else {
      try {
        const response = await axios.post(
          "https://lab-manager-backend-production.up.railway.app/auth/login",
          formData
        );
        if (response?.data) {
          toast.success("Đăng nhập thành công");
          setIsLoggedIn(true);
          navigate(path.ADMIN);
        }
      } catch (error) {
        console.error("Login error:", error);
        return null;
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #4A90E2, #9013FE)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-[20px] rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ADMIN
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please login to your account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg h-[4vh] px-[8px] focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg h-[4vh] px-[8px] focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-[4vh] bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-600 transition duration-200 shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
