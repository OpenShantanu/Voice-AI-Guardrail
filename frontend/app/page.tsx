"use client";

import VoiceRecorder from "@/components/VoiceRecorder";
import TranscriptPanel from "@/components/TranscriptPanel";
import DecisionPanel from "@/components/DecisionPanel";
import RiskGauge from "@/components/RiskGauge";
import EventTable from "@/components/EventTable";
import StatsCards from "@/components/StatsCards";
import PipelinePanel from "@/components/PipelinePanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Voice AI Security Operations Center
          </h1>

          <p className="text-slate-400 mt-2">
            Real-time Prompt Injection & Voice Agent Guardrail Dashboard
          </p>
        </div>

        <StatsCards />

        <div className="mt-6">
          <VoiceRecorder />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          <TranscriptPanel />

          <PipelinePanel />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          <RiskGauge />

          <DecisionPanel />

        </div>

        <div className="mt-6">
          <EventTable />
        </div>

      </div>

    </main>
  );
}