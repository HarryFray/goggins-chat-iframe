"use client";
import { useState } from "react";
import axios from "axios";

interface Entry {
  role: string;
  content: string;
}

const Home = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<Entry[]>([]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        "https://yg8ojcoti6.execute-api.us-east-1.amazonaws.com/converse",
        { message }
      );

      setConversation(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold mb-4">Chat Bot</h1>
      <div className="border border-gray-300 p-4 rounded-lg shadow-md mb-4 w-80 max-h-96 overflow-y-auto">
        {conversation.map((entry, index) => (
          <div
            key={index}
            className={`mb-2 ${
              entry.role === "user" ? "text-green-600" : "text-blue-600"
            }`}
          >
            <strong>{entry.role}: </strong>
            {entry.content}
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="border border-gray-300 p-2 rounded w-60"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Home;
