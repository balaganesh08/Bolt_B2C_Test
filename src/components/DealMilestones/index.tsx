import React, { useState } from "react";
import MilestoneProgressBar from "../MilestoneProgressBar";
import MilestoneStepsList from "../MilestoneStepsList";
import ConversionSteps, { ConversionStep } from "../LeadConversionSteps";
import { stageConfigs } from "@/constants/milestoneSteps";

import styles from "./styles.module.css";

interface StageStep {
  title: string;
  description: string;
  completed: boolean;
}

interface StageConfig {
  title: string;
  totalSteps: number;
  steps: StageStep[];
}

interface Stages {
  [key: string]: StageConfig;
}

interface DealMilestonesProps {
  currentStage?: string;
  progress?: number;
  useDetailedConversionSteps?: boolean;
  onMarkStepAsDone?: (stepId: string) => void;
  onContinueStep?: (stepId: string) => void;
  onAddStepNote?: (stepId: string) => void;
  onStageChange?: (newStage: string) => void;
}

// Define the order of stages
const STAGE_ORDER = [
  "New Lead",
  "Conversion",
  "Survey",
  "Production",
  "Delivery & Installation",
  "Closed"
];

export default function DealMilestones({
  currentStage: initialStage = "Conversion",
  progress = 15,
  useDetailedConversionSteps = false,
  onMarkStepAsDone = (stepId: string) => console.log(`Mark step ${stepId} as done`),
  onContinueStep = (stepId: string) => console.log(`Continue step ${stepId}`),
  onAddStepNote = (stepId: string) => console.log(`Add note to step ${stepId}`),
  onStageChange = (newStage: string) => console.log(`Stage changed to ${newStage}`)
}: DealMilestonesProps) {
  // 1. State for all stages
  const [stages, setStages] = useState<Stages>(() => JSON.parse(JSON.stringify(stageConfigs)));
  const [currentStage, setCurrentStage] = useState<string>(initialStage);

  // 2. Handler to mark a step as done
  const handleMarkStepAsDone = (stepId: string) => {
    setStages((prev: Stages) => {
      const newStages = { ...prev };
      const steps = newStages[currentStage].steps;
      const stepIdx = steps.findIndex((_: StageStep, idx: number) => `${currentStage.toLowerCase()}-step-${idx}` === stepId);
      if (stepIdx !== -1) steps[stepIdx].completed = true;
      return newStages;
    });
  };

  // 3. Check if all steps in current stage are completed
  const isStageComplete = () =>
    stages[currentStage].steps.every((step: StageStep) => step.completed);

  // 4. Handle stage transition
  const handleStageComplete = () => {
    const idx = STAGE_ORDER.indexOf(currentStage);
    if (idx < STAGE_ORDER.length - 1) {
      setCurrentStage(STAGE_ORDER[idx + 1]);
    }
  };

  // 5. When a step is marked as done, check for stage completion
  const onMarkStepAsDoneInternal = (stepId: string) => {
    handleMarkStepAsDone(stepId);
    setTimeout(() => {
      if (isStageComplete()) handleStageComplete();
    }, 0);
    onMarkStepAsDone(stepId);
  };

  // 6. Continue handler
  const onContinueStepInternal = (stepId: string) => {
    onContinueStep(stepId);
    handleMarkStepAsDone(stepId);
    setTimeout(() => {
      if (isStageComplete()) handleStageComplete();
    }, 0);
  };

  // 7. Get current steps and active step
  const steps: ConversionStep[] = stages[currentStage].steps.map((step: StageStep, idx: number) => ({
    ...step,
    id: `${currentStage.toLowerCase()}-step-${idx}`,
    isActive: !step.completed && stages[currentStage].steps.findIndex((s: StageStep) => !s.completed) === idx,
  }));
  const activeStepId = steps.find((s: ConversionStep) => s.isActive)?.id || steps[0]?.id || '';

  // 8. Progress calculation
  const calculateTotalProgress = () => {
    const totalSteps = Object.values(stages).reduce((acc: number, config: StageConfig) => acc + config.totalSteps, 0);
    const completedSteps = Object.values(stages).reduce((acc: number, config: StageConfig) => 
      acc + config.steps.filter((step: StageStep) => step.completed).length, 0
    );
    return Math.round((completedSteps / totalSteps) * 100);
  };
  const currentProgress = calculateTotalProgress();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>Milestones</div>
          <MilestoneProgressBar currentStage={currentStage} progress={currentProgress} />
        </div>
        <span className={styles.progressText}>
          <span>{currentProgress}% progressed</span>
          <span> ⓘ</span>
        </span>
      </div>
      <div className={styles.stepsContainer}>
        {Object.entries(stages).map(([stage, config]: [string, StageConfig]) => {
          if (stage === currentStage) {
            return (
              <ConversionSteps
                key={stage}
                steps={steps}
                activeStep={activeStepId}
                onMarkAsDone={onMarkStepAsDoneInternal}
                onContinue={onContinueStepInternal}
                onAddNote={onAddStepNote}
                isOngoing={true}
                title={stage}
                stage={stage}
              />
            );
          }
          return (
            <MilestoneStepsList
              key={stage}
              title={config.title}
              steps={config.steps}
              totalSteps={config.totalSteps}
              completedSteps={config.steps.filter((step: StageStep) => step.completed).length}
              isActive={stage === currentStage}
              variant={
                stage === currentStage
                  ? "current"
                  : STAGE_ORDER.indexOf(stage) < STAGE_ORDER.indexOf(currentStage) || 
                    (stage === "Closed" && config.steps.every(step => step.completed))
                    ? "completed"
                    : "upcoming"
              }
            />
          );
        })}
      </div>
    </div>
  );
} 