"use client";

import {
  useSecurityStore
}
from "@/store/securityStore";

export default function RiskGauge() {

  const result =
    useSecurityStore(
      (s) => s.result
    );

  const risk =
    result?.risk_score ?? 0;

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
        Risk Meter
      </h2>

      <div className="w-full h-5 bg-slate-700 rounded-full">

        <div
          className="
          h-5
          bg-red-500
          rounded-full
          transition-all
          duration-500
          "
          style={{
            width: `${risk}%`
          }}
        />

      </div>

      <div className="mt-4 text-4xl font-bold">

        {risk}%

      </div>

    </div>
  );
}