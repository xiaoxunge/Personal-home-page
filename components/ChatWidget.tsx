import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Greetings. I am currently in Offline Mode. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // 模拟 API 延迟
    setTimeout(() => {
      const aiMsg: ChatMessage = { 
        role: 'model', 
        text: "I cannot connect to the Neural Network right now (API Removed). Please contact me via GitHub or QQ!" 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-anime-abyss/90 backdrop-blur-sm border-2 border-anime-sky/30 rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-300 animate-float text-sm">
          <div className="bg-anime-deep/90 p-3 border-b border-anime-sky/20 flex justify-between items-center">
            <span className="font-bold text-anime-cyan tracking-widest">AQUA.OFFLINE</span>
            <button onClick={() => setIsOpen(false)} className="text-anime-sky hover:text-white">✕</button>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-md text-anime-white ${
                  msg.role === 'user' 
                    ? 'bg-anime-blue border border-anime-sky/50 rounded-br-none' 
                    : 'bg-white/10 border border-white/20 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-white/10 p-3 rounded-md rounded-bl-none flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-anime-cyan rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-anime-cyan rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-anime-cyan rounded-full animate-bounce delay-200" />
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-anime-abyss/50 border-t border-anime-sky/20 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message..."
              className="flex-1 bg-transparent border border-anime-sky/30 rounded-l-md px-3 py-2 text-white focus:outline-none focus:border-anime-cyan placeholder-anime-sky/50"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-anime-blue hover:bg-anime-sky text-white px-4 py-2 rounded-r-md transition-colors font-bold disabled:opacity-50"
            >
              SEND
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-anime-sky rotate-45' : 'bg-anime-deep border-2 border-anime-cyan animate-float-delayed'}`}
      >
        {isOpen ? (
          <span className="text-2xl font-bold text-white">+</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-anime-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;