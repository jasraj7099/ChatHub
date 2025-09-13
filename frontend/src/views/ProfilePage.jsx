import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {

  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();
  const [Image, setImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const imgbase64 = reader.result;
      setImage(imgbase64);
      await updateProfile({ profilepic : imgbase64});
    }
  }

  return (
    <div className="h-screen pt-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-white/80 rounded-xl shadow-2xl p-8 space-y-8 backdrop-blur-md">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-indigo-700 drop-shadow-lg">Profile</h1>
            <p className="mt-2 text-purple-700/80">Your profile information</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={Image || authUser.profilepic || "/download.jpg"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-pink-400 shadow-lg"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-indigo-500 hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-pink-700">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-indigo-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-white/60 rounded-lg border border-indigo-200 text-indigo-700">{authUser?.fullname}</p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-indigo-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-white/60 rounded-lg border border-indigo-200 text-indigo-700">{authUser?.email}</p>
            </div>
          </div>
          <div className="mt-6 bg-white/60 rounded-xl p-6 border border-pink-200">
            <h2 className="text-lg font-medium mb-4 text-pink-700">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-indigo-200">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage