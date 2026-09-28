"use client";

import React, { useState, useEffect, useRef } from "react";

interface DefinitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  hookName: string;
  expectedDefinition: string;
  syntax?: string;
}

export default function DefinitionModal({
  isOpen,
  onClose,
  hookName,
  expectedDefinition,
  syntax,
}: DefinitionModalProps) {
  const [userInput, setUserInput] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "success" | "fail">("idle");
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [showExpected, setShowExpected] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Normalize string for fair comparison (ignores case, extra spaces, line breaks, punctuation)
  const normalize = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  useEffect(() => {
    if (isOpen) {
      setUserInput("");
      setStatus("idle");
      setIsShaking(false);
      setShowExpected(false);
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerify = () => {
    if (!userInput.trim()) return;

    const normExpected = normalize(expectedDefinition);
    const normUser = normalize(userInput);

    if (normExpected === normUser) {
      setStatus("success");
      setIsShaking(false);
    } else {
      setStatus("fail");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleTryAgain = () => {
    setStatus("idle");
    setIsShaking(false);
    setUserInput("");
    textareaRef.current?.focus();
  };

  // Calculate rough similarity score percentage
  const calculateAccuracy = () => {
    const normExpected = normalize(expectedDefinition);
    const normUser = normalize(userInput);
    if (!normUser) return 0;
    if (normExpected === normUser) return 100;

    const expectedWords = normExpected.split(" ");
    const userWords = normUser.split(" ");
    const matches = userWords.filter((word) => expectedWords.includes(word)).length;
    return Math.min(100, Math.round((matches / expectedWords.length) * 100));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isShaking ? "animate-shake" : ""
        }`}
        style={{
          animation: isShaking
            ? "shake 0.5s cubic-bezier(.36,.07,.19,.97) both"
            : "modalPop 0.25s ease-out forwards",
        }}
      >
        <style>{`
          @keyframes shake {
            10%, 90% { transform: translate3d(-3px, 0, 0); }
            20%, 80% { transform: translate3d(5px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-6px, 0, 0); }
            40%, 60% { transform: translate3d(6px, 0, 0); }
          }
          @keyframes modalPop {
            0% { transform: scale(0.92); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes confettiFloat {
            0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-50px) rotate(180deg); opacity: 0; }
          }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold text-base">
              🧠
            </span>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {hookName} Definition Challenge
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Type the exact definition below to test your memory
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer text-lg font-medium"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Target Definition Reference Card (With Peek/Hide toggle) */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <span>📖</span> Target Definition:
              </span>
              <button
                type="button"
                onClick={() => setShowExpected((prev) => !prev)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
              >
                {showExpected ? "🙈 Hide Definition" : "👁️ Peek Definition (Hint)"}
              </button>
            </div>

            {showExpected ? (
              <p className="text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                "{expectedDefinition}"
              </p>
            ) : (
              <p className="text-xs text-zinc-400 italic">
                Definition chupi hui hai. Khud type karke try karein, ya hint ke liye 'Peek Definition' dabayein!
              </p>
            )}

            {syntax && (
              <div className="mt-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <span className="text-[11px] text-zinc-400">Syntax Reference: </span>
                <code className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
                  {syntax}
                </code>
              </div>
            )}
          </div>

          {/* User Typing Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Yaha Definition Type Karein:
              </label>
              <span className="text-[11px] text-zinc-400">
                {userInput.length} characters
              </span>
            </div>

            <textarea
              ref={textareaRef}
              rows={4}
              value={userInput}
              disabled={status === "success"}
              onChange={(e) => {
                setUserInput(e.target.value);
                if (status === "fail") setStatus("idle");
              }}
              placeholder={`Type definition of ${hookName} here...`}
              className={`w-full p-3.5 text-sm rounded-2xl border transition-all outline-none resize-none ${
                status === "success"
                  ? "border-green-500 bg-green-50/50 dark:bg-green-950/20 text-green-950 dark:text-green-200"
                  : status === "fail"
                  ? "border-red-500 bg-red-50/40 dark:bg-red-950/20 text-zinc-900 dark:text-zinc-100"
                  : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              }`}
            />
          </div>

          {/* SUCCESS ANIMATION STATE */}
          {status === "success" && (
            <div className="relative p-5 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 border-2 border-green-500 dark:border-green-600 rounded-2xl text-center space-y-3 shadow-lg shadow-green-500/10 animate-fade-in">
              {/* Confetti particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-around">
                <span className="text-xl animate-bounce">🎉</span>
                <span className="text-xl animate-bounce delay-100">✨</span>
                <span className="text-xl animate-bounce delay-200">🎊</span>
                <span className="text-xl animate-bounce delay-300">⭐</span>
              </div>

              <div className="w-14 h-14 mx-auto rounded-full bg-green-500 text-white flex items-center justify-center text-3xl shadow-md shadow-green-500/40 animate-pulse">
                ✓
              </div>

              <div>
                <h3 className="text-lg font-bold text-green-700 dark:text-green-300">
                  🎉 PASSED! Shabaash, Bilkul Sahi Likha!
                </h3>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Aapki definition 100% accurately match ho gayi hai.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTryAgain}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition cursor-pointer"
                >
                  Dobara Practice Karein
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/30 transition cursor-pointer"
                >
                  Done & Close ✓
                </button>
              </div>
            </div>
          )}

          {/* FAIL ANIMATION STATE */}
          {status === "fail" && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border-2 border-red-500/80 rounded-2xl space-y-3 animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center text-xl shrink-0 shadow-md shadow-red-500/30">
                  ✕
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-red-700 dark:text-red-400">
                    ❌ FAILED! Match Nahi Hua
                  </h3>
                  <p className="text-xs text-red-600/90 dark:text-red-300 mt-0.5">
                    Aapki definition actual definition se match nahi hui. Check karein ya Peek hint dekhein.
                  </p>
                  <div className="mt-2 text-xs text-zinc-500">
                    Similarity: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{calculateAccuracy()}% match</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-red-200/50 dark:border-red-900/40">
                <button
                  type="button"
                  onClick={() => setShowExpected(true)}
                  className="px-3 py-1.5 text-xs font-medium text-red-700 dark:text-red-300 hover:underline cursor-pointer"
                >
                  Definition Dekhein
                </button>
                <button
                  type="button"
                  onClick={handleTryAgain}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/25 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>🔄</span> Try Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions (Only when idle or typing) */}
        {status === "idle" && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
            <button
              type="button"
              onClick={() => setUserInput("")}
              disabled={!userInput}
              className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 disabled:opacity-40 cursor-pointer"
            >
              Clear Input
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerify}
                disabled={!userInput.trim()}
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-md shadow-blue-500/25 transition cursor-pointer flex items-center gap-1.5"
              >
                <span>🚀</span> Check & Verify
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
