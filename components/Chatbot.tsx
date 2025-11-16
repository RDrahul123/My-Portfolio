
import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { getChatbotResponse } from '../services/geminiService';

// FIX: Declare the global 'lucide' variable to resolve TypeScript errors.
declare var lucide: any;

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I'm Rahul's AI assistant. Ask me anything about his resume.",
    },
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
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };
    if (isOpen) {
        window.addEventListener('keydown', handleKeyDown);
    }
    
    // Rerender lucide icons when the open state changes
    lucide.createIcons();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getChatbotResponse(messages, input);
      const aiMessage: Message = { sender: 'ai', text: aiResponse };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      const errorMessage: Message = {
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-accent text-primary p-4 rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110 z-50 animate-pulse-glow"
        aria-label="Toggle AI Chatbot"
      >
        <i data-lucide={isOpen ? 'x' : 'bot'} className="w-8 h-8"></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 w-full max-w-md h-[70vh] max-h-[600px] bg-secondary shadow-2xl rounded-lg flex flex-col z-40 animate-fade-in-up origin-bottom-right">
          <div className="p-4 bg-primary rounded-t-lg">
            <h3 className="font-bold text-lg text-light text-center">Resume Assistant</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && <i data-lucide="bot" className="w-6 h-6 text-accent flex-shrink-0"></i>}
                <div className={`px-4 py-2 rounded-lg max-w-xs md:max-w-sm ${msg.sender === 'user' ? 'bg-accent text-primary' : 'bg-primary text-light'}`}>
                   {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex items-end gap-2 justify-start">
                   <i data-lucide="bot" className="w-6 h-6 text-accent flex-shrink-0"></i>
                   <div className="px-4 py-2 rounded-lg bg-primary text-light">
                      <div className="flex items-center justify-center space-x-1">
                          <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
	                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
	                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                      </div>
                   </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-primary flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about my skills..."
              className="w-full bg-primary text-light px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading} className="bg-accent text-primary p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
              <i data-lucide="send" className="w-6 h-6"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
