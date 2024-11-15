import React, { useState, useEffect } from 'react';
import { Agent, Conversation as ConversationType, Prompt, LearningJourney } from './types';
import { AgentCard } from './components/AgentCard';
import { AgentForm } from './components/AgentForm';
import { Conversation } from './components/Conversation';
import { PromptForm } from './components/PromptForm';
import { LearningJourney as LearningJourneyComponent } from './components/LearningJourney';
import { Plus, Users, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';
import { prebuiltAgents } from './data/prebuiltAgents';
import { parsePrompt } from './utils/promptParser';

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | undefined>();
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentJourney, setCurrentJourney] = useState<LearningJourney | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAgents(prebuiltAgents);
  }, []);

  const handleAddAgent = (agent: Agent) => {
    const newAgent = {
      ...agent,
      id: Math.random().toString(36).substr(2, 9),
    };
    setAgents([...agents, newAgent]);
    setShowForm(false);
  };

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setShowForm(true);
  };

  const handleUpdateAgent = (updatedAgent: Agent) => {
    setAgents(
      agents.map((a) => (a.id === updatedAgent.id ? updatedAgent : a))
    );
    setShowForm(false);
    setEditingAgent(undefined);
  };

  const handlePromptSubmit = async (promptText: string) => {
    setIsProcessing(true);
    setError(null);
    
    const newPrompt: Prompt = {
      id: Math.random().toString(36).substr(2, 9),
      text: promptText,
      timestamp: Date.now(),
      status: 'in_progress',
    };
    setPrompts([...prompts, newPrompt]);

    try {
      const journey = await parsePrompt(promptText, agents);
      setCurrentJourney(journey);

      const facilitator = agents.find((a) => a.role === 'facilitator');
      if (facilitator) {
        const responses: ConversationType[] = [
          {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            agentId: facilitator.id,
            message: `I've analyzed the learning scenario: "${promptText}" and created a personalized learning journey. Let's review it together.`,
            type: 'plan',
          },
        ];

        const delays = [1000, 2000, 3000];
        const otherAgents = agents.filter((a) => a.id !== facilitator.id);

        for (let i = 0; i < Math.min(3, otherAgents.length); i++) {
          const agent = otherAgents[i];
          const response = generateAgentResponse(agent, promptText);
          await new Promise((resolve) => setTimeout(resolve, delays[i]));
          responses.push({
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now() + delays[i],
            agentId: agent.id,
            message: response,
            type: i === 0 ? 'suggestion' : i === 1 ? 'question' : 'feedback',
          });
        }

        setConversations([...conversations, ...responses]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the learning journey');
      console.error('Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateAgentResponse = (agent: Agent, prompt: string): string => {
    const responses: Record<string, string> = {
      teacher: `Based on my expertise in ${agent.preferences.expertise.join(
        ' and '
      )}, I suggest we focus on interactive learning activities that incorporate ${
        agent.interests[0]
      }.`,
      student: `I'm excited to learn about this! Could we incorporate some ${
        agent.preferences.learningStyle
      } learning approaches? I learn best that way.`,
      learning_specialist: `Given the diverse learning styles in our group, we should consider multiple approaches. I can help adapt the content for different needs.`,
      facilitator: `Great suggestions! Let's create a balanced plan that incorporates everyone's strengths and preferences.`,
    };

    return responses[agent.role] || "I'm interested in contributing to this learning experience.";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Learning Agents Hub
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Learning Agents
                </h2>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Agent
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onEdit={handleEditAgent}
                />
              ))}
            </div>

            {agents.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Agents Yet
                </h3>
                <p className="text-gray-500">
                  Start by adding your first learning agent
                </p>
              </div>
            )}

            {currentJourney && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Generated Learning Journey
                </h2>
                <LearningJourneyComponent journey={currentJourney} />
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Learning Collaboration
              </h2>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-medium text-gray-800">
                  Create Learning Experience
                </h3>
              </div>
              <PromptForm
                onSubmit={handlePromptSubmit}
                disabled={isProcessing || agents.length < 2}
                isProcessing={isProcessing}
              />
            </div>

            <Conversation conversations={conversations} />

            {conversations.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Submit a prompt to start the collaboration
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {showForm && (
        <AgentForm
          onSubmit={editingAgent ? handleUpdateAgent : handleAddAgent}
          onClose={() => {
            setShowForm(false);
            setEditingAgent(undefined);
          }}
          initialData={editingAgent}
        />
      )}
    </div>
  );
}

export default App;