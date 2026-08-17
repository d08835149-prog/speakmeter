import { fillerWords, stopWords } from "@/constants/words";

export function analyzeTranscript(
  transcript: string,
  recordingTime: number
) {
  const words = transcript
    .toLowerCase()
    .replace(/[^\w\s']/g, "")
    .split(/\s+/)
    .filter(Boolean);

  const totalWords = words.length;
  const uniqueWords = new Set(words);

  const wordCounts: Record<string, number> = {};

  words.forEach((word) => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  const repeatedWords = Object.entries(wordCounts)
    .filter(
      ([word, count]) =>
        count > 1 && !stopWords.has(word)
    )
    .sort((a, b) => b[1] - a[1]);

  const fillerCounts = fillerWords
    .map((word) => ({
      word,
      count: wordCounts[word] || 0,
    }))
    .filter((item) => item.count > 0);

  const totalFillers = fillerCounts.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const wpm =
    recordingTime > 0
      ? Math.round(totalWords / (recordingTime / 60))
      : 0;

  return {
    totalWords,
    uniqueWords: uniqueWords.size,
    repeatedWords,
    fillerCounts,
    totalFillers,
    wpm,
  };
}