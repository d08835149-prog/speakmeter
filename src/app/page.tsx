"use client";

import Link from "next/link";
import RecorderControls from "@/components/RecorderControls";
import TranscriptBox from "@/components/TranscriptBox";
import MetricsGrid from "@/components/MetricsGrid";
import WordAnalysis from "@/components/WordAnalysis";
import AudioPlayer from "@/components/AudioPlayer";
import { useSpeakMeter } from "@/hooks/useSpeakMeter";

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
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            SpeakMeter
          </h1>

          <Link
            href="/privacy"
            className="text-sm text-gray-500 transition hover:text-white"
          >
            Privacy
          </Link>
        </header>

        <section className="mx-auto mt-24 max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            English Speaking Analyzer
          </p>

          <h2 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Speak.
            <br />
            Measure.
            <br />
            Improve.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            Practice speaking English and instantly see how long,
            how fast, and how diversely you spoke.
          </p>

          <RecorderControls
            isRecording={isRecording}
            recordingTime={recordingTime}
            onStart={startRecording}
            onStop={stopRecording}
            formatTime={formatTime}
          />
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <TranscriptBox
            transcript={transcript}
            interimTranscript={interimTranscript}
          />

          {!isRecording && transcript && (
            <>
              <div className="mt-10">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                  Your Results
                </p>

                <MetricsGrid
                  recordingTime={recordingTime}
                  totalWords={analysis.totalWords}
                  wpm={analysis.wpm}
                  uniqueWords={analysis.uniqueWords}
                  repeatedWords={analysis.repeatedWords.length}
                  totalFillers={analysis.totalFillers}
                  formatTime={formatTime}
                />
              </div>

              <WordAnalysis
                repeatedWords={analysis.repeatedWords}
                fillerCounts={analysis.fillerCounts}
              />

              <div className="text-center">
                <button
                  onClick={resetSession}
                  className="mt-8 rounded-full border border-gray-700 px-7 py-3 font-medium text-gray-300 transition hover:border-gray-500 hover:bg-gray-900 hover:text-white"
                >
                  Try Again
                </button>
              </div>
            </>
          )}

          <AudioPlayer
            audioUrl={audioUrl}
            isRecording={isRecording}
          />
        </section>

        <footer className="mx-auto mt-24 max-w-4xl border-t border-gray-900 py-8 text-center">
          <p className="text-sm text-gray-600">
            No account. No saved speaking history.
          </p>

          <p className="mt-2 text-xs text-gray-700">
            Speech recognition accuracy may vary by browser,
            pronunciation, microphone, and background noise.
          </p>

          <Link
            href="/privacy"
            className="mt-4 inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-300"
          >
            Privacy Policy
          </Link>
        </footer>
      </div>
    </main>
  );
}