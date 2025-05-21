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

  // Check if all steps are completed
  const allStepsCompleted = steps.every(step => step.completed);
  const effectiveVariant = allStepsCompleted ? 'completed' : variant;

  const getContainerStyles = () => {
    if (effectiveVariant === 'completed') return { background: '#f9fafb', border: '1px solid #e5e7eb' };
    return { background: '#fff', border: '1px solid #e5e7eb' };
  };

  const getTitleColor = () => {
    if (effectiveVariant === 'completed') return '#4b5563';
    return '#111827';
  };

  // Create step indicator circle
  const createStepCircle = (completed: boolean, isCurrent: boolean) => {
    const size = 24;
    const radius = 8;
    const center = size / 2;
    
    if (completed) {
      // Completed step (green checkmark in circle)
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={center} cy={center} r={radius} fill="#10b981" />
          <path 
            d="M7 12l3 3 7-7" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    } else if (isCurrent) {
      // Current step (blue circle with white dot)
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={center} cy={center} r={radius} fill="#3b82f6" />
          <circle cx={center} cy={center} r="3" fill="white" />
        </svg>
      );
    } else {
      // Upcoming step (gray circle with dash border)
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle 
            cx={center} 
            cy={center} 
            r={radius - 1} 
            fill="white" 
            stroke="#9ca3af" 
            strokeWidth="1.5"
            strokeDasharray="3,3"
          />
        </svg>
      );
    }
  };

  return (
    <div 
      style={{ 
        ...getContainerStyles(),
        borderRadius: 8, 
        padding: '16px 20px', 
        marginBottom: 8,
        cursor: 'pointer',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        padding: '4px 0',
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flex: 1 }}>
          {(effectiveVariant === 'completed' || allStepsCompleted) && (
            <div style={{ width: 24, height: 24, flexShrink: 0, marginTop: 2 }}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" fill="#10b981" />
                <path 
                  d="M7 12l3 3 7-7" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none"
                />
              </svg>
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              marginBottom: 2
            }}>
              <span style={{
                color: getTitleColor(),
                fontWeight: 600,
                fontSize: '15px',
                lineHeight: '20px'
              }}>
                {title}
              </span>
              {effectiveVariant === 'current' && (
                <span style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontWeight: 500
                }}>
                  Deal is ongoing
                </span>
              )}
            </div>
            <div style={{ 
              color: '#6b7280', 
              fontSize: '13px',
              lineHeight: '16px',
              marginTop: 2
            }}>
              {completedSteps} of {totalSteps} steps completed
            </div>
          </div>
        </div>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 4
        }}>
          {isExpanded ? (
            <ChevronUp size={16} color="#6b7280" />
          ) : (
            <ChevronDown size={16} color="#6b7280" />
          )}
          <span style={{
            fontSize: '12px',
            color: '#9ca3af',
            fontStyle: 'italic',
            whiteSpace: 'nowrap',
            lineHeight: '16px'
          }}>
            {completedSteps === totalSteps ? 'Completed in 2 days' : 'Started 1 day ago'}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div style={{ marginTop: 12 }}>
          {steps.map((step, index) => {
            const isCurrent = variant === 'current' && index === 0;
            const isLast = index === steps.length - 1;
            
            return (
              <div
                key={index}
                style={{
                  position: 'relative',
                  paddingLeft: 12,
                  marginLeft: 4
                }}
              >
                {/* Vertical connecting line between steps */}
                {!isLast && (
                  <div style={{
                    position: 'absolute',
                    top: 28,
                    left: 20,
                    width: 1,
                    height: 'calc(100% - 12px)',
                    backgroundColor: step.completed ? '#10b981' : '#e5e7eb',
                    zIndex: 1
                  }} />
                )}
                
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '8px 0',
                    gap: 12,
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <div style={{ marginTop: 2, flexShrink: 0 }}>
                    {createStepCircle(step.completed, isCurrent)}
                  </div>
                  <div style={{ flex: 1, paddingBottom: isLast ? 0 : 16 }}>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 4
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ 
                          fontSize: '14px',
                          lineHeight: '20px',
                          fontWeight: 500,
                          color: step.completed ? '#10b981' : 
                                isCurrent ? '#111827' : '#4b5563'
                        }}>
                          {step.title}
                        </span>
                        {isCurrent && (
                          <span style={{
                            marginLeft: 8,
                            fontSize: '12px',
                            lineHeight: '16px',
                            color: '#2563eb',
                            background: '#eff6ff',
                            padding: '2px 8px',
                            borderRadius: 4,
                            fontWeight: 500
                          }}>
                            Current
                          </span>
                        )}
                      </div>
                      {!step.completed && (
                        <button
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            background: 'transparent',
                            border: '1px solid #e5e7eb',
                            borderRadius: 4,
                            padding: '4px 8px',
                            fontSize: '12px',
                            color: '#4b5563',
                            cursor: 'pointer'
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Mark as done
                        </button>
                      )}
                    </div>
                    <div style={{ 
                      color: '#6b7280', 
                      fontSize: '13px',
                      lineHeight: '18px',
                      marginBottom: 8
                    }}>
                      {step.description}
                    </div>
                    {step.completed && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: '12px',
                        color: '#4b5563'
                      }}>
                        <span>Completed on May 20, 2025</span>
                        <span>•</span>
                        <a href="#" style={{ 
                          color: '#2563eb',
                          textDecoration: 'none'
                        }}>
                          View details
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
