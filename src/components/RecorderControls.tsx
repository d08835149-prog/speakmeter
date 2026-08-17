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
    <div className="mt-12 flex flex-col items-center">
      {isRecording && (
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-red-400">
              Recording
            </p>
          </div>

          <p className="mt-3 font-mono text-5xl font-semibold tracking-tight text-white">
            {formatTime(recordingTime)}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Speak naturally in English
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={isRecording ? onStop : onStart}
        className={`group flex min-w-52 items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] ${
          isRecording
            ? "bg-red-500 text-white hover:bg-red-400"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        <span className="text-lg">
          {isRecording ? "■" : "🎤"}
        </span>

        <span>
          {isRecording ? "Stop Recording" : "Start Speaking"}
        </span>
      </button>

      {!isRecording && (
        <p className="mt-4 text-xs text-gray-600">
          Your browser will ask for microphone permission.
        </p>
      )}
    </div>
  );
}