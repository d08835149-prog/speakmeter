interface RecorderControlsProps {
  isRecording: boolean;
  recordingTime: number;
  onStart: () => void;
  onStop: () => void;
  formatTime: (seconds: number) => string;
}

export default function RecorderControls({
  isRecording,
  recordingTime,
  onStart,
  onStop,
  formatTime,
}: RecorderControlsProps) {
  return (
    <>
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
        onClick={isRecording ? onStop : onStart}
        className={`mt-10 rounded-full px-8 py-4 text-lg font-semibold transition hover:scale-105 ${
          isRecording
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        }`}
      >
        {isRecording ? "⏹ Stop" : "🎤 Start Speaking"}
      </button>
    </>
  );
}