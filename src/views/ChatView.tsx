import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Send, 
  Mic, 
  Image, 
  Smile, 
  MoreHorizontal,
  User,
  Settings,
  Users,
  Search,
  Phone,
  Video,
  Volume2
} from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'other';
  senderName: string;
  content: string;
  timestamp: string;
  isSignLanguage?: boolean;
}

export const ChatView: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'other',
      senderName: 'Sarah',
      content: 'Hi there! How are you doing today?',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      sender: 'user',
      senderName: 'You',
      content: 'I\'m doing great, thanks for asking!',
      timestamp: '10:32 AM',
      isSignLanguage: true,
    },
    {
      id: 3,
      sender: 'other',
      senderName: 'Sarah',
      content: 'That\'s wonderful to hear. Are you practicing your sign language today?',
      timestamp: '10:33 AM',
    },
    {
      id: 4,
      sender: 'user',
      senderName: 'You',
      content: 'Yes, I\'m using the app to practice. It\'s really helpful!',
      timestamp: '10:35 AM',
      isSignLanguage: true,
    },
  ]);
  
  const [activeChat, setActiveChat] = useState('sarah');
  const [isRecordingSign, setIsRecordingSign] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const contacts = [
    { id: 'sarah', name: 'Sarah Johnson', status: 'online', lastSeen: 'now', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', unread: 0 },
    { id: 'michael', name: 'Michael Chen', status: 'online', lastSeen: 'now', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', unread: 3 },
    { id: 'alex', name: 'Alex Rodriguez', status: 'offline', lastSeen: '2h ago', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', unread: 0 },
    { id: 'emma', name: 'Emma Wilson', status: 'offline', lastSeen: '1d ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', unread: 0 },
  ];
  
  const activeContact = contacts.find(contact => contact.id === activeChat);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      senderName: 'You',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSignLanguage: isRecordingSign,
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Mock response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: messages.length + 2,
        sender: 'other',
        senderName: activeContact?.name || 'Contact',
        content: getRandomResponse(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };
  
  const getRandomResponse = () => {
    const responses = [
      "That's great to hear!",
      "I understand what you're signing.",
      "Your sign language is improving!",
      "Can you explain that sign again?",
      "I'm learning sign language too.",
      "Let's practice more together.",
      "That's an interesting way to sign that.",
      "I'm glad we can communicate this way.",
      "Sign language is such a beautiful form of expression.",
      "Thanks for sharing that with me."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const toggleSignRecording = () => {
    setIsRecordingSign(!isRecordingSign);
  };
  
  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {contacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              className={`w-full p-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                activeChat === contact.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className="relative">
                <img 
                  src={contact.avatar} 
                  alt={contact.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                {contact.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                )}
              </div>
              
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{contact.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {contact.status === 'online' ? 'now' : contact.lastSeen}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {contact.status === 'online' ? 'Online' : 'Offline'}
                  </span>
                  {contact.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <User size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Users size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Settings size={20} />
          </button>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src={activeContact?.avatar} 
              alt={activeContact?.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">{activeContact?.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {activeContact?.status === 'online' ? 'Online' : `Last seen ${activeContact?.lastSeen}`}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Phone size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Video size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
          <div className="space-y-4">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-t-lg rounded-bl-lg' 
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-t-lg rounded-br-lg shadow'
                } px-4 py-3`}>
                  {msg.isSignLanguage && (
                    <div className="text-xs mb-1 opacity-75 flex items-center">
                      <Camera size={12} className="mr-1" />
                      Translated from sign language
                    </div>
                  )}
                  <p>{msg.content}</p>
                  <div className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {isRecordingSign && (
            <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm">Recording sign language...</span>
              </div>
              <button 
                onClick={toggleSignRecording}
                className="text-sm text-blue-600 dark:text-blue-400"
              >
                Cancel
              </button>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleSignRecording}
              className={`p-2 rounded-full ${
                isRecordingSign 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Camera size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Mic size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Image size={20} />
            </button>
            
            <input
              type="text"
              placeholder={isRecordingSign ? "Sign language being recorded..." : "Type a message..."}
              className="flex-1 py-2 px-4 border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isRecordingSign}
            />
            
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Smile size={20} />
            </button>
            <button 
              onClick={handleSendMessage}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};