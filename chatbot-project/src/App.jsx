import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("message"))
  );
  //const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  return (
    <div className="container">
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />

      <ChatMessages chatMessages={chatMessages} />
    </div>
  );
}

export default App;
