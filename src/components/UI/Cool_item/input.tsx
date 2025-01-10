'use client'

import { Plus, Globe, Microphone, Gear, Circles5Random, ChevronUp, ChevronDown, Keyboard } from '@gravity-ui/icons'
import data from './data.json'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, stagger, useAnimate, AnimatePresence } from "framer-motion"
import Meme1 from "../../assets/Meme.png"
import Meme2 from "../../assets/Meme_1.png"
import Meme3 from "../../assets/Meme_2.png"
import Meme4 from "../../assets/Meme_3.png"
import Meme5 from "../../assets/Meme_4.jpg"

const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.2),
      }
    );
  }, );

  return (
    <div className={`font-normal ${className || ''}`}>
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="text-white opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
              display: "inline-block",
              marginRight: "4px"
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

interface Message {
  sender: string;
  text: string;
  type?: 'text' | 'image';
  image?: string;
  status: 'sent' | 'delivered' | 'read';
  timestamp: Date;
  file?: File | null; // For file attachments
}

interface Task {
  description: string;
  dueTime: string;
}

const DIRECT_RESPONSES: Record<string, string> = {
  'hello': 'Hello! How can I help you?',
  'hi': 'hai ya! How can I help you?',
  'hey': 'yallow! How can I help you?',
  '': 'Hola! ¿En puedo ayudarte?',
  'ciao': 'Ciao! Come posso aiutarti?',
  'who are you ?':'I am Mazs AI, An AI that chat with you in a nonsense way. ',
  'what is your purpose ?':'pass the butter ( pass )',
  'who the fuck are you ?' : 'yourself',
  "nothing":"(╯°□°)╯︵ ┻━┻ then why you ask ? ",
  "uh I don't know":" (´･ω･`) are you joking with me right now ?",
  "uh":"what ?",
  "?":" (╯°□°)╯︵ ┻━┻ what ! type it out", 

};

export default function ChatInput() {
  const [message, setMessage] = useState<string>('')
  const [conversation, setConversation] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true) // Changed initial state to true
  const [, setThinkLinkTaskDescription] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAttachOpen, setIsAttachOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null) // Added file state
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastInteractionRef = useRef<number>(Date.now())
  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isExpandedRef = useRef(isExpanded)
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

  const catMemes = [Meme1, Meme3, Meme2, Meme4,Meme5];

  useEffect(() => {
    isExpandedRef.current = isExpanded
  }, [isExpanded])

  const resetCollapseTimeout = useCallback(() => {
    if (!isExpandedRef.current) {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
      }
      lastInteractionRef.current = Date.now()
      setIsCollapsed(false)

      collapseTimeoutRef.current = setTimeout(() => {
        if (!isExpandedRef.current && Date.now() - lastInteractionRef.current >= 0) { // Changed to 1000ms
          setIsCollapsed(true)
        }
      }, 0) // Changed to 1000ms
    }
  }, [])

  useEffect(() => {
    resetCollapseTimeout()
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
      }
    }
  }, [resetCollapseTimeout])

  const handleInteraction = () => {
    if (!isExpanded) {
      resetCollapseTimeout()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation, isThinking])

  const getRandomResponse = (userMessage: string, file?: File | null) => {
    const lowercaseMessage = userMessage.toLowerCase().trim();

    if (DIRECT_RESPONSES[lowercaseMessage]) {
      return {
        type: 'text' as const,
        text: DIRECT_RESPONSES[lowercaseMessage]
      };
    }

    if (file) {
      return {
        type: 'text' as const,
        text: "I see you have attached a file, This Feature is not available yet."
      }
    }

    const shouldShowMeme = Math.random() < 0.3;

    if (shouldShowMeme) {
      const randomMemeIndex = Math.floor(Math.random() * catMemes.length);
      return {
        type: 'image' as const,
        text: '',
        image: catMemes[randomMemeIndex]
      };
    }

    const responses = data.AI?.answer || [];
    if (responses.length === 0) {
      return {
        type: 'text' as const,
        text: "I'm not sure how to respond to that."
      };
    }

    const randomIndex = Math.floor(Math.random() * responses.length);
    return {
      type: 'text' as const,
      text: responses[randomIndex]
    };
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!message.trim() && !selectedFile) || isThinking) return;

    const userMessage: Message = {
      sender: 'user',
      text: message,
      type: selectedFile ? 'text' : 'text',
      file: selectedFile,
      status: 'sent',
      timestamp: new Date()
    };

    setConversation([...conversation, userMessage]);
    setMessage('');
    setSelectedFile(null);

    if (!isExpanded) {
      setIsExpanded(true);
    }

    if (message.includes('@thinklink')) {
      const taskDescription = message.replace('@thinklink', '').trim();
      const dueTime = new Date().toLocaleTimeString();
      setTasks([...tasks, { description: taskDescription, dueTime }]);
      setThinkLinkTaskDescription(taskDescription);
      setIsThinking(false);
      const botMessage: Message = {
        sender: 'bot',
        status: 'read',
        timestamp: new Date(),
        text: `I will remember to notify you that your task is due at ${dueTime}.`,
        type: 'text'
      };
      setConversation(prev => [
        ...prev.map((msg, idx) =>
          idx === prev.length - 1 ? { ...msg, status: 'read' as const } : msg
        ),
        botMessage
      ]);
      return;
    }

    // Update to 'delivered' status after 2 seconds
    setTimeout(() => {
      setConversation(prev =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 ? { ...msg, status: 'delivered' as const } : msg
        )
      );
    }, 2000);

    // Update to 'read' status after another 2.5 seconds and start thinking
    setTimeout(() => {
      setConversation(prev =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 ? { ...msg, status: 'read' as const } : msg
        )
      );

      // Only start thinking after message is read
      setIsThinking(true);

      // Generate bot response after 2 seconds of thinking
      setTimeout(() => {
        const botResponse = getRandomResponse(message, selectedFile);
        const botMessage: Message = {
          sender: 'bot',
          status: 'read',
          timestamp: new Date(),
          text: botResponse.text || '',
          type: botResponse.type,
          image: botResponse.image,
        };

        setIsThinking(false);
        setConversation(prev => [...prev, botMessage]);
      }, 2000);

    }, 2500);
}
  const handleAttach = () => {
    setIsAttachOpen(!isAttachOpen);
  };

  const handleGlobe = () => {
    // Example: Open a new tab with a default search engine
    window.open('/preview', '_blank');
  };

  const handleGear = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleMicrophone = async () => {
    if (isRecording) {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      setIsRecording(false);

      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.ondataavailable = (event) => {
        if(event.data.size > 0) {
          setAudioChunks((prevChunks) => [...prevChunks, event.data])
        }
      };
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioChunks([]);

        const audioUrl = URL.createObjectURL(audioBlob);
        const botMessage: Message = {
          sender: 'bot',
          status: 'read',
          timestamp: new Date(),
          text: `[Audio Message]`,
          type: 'text'
        }

        setConversation((prev) => [
          ...prev,
          botMessage,
        ]);

        const audioElement = new Audio(audioUrl);
        audioElement.play()
      }
      recorder.start();
      setIsRecording(true);
    } catch(error) {
      console.error("Error accessing microphone", error);
    }
  };

  const toggleExpand = () => {
    const newExpandedState = !isExpanded
    setIsExpanded(newExpandedState)
    if (!newExpandedState) {
      resetCollapseTimeout()
    }
  }

  const MessageStatus = ({ status }: { status: Message['status'] }) => {
    if (status === 'sent') return <span className="text-xs text-gray-400">Sent</span>
    if (status === 'delivered') return <span className="text-xs text-gray-400">Delivered</span>
    return <span className="text-xs text-blue-400">Read</span>
  }

  const handleShowTasks = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleCloseAttachMenu = () => {
    setIsAttachOpen(false);
  };
  const handleCloseSettingsMenu = () => {
    setIsSettingsOpen(false);
  };

  const handleFileAttach = (file: File) => {
    setSelectedFile(file)
    handleCloseAttachMenu();
  };

  const handleSettingAction = (action:string) => {
    alert(`clicked ${action} button in settings`)
    handleCloseSettingsMenu();
  }

  if (isCollapsed && !isExpanded) {
    return (
      <motion.div
        className="fixed bottom-4 right-4"
        initial={{ opacity: 0, scale: 0.5, x: '100%' }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.5, x: '100%' }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
      >
        <motion.button
          onClick={() => setIsExpanded(true)}
          className="bg-black/90 border border-white/20 rounded-full p-4 text-white/80 hover:text-white transition-colors backdrop-blur-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Keyboard className="h-6 w-6" />
        </motion.button>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto p-4"
        onMouseEnter={handleInteraction}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
      >
        <motion.div
          className="rounded-[24px] bg-black/90 border border-white/20 backdrop-blur-xl overflow-hidden"
          initial={{ boxShadow: "0 0 0 rgba(255,255,255,0)" }}
          animate={{
            boxShadow: conversation.length > 0 || isThinking
              ? "0 0 20px rgba(255,255,255,0.1)"
              : "0 0 0 rgba(255,255,255,0)"
          }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col">
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="border-b border-white/10"
                >
                  <div className="h-[400px] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {conversation.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} mb-4`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`rounded-2xl px-4 py-2 max-w-[70%] ${
                            msg.sender === 'user'
                              ? 'bg-blue-500/80 text-white'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          {msg.type === 'image' ? (
                            <motion.img
                              src={msg.image}
                              alt="Cat Meme"
                              className="max-w-[200px] rounded-lg"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          ) : msg.sender === 'bot' ? (
                            <TextGenerateEffect
                              words={msg.text}
                              className="text-sm"
                              filter={true}
                              duration={0.5}
                            />
                          ) :  msg.file ? (
                            <span className="text-sm">
                              Attached File: {msg.file.name}
                            </span>
                          ) : (
                            <span className="text-sm">{msg.text}</span>
                          )}
                        </div>
                        {msg.sender === 'user' && (
                          <div className="mt-1">
                            <MessageStatus status={msg.status} />
                          </div>
                        )}
                      </motion.div>
                    ))}

              {isThinking && (
                      <motion.div
                        className="flex gap-2 items-center p-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: [0, 0, 0, 1],
                          height: [0, 0, 0, 'auto'],
                        }}
                        transition={{
                          duration: 0.5,
                          times: [0, 0.8, 0.9, 1],
                          delay: 0, // Changed delay to 0
                        }}
                      >
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{
                                y: ['0%', '-50%', '0%'],
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2 p-4 bg-transparent relative">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  type="button"
                  className="relative"
                  onClick={handleAttach}
                >
                  <div className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <Plus className="h-5 w-5" />
                    <span className="text-sm text-white/60">Attach</span>
                  </div>

                  {isAttachOpen && (
                    <motion.div
                      className="absolute bottom-12 left-0 bg-black border border-white/20 rounded-lg p-2 z-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="flex flex-col">
                        <input
                          type="file"
                          id="file-upload"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            if (e.target.files) {
                              handleFileAttach(e.target.files[0])
                            }
                          }}
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer hover:bg-white/10 px-4 py-2 rounded-lg"
                        >
                          Attach File
                        </label>
                        <button
                          onClick={handleCloseAttachMenu}
                          className="hover:bg-white/10 px-4 py-2 rounded-lg"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </button>

                <button type="button" className="p-1 text-white/80 hover:text-white transition-colors" onClick={handleGlobe}>
                  <Globe className="h-5 w-5" />
                </button>
                <button type="button" className="relative" onClick={handleGear}>
                  <div className="p-1 text-white/80 hover:text-white transition-colors">
                    <Gear className="h-5 w-5" />
                  </div>
                  {isSettingsOpen && (
                    <motion.div
                      className="absolute bottom-12 right-0 bg-black border border-white/20 rounded-lg p-2 z-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="flex flex-col">
                        <button onClick={handleCloseSettingsMenu} className="hover:bg-white/10 px-4 py-2 rounded-lg">
                          Close
                        </button>
                        <button onClick={()=> handleSettingAction("settings")} className="hover:bg-white/10 px-4 py-2 rounded-lg">
                          Settings
                        </button>
                        <button onClick={()=> handleSettingAction("privacy")} className="hover:bg-white/10 px-4 py-2 rounded-lg">
                          Privacy
                        </button>
                        <button onClick={()=> handleSettingAction("security")}  className="hover:bg-white/10 px-4 py-2 rounded-lg">
                          Security
                        </button>

                      </div>
                    </motion.div>
                  )}
                </button>
              </motion.div>

              <input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                  if (!isExpanded) {
                    resetCollapseTimeout()
                  }
                }}
                placeholder="Message to Mazs AI "
                className="flex-1 bg-transparent border-0 focus:outline-none text-white placeholder:text-white/40 min-w-0"
              />

              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <button type="button" className={`p-1 text-white/80 hover:text-white transition-colors ${isRecording ? 'text-red-500' : ''}`} onClick={handleMicrophone}>
                  <Microphone className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  className="p-1 text-white/80 hover:text-white transition-colors"
                  disabled={isThinking}
                >
                  <Circles5Random className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="p-1 text-white/80 hover:text-white transition-colors"
                  onClick={toggleExpand}
                >
                  {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  className="p-1 text-white/80 hover:text-white transition-colors"
                  onClick={handleShowTasks}
                >
                  <Keyboard className="h-5 w-5" />
                </button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-black text-white border border-white p-4 rounded-lg max-w-lg w-full">
            <h2 className="text-xl mb-4">Tasks</h2>
            <pre className="whitespace-pre-wrap">{JSON.stringify(tasks, null, 2)}</pre>
            <button
              onClick={closeModal}
              className="mt-4 bg-white text-black px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}