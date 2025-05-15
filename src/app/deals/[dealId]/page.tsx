"use client";

import { useParams } from "next/navigation";
import { Sidebar } from "../../../screens/NewLead/Sidebar";
import Header from "@/components/Header";
import styles from "../../../screens/NewLead/styles.module.css";
import MilestoneProgressBar from "@/components/MilestoneProgressBar";
import DealCustomerHeader from "@/components/DealCustomerHeader";
import MilestoneStepsList from "@/components/MilestoneStepsList";
import { stageConfigs } from "@/constants/milestoneSteps";

function DealHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        alignSelf: "stretch",
        borderBottom: "1px solid #e2e8f0",
        padding: "24px 32px 16px 32px",
        background: "#fff",
      }}
    >
      <DealCustomerHeader />
    </div>
  );
}

function DealMilestones() {
  return (
    <div style={{ background: "#fff", margin: "24px 32px 0 32px", borderRadius: 8, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>Milestones</div>
          <MilestoneProgressBar currentStage="Conversion" progress={15} />
        </div>
        <div style={{ color: "#64748b", fontSize: 14 }}>
          15% progressed ⓘ
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        {Object.entries(stageConfigs).map(([stage, config]) => (
          <MilestoneStepsList
            key={stage}
            title={config.title}
            steps={config.steps}
            totalSteps={config.totalSteps}
            completedSteps={stage === "New Lead" ? config.totalSteps : 0}
            isActive={stage === "Conversion"}
            variant={stage === "New Lead" ? "completed" : stage === "Conversion" ? "current" : "upcoming"}
          />
        ))}
      </div>
    </div>
  );
}

function DealSidebar() {
  return (
    <div
      style={{
        width: 360,
        background: "#fff",
        padding: "0 0 0 0",
        borderLeft: "1px solid #e2e8f0",
        height: "calc(100vh - 57px)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 57,
        right: 0,
      }}
    >
      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", padding: "0 24px", marginTop: 0 }}>
        <button
          style={{
            padding: "18px 0",
            marginRight: 32,
            background: "none",
            border: "none",
            borderBottom: "2px solid #22d3ee",
            color: "#0f172a",
            fontWeight: 500,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Details
        </button>
        <button
          style={{
            padding: "18px 0",
            marginRight: 32,
            background: "none",
            border: "none",
            borderBottom: "2px solid transparent",
            color: "#64748b",
            fontWeight: 500,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Quotations
        </button>
        <button
          style={{
            padding: "18px 0",
            background: "none",
            border: "none",
            borderBottom: "2px solid transparent",
            color: "#64748b",
            fontWeight: 500,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Notes
        </button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {/* Payment Section */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>
            <span style={{ marginRight: 8 }}>▼</span>Payment
          </div>
          <div style={{ color: "#64748b", fontSize: 14, marginBottom: 2 }}>Estimated order value</div>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>₹ 25,000.00</div>
          <div style={{ color: "#64748b", fontSize: 14, marginBottom: 2 }}>Order amount paid till date</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 18 }}>₹ 0</span>
            <span style={{
              background: "#f1f5f9",
              color: "#0f172a",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              padding: "2px 10px"
            }}>0%</span>
          </div>
          <button
            style={{
              width: "100%",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: "12px 0",
              background: "#f8fafc",
              color: "#94a3b8",
              fontWeight: 500,
              fontSize: 16,
              cursor: "not-allowed",
              marginTop: 4,
            }}
            disabled
          >
            ₹ Request Payment
          </button>
        </div>
        {/* Project Section */}
        <div>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>
            <span style={{ marginRight: 8 }}>▼</span>Project
          </div>
          <div style={{ color: "#64748b", fontSize: 14, marginBottom: 2 }}>Stage</div>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>Lead</div>
          <div style={{ color: "#64748b", fontSize: 14, marginBottom: 2 }}>Sub-stage</div>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>T&C pending</div>
          <div style={{ color: "#64748b", fontSize: 14, marginBottom: 2 }}>Area</div>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>1290 sft.</div>
          <div style={{ color: "#64748b", fontSize: 14, marginBottom: 2 }}>Order value</div>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>₹ 25,000.00</div>
          <div style={{ color: "#64748b", fontSize: 14, marginBottom: 2 }}>Project type</div>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>4BHK</div>
          <div style={{ color: "#64748b", fontSize: 14, marginBottom: 2 }}>Windows</div>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>8</div>
          <div style={{ color: "#64748b", fontSize: 14, marginBottom: 2 }}>Doors</div>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>3</div>
        </div>
      </div>
    </div>
  );
}

export default function DealOverviewPage() {
  const { dealId } = useParams();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Deals", href: "/deals" },
    { label: dealId as string },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wrapper} style={{ marginLeft: 56 }}>
        <Header breadcrumbs={breadcrumbs} />
        <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 57px)", background: "#f8fafc" }}>
          <DealHeader />
          <div style={{ display: "flex", flex: 1 }}>
            <div style={{ flex: 1 }}>
              <DealMilestones />
            </div>
            <DealSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}