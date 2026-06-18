"use client";

import {
  useSecurityStore
}
from "@/store/securityStore";

export default function DecisionPanel() {

  const result =
    useSecurityStore(
      (s) => s.result
    );

  const decision =
    result?.decision ??
    "WAITING";

  const color =
    decision === "BLOCK"
      ? "text-red-500"
      : "text-green-500";

  return (

    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-xl
      p-6
    "
    >

      <h2 className="text-xl font-bold mb-4">
        Security Decision
      </h2>

      <h1
        className={`
          text-5xl
          font-bold
          ${color}
        `}
      >

        {decision}

      </h1>

    </div>
  );
}