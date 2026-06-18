"use client";

import {
  useSecurityStore
}
from "@/store/securityStore";

export default function EventTable() {

  const events =
    useSecurityStore(
      (s) => s.events
    );

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
        Security Event Timeline
      </h2>

      <div className="space-y-3">

        {
          events.length === 0 && (
            <p className="text-slate-400">
              No events yet
            </p>
          )
        }

        {
          events.map(
            (
              event,
              index
            ) => (

              <div
                key={index}
                className="
                bg-slate-800
                rounded-lg
                p-3
              "
              >

                <div className="font-semibold">
                  {event.stage}
                </div>

                <div className="text-slate-300 text-sm">
                  {event.message}
                </div>

              </div>

            )
          )
        }

      </div>

    </div>
  );
}