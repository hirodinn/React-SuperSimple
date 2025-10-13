import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
import "./ChatMessage.css";

export function ChatMessage({ message, sender, loadingGif, currentTime }) {
  //const message = props.message
  //const sender = props.sender
  //const src = props.src
  //const { message, src, sender } = props;
  const c = "message-container " + (sender === "robot" ? "left" : "right");
  return (
    <div className={c}>
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      {loadingGif ? (
        <img src={loadingGif} className="loadingGif" />
      ) : (
        <p>
          {message}
          <br />
          <span>{currentTime}</span>
        </p>
      )}

      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}
