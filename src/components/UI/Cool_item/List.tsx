'use client'

import { useState, useEffect } from "react";
import { AnimatePresence, LayoutGroup, Reorder, motion, stagger, useAnimate } from "framer-motion";
import { Plus, ClockArrowRotateLeft, Gear, TrashBin } from "@gravity-ui/icons";
import { BsStars } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";

// Utility function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

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
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [animate, duration, filter, scope.current]);

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-white text-2xl leading-snug tracking-wide">
          <motion.div ref={scope}>
            {wordsArray.map((word, idx) => (
              <motion.span
                key={word + idx}
                className="opacity-0"
                style={{
                  filter: filter ? "blur(10px)" : "none",
                }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const AIThinkingAnimation = () => (
  <div className="flex items-center space-x-2 mb-4">
    <motion.div
      className="w-3 h-3 bg-blue-500 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        delay: 0,
      }}
    />
    <motion.div
      className="w-3 h-3 bg-blue-500 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        delay: 0.2,
      }}
    />
    <motion.div
      className="w-3 h-3 bg-blue-500 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        delay: 0.4,
      }}
    />
  </div>
);

interface WorkflowItem {
  id: number;
  text: string;
  checked: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export default function AgentWorkflow() {
  const [items, setItems] = useState<WorkflowItem[]>([
    { id: 1, text: "Essay due", checked: false, priority: 'high', dueDate: '2024-01-15' },
    { id: 2, text: "Super market discount", checked: false, priority: 'low' },
    { id: 3, text: "Costco membership", checked: false, priority: 'medium' },
    { id: 4, text: "Math homework", checked: true, priority: 'high', dueDate: '2024-01-10' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedText, setProcessedText] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  const handleCheck = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleRefresh = () => {
    setItems(items.map(item => ({ ...item, checked: false })));
  };

  const handleProcessInput = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setProcessedText("Artificial Intelligence essay due next week");
      setIsProcessing(false);
    }, 2000);
  };

  const handleAddTask = () => {
    if (!processedText && !inputText) return;
    
    const newId = Math.max(...items.map(item => item.id), 0) + 1;
    setItems([...items, { 
      id: newId, 
      text: processedText || inputText, 
      checked: false,
      priority: selectedPriority,
      dueDate: dueDate || undefined
    }]);
    setIsModalOpen(false);
    resetModal();
  };

  const resetModal = () => {
    setInputText("");
    setProcessedText("");
    setSelectedPriority('medium');
    setDueDate("");
  };

  const deleteTask = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const filteredItems = showCompleted ? items : items.filter(item => !item.checked);

  return (
    <div className="bg-black text-white border border-white/20 mb-20 mt-20 p-6 rounded-3xl max-w-md mx-auto shadow-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-6"
      >
        <div className="mr-4 bg-white/10 p-3 rounded-xl">
          <IoSparkles className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Think Link</h2>
          <p className="text-sm text-gray-400">Powered by @ MazsAI - ThinkLink v1.0</p>
        </div>
      </motion.div>

      <div className="flex justify-between mb-6">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>New Task</span>
        </button>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowCompleted(!showCompleted)} 
            className={`px-4 py-2 rounded-xl transition-all ${showCompleted ? 'bg-white/10' : 'bg-white/5'}`}
          >
            {showCompleted ? 'Hide' : 'Show'} Completed
          </button>
          <button 
            onClick={handleRefresh} 
            className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
          >
            <ClockArrowRotateLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black border border-white/20 p-6 rounded-2xl w-[90%] max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-semibold mb-4">Create New Task</h3>
            <div className="relative mb-4">
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <AIThinkingAnimation />
                </div>
              )}
              {processedText && (
                <TextGenerateEffect
                  words={processedText}
                  className="mb-4"
                  duration={0.8}
                />
              )}
              {!isProcessing && !processedText && (
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-white/5 text-white p-4 rounded-xl mb-4 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="Enter task description..."
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Priority</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full bg-white/5 text-white p-3 rounded-xl border border-white/10"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-white/5 text-white p-3 rounded-xl border border-white/10"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetModal();
                }}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <div className="flex space-x-3">
                {!processedText && (
                  <button
                    onClick={handleProcessInput}
                    className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-500 transition-all flex items-center space-x-2"
                  >
                    <BsStars className="w-5 h-5" />
                    <span>AI Suggest</span>
                  </button>
                )}
                <button
                  onClick={handleAddTask}
                  className="px-6 py-2 bg-white text-black rounded-xl hover:bg-gray-100 transition-all flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Task</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <LayoutGroup>
        <Reorder.Group axis="y" values={filteredItems} onReorder={setItems} className="space-y-3">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <Reorder.Item key={item.id} value={item} className="list-none">
                <motion.div 
                  className="flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheck(item.id)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded-lg bg-white/5 border-white/20"
                    />
                    <span className="text-lg font-medium text-gray-400">{index + 1}</span>
                    <div className="flex flex-col">
                      <span className={`${item.checked ? 'line-through text-gray-500' : ''}`}>
                        {item.text}
                      </span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-sm ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                        {item.dueDate && (
                          <span className="text-sm text-gray-400">
                            Due: {new Date(item.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => deleteTask(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <TrashBin className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors p-2">
                      <Gear className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </LayoutGroup>
    </div>
  );
}