import React from 'react'
import { THEMES } from "../constants/index.js";
import { Send } from "lucide-react";
import { useThemeStore } from '../store/useThemeStore.js';

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];


const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen pt-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-indigo-700">Theme</h2>
            <p className="text-sm text-purple-700/80">Choose a theme for your chat interface</p>
          </div>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-4">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-white/80 shadow-lg" : "hover:bg-white/60"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-indigo-400"></div>
                  <div className="rounded bg-purple-400"></div>
                  <div className="rounded bg-pink-400"></div>
                  <div className="rounded bg-white/60"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center text-indigo-700">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-3 mt-8 text-pink-700">Preview</h3>
        <div className="rounded-xl border border-pink-200 overflow-hidden bg-white/80 shadow-2xl backdrop-blur-md">
          <div className="p-4 bg-white/60">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-white/80 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-indigo-200 bg-white/80">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white font-medium">
                      N
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-indigo-700">Jasraj Singh</h3>
                      <p className="text-xs text-purple-700/80">Online</p>
                    </div>
                  </div>
                </div>
                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-white/80">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-indigo-400 text-white" : "bg-white/60 text-indigo-700"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-white/70" : "text-indigo-400/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Chat Input */}
                <div className="p-4 border-t border-indigo-200 bg-white/80">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10 bg-white/60 text-indigo-700 placeholder:text-indigo-300"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage