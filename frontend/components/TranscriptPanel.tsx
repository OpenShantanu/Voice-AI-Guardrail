"use client";

import {
  useSecurityStore
}
from "@/store/securityStore";

export default function TranscriptPanel() {

  const result =
    useSecurityStore(
      (s) => s.result
    );

  return (

    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-xl
      p-6
      min-h-[300px]
    "
    >

      <h2 className="text-xl font-bold mb-4">
        Live Transcript
      </h2>

      <div
        className="
        bg-slate-950
        p-4
        rounded-lg
        border
        border-slate-800
      "
      >

        {
          result?.transcript ||
          "Waiting for transcription..."
        }

      </div>

    </div>
  );
}