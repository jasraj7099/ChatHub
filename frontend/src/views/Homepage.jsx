import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

const Homepage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-white/80 rounded-xl shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)] backdrop-blur-md">
          <div className="flex h-full rounded-xl overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage