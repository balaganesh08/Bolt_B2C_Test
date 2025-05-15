import React from "react";

interface MilestoneProgressBarProps {
  currentStage?: string;
  progress?: number;
  lost?: boolean;
}

const stages = [
  "New Lead",
  "Conversion",
  "Survey",
  "Production",
  "Delivery & Installation",
  "Closed",
];

function getStageImage(stage: string, idx: number, currentStage: string, progress: number, lost: boolean) {
  const currentIdx = stages.indexOf(currentStage);
  if (lost && stage === "Lost") {
    return "/milestone-lost.png";
  }
  if (stage === "Closed" && progress === 100) {
    return "/milestone-completed.png";
  }
  if (idx < currentIdx) {
    return "/milestone-completed-bg.png";
  }
  if (idx === currentIdx) {
    return "/milestone-ongoing.png";
  }
  return "/milestone-upcoming.png";
}

function getStageTextColor(idx: number, currentStage: string) {
  const currentIdx = stages.indexOf(currentStage);
  if (idx < currentIdx) return "#fff";
  if (idx === currentIdx) return "#22223B";
  return "#64748b";
}

function getStageFontWeight(idx: number, currentStage: string) {
  const currentIdx = stages.indexOf(currentStage);
  if (idx === currentIdx) return 600;
  return 400;
}

const MilestoneProgressBar: React.FC<MilestoneProgressBarProps> = ({
  currentStage = "Conversion",
  progress = 15,
  lost = false,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
    {stages.map((stage, idx) => (
      <div
        key={stage}
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src={getStageImage(stage, idx, currentStage, progress, lost)}
          alt={stage}
          style={{
            height: 24,
            width: 176,
            objectFit: "contain",
            display: "block",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 176,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: getStageFontWeight(idx, currentStage),
            fontSize: 16,
            color: getStageTextColor(idx, currentStage),
            letterSpacing: 0.2,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
          }}
        >
          {stage}
        </span>
        {idx < stages.length - 1 && <span style={{ width: 0 }} />}
      </div>
    ))}
  </div>
);

export default MilestoneProgressBar;
