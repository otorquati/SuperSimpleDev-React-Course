import { useEffect, useState } from "react";
import { ChatInput } from "./components/ChatInput";
import { Chatbot } from "supersimpledev";
import { ChatMessages } from "./components/ChatMessages";
import "./App.css";


function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem("chatMessages")) || []);
{/* Desafio do Exercício 5h */}
useEffect(()=>{
  Chatbot.addResponses({
   'goodbye': 'See you later!',
    'give me a unique id': function(){
      return `Sure! Your unique ID is: ${crypto.randomUUID()}`;
  }
})},[]);
{/* Desafio do Exercício 5j */}
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);
  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <h2 className="welcome-message">
          Welcome to the ChatBot project! Send a message using the textbox
          below.
        </h2>
      )}
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
