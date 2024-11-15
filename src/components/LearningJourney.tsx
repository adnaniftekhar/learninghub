import React from 'react';
import { LearningJourney as LearningJourneyType } from '../types';
import { BookOpen, Calendar, Target, Map, Activity, Globe } from 'lucide-react';

interface LearningJourneyProps {
  journey: LearningJourneyType | null;
}

export function LearningJourney({ journey }: LearningJourneyProps) {
  if (!journey) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-xl font-bold text-gray-900">{journey.title}</h3>
        <p className="text-gray-600 mt-2">{journey.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <span className="text-gray-700">{journey.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" />
          <span className="text-gray-700">
            {Array.isArray(journey.targetAudience) ? journey.targetAudience.join(', ') : 'All participants'}
          </span>
        </div>
      </div>

      {Array.isArray(journey.objectives) && journey.objectives.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Learning Objectives
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {journey.objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      )}

      {Array.isArray(journey.resources) && journey.resources.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Map className="w-5 h-5 text-indigo-600" />
            Resources
          </h4>
          <div className="grid gap-4">
            {journey.resources.map((resource, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-900">{resource.title}</h5>
                    <p className="text-gray-600 text-sm mt-1">
                      {resource.description}
                    </p>
                  </div>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Access
                    </a>
                  )}
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {resource.duration && (
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {resource.duration}
                    </span>
                  )}
                  {resource.difficulty && (
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {resource.difficulty}
                    </span>
                  )}
                  {resource.offlineAccess && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                      Offline Access
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {Array.isArray(journey.activities) && journey.activities.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            Activities
          </h4>
          <div className="space-y-4">
            {journey.activities.map((activity, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h5 className="font-medium text-gray-900">{activity.title}</h5>
                <p className="text-gray-600 mt-1">{activity.description}</p>
                {Array.isArray(activity.steps) && activity.steps.length > 0 && (
                  <div className="mt-3">
                    <h6 className="font-medium text-gray-800">Steps:</h6>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {activity.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-gray-700">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {Array.isArray(journey.culturalConnections) && journey.culturalConnections.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600" />
            Cultural Connections
          </h4>
          <div className="space-y-4">
            {journey.culturalConnections.map((connection, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h5 className="font-medium text-gray-900">{connection.topic}</h5>
                <p className="text-gray-600 mt-1">{connection.description}</p>
                {Array.isArray(connection.activities) && connection.activities.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {connection.activities.map((activity, activityIndex) => (
                      <li key={activityIndex} className="text-gray-700">
                        {activity}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}