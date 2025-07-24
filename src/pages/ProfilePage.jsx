import React from 'react'
import { Camera, User, Mail } from 'lucide-react'
import { useAuthStore } from '../Store/useAuthStore'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfilePic } = useAuthStore();
    const [uploadImage, setUploadImage] = useState(null);
    const handleUploadProfilePic = async (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile) return;

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = async () => {
            const base64Images = reader.result;
            setUploadImage(base64Images);
            await updateProfilePic({ profilePic: base64Images });
        }
    };
    return (
        <>
            <Sidebar />
            <div className="pt-16 h-auto">
                <div className="max-w-2xl mx-auto p-4 py-8">
                    <div className="bg-base-300 rounded-xl p-8 space-y-8">

                        {/* Profile Pic upload section */}

                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <img
                                    src={uploadImage || authUser.profilePic || "/profilePic.png"}
                                    alt="Profile"
                                    className="size-32 rounded-full object-cover border-4 "
                                />
                                <label
                                    htmlFor="profilePic-upload"
                                    className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                                >
                                    <Camera className="w-5 h-5 text-base-200" />
                                    <input
                                        type="file"
                                        id="profilePic-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleUploadProfilePic}
                                        disabled={isUpdatingProfile}
                                    />
                                </label>
                            </div>
                            <p className="text-sm text-zinc-400">
                                {isUpdatingProfile ? "Uploading..." : ""}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-1.5">
                                <div className="text-sm text-zinc-400 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </div>
                                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
                            </div>

                            <div className="space-y-1.5">
                                <div className="text-sm text-zinc-400 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </div>
                                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
                            </div>
                        </div>

                        <div className="mt-6 bg-base-300 rounded-xl p-6">
                            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
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
        </>
    )
}

export default ProfilePage
