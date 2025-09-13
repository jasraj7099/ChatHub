import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from "react-hot-toast";

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { isLoggingIn, login } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success === true) login(formData);
  }

  return (

    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <AuthImagePattern
        title="Welcome Back!"
        subtitle="Sign in to continue your conversations and catch up with your messages"
      />
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white/80 rounded-xl shadow-2xl p-8 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-indigo-400/30 flex items-center justify-center group-hover:bg-pink-400/40 transition-colors"
              >
                <MessageSquare className="size-6 text-indigo-700" />
              </div>
              <h1 className="text-3xl font-extrabold mt-2 text-indigo-700 drop-shadow-lg">Welcome Back</h1>
              <p className="text-purple-700/80">Sign in to your account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <div className="relative">
                <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-indigo-400" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 bg-white/60 text-indigo-700 placeholder:text-indigo-300`}
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-indigo-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 bg-white/60 text-indigo-700 placeholder:text-indigo-300`}
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-indigo-400" />
                  ) : (
                    <Eye className="size-5 text-indigo-400" />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Please Wait...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-purple-700/80">
              Don't have an account?{" "}
              <Link to="/signup" className="link text-pink-500 font-bold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage