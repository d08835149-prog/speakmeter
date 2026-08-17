interface TranscriptBoxProps {
  transcript: string;
  interimTranscript: string;
}

export default function TranscriptBox({
  transcript,
  interimTranscript,
}: TranscriptBoxProps) {
  if (!transcript && !interimTranscript) {
    return null;
  }

  return (
    <div className="mt-10 rounded-2xl border border-gray-800 bg-gray-950 p-6 text-left">
      <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">
        Transcript
      </p>

      <p className="leading-7 text-gray-200">
        {transcript}

        {interimTranscript && (
          <span className="text-gray-500">
            {interimTranscript}
          </span>
        )}
      </p>
    </div>
  );
}