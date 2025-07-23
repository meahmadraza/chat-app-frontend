import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../Store/useAuthStore.js'
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        password: '',
    })

    const { signup, isSigningUp } = useAuthStore()
    const validateForm = () => {
        if (!userData.fullName.trim()) return toast.error("Full name is required");
        if (!userData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(userData.email)) return toast.error("Invalid email format");
        if (!userData.password) return toast.error("Password is required");
        if (userData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = validateForm();

        if (success === true) signup(userData);
    }
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
                            >
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40 z-10" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Enter Your Full Name"
                                    value={userData.fullName}
                                    onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40 z-10" />
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="you@example.com"
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40 z-10" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="••••••••"
                                    value={userData.password}
                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40 z-10" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40 z-10" />
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
                                "Sign up"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
                <div className="max-w-md text-center">
                    <h2 className="text-2xl font-bold mb-4">Join our community</h2>
                    <p className="text-base-content/60">Connect with friends, share moments, and stay in touch with your loved ones.</p>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
