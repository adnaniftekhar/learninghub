import React from 'react';
import { Agent } from '../types';
import { BookOpen, Brain, MessageSquare, Settings, Star } from 'lucide-react';
import { RoleIcon } from './RoleIcon';

interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
}

export function AgentCard({ agent, onEdit }: AgentCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{agent.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              <RoleIcon role={agent.role} className="w-4 h-4" />
              {agent.role.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <span className="text-gray-600">
            Learning Style: {agent.preferences.learningStyle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <span className="text-gray-600">
            Communication: {agent.preferences.communicationStyle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-indigo-600" />
          <div className="flex flex-wrap gap-2">
            {agent.strengths.map((strength, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <div className="flex flex-wrap gap-2">
            {agent.interests.map((interest, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-700"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onEdit(agent)}
        className="mt-4 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <Settings className="w-4 h-4" />
        Configure Agent
      </button>
    </div>
  );
}