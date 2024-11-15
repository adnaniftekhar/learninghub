import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  disabled?: boolean;
  isProcessing?: boolean;
}

export function PromptForm({ onSubmit, disabled, isProcessing }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="prompt" className="text-sm font-medium text-gray-700">
          Learning Scenario Prompt
        </label>
        <div className="flex gap-2">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the learning scenario or objective in detail. Include any specific topics, duration, or special requirements..."
            className="flex-1 min-h-[120px] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            disabled={disabled || isProcessing}
          />
          <button
            type="submit"
            disabled={disabled || isProcessing || !prompt.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-end flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Generate
              </>
            )}
          </button>
        </div>
        {isProcessing && (
          <p className="text-sm text-gray-600 mt-2">
            Generating personalized learning journey based on participant profiles...
          </p>
        )}
      </div>
    </form>
  );
}