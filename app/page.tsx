"use client";

import React, { useState } from "react";
import UseStateFn from "./components/hooks/useState";

interface HookItem {
  id: string;
  name: string;
}

const HOOKS_LIST: HookItem[] = [
  { id: "useState", name: "useState" },
  { id: "useEffect", name: "useEffect" },
  { id: "useContext", name: "useContext" },
  { id: "useRef", name: "useRef" },
  { id: "useReducer", name: "useReducer" },
  { id: "useMemo", name: "useMemo" },
  { id: "useCallback", name: "useCallback" },
  { id: "useId", name: "useId" },
  { id: "useTransition", name: "useTransition" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("hooks");
  const [showHooksDropdown, setShowHooksDropdown] = useState<boolean>(true);
  const [selectedHook, setSelectedHook] = useState<string | null>("useState");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (category === "hooks") {
      setShowHooksDropdown((prev) => !prev);
    }
  };

  const handleSelectHook = (hookId: string) => {
    setSelectedHook(hookId);
  };

  return (
    <main className="h-screen w-full overflow-hidden flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Dashboard Top Header (Fixed Height, No Scroll) */}
      <header className="shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm shadow-blue-500/20">
              ⚡
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight leading-tight">Next.js & React Dashboard</h1>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-none">Interactive Component & Hooks Explorer</p>
            </div>
          </div>

          <div className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">
            Next.js App Router
          </div>
        </div>
      </header>

      {/* Dashboard Navigation Buttons Bar (Shrink-0, Fits on screen) */}
      <div className="shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2">
        <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          {/* Primary Hooks Button */}
          <button
            onClick={() => handleCategoryClick("hooks")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition cursor-pointer text-xs shadow-sm ${
              activeCategory === "hooks"
                ? "bg-blue-600 text-white shadow-blue-500/25"
                : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200"
            }`}
          >
            <span>🪝 React Hooks</span>
            <span className="text-[10px] transition-transform duration-200 inline-block">
              {showHooksDropdown ? "▲" : "▼"}
            </span>
            <span className="ml-0.5 text-[10px] bg-white/20 dark:bg-black/20 px-1.5 py-0.2 rounded-full">
              {HOOKS_LIST.length}
            </span>
          </button>

          {/* Other Dashboard Buttons */}
          <button
            onClick={() => handleCategoryClick("components")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition cursor-pointer text-xs ${
              activeCategory === "components"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            <span>🧩 Components</span>
          </button>

          <button
            onClick={() => handleCategoryClick("routing")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition cursor-pointer text-xs ${
              activeCategory === "routing"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            <span>🛣️ Routing</span>
          </button>

          <button
            onClick={() => handleCategoryClick("serverActions")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition cursor-pointer text-xs ${
              activeCategory === "serverActions"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            <span>⚡ Server Actions</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Content Area (Fills remaining screen height, NO PAGE SCROLL) */}
      <div className="flex-1 min-h-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-3">
        <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-0">
          
          {/* Left Column: Hooks Options List (Internal Scroll Only) */}
          <div className="lg:col-span-4 h-full min-h-0 flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
            <div className="shrink-0 flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-base">📋</span>
                <h2 className="font-semibold text-sm">Hooks Ki List</h2>
              </div>
              <button
                onClick={() => setShowHooksDropdown((prev) => !prev)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {showHooksDropdown ? "Hide List" : "Show List"}
              </button>
            </div>

            {/* This container has flex-1 and overflow-y-auto: only this scrolls! */}
            {showHooksDropdown ? (
              <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1.5">
                {HOOKS_LIST.map((hook) => {
                  const isSelected = selectedHook === hook.id;
                  const hasComponent = hook.id === "useState";

                  return (
                    <button
                      key={hook.id}
                      onClick={() => handleSelectHook(hook.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-100 shadow-sm"
                          : "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-xs">{hook.name}</span>
                          {hasComponent && (
                            <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-950/80 dark:text-green-300 px-1.5 py-0.2 rounded-full font-medium">
                              Active
                            </span>
                          )}
                        </div>
                       
                      </div>
                      <span className="text-zinc-400 text-xs shrink-0">{isSelected ? "→" : ""}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-4 text-zinc-400 text-xs">
                Hooks list hidden hai. 'Show List' par click karein.
              </div>
            )}
          </div>

          {/* Right Column: Display Rendered Component (Internal Scroll Only) */}
          <div className="lg:col-span-8 h-full min-h-0 flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
            {/* Component Header Bar (Fixed top of right panel) */}
            <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                 
                </div>
                <h3 className="text-base font-bold mt-0.5 text-zinc-900 dark:text-zinc-100">
                  {selectedHook === "useState"
                    ? "useState Component"
                    : selectedHook
                    ? `${selectedHook} Demo`
                    : "Welcome to Dashboard"}
                </h3>
              </div>

        
            </div>

            {/* Component Content Area - Internal Scroll Only */}
            <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4">
              <UseStateFn />
            </div>
            
          </div>

        </div>
      </div>
    </main>
  );
}
