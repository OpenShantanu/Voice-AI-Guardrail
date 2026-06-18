"use client";

export default function PipelinePanel() {

  const stages = [
    "Whisper",
    "Rule Engine",
    "Embedding Engine",
    "Groq Classifier",
    "Policy Engine"
  ];

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
        Detection Pipeline
      </h2>

      <div className="space-y-3">

        {
          stages.map(
            (stage) => (

              <div
                key={stage}
                className="
                flex
                justify-between
                bg-slate-800
                rounded-lg
                p-3
              "
              >

                <span>
                  {stage}
                </span>

                <span className="text-green-400">
                  ✓
                </span>

              </div>

            )
          )
        }

      </div>

    </div>
  );
}