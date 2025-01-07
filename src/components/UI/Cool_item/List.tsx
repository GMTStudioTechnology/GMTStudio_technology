'use client'

import { useState } from "react";
import { AnimatePresence, LayoutGroup, Reorder, motion } from "framer-motion";
import { Plus, ClockArrowRotateLeft, Gear } from "@gravity-ui/icons";

interface WorkflowItem {
  id: number;
  text: string;
  checked: boolean;
}

export default function AgentWorkflow() {
  const [items, setItems] = useState<WorkflowItem[]>([
    { id: 1, text: "Essay due", checked: false },
    { id: 2, text: "Super market discount", checked: false },
    { id: 3, text: "Costco membership", checked: false },
    { id: 4, text: "Math homework", checked: true },
  ]);

  const handleCheck = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleRefresh = () => {
    setItems(items.map(item => ({ ...item, checked: false })));
  };

  return (
    <div className="bg-black text-white border border-white mb-20 mt-20 p-6 rounded-3xl max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <div className="mr-2">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-400">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Think Link</h2>
          <p className="text-sm text-gray-400">Power by @ MazsAI - ThinkLink v1.0</p>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <button className="text-gray-400 hover:text-white transition-colors">
          <Plus className="w-6 h-6" />
        </button>
        <button onClick={handleRefresh} className="text-gray-400 hover:text-white transition-colors">
          <ClockArrowRotateLeft className="w-6 h-6" />
        </button>
      </div>

      <LayoutGroup>
        <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
          <AnimatePresence>
            {items.map((item, index) => (
              <Reorder.Item key={item.id} value={item} className="list-none">
                <motion.div 
                  className="flex items-center justify-between bg-gray-900 rounded-xl p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheck(item.id)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded bg-gray-700 border-gray-600"
                    />
                    <span className="text-lg">{index + 1}</span>
                    <span className={item.checked ? "line-through text-gray-500" : ""}>{item.text}</span>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Gear className="w-5 h-5" />
                  </button>
                </motion.div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </LayoutGroup>
    </div>
  );
}

