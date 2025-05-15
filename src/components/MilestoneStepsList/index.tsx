import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  completed: boolean;
}

interface MilestoneStepsListProps {
  title: string;
  steps: Step[];
  totalSteps: number;
  completedSteps: number;
  isActive?: boolean;
  variant?: 'completed' | 'current' | 'upcoming';
}

export default function MilestoneStepsList({ 
  title, 
  steps, 
  totalSteps,
  completedSteps,
  isActive = false,
  variant = 'upcoming'
}: MilestoneStepsListProps) {
  const [isExpanded, setIsExpanded] = useState(isActive);

  const getContainerStyles = () => {
    if (variant === 'completed') return { background: '#f0fdf4' };
    return { background: '#fff', border: '1px solid #e2e8f0' };
  };

  const getTitleColor = () => {
    if (variant === 'completed') return '#22c55e';
    return '#0f172a';
  };

  return (
    <div 
      style={{ 
        ...getContainerStyles(),
        borderRadius: 8, 
        padding: 16, 
        marginBottom: 8,
        cursor: 'pointer' 
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: getTitleColor(), fontWeight: 600 }}>{title}</div>
          <div style={{ color: "#64748b", fontSize: 14 }}>{completedSteps}/{totalSteps} steps completed</div>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isExpanded && (
        <div style={{ marginTop: 12 }}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '8px 0',
                gap: 8
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '1px solid #e2e8f0',
                  marginTop: 2
                }}
              />
              <div>
                <div style={{ fontWeight: 500 }}>{step.title}</div>
                <div style={{ color: "#64748b", fontSize: 14 }}>{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
