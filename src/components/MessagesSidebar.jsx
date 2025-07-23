import React, { useEffect } from "react";
import { Users } from "lucide-react";
import { useChatStore } from "../Store/useChatStore";
import { useAuthStore } from "../Store/useAuthStore";

const MessagesSidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { authUser } = useAuthStore(); // ✅ Get current logged-in user

    useEffect(() => {
        getUsers(); // Fetch all users from backend
    }, [getUsers]);

    if (isUsersLoading) return null; // Show nothing while loading

    // ✅ Filter out the current user from users list
    const filteredUsers = users.filter((u) => u._id !== authUser?._id);

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            {/* Sidebar Header */}
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
            </div>

            {/* User List */}
            <div className="overflow-y-auto w-full py-3">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`
                                w-full p-3 flex items-center gap-3
                                hover:bg-base-300 transition-colors
                                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                            `}
                        >
                            {/* Profile Picture */}
                            <div className="relative mx-auto lg:mx-0">
                                <img
                                    src={user.profilePic || "/profilePic.png"}
                                    alt={user.fullName}
                                    className="size-12 object-cover rounded-full"
                                />
                            </div>

                            {/* User Info */}
                            <div className="hidden lg:block text-left min-w-0">
                                <div className="font-medium truncate">{user.fullName}</div>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="text-center text-zinc-500 py-4">
                        No other users available
                    </div>
                )}
            </div>
        </aside>
    );
};

export default MessagesSidebar;
