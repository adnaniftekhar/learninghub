import React from 'react';
import { AgentRole } from '../types';
import { GraduationCap, Users, School, Brain } from 'lucide-react';

interface RoleIconProps {
  role: AgentRole;
  className?: string;
}

export function RoleIcon({ role, className = "w-5 h-5" }: RoleIconProps) {
  switch (role) {
    case 'teacher':
      return <School className={className} />;
    case 'student':
      return <GraduationCap className={className} />;
    case 'facilitator':
      return <Users className={className} />;
    case 'learning_specialist':
      return <Brain className={className} />;
    default:
      return null;
  }
}