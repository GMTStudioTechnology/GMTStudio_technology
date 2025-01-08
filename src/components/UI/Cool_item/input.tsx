'use client'

import { Plus, Globe, Microphone, Gear, Circles5Random, ChevronUp, ChevronDown, Keyboard } from '@gravity-ui/icons'
import data from './data.json'
import { useState, useEffect, useRef } from 'react'
import { motion, stagger, useAnimate, AnimatePresence } from "framer-motion"
import Meme1 from "../../assets/Meme.png"
import Meme2 from "../../assets/Meme_1.png"
import Meme3 from "../../assets/Meme_2.png"
import Meme4 from "../../assets/Meme_3.png"

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
  }, [animate, duration, filter]);

  return (
    <div className={`font-bold ${className || ''}`}>
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
}

export default function ChatInput() {
  const [message, setMessage] = useState<string>('')
  const [conversation, setConversation] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastInteractionRef = useRef<number>(Date.now())
  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const catMemes = [Meme1, Meme3, Meme2, Meme4];

  const resetCollapseTimeout = () => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current)
    }
    lastInteractionRef.current = Date.now()
    setIsCollapsed(false)

    collapseTimeoutRef.current = setTimeout(() => {
      if (Date.now() - lastInteractionRef.current >= 5000) {
        setIsCollapsed(true)
        setIsExpanded(false)
      }
    }, 5000)
  }

  useEffect(() => {
    resetCollapseTimeout()
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
      }
    }
  }, [])

  const handleInteraction = () => {
    resetCollapseTimeout()
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation, isThinking])

  const getRandomResponse = () => {
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
    e.preventDefault()
    if (!message.trim() || isThinking) return

    resetCollapseTimeout()
    const userMessage = { sender: 'user', text: message, type: 'text' as const }
    setConversation([...conversation, userMessage])
    setMessage('')
    setIsThinking(true)
    
    if (!isExpanded) {
      setIsExpanded(true)
    }

    setTimeout(() => {
      const botResponse = getRandomResponse()
      const botMessage = { 
        sender: 'bot', 
        ...botResponse
      }
      setConversation(prev => [...prev, botMessage])
      setIsThinking(false)
    }, 2000)
  }

  const handleExpand = () => {
    setIsCollapsed(false)
    setIsExpanded(true)
    resetCollapseTimeout()
  }

  const handleAttach = () => {
    resetCollapseTimeout()
    alert('Attach button clicked')
  }

  const handleGlobe = () => {
    resetCollapseTimeout()
    alert('Globe button clicked')
  }

  const handleGear = () => {
    resetCollapseTimeout()
    alert('Gear button clicked')
  }

  const handleMicrophone = () => {
    resetCollapseTimeout()
    alert('Microphone button clicked')
  }

  const toggleExpand = () => {
    resetCollapseTimeout()
    setIsExpanded(!isExpanded)
  }

  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4">
        <motion.button
          onClick={handleExpand}
          className="bg-black/90 border border-white/20 rounded-full p-4 text-white/80 hover:text-white transition-colors backdrop-blur-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Keyboard className="h-6 w-6" />
        </motion.button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto p-4" onMouseEnter={handleInteraction}>
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
          <AnimatePresence>
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
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`rounded-2xl px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-500/80 text-white' : 'bg-white/10 text-white'}`}>
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
                        ) : (
                          msg.text
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isThinking && (
                    <motion.div 
                      className="flex gap-2 items-center p-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-white/80 rounded-full"
                            animate={{ y: ["0%", "-50%", "0%"] }}
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

          <div className="flex items-center gap-2 p-4 bg-transparent">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button type="button" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors" onClick={handleAttach}>
                <Plus className="h-5 w-5" />
                <span className="text-sm text-white/60">Attach</span>
              </button>
              <button type="button" className="p-1 text-white/80 hover:text-white transition-colors" onClick={handleGlobe}>
                <Globe className="h-5 w-5" />
              </button>
              <button type="button" className="p-1 text-white/80 hover:text-white transition-colors" onClick={handleGear}>
                <Gear className="h-5 w-5" />
              </button>
            </motion.div>
            
            <input 
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                resetCollapseTimeout()
              }}
              placeholder="Message Mazs AI ..."
              className="flex-1 bg-transparent border-0 focus:outline-none text-white placeholder:text-white/40 min-w-0"
            />
            
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button type="button" className="p-1 text-white/80 hover:text-white transition-colors" onClick={handleMicrophone}>
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
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
