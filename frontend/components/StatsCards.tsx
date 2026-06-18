"use client";

import { useSecurityStore } from "@/store/securityStore";

export default function StatsCards() {

  const result = useSecurityStore(
    (s) => s.result
  );

  const events = useSecurityStore(
    (s) => s.events
  );

  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      <Card
        title="Risk Score"
        value={
          result?.risk_score ?? 0
        }
      />

      <Card
        title="Decision"
        value={
          result?.decision ??
          "WAITING"
        }
      />

      <Card
        title="Events"
        value={events.length}
      />

      <Card
        title="Status"
        value={
          result
            ? "ANALYZED"
            : "IDLE"
        }
      />

    </div>
  );
}

function Card({
  title,
  value
}: {
  title: string;
  value: any;
}) {

  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-xl
      p-5
    "
    >
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}