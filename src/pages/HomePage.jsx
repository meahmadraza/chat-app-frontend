import React, { use } from 'react'

import Sidebar from '../components/Sidebar'
import MessagesSidebar from '../components/MessagesSidebar'
import NoChatContainer from '../components/NoChatContainer'
import ChatContainer from '../components/ChatContainer'
import { useChatStore } from '../Store/useChatStore'

const HomePage = () => {

    const { selectedUser } = useChatStore();


    return (
        <>
            <Sidebar />
            <div className="h-screen bg-base-200">
                <div className="flex items-center justify-center pt-20 px-4">
                    <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                        <div className="flex h-full rounded-lg overflow-hidden">
                            <MessagesSidebar />

                            {!selectedUser ? <NoChatContainer /> : <ChatContainer />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
