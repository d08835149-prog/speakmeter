interface AudioPlayerProps {
  audioUrl: string | null;
  isRecording: boolean;
}

export default function AudioPlayer({
  audioUrl,
  isRecording,
}: AudioPlayerProps) {
  if (!audioUrl || isRecording) {
    return null;
  }

  return (
    <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-950 p-6">
      <p className="mb-4 text-sm uppercase tracking-widest text-gray-400">
        Your Recording
      </p>

      <audio src={audioUrl} controls className="w-full" />
    </div>
  );
}