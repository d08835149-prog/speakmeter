"use client";

import RecorderControls from "@/components/RecorderControls";
import TranscriptBox from "@/components/TranscriptBox";
import MetricsGrid from "@/components/MetricsGrid";
import WordAnalysis from "@/components/WordAnalysis";
import AudioPlayer from "@/components/AudioPlayer";
import { useSpeakMeter } from "@/hooks/useSpeakMeter";
import Link from "next/link";

export default function Home() {
  const {
    isRecording,
    recordingTime,
    audioUrl,
    transcript,
    interimTranscript,
    analysis,
    startRecording,
    stopRecording,
    resetSession,
    formatTime,
  } = useSpeakMeter();

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-4xl text-center">
        {/* Header */}
        <h1 className="text-6xl font-bold tracking-tight">
          SpeakMeter
        </h1>

        <p className="mt-4 text-lg text-gray-400">
          Speak. Measure. Improve.
        </p>

        {/* Recording controls */}
        <RecorderControls
          isRecording={isRecording}
          recordingTime={recordingTime}
          onStart={startRecording}
          onStop={stopRecording}
          formatTime={formatTime}
        />

        {/* Live transcript */}
        <TranscriptBox
          transcript={transcript}
          interimTranscript={interimTranscript}
        />

        {/* Results */}
        {!isRecording && transcript && (
          <>
            <MetricsGrid
              recordingTime={recordingTime}
              totalWords={analysis.totalWords}
              wpm={analysis.wpm}
              uniqueWords={analysis.uniqueWords}
              repeatedWords={analysis.repeatedWords.length}
              totalFillers={analysis.totalFillers}
              formatTime={formatTime}
            />

            <WordAnalysis
              repeatedWords={analysis.repeatedWords}
              fillerCounts={analysis.fillerCounts}
            />

            <button
              onClick={resetSession}
              className="mt-8 rounded-full border border-gray-700 px-7 py-3 font-medium text-gray-300 transition hover:bg-gray-900"
            >
              Try Again
            </button>
          </>
        )}

        {/* Recorded audio */}
        <AudioPlayer
          audioUrl={audioUrl}
          isRecording={isRecording}
        />

        <footer className="mt-16 border-t border-gray-900 pt-8">
          <p className="text-sm text-gray-600">
            SpeakMeter does not store your recordings or speaking results.
          </p>

          <Link
            href="/privacy"
            className="mt-2 inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-300"
          >
            Privacy Policy
  </Link>
</footer>




      </div>
    </main>
  );
}