export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          SpeakMeter
        </h1>

        <p className="mt-4 text-lg text-gray-400">
          Speak. Measure. Improve.
        </p>

        <button className="mt-10 rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-105">
          🎤 Start Speaking
        </button>
      </div>
    </main>
  );
}