interface MetricsGridProps {
  recordingTime: number;
  totalWords: number;
  wpm: number;
  uniqueWords: number;
  repeatedWords: number;
  totalFillers: number;
  formatTime: (seconds: number) => string;
}

export default function MetricsGrid({
  recordingTime,
  totalWords,
  wpm,
  uniqueWords,
  repeatedWords,
  totalFillers,
  formatTime,
}: MetricsGridProps) {
  const metrics = [
    ["Speaking Time", formatTime(recordingTime)],
    ["Total Words", totalWords],
    ["WPM", wpm],
    ["Unique Words", uniqueWords],
    ["Repeated Words", repeatedWords],
    ["Filler Words", totalFillers],
  ];

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-gray-800 bg-gray-950 p-6"
        >
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}