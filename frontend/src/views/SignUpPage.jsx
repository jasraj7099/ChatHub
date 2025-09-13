import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  })

  const { isSigningUp, signup } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success === true) signup(formData);
  }
  

  return (

    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white/80 rounded-xl shadow-2xl p-8 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-pink-400/30 flex items-center justify-center group-hover:bg-indigo-400/40 transition-colors"
              >
                <MessageSquare className="size-6 text-pink-700" />
              </div>
              <h1 className="text-3xl font-extrabold mt-2 text-pink-700 drop-shadow-lg">Create Account</h1>
              <p className="text-purple-700/80">Get started with your free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control"> 
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-pink-400" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 bg-white/60 text-pink-700 placeholder:text-pink-300`}
                  placeholder="Enter your full name"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                /> 
              </div>
            </div>
            <div className="form-control">
              <div className="relative">
                <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-pink-400" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 bg-white/60 text-pink-700 placeholder:text-pink-300`}
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-pink-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 bg-white/60 text-pink-700 placeholder:text-pink-300`}
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
                    <EyeOff className="size-5 text-pink-400" />
                  ) : (
                    <Eye className="size-5 text-pink-400" />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-purple-700/80">
              Already have an account?{" "}
              <Link to="/login" className="link text-indigo-500 font-bold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default SignUpPage