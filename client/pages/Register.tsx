import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function Register() {
  const [isRegisterTab, setIsRegisterTab] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (fullName && email && password) {
      // Mock registration - in real app would send to backend
      alert("Registration successful! You can now login.");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="font-poppins text-4xl font-bold mb-2">
            <span className="text-sup-red">SUP</span>
            <span className="text-black">Prediction</span>
          </h1>
          <p className="font-poppins text-gray-600 text-lg">
            Supply Prediction Management System
          </p>
        </div>

        {/* Login/Register Card */}
        <Card className="sup-shadow border-black bg-white rounded-3xl overflow-hidden">
          {/* Tab Headers */}
          <div className="flex">
            <button
              onClick={() => setIsRegisterTab(false)}
              className={`flex-1 py-3 px-6 font-poppins font-semibold text-sm transition-colors ${
                !isRegisterTab
                  ? "bg-sup-red text-white"
                  : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsRegisterTab(true)}
              className={`flex-1 py-3 px-6 font-poppins font-semibold text-sm transition-colors ${
                isRegisterTab
                  ? "bg-sup-red text-white"
                  : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              Register
            </button>
          </div>

          <CardContent className="p-8 space-y-6">
            {isRegisterTab ? (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="font-poppins text-black font-medium"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 font-poppins border-gray-300 rounded-lg h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-poppins text-black font-medium"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 font-poppins border-gray-300 rounded-lg h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="font-poppins text-black font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 font-poppins border-gray-300 rounded-lg h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="font-poppins text-black font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 font-poppins border-gray-300 rounded-lg h-12"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sup-red hover:bg-red-600 text-white font-poppins font-semibold h-12 rounded-lg"
                >
                  Register
                </Button>
              </form>
            ) : (
              <Link to="/">
                <div className="text-center py-8">
                  <p className="font-poppins text-gray-600">
                    Click here to access the login form
                  </p>
                </div>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
