"use client";

import { useRef, useState } from "react";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Remove previous recording
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType,
        });

        const newAudioUrl = URL.createObjectURL(audioBlob);

        setAudioUrl(newAudioUrl);
      };

      mediaRecorder.start();

      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Microphone error:", error);

      alert("Microphone access is required to use SpeakMeter.");
    }
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;

    if (!mediaRecorder) return;

    mediaRecorder.stop();

    mediaRecorder.stream.getTracks().forEach((track) => {
      track.stop();
    });

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRecording(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          SpeakMeter
        </h1>

        <p className="mt-4 text-lg text-gray-400">
          Speak. Measure. Improve.
        </p>

        {isRecording && (
          <div className="mt-10">
            <p className="text-sm uppercase tracking-widest text-red-400">
              ● Recording
            </p>

            <p className="mt-2 text-4xl font-semibold">
              {formatTime(recordingTime)}
            </p>
          </div>
        )}

        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`mt-10 rounded-full px-8 py-4 text-lg font-semibold transition hover:scale-105 ${
            isRecording
              ? "bg-red-500 text-white"
              : "bg-white text-black"
          }`}
        >
          {isRecording ? "⏹ Stop" : "🎤 Start Speaking"}
        </button>

        {audioUrl && !isRecording && (
          <div className="mt-10 rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">
              Your Recording
            </p>

            <audio
              src={audioUrl}
              controls
              className="w-full"
            />
          </div>
        )}
      </div>
    </main>
  );
}