"use client";

import React, { useState } from "react";
import DefinitionModal from "../DefinitionModal";

export default function UseStateFn() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<string[]>(["Initial state: 0"]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Exact definition text to be tested in the modal
  const hookDefinition =
    "useState is used to store and manage data inside a React component. When the state changes, React re-renders the component.";

  const updateCount = (newCount: number, actionName: string) => {
    setCount(newCount);
    setHistory((prev) => [`${actionName} -> ${newCount}`, ...prev.slice(0, 3)]);
  };

  return (
    <div className="space-y-6">
      {/* 1. Definition & Test Challenge Banner Card */}
      <div className="p-5 bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-800/40 border border-blue-100 dark:border-zinc-800 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300">
                Official Hook Concept
              </span>
              <span className="text-xs text-zinc-400">React 19</span>
            </div>

            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span>📖</span> useState Definition
            </h2>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {hookDefinition}
            </p>
          </div>

          {/* Test Definition Modal Trigger Button */}
          <div className="shrink-0 flex sm:flex-col items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/25 transition cursor-pointer flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="text-sm group-hover:rotate-12 transition-transform">🧠</span>
              <span>Test Definition (Quiz)</span>
            </button>
            <span className="text-[10px] text-zinc-400 mt-1 hidden sm:block text-center">
              Type & verify to pass
            </span>
          </div>
        </div>

        {/* Syntax snippet inside definition card */}
        <div className="mt-4 pt-3 border-t border-blue-100/80 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">Syntax:</span>
            <code className="font-mono bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md text-xs">
              const [count, setCount] = useState(0);
            </code>
          </div>
          <span className="text-[11px] text-zinc-400">
            Click button above to test memory ↗
          </span>
        </div>
      </div>

      {/* 2. Interactive Counter Demo Playground */}
      <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 font-bold text-xs">
              ⚡
            </span>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Interactive State Playground
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Type: number
          </span>
        </div>

        <div className="flex flex-col items-center justify-center py-4 space-y-5">
          {/* Big Count Badge */}
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-zinc-50 dark:bg-zinc-800/60 border-2 border-zinc-200 dark:border-zinc-700/80 flex flex-col items-center justify-center shadow-inner">
              <span className="text-xs uppercase font-bold tracking-widest text-zinc-400">
                Count
              </span>
              <span className="text-5xl font-black text-blue-600 dark:text-blue-400 mt-1 transition-all">
                {count}
              </span>
            </div>
            {count !== 0 && (
              <span
                className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${
                  count > 0
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                }`}
              >
                {count > 0 ? `+${count}` : count}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => updateCount(count - 5, "Decremented (-5)")}
              className="px-3 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              -5
            </button>
            <button
              onClick={() => updateCount(count - 1, "Decremented (-1)")}
              className="px-4 py-2 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-100 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Decrement (-1)
            </button>
            <button
              onClick={() => updateCount(0, "Reset to 0")}
              className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-xl text-xs font-medium transition cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={() => updateCount(count + 1, "Incremented (+1)")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-md shadow-blue-500/25"
            >
              Increment (+1)
            </button>
            <button
              onClick={() => updateCount(count + 5, "Incremented (+5)")}
              className="px-3 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-semibold transition cursor-pointer border border-blue-200 dark:border-blue-900"
            >
              +5
            </button>
          </div>

          {/* Mini State History Trail */}
          <div className="w-full max-w-sm pt-2">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-1 mb-1 border-b border-zinc-100 dark:border-zinc-800">
              <span>Recent State Updates:</span>
              <span className="font-mono">History Log</span>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {history.map((item, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-md font-mono"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Reusable Definition Practice Modal */}
      <DefinitionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hookName="useState"
        expectedDefinition={hookDefinition}
        syntax="const [state, setState] = useState(initialState);"
      />
    </div>
  );
}

