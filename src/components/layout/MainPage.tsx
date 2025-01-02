import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../UI/Navigation_bar';

// CSS styles for the typing animation
const styles = `
    .typing-indicator {
        display: inline-block;
        margin-left: 4px;
    }

    .dot {
        display: inline-block;
        animation: wave 1.3s linear infinite;
        margin-right: 2px;
    }

    .dot:nth-child(2) {
        animation-delay: -1.1s;
    }

    .dot:nth-child(3) {
        animation-delay: -0.9s;
    }

    @keyframes wave {
        0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.5;
        }
        30% {
            transform: translateY(-4px);
            opacity: 1;
        }
    }

    .chat-bubble {
        animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const MainPage: React.FC = () => {
    const endDate = useMemo(() => {
        return new Date('2025-07-01T00:00:00');
    }, []);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        progress: 0,
        currentPhase: 'development'
    });

    const [chatInput, setChatInput] = useState('');
    const [chatHistory, setChatHistory] = useState<{ 
        sender: 'user' | 'bot'; 
        message: string;
        isTyping?: boolean;
        displayedMessage?: string;
    }[]>([]);

    const [isAnimating, setIsAnimating] = useState(false);

    const responses: { [key: string]: string } = {
        'what is the project?': 'The project is to build the GMTStudio official website.',
        'when is the launch date?': 'The launch date is July 1st, 2025.',
        'how long until launch?': 'Check the countdown timer!',
        'what is the current phase?': 'The current phase is development.',
        'hi': 'Hello!',
        'hello': 'Hi there!',
        'how are you?': 'I am just a bot, but I am functioning well!',
        'what can you do?': 'I can answer simple questions about the project and the countdown.',
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = endDate.getTime() - now.getTime();

            if (difference < 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    progress: 100,
                    currentPhase: 'development'
                });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const totalDays = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            const progress = Math.round(((totalDays - days) / totalDays) * 100);

            setTimeLeft({
                days,
                hours,
                minutes,
                seconds,
                progress,
                currentPhase: 'development'
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    const animateTyping = async (message: string, chatIndex: number) => {
        setIsAnimating(true);
        for (let i = 0; i <= message.length; i++) {
            if (!isAnimating) break;
            setChatHistory(prev => 
                prev.map((chat, idx) => 
                    idx === chatIndex
                        ? { ...chat, displayedMessage: message.slice(0, i) }
                        : chat
                )
            );
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        setChatHistory(prev => 
            prev.map((chat, idx) => 
                idx === chatIndex
                    ? { ...chat, isTyping: false, displayedMessage: message }
                    : chat
            )
        );
        setIsAnimating(false);
    };

    const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
    
        const normalizedInput = chatInput.toLowerCase();
        const response = responses[normalizedInput] || "I don't understand that question.";
    
        const newUserChat: {
            sender: 'user' | 'bot';
            message: string;
            displayedMessage: string;
        } = {
            sender: 'user',
            message: chatInput,
            displayedMessage: chatInput
        };
    
        const newBotChat: {
            sender: 'user' | 'bot';
            message: string;
            isTyping: boolean;
            displayedMessage: string;
        } = {
            sender: 'bot',
            message: response,
            isTyping: true,
            displayedMessage: ''
        };
    
        setChatHistory(prev => [...prev, newUserChat, newBotChat] as typeof prev);
    
        setChatInput('');
    
        setTimeout(() => {
            animateTyping(response, chatHistory.length + 1);
        }, 500);
    };

    useEffect(() => {
        return () => {
            setIsAnimating(false);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <style>{styles}</style>
            <Navbar/>
            <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
                <div className="text-4xl md:text-6xl lg:text-6xl font-bold text-center text-white pt-20 mb-8">
                    GMTStudio official website is under construction
                </div>
                <div className="flex w-full max-w-7xl gap-8">
                    {/* Left Side - Timer Components */}
                    <div className="w-1/3 flex flex-col items-center justify-center space-y-8">
                        <div
                            className="radial-progress text-primary"
                            style={{ '--value': timeLeft.progress } as React.CSSProperties}
                            role="progressbar"
                        >
                            {timeLeft.progress}%
                        </div>
                        
                        <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <span className="font-mono text-4xl">{timeLeft.days}</span>
                                days
                            </div>
                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <span className="font-mono text-4xl">
                                    {timeLeft.hours.toString().padStart(2, '0')}
                                </span>
                                hours
                            </div>
                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <span className="font-mono text-4xl">
                                    {timeLeft.minutes.toString().padStart(2, '0')}
                                </span>
                                min
                            </div>
                            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                <span className="font-mono text-4xl">
                                    {timeLeft.seconds.toString().padStart(2, '0')}
                                </span>
                                sec
                            </div>
                        </div>

                        <div className="w-full">
                            <ul className="timeline timeline-vertical">
                                <li>
                                    <div className="timeline-start timeline-done">Planning</div>
                                    <div className="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5 text-success"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="timeline-end timeline-box">Project Planning & Design</div>
                                    <hr className="bg-success" />
                                </li>
                                <li className="timeline-active">
                                    <hr className="bg-success" />
                                    <div className="timeline-start">Development</div>
                                    <div className="timeline-middle">
                                        <div className="loading loading-spinner loading-md"></div>
                                    </div>
                                    <div className="timeline-end timeline-box">Core Development Phase</div>
                                    <hr />
                                </li>
                                <li>
                                    <hr />
                                    <div className="timeline-start">Testing</div>
                                    <div className="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="timeline-end timeline-box">Testing & Quality Assurance</div>
                                    <hr />
                                </li>
                                <li>
                                    <hr />
                                    <div className="timeline-start">Launch</div>
                                    <div className="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="timeline-end timeline-box">Website Launch</div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side - Chat */}
                    <div className="w-2/3">
                        <div className="bg-base-100 p-4 rounded-lg shadow-md flex flex-col h-[calc(100vh-200px)]">
                            <div className="overflow-y-auto flex-grow mb-4">
                                {chatHistory.map((chat, index) => (
                                    <div 
                                        key={index} 
                                        className={`chat ${chat.sender === 'user' ? 'chat-end' : 'chat-start'}`}
                                    >
                                        <div className="chat-bubble">
                                            {chat.displayedMessage}
                                            {chat.isTyping && (
                                                <span className="typing-indicator">
                                                    <span className="dot">.</span>
                                                    <span className="dot">.</span>
                                                    <span className="dot">.</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleChatSubmit} className="flex">
                                <input
                                    type="text"
                                    placeholder="Type your message here..."
                                    className="input input-bordered w-full mr-2"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary">
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;