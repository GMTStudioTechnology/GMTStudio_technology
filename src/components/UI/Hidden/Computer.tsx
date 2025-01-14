import React, { useState, useEffect } from 'react';
import { Terminal, Chrome, Folder, Settings, Power, Wifi, Battery, Volume2, Monitor, Lock, User, Command, Package, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ModernOS = () => {
  const [bootStage, setBootStage] = useState<'off' | 'booting' | 'login' | 'loading' | 'desktop'>('off');
  const [windows, setWindows] = useState<{ id: string; title: string; isOpen: boolean; }[]>([]);
  const [terminalText, setTerminalText] = useState('GMTOSX Terminal v2.0\nCopyright © 2025 GMT Corporation. All rights reserved.\n\n$ ');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const CORRECT_PASSWORD = 'thinklink@mazsai2025';
  const LOGIN_HINT = "01010100 01101000 01101001 01101110 01101011 01001100 01101001 01101110 01101011 01000000 01001101 01100001 01111010 01110011 01000001 01001001 00110010 00110000 00110010 00110101";

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    const interval = setInterval(updateDateTime, 1000);
    updateDateTime();
    return () => clearInterval(interval);
  }, []);

  const bootSequence = async () => {
    setBootStage('booting');
    for (let i = 0; i <= 100; i++) {
      setLoadingProgress(i);
      await new Promise(r => setTimeout(r, 20));
    }
    setTimeout(() => setBootStage('login'), 500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === CORRECT_PASSWORD) {
      setBootStage('loading');
      for (let i = 0; i <= 100; i++) {
        setLoadingProgress(i);
        await new Promise(r => setTimeout(r, 20));
      }
      setTimeout(() => setBootStage('desktop'), 500);
    } else {
      setLoginError('Access Denied. Hint: 01010100 01101000 01101001 01101110 01101011 01001100 01101001 01101110 01101011 01000000 01001101 01100001 01111010 01110011 01000001 01001001 00110010 00110000 00110010 00110101');
      setTimeout(() => setLoginError(''), 3000);
    }
  };

  const openWindow = (title: string) => {
    const newWindow = { id: Date.now().toString(), title, isOpen: true };
    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(newWindow.id);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setActiveWindow(null);
  };

  const Window = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="absolute top-12 left-1/2 transform -translate-x-1/2 w-3/4 h-3/4 bg-gray-900/95 backdrop-blur-xl rounded-lg overflow-hidden shadow-2xl border border-gray-800"
      style={{ zIndex: activeWindow === id ? 50 : 10 }}
      onClick={() => setActiveWindow(id)}
    >
      <div className="h-10 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => closeWindow(id)}
            className="w-3 h-3 rounded-full bg-red-500"
          />
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500" />
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div className="w-20" />
      </div>
      <div className="p-4 h-[calc(100%-2.5rem)] overflow-auto">
        {children}
      </div>
    </motion.div>
  );

  const renderBootScreen = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full flex flex-col items-center justify-center bg-black text-gray-300 space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold tracking-wider"
      >
        GMTOS<span className="text-blue-500"> A</span>
      </motion.div>
      <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          style={{ width: `${loadingProgress}%` }}
        />
      </div>
    </motion.div>
  );

  const renderLoginScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full flex flex-col items-center justify-center bg-black"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="text-gray-300 text-6xl font-light mb-2">{time}</div>
        <div className="text-gray-500 text-xl">{date}</div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl w-96 border border-gray-800"
      >
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <User className="w-12 h-12 text-gray-400" />
            </motion.div>
            <div className="text-gray-300 text-xl">Administrator</div>
          </div>
          
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              placeholder="Enter Security Key"
            />
            {loginError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {loginError}
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            Authenticate
          </motion.button>

          <div className="text-center">
            <motion.button
              type="button"
              whileHover={{ color: '#fff' }}
              className="text-gray-500 text-sm hover:text-gray-300"
              onClick={() => alert(LOGIN_HINT)}
            >
              Security Key Hint
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  const renderDesktop = () => (
    <div className="h-full w-full bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Top Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="h-10 bg-gray-900/90 backdrop-blur-xl border-b border-gray-800 flex items-center justify-between px-4 z-50 relative"
      >
        <div className="flex items-center gap-4">
          <Command className="w-5 h-5 text-blue-500" />
          <div className="text-gray-400 text-sm flex gap-6">
            {['File', 'Edit', 'View', 'Window', 'Help'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ color: '#fff' }}
                className="hover:text-white transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <div className="text-sm font-medium">{time}</div>
        </div>
      </motion.div>

      {/* Desktop Icons */}
      <div className="p-6 grid grid-cols-1 gap-6">
        {[
          { icon: Folder, name: "System" },
          { icon: Globe, name: "Network" },
          { icon: Package, name: "Applications" },
          { icon: Monitor, name: "Monitor" }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 text-gray-400 cursor-pointer group w-40"
          >
            <item.icon className="w-6 h-6 group-hover:text-blue-500 transition-colors" />
            <span className="text-sm group-hover:text-white transition-colors">{item.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((window) => (
          <Window key={window.id} id={window.id} title={window.title}>
            {window.title === "Terminal" && (
              <div className="font-mono text-green-400 text-sm h-full">
                {terminalText}
                <input
                  type="text"
                  className="bg-transparent border-none outline-none text-green-400 w-full mt-2"
                  placeholder="Enter command..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.currentTarget.value;
                      setTerminalText(prev => `${prev}${input}\n$ `);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            )}
          </Window>
        ))}
      </AnimatePresence>

      {/* Dock */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 h-16 bg-gray-900/30 backdrop-blur-xl rounded-2xl flex items-center justify-center gap-2 px-6 border border-gray-800"
      >
        {[
          { icon: Terminal, action: () => openWindow("Terminal") },
          { icon: Chrome, action: () => openWindow("Browser") },
          { icon: Settings, action: () => openWindow("Settings") },
          { icon: Lock, action: () => setBootStage('login') }
        ].map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2, y: -8 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.action}
            className="p-2 hover:bg-gray-800 rounded-xl text-gray-400 hover:text-white transition-all"
          >
            <item.icon className="w-8 h-8" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="w-full max-w-6xl aspect-video bg-black rounded-xl border border-gray-800 overflow-hidden relative shadow-2xl"
      >
        {bootStage === 'off' && (
          <div className="h-full w-full flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={bootSequence}
              className="px-6 py-3 rounded-lg bg-gray-900 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700 transition-all flex items-center gap-2"
            >
              <Power className="w-5 h-5" />
              Initialize System
            </motion.button>
          </div>
        )}
        {bootStage === 'booting' && renderBootScreen()}
        {bootStage === 'login' && renderLoginScreen()}
        {bootStage === 'loading' && renderBootScreen()}
        {bootStage === 'desktop' && renderDesktop()}
      </motion.div>
    </div>
  );
};

export default ModernOS;