import React, { useState } from 'react';
import { Agent, AgentRole } from '../types';
import { X } from 'lucide-react';
import { RoleIcon } from './RoleIcon';

interface AgentFormProps {
  onSubmit: (agent: Agent) => void;
  onClose: () => void;
  initialData?: Agent;
}

export function AgentForm({ onSubmit, onClose, initialData }: AgentFormProps) {
  const [formData, setFormData] = useState<Partial<Agent>>(
    initialData || {
      name: '',
      role: 'student',
      interests: [],
      strengths: [],
      preferences: {
        learningStyle: '',
        communicationStyle: '',
        expertise: [],
      },
      avatar: `https://source.unsplash.com/random/400x400/?portrait&${Math.random()}`,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Agent);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? 'Edit Agent' : 'Create New Agent'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <div className="relative">
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as AgentRole })
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="facilitator">Facilitator</option>
                <option value="learning_specialist">Learning Specialist</option>
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <RoleIcon role={formData.role as AgentRole} className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Learning Style
            </label>
            <input
              type="text"
              value={formData.preferences?.learningStyle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferences: {
                    ...formData.preferences!,
                    learningStyle: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Visual, Auditory, Kinesthetic"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Communication Style
            </label>
            <input
              type="text"
              value={formData.preferences?.communicationStyle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferences: {
                    ...formData.preferences!,
                    communicationStyle: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Direct, Collaborative, Supportive"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Strengths (comma-separated)
            </label>
            <input
              type="text"
              value={formData.strengths?.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  strengths: e.target.value.split(',').map((i) => i.trim()),
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Problem Solving, Critical Thinking, Leadership"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interests (comma-separated)
            </label>
            <input
              type="text"
              value={formData.interests?.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  interests: e.target.value.split(',').map((i) => i.trim()),
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Mathematics, Science, Art"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              {initialData ? 'Update Agent' : 'Create Agent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}