# 🎤 SpeakMeter

**Speak. Measure. Improve.**

**Live Demo:** https://speakmeter.vercel.app/

SpeakMeter is a small speaking tool I made for practicing English.

![SpeakMeter Home](./public/screenshots/home.png)

## Why I Made This

When I practice speaking English, I sometimes wonder how much I actually spoke.

I also wanted to know things like:

- How long did I speak?
- How many words did I use?
- Was I speaking too fast or too slowly?
- Which words did I keep repeating?
- Did I use too many filler words?

I wanted something simple that I could open, practice with, check the result, and close.

So I made SpeakMeter.

## How to Use

Using SpeakMeter is pretty simple.

1. Click **Start Speaking**.
2. Start speaking in English.
3. Click **Stop Recording** when you're finished.
4. SpeakMeter will show your transcript and speaking results.
5. Click **Try Again** if you want to practice again.

Your results are not saved, so they will disappear if you refresh or leave the page. I decided to keep it this way because I wanted SpeakMeter to be a simple practice tool without accounts or saved history.

## What It Shows

![SpeakMeter Results](./public/screenshots/results.png)

After you finish speaking, SpeakMeter shows:

- **Speaking Time** — how long you spoke
- **Total Words** — how many words were recognized
- **WPM** — your estimated words per minute
- **Unique Words** — how many different words you used
- **Repeated Words** — words you used multiple times
- **Filler Words** — words such as `um`, `uh`, `like`, and `actually`

You can also read the transcript and listen to your recording again.

## How It Works

The basic flow is:

```text
Start Speaking
      ↓
Record
      ↓
Speech to Text
      ↓
Analyze the Transcript
      ↓
Show Results
```

For speech recognition, I used the browser's **Web Speech API**.

After the browser creates the transcript, SpeakMeter uses my own TypeScript logic to count the words and calculate things like WPM, unique words, repeated words, and filler words.

I also used the **MediaRecorder API** so you can listen to your recording after you finish.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Web Speech API
- MediaRecorder API

I didn't use a database for this version.

## Privacy

SpeakMeter doesn't require an account or login.

It also doesn't save your:

- recordings
- transcripts
- speaking results

There is no SpeakMeter database storing your speaking sessions.

One thing to know is that speech-to-text uses the browser's Web Speech API. Depending on your browser or device, the browser's speech recognition provider may process the audio.

More information is available on the **Privacy Policy** page in SpeakMeter.

## Accuracy

SpeakMeter depends on browser speech recognition, so the transcript won't always be perfect.

Things like pronunciation, speaking speed, background noise, microphone quality, and the browser you use can affect the result.

Because the analysis is based on that transcript, WPM, repeated words, and filler word results should be treated as estimates.

Chrome currently works best for SpeakMeter.

## Run It Locally

Clone the project:

```bash
git clone https://github.com/d08835149-prog/speakmeter.git
```

Go into the folder:

```bash
cd speakmeter
```

Install the packages:

```bash
npm install
```

Run it:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## V1

For the first version, I wanted to keep the idea simple:

**Record → Transcribe → Analyze → Result**

I thought about adding accounts, saved history, IELTS practice, and other features, but that would make the project much bigger than what I originally needed.

For now, SpeakMeter does one thing: I speak English, and it gives me some quick information about how I spoke.

## Things I Might Add Later

There are still some features I would like to try in the future:

- AI feedback on speaking
- Login and sign-up
- Saving previous speaking sessions
- More detailed speaking statistics
- IELTS speaking practice
- Better speech-to-text accuracy

But for V1, I wanted to keep it small and actually finish it.

---
