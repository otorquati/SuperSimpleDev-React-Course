import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";
import dayjs from 'dayjs';		
export function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);
  useEffect(() => {
	const containerElem = chatMessagesRef.current;
	if (containerElem) {
	  containerElem.scrollTop = containerElem.scrollHeight;
	}
  });
  {/* Desafio do Exercício 5i */}
  const time = dayjs().format("HH:mm");

  return (
	<div className="chat-messages-container" ref={chatMessagesRef}>
	  {chatMessages.map((chatMessage) => {
		return (
		  <ChatMessage
			message={chatMessage.message}
			sender={chatMessage.sender}
			key={chatMessage.id}
			time={time}
		  />
		);
	  })}
	</div>
  );
}