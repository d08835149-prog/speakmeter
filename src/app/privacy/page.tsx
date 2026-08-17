import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm text-gray-400 transition hover:text-white"
        >
          ← Back to SpeakMeter
        </Link>

        <h1 className="mt-10 text-4xl font-bold">
          Privacy Policy
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Last updated: August 17, 2026
        </p>

        <div className="mt-10 space-y-8 leading-7 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white">
              Overview
            </h2>

            <p className="mt-3">
              SpeakMeter is a simple speaking analysis tool designed to help
              users measure their English speaking practice. SpeakMeter does
              not require an account and does not maintain a database of user
              recordings or speaking results.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Microphone Access
            </h2>

            <p className="mt-3">
              SpeakMeter requests access to your microphone only when you
              choose to start a speaking session. Microphone access is used
              to record your speech and provide speaking analysis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Speech Recognition
            </h2>

            <p className="mt-3">
              SpeakMeter uses your browser&apos;s Web Speech API to convert
              speech into text. Depending on your browser and device, speech
              recognition may be processed by a service provided by your
              browser or operating system provider. Audio may therefore be
              transmitted to that provider for speech recognition.
            </p>

            <p className="mt-3">
              Any processing performed by a third-party speech recognition
              provider is subject to that provider&apos;s own privacy
              practices and policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Data Storage
            </h2>

            <p className="mt-3">
              SpeakMeter does not have user accounts and does not store your
              recordings, transcripts, or speaking analysis results in a
              SpeakMeter database. Your current session is intended to be
              temporary and is cleared when you reset the session or leave
              the page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Speaking Analysis
            </h2>

            <p className="mt-3">
              SpeakMeter analyzes the transcript generated during your
              speaking session to calculate metrics such as speaking time,
              total words, words per minute, unique words, repeated words,
              and estimated filler words.
            </p>

            <p className="mt-3">
              These results are estimates. Speech recognition accuracy can
              vary depending on pronunciation, microphone quality,
              background noise, browser, and other factors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              Changes to This Policy
            </h2>

            <p className="mt-3">
              This Privacy Policy may be updated if SpeakMeter&apos;s
              features or data practices change.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}