'use client'

import { Plus, Globe, Microphone, Gear, Circles5Random } from '@gravity-ui/icons'

export default function ChatInput() {
  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="relative flex items-center gap-2 rounded-[24px] bg-black border border-white mt-32 py-4 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
            <Plus className="h-5 w-5" />
            <span className="text-sm text-gray-400">Attach</span>
          </button>
          <button className="p-1 text-white hover:text-gray-200 transition-colors">
            <Globe className="h-5 w-5" />
          </button>
          <button className="p-1 text-white hover:text-gray-200 transition-colors">
            <Gear className="h-5 w-5" />
          </button>
        </div>
        
        <input 
          type="text"
          placeholder="Message Mazs AI ..."
          className="flex-1 bg-transparent border-0 focus:outline-none text-white placeholder:text-gray-300 min-w-0"
        />
        
        <div className="flex gap-2">
          <button className="p-1 text-white hover:text-gray-200 transition-colors">
            <Microphone className="h-5 w-5" />
          </button>
          <button className="p-1 text-white hover:text-gray-200 transition-colors">
            <Circles5Random className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

