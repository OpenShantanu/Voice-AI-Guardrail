"use client";

import { useRef, useState } from "react";

import { uploadAudio }
from "@/lib/api";

import { useSecurityStore }
from "@/store/securityStore";

export default function VoiceRecorder() {

  const [recording,
    setRecording] =
    useState(false);

  const mediaRecorderRef =
    useRef<MediaRecorder | null>(null);

  const chunksRef =
    useRef<Blob[]>([]);

  const setResult =
    useSecurityStore(
      (s) => s.setResult
    );

  const clearEvents =
    useSecurityStore(
      (s) => s.clearEvents
    );

  const startRecording =
    async () => {

      clearEvents();

      const stream =
        await navigator
          .mediaDevices
          .getUserMedia({
            audio: true
          });

      const recorder =
        new MediaRecorder(
          stream
        );

      mediaRecorderRef.current =
        recorder;

      chunksRef.current = [];

      recorder.ondataavailable =
        (event) => {

          chunksRef.current.push(
            event.data
          );
        };

      recorder.onstop =
        async () => {

          const audioBlob =
            new Blob(
              chunksRef.current,
              {
                type:
                  "audio/webm"
              }
            );

          const result =
            await uploadAudio(
              audioBlob
            );

          setResult(result);
        };

      recorder.start();

      setRecording(true);
    };

  const stopRecording =
    () => {

      mediaRecorderRef
        .current
        ?.stop();

      setRecording(false);
    };

  return (

    <div className="flex gap-4">

      <button
        onClick={
          startRecording
        }
        disabled={
          recording
        }
      >
        Start Recording
      </button>

      <button
        onClick={
          stopRecording
        }
        disabled={
          !recording
        }
      >
        Stop Recording
      </button>

    </div>
  );
}