import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";
function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);
  return (
    <div ref={chatMessagesRef} className="messages-container">
      {chatMessages.length !== 0 ? (
        chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              loadingGif={chatMessage.loadingGif}
              currentTime={chatMessage.currentTime}
              key={chatMessage.id}
            />
          );
        })
      ) : (
        <p className="initial-message">
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </p>
      )}
    </div>
  );
}

export default ChatMessages;
