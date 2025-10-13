import { useState, useRef, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";
import LoadingSpinner from "../assets/loading-spinner.gif";
import dayjs from "dayjs";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [onTop, setOnTop] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  const inputRef = useRef(null);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (!inputText || isLoading) return;
    let time = dayjs().valueOf();
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        currentTime: dayjs(time).format("h:mma"),
      },
    ];
    setIsLoading(true);
    setChatMessages(newChatMessages);
    setChatMessages([
      ...newChatMessages,
      {
        loadingGif: LoadingSpinner,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    time = dayjs().valueOf();
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        currentTime: dayjs(time).format("h:mma"),
      },
    ]);

    setIsLoading(false);
    setInputText("");
  }
  function sendMessageByEnter(e) {
    if (e.key === "Enter") sendMessage();
    else if (e.key === "Escape") clearvalue();
  }
  function clearvalue() {
    setInputText("");
  }
  function changePosition() {
    setOnTop(!onTop);
  }
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);
  useEffect(() => {
    localStorage.setItem("message", JSON.stringify(chatMessages));
  }, [chatMessages]);

  function clear() {
    setChatMessages([]);
  }
  return (
    <div className={onTop ? "header" : "header bottom"}>
      {onTop && (
        <a href="#" onClick={changePosition} className="toggle-input">
          Click here to make it bottom
        </a>
      )}
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyUp={sendMessageByEnter}
        disabled={isLoading}
        className="text-input"
        ref={inputRef}
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button className="clear-button" onClick={clear}>
        Clear
      </button>
      {!onTop && (
        <a href="#" onClick={changePosition} className="toggle-input">
          Click here to make it top
        </a>
      )}
    </div>
  );
}
