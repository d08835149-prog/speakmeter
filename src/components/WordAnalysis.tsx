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
      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 text-left transition duration-200 hover:border-gray-700">
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
            Word Pattern
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white">
            Repeated Words
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Key words you used more than once.
          </p>
        </div>

        {repeatedWords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {repeatedWords.map(([word, count]) => (
              <span
                key={word}
                className="rounded-full border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-gray-300"
              >
                {word}
                <span className="ml-2 text-gray-500">
                  × {count}
                </span>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No repeated words found.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 text-left transition duration-200 hover:border-gray-700">
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
            Speaking Habit
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white">
            Filler Words
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Estimated fillers detected in your transcript.
          </p>
        </div>

        {fillerCounts.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {fillerCounts.map(({ word, count }) => (
              <span
                key={word}
                className="rounded-full border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-gray-300"
              >
                {word}
                <span className="ml-2 text-gray-500">
                  × {count}
                </span>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No filler words found.
          </p>
        )}

        <p className="mt-5 border-t border-gray-900 pt-4 text-xs leading-5 text-gray-600">
          Filler word counts are estimates based on the transcript and may
          vary depending on speech recognition accuracy.
        </p>
      </div>
    </div>
  );
}