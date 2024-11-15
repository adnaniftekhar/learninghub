import { Agent, LearningJourney } from '../types';

const BASE_URL = "https://integrate.api.nvidia.com/v1";
const API_KEY = "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";

export async function parsePrompt(
  promptText: string,
  agents: Agent[]
): Promise<LearningJourney> {
  try {
    const systemPrompt = `You are an expert educational content curator and learning experience designer. Generate a learning journey in JSON format that matches this TypeScript type:

type LearningJourney = {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  duration: string;
  targetAudience: string[];
  resources: Array<{
    type: 'video' | 'website' | 'printable' | 'activity' | 'experience';
    title: string;
    description: string;
    url?: string;
    duration?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    requiredMaterials?: string[];
    offlineAccess?: boolean;
  }>;
  activities: Array<{
    title: string;
    description: string;
    duration: string;
    steps: string[];
    adaptations: string[];
  }>;
  culturalConnections: Array<{
    topic: string;
    description: string;
    activities: string[];
  }>;
  progressTracking: {
    milestones: string[];
    assessmentMethods: string[];
  };
}

Create a learning journey for these participants:
${agents.map(agent => `
Role: ${agent.role}
Name: ${agent.name}
Learning Style: ${agent.preferences.learningStyle}
Interests: ${agent.interests.join(', ')}
Strengths: ${agent.strengths.join(', ')}
Expertise: ${agent.preferences.expertise.join(', ')}
`).join('\n')}

Based on this prompt: ${promptText}

Include:
1. Clear learning objectives aligned with participant interests
2. Mix of online and offline activities
3. Curated educational resources (videos, articles, interactive content)
4. Cultural connections and real-world applications
5. Progress tracking milestones
6. Adaptations for different learning styles

Respond ONLY with the JSON object, no additional text.`;

    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "nvidia/llama-3.1-nemotron-70b-instruct",
        messages: [
          { role: "system", content: "You are a JSON-only response AI. Always respond with valid JSON." },
          { role: "user", content: systemPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2048,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from AI service');
    }

    let journey: LearningJourney;
    try {
      const content = data.choices[0].message.content.trim();
      const jsonStart = content.indexOf('{');
      const jsonEnd = content.lastIndexOf('}') + 1;
      const jsonContent = content.slice(jsonStart, jsonEnd);
      journey = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error('Failed to parse AI response');
    }

    // Validate and sanitize the journey object
    if (!isValidLearningJourney(journey)) {
      throw new Error('Invalid learning journey structure');
    }

    // Sanitize URLs in resources
    journey.resources = journey.resources.map(resource => ({
      ...resource,
      url: resource.url ? validateResourceUrl(resource.url) : undefined
    }));

    return journey;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate learning journey');
  }
}

function isValidLearningJourney(journey: any): journey is LearningJourney {
  return (
    journey &&
    typeof journey.title === 'string' &&
    typeof journey.description === 'string' &&
    Array.isArray(journey.objectives) &&
    Array.isArray(journey.resources) &&
    Array.isArray(journey.activities) &&
    Array.isArray(journey.culturalConnections) &&
    journey.progressTracking &&
    Array.isArray(journey.progressTracking.milestones) &&
    Array.isArray(journey.progressTracking.assessmentMethods)
  );
}

function validateResourceUrl(url: string): string {
  const trustedDomains = [
    'youtube.com',
    'youtu.be',
    'coursera.org',
    'edx.org',
    'khanacademy.org',
    'ted.com',
    'nationalgeographic.com',
    'britannica.com',
    'nasa.gov',
    'pbs.org',
    'smithsonianmag.com'
  ];

  try {
    const urlObj = new URL(url);
    if (trustedDomains.some(domain => urlObj.hostname.includes(domain))) {
      return url;
    }
    return 'https://www.khanacademy.org';
  } catch {
    return 'https://www.khanacademy.org';
  }
}