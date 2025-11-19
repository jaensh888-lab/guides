'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-light"
      >
        Спросить AI-гида
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-xl"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold">AI-чат</p>
              <button
                type="button"
                className="text-xs text-slate-500"
                onClick={() => setIsOpen(false)}
              >
                Закрыть
              </button>
            </div>
            <p className="mt-2 text-slate-600">
              Здесь будет AI-гида, который поможет подобрать маршрут и ответит на вопросы. Интегрируем позже.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
