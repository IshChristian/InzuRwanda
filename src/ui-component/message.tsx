"use client"

import type React from "react"
import { useState } from "react"
import { Send, User } from "lucide-react"

interface Message {
  id: number
  username: string
  lastMessage: string
  timestamp: string
  unreadCount: number
}

interface ChatMessage {
  id: number
  text: string
  sender: "user" | "other"
  timestamp: string
}

const initialMessages: Message[] = [
  { id: 1, username: "John Doe", lastMessage: "Hey, how are you doing?", timestamp: "10:30 AM", unreadCount: 2 },
  { id: 2, username: "Jane Smith", lastMessage: "Can we meet tomorrow?", timestamp: "Yesterday", unreadCount: 0 },
  { id: 3, username: "Bob Johnson", lastMessage: "I've sent you the files.", timestamp: "Mon", unreadCount: 1 },
]

const ChatPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")

  const handleUserClick = (username: string) => {
    setSelectedUser(username)
    // In a real app, you would fetch chat history for the selected user here
    setChatMessages([
      { id: 1, text: "Hi there!", sender: "other", timestamp: "10:30 AM" },
      { id: 2, text: "Hello! How can I help you?", sender: "user", timestamp: "10:31 AM" },
    ])
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const newChatMessage: ChatMessage = {
        id: chatMessages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages([...chatMessages, newChatMessage])
      setNewMessage("")

      // Update the last message in the messages list
      setMessages(
        messages.map((msg) =>
          msg.username === selectedUser
            ? { ...msg, lastMessage: newMessage, timestamp: "Just now", unreadCount: 0 }
            : msg,
        ),
      )
    }
  }

  return (
    <div className="container-xl mx-auto p-4 h-screen flex flex-col bg-white">
      <h1 className="text-2xl font-bold mb-4">Chat App</h1>
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Left Column - Message List */}
        <div className="w-1/3 bg-base-200 rounded-box overflow-y-auto bg-white">
          <ul className="menu p-2 rounded-box">
            {messages.map((msg) => (
              <li key={msg.id} className={`mb-2 ${selectedUser === msg.username ? "bordered" : ""}`}>
                <a
                  onClick={() => handleUserClick(msg.username)}
                  className="flex items-center p-2 hover:bg-base-300 rounded-lg"
                >
                  <div className="avatar placeholder mr-2">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                      <User size={20} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{msg.username}</p>
                    <p className="text-sm text-base-content text-opacity-60 truncate">{msg.lastMessage}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-base-content text-opacity-60">{msg.timestamp}</span>
                    {msg.unreadCount > 0 && <span className="badge badge-primary badge-sm">{msg.unreadCount}</span>}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column - Chat Window */}
        <div className="flex-1 rounded-box flex flex-col bg-white">
          {selectedUser ? (
            <>
              <div className="bg-base-300 p-4 rounded-t-box">
                <h2 className="text-lg font-semibold">{selectedUser}</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`chat ${message.sender === "user" ? "chat-end" : "chat-start"}`}>
                    <div className="chat-bubble">{message.text}</div>
                    <div className="chat-footer opacity-50 text-xs">{message.timestamp}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-base-300 rounded-b-box">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="input input-bordered flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button className="btn btn-square btn-primary" onClick={handleSendMessage}>
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-base-content text-opacity-60">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatPage

