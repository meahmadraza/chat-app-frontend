import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore.js";
import { LogOut, Settings, User, Menu } from "lucide-react";

const Sidebar = () => {
    const { logout, authUser } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 z-40 w-full h-16 shadow-md px-6 flex items-center justify-between">
            {/* Logo */}
            <Link
                to="/"
                className="text-xl font-bold hover:opacity-80 transition-all"
            >
                NexChat
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
                <Link to="/settings" className="btn btn-ghost gap-2 px-3 py-2">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </Link>

                {authUser && (
                    <>
                        <Link to="/profile" className="btn btn-ghost gap-2 px-3 py-2">
                            <User className="w-5 h-5" />
                            <span>Profile</span>
                        </Link>

                        <button onClick={logout} className="btn btn-ghost gap-2 px-3 py-2">
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </>
                )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-start px-6 py-4 gap-2 z-50">
                    <Link to="/settings" className="btn btn-ghost gap-2 w-full justify-start">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </Link>

                    {authUser && (
                        <>
                            <Link to="/profile" className="btn btn-ghost gap-2 w-full justify-start">
                                <User className="w-5 h-5" />
                                <span>Profile</span>
                            </Link>

                            <button onClick={logout} className="btn btn-ghost gap-2 w-full justify-start">
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Sidebar;
