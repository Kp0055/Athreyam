import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IMessage {
  _id: string;
  chatId: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  createdAt: string;
}

let socket: Socket;

const Chat = ({ chatPartnerEmail }: { chatPartnerEmail: string }) => {
  const profileinfo = useSelector((state: RootState) => state.profile);
  const currentUserId = profileinfo.email;
  const chatPartnerId = chatPartnerEmail;
  const chatId = [currentUserId, chatPartnerId].sort().join("_");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket = io("http://localhost:5000");

    if (currentUserId && chatPartnerId) {
      socket.emit("joinRoom", chatId);

      socket.on("loadMessages", (prevMessages: IMessage[]) => {
        setMessages(prevMessages);
      });

      socket.on("receiveMessage", (msg: IMessage) => {
        setMessages((prev) => {
          const exists = prev.some((m) => m._id === msg._id);
          return exists ? prev : [...prev, msg];
        });
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [chatId, currentUserId, chatPartnerId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      chatId,
      fromUserId: currentUserId,
      toUserId: chatPartnerId,
      text: message.trim(),
    };

    socket.emit("sendMessage", msgData, (response: { status: string; message?: IMessage }) => {
      if (response.status === "ok" && response.message) {
        setMessages((prev) => [...prev, response.message!]);
      } else {
        console.error("Message failed:", response);
      }
    });

    setMessage("");
  };

  if (!currentUserId) return <div>Loading user info...</div>;

  return (
    <div className="flex h-screen">
      <div className="w-[300px] bg-white border-r border-gray-300 p-4">
        <h2 className="font-bold mb-4">Chat</h2>
        <div className="p-2 bg-blue-100 rounded">Chat with {chatPartnerEmail}</div>
      </div>

      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="p-4 border-b bg-white font-semibold">Chat with {chatPartnerEmail}</div>

        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${msg.fromUserId === currentUserId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-2 rounded-lg max-w-md text-sm ${
                  msg.fromUserId === currentUserId ? "bg-green-200" : "bg-blue-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t bg-white flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
