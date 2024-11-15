export type AgentRole = 'teacher' | 'student' | 'facilitator' | 'learning_specialist';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  interests: string[];
  strengths: string[];
  preferences: {
    learningStyle: string;
    communicationStyle: string;
    expertise: string[];
  };
  avatar: string;
}

export interface Conversation {
  id: string;
  timestamp: number;
  agentId: string;
  message: string;
  type: 'suggestion' | 'question' | 'plan' | 'feedback';
}

export interface Prompt {
  id: string;
  text: string;
  timestamp: number;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface LearningResource {
  type: 'video' | 'website' | 'printable' | 'activity' | 'experience';
  title: string;
  description: string;
  url?: string;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  requiredMaterials?: string[];
  offlineAccess?: boolean;
}

export interface LearningJourney {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  duration: string;
  targetAudience: string[];
  resources: LearningResource[];
  activities: {
    title: string;
    description: string;
    duration: string;
    steps: string[];
    adaptations: string[];
  }[];
  culturalConnections: {
    topic: string;
    description: string;
    activities: string[];
  }[];
  progressTracking: {
    milestones: string[];
    assessmentMethods: string[];
  };
}