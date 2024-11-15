import React from 'react';
import { Conversation as ConversationType } from '../types';
import { MessageSquare, Lightbulb, HelpCircle, ClipboardList } from 'lucide-react';

interface ConversationProps {
  conversations: ConversationType[];
}

const iconMap = {
  suggestion: Lightbulb,
  question: HelpCircle,
  plan: ClipboardList,
  feedback: MessageSquare,
};

export function Conversation({ conversations }: ConversationProps) {
  return (
    <div className="space-y-4">
      {conversations.map((conv) => {
        const Icon = iconMap[conv.type];
        return (
          <div
            key={conv.id}
            className="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4"
          >
            <div className="p-2 bg-indigo-100 rounded-full">
              <Icon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-500">
                  {new Date(conv.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-sm font-medium text-indigo-600 capitalize">
                  {conv.type}
                </span>
              </div>
              <p className="text-gray-700">{conv.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}