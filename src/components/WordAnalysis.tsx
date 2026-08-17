interface WordAnalysisProps {
  repeatedWords: [string, number][];
  fillerCounts: {
    word: string;
    count: number;
  }[];
}

export default function WordAnalysis({
  repeatedWords,
  fillerCounts,
}: WordAnalysisProps) {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 text-left">
        <p className="mb-4 font-semibold">Repeated Words</p>

        {repeatedWords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {repeatedWords.map(([word, count]) => (
              <span
                key={word}
                className="rounded-full bg-gray-800 px-3 py-1 text-sm"
              >
                {word} × {count}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No repeated words found.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 text-left">
        <p className="mb-4 font-semibold">Filler Words</p>

        {fillerCounts.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {fillerCounts.map(({ word, count }) => (
              <span
                key={word}
                className="rounded-full bg-gray-800 px-3 py-1 text-sm"
              >
                {word} × {count}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No filler words found.
          </p>
        )}

        <p className="mt-4 text-xs text-gray-600">
          Filler word counts are estimates based on the transcript.
        </p>
      </div>
    </div>
  );
}