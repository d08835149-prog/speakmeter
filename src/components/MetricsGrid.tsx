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
    {
      label: "Speaking Time",
      value: formatTime(recordingTime),
      description: "Total session time",
    },
    {
      label: "Total Words",
      value: totalWords,
      description: "Words recognized",
    },
    {
      label: "WPM",
      value: wpm,
      description: "Words per minute",
    },
    {
      label: "Unique Words",
      value: uniqueWords,
      description: "Different words used",
    },
    {
      label: "Repeated Words",
      value: repeatedWords,
      description: "Repeated key words",
    },
    {
      label: "Filler Words",
      value: totalFillers,
      description: "Estimated filler use",
    },
  ];

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-gray-700 hover:bg-gray-900"
        >
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
            {metric.label}
          </p>

          <p className="mt-4 text-4xl font-bold tracking-tight text-white">
            {metric.value}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            {metric.description}
          </p>
        </div>
      ))}
    </div>
  );
}