"use client";

import { useMemo, useRef, useState } from "react";
import { analyzeTranscript } from "@/lib/analyzeTranscript";

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export function useSpeakMeter() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const analysis = useMemo(
    () => analyzeTranscript(transcript, recordingTime),
    [transcript, recordingTime]
  );

  const startRecording = async () => {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert(
          "Speech recognition is not supported in this browser. Please use Google Chrome."
        );
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType,
        });

        const newAudioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(newAudioUrl);
      };

      mediaRecorder.start();

      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let finalText = "";
        let temporaryText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const text = result[0].transcript;

          if (result.isFinal) {
            finalText += text + " ";
          } else {
            temporaryText += text;
          }
        }

        if (finalText) {
          setTranscript((previous) => previous + finalText);
        }

        setInterimTranscript(temporaryText);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event);
      };

      recognition.start();
      recognitionRef.current = recognition;

      setTranscript("");
      setInterimTranscript("");
      setRecordingTime(0);
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime((previous) => previous + 1);
      }, 1000);
    } catch (error) {
      console.error("Microphone error:", error);

      alert("Microphone access is required to use SpeakMeter.");
    }
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;

    if (mediaRecorder) {
      mediaRecorder.stop();

      mediaRecorder.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    recognitionRef.current?.stop();

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setInterimTranscript("");
    setIsRecording(false);
  };

  const resetSession = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioUrl(null);
    setTranscript("");
    setInterimTranscript("");
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return {
    isRecording,
    recordingTime,
    audioUrl,
    transcript,
    interimTranscript,
    analysis,
    startRecording,
    stopRecording,
    resetSession,
    formatTime,
  };
}