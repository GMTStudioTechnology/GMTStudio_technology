import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TerminalIcon, MonitorOff, Lock } from 'lucide-react';
import { Power } from '@gravity-ui/icons';
import { useNavigate } from 'react-router-dom';
import Nav from '../UI/Navigation_bar';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  progress: number;
}

function MainPage() {
  const navigate = useNavigate();

  const startDate = useMemo(() => new Date('2025-01-01T00:00:00'), []);
  const endDate = useMemo(() => new Date('2025-07-01T00:00:00'), []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    progress: 0
  });

  const [powerOn, setPowerOn] = useState(false);
  const [bootPhase, setBootPhase] = useState(0);
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [typingOutput, setTypingOutput] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const binaryCode = "01000111 01001101 01010100 01010011 01110100 01110101 01100100 01101001 01101111 01011111 01100100 01100101 01110110 01011111 01110100 01100101 01100011 01101000 01101110 01101111 01101100 01101111 01100111 01111001";

  const bootMessages = [
    "GMTOS BIOS v1.0",
    "Copyright © 2025 GMTStudio",
    "CPU: GMT-X86 @ 4.77MHz",
    "Memory Test... OK",
    "Loading GMTOS...",
    "GMTOS v1.0",
    "Initializing security system...",
  ];

  const vigenereDecrypt = (ciphertext: string, key: string): string => {
    let result = '';
    const normalizedKey = key.toUpperCase().replace(/[^A-Z]/g, '');
    const normalizedCiphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
    
    if (normalizedKey.length === 0) return '';
    
    for (let i = 0; i < normalizedCiphertext.length; i++) {
      const cipherChar = normalizedCiphertext.charCodeAt(i);
      const keyChar = normalizedKey.charCodeAt(i % normalizedKey.length);
      const shift = keyChar - 65;
      const decryptedChar = ((cipherChar - 65 - shift + 26) % 26) + 65;
      result += String.fromCharCode(decryptedChar);
    }
    
    return result;
  };

  const typeOutput = async (message: string) => {
    return new Promise<void>((resolve) => {
      let currentText = '';
      const typingSpeed = 10;

      const typingInterval = setInterval(() => {
        if (currentText.length < message.length) {
          currentText += message[currentText.length];
          setTypingOutput(prev => {
            const newOutput = [...prev];
            newOutput[newOutput.length - 1] = currentText;
            return newOutput;
          });
        } else {
          clearInterval(typingInterval);
          resolve();
        }
      }, typingSpeed);
    });
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [typingOutput]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference < 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const totalMilliseconds = endDate.getTime() - startDate.getTime();
      const elapsedMilliseconds = now.getTime() - startDate.getTime();
      const progress = Math.round((elapsedMilliseconds / totalMilliseconds) * 100);

      setTimeLeft({ days, hours, minutes, seconds, progress });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, startDate]);

  useEffect(() => {
    if (powerOn && bootPhase < bootMessages.length) {
      const timer = setTimeout(() => {
        setBootPhase(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [powerOn, bootPhase, bootMessages.length]);

  const handlePowerButton = () => {
    setPowerOn(!powerOn);
    if (!powerOn) {
      setBootPhase(0);
      setIsLoggedIn(false);
      setTerminalOpen(false);
      setPassword('');
      setAttempts(0);
      setTypingOutput([]);
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === 'GMTStudio_dev_technology') {
      setIsLoggedIn(true);
    } else {
      setAttempts(prev => prev + 1);
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleTerminalCommand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const command = terminalInput.toLowerCase().trim();

    setTypingOutput(prev => [...prev, `> ${command}`]);
    setTerminalInput('');

    if (command === 'clear') {
      setTypingOutput([]);
      return;
    }

    if (command === 'help') {
      setTypingOutput(prev => [...prev, '']);
      await typeOutput('Available commands: help, clear, about, decode_binary <binary>, cd, encode, decode, decode_vigenere <ciphertext> <key>');
      return;
    }

    if (command === 'about') {
      setTypingOutput(prev => [...prev, '']);
      await typeOutput('GMTOS v1.0 - Developed by GMTStudio © 2025');
      return;
    }

    if (command === 'cd hero') {
      setTypingOutput(prev => [...prev, '']);
      await typeOutput('Navigating to Hero page...');
      navigate('/hero');
      return;
    }

    if (command === 'cd') {
      setTypingOutput(prev => [...prev, '']);
      await typeOutput('Command not found: cd, please specify a directory');
      return;
    }

    if (command === "encode") {
      const lines = [
        'cd: nqkg',
        'KEY: 01000111 01001101 01010100 01010011 01110100 01110101 01100100 01101001 01101111'
      ];
      for (const line of lines) {
        setTypingOutput(prev => [...prev, '']);
        await typeOutput(line);
      }
      return;
    }

    if (command === "decode") {
      const lines = [
        'Use command: decode_vigenere <ciphertext> <key>',
        'Use command: decode_binary <binary>'
      ];
      for (const line of lines) {
        setTypingOutput(prev => [...prev, '']);
        await typeOutput(line);
      }
      return;
    }

    if (command.startsWith('decode_vigenere')) {
      const args = command.slice('decode_vigenere '.length).split(' ');
      if (args.length < 2) {
        setTypingOutput(prev => [...prev, '']);
        await typeOutput('Usage: decode_vigenere <ciphertext> <key>');
        return;
      }

      const ciphertext = args[0];
      const key = args[1];

      try {
        const decrypted = vigenereDecrypt(ciphertext, key);
        setTypingOutput(prev => [...prev, '']);
        await typeOutput(`Decrypted message: ${decrypted}`);
      } catch {
        setTypingOutput(prev => [...prev, '']);
        await typeOutput('Error: Invalid input format');
      }
      return;
    }

    if (command.startsWith('decode_binary ')) {
      const binary = command.replace('decode_binary ', '');
      try {
        const decoded = binary.split(' ')
          .map(byte => String.fromCharCode(parseInt(byte, 2)))
          .join('');
        setTypingOutput(prev => [...prev, '']);
        await typeOutput(`Decoded message: ${decoded}`);
      } catch {
        setTypingOutput(prev => [...prev, '']);
        await typeOutput('Error: Invalid binary format');
      }
      return;
    }

    setTypingOutput(prev => [...prev, '']);
    await typeOutput(`Command not found: ${command}`);
  };

  const renderBootSequence = () => (
    <div>
      {bootMessages.slice(0, bootPhase + 1).map((msg, i) => (
        <div key={i} className="mb-2">{msg}</div>
      ))}
    </div>
  );

  const renderTerminal = () => (
    <div className="h-full flex flex-col">
      <div ref={terminalRef} className="flex-grow overflow-auto mb-4 bg-black bg-opacity-70 p-2 rounded">
        <div className="mb-4 text-green-400">GMTOS Terminal v1.0 - Type 'help' for available commands</div>
        {typingOutput.map((line, i) => (
          <div 
            key={i} 
            className={`mb-1 ${line.startsWith('>') ? 'text-white' : 'text-green-300'}`}
          >
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleTerminalCommand} className="mt-2">
        <div className="flex items-center">
          <span className="mr-2 text-green-400">{'>'}</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTerminalInput(e.target.value)}
            className="bg-transparent flex-1 focus:outline-none text-green-400"
            autoFocus
          />
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Nav/>
      <div className="flex p-2 gap-4 overflow-hidden flex-grow pt-[50px]">
        <div className="w-3/5 pt-[50px]">
          <div className="h-full bg-black border border-white rounded-lg shadow-2xl overflow-hidden">
            <div className="relative bg-black p-4 h-full flex flex-col">
              <button 
                onClick={handlePowerButton}
                className="absolute top-4 right-4 w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center shadow-lg border-2 border-gray-700 hover:border-green-500 transition-colors duration-300 z-20"
              >
                <Power 
                  className={`w-8 h-8 ${powerOn ? 'text-green-500' : 'text-gray-500'} transition-colors duration-300`}
                />
              </button>

              <div className="flex-1 bg-black p-4 rounded font-mono text-sm overflow-auto crt relative">
                {!powerOn && (
                  <div className="flex items-center justify-center h-full">
                    <MonitorOff size={48} />
                  </div>
                )}

                {powerOn && !isLoggedIn && (
                  <div>
                    {renderBootSequence()}

                    {bootPhase >= bootMessages.length && (
                      <div className="mt-8">
                        <div className="mb-4 text-yellow-400">SECURITY SYSTEM ACTIVE</div>
                        <div className="mb-4">Binary Authentication Required:</div>
                        <div className="mb-4 font-bold">{binaryCode}</div>
                        <div className="mb-4 text-gray-400">Hint: Visit https://cryptii.com/pipes/text-to-binary to decode</div>
                        {attempts > 2 && (
                          <div className="mb-4 text-yellow-400">
                            Additional Hint: Each byte represents one character
                          </div>
                        )}
                        <form onSubmit={handleLogin} className="mt-4">
                          <input
                            type="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            className="bg-black border border-green-400 text-green-400 px-2 py-1 w-64"
                            placeholder="Enter decoded password"
                          />
                          <button type="submit" className="ml-2 border border-green-400 px-4 py-1 hover:bg-green-400 hover:text-black">
                            Login
                          </button>
                        </form>
                        {showError && (
                          <div className="text-red-500 mt-2">Access Denied - Invalid Password</div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {powerOn && isLoggedIn && !terminalOpen && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
                    <button
                      onClick={() => setTerminalOpen(true)}
                      className="flex items-center space-x-2 bg-green-500 text-black px-6 py-3 rounded-lg text-xl font-bold hover:bg-green-400 transition-colors duration-200 shadow-lg"
                    >
                      <TerminalIcon size={24} className="mr-2"  />
                      <span>Start Terminal</span>
                    </button>
                  </div>
                )}

                {powerOn && isLoggedIn && terminalOpen && renderTerminal()}
              </div>

              <div className="mt-2 flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Lock size={16} />
                  <span>Security Level: Maximum</span>
                </div>
                <div className="text-gray-400">GMTOS v1.0</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/5 pt-[50px]">
          <div className="h-full bg-black border border-white rounded-lg shadow-2xl p-6 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Website Development Progress
            </h2>

            <div className="flex flex-col items-center space-y-12">
              <div
                className="radial-progress text-primary"
                style={{ '--value': timeLeft.progress, '--size': '12rem', '--thickness': '2px' } as React.CSSProperties}
                role="progressbar"
              >
                <span className="text-4xl font-bold">{timeLeft.progress}%</span>
              </div>
              <h1>days until development completion</h1>
              <div className="grid grid-cols-4 gap-6 text-center">
                <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-4xl">
                    {timeLeft.days}
                  </span>
                  days
                </div>
                <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-4xl">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  hours
                </div>
                <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-4xl">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </span>
                  min
                </div>
                <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-4xl">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                  sec
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;