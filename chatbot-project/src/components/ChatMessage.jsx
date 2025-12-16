import RobotProfileImg from "../assets/robot.png";
import UserProfileImg from "../assets/DJ Torquati - Ferrari.png";
import "./ChatMessage.css";

export function ChatMessage({ message, sender, time }) {
  //  Desafio do Exercício 5g
  // console.log({UserProfileImg});

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img
          src={RobotProfileImg}
          alt="robot icon"
          className="chat-message-profile"
        />
      )}
      {/* Desafio do Exercício 5i */}
      <div className="chat-message-text">
        <h3>{message}</h3>
        <p className="chat-message-time">{time}</p>
      </div>
      {sender === "user" && (
        <img
          src={UserProfileImg}
          alt="user icon"
          className="chat-message-profile"
        />
      )}
    </div>
  );
}
