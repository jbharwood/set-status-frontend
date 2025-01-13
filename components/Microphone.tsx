"use client";

import { useRecordVoice } from "@/hooks/index";
import { Mic } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useIsChatBotOpenStore, useVoiceTextStore } from "@/stores";

const Microphone = () => {
  const { startRecording, stopRecording, text } = useRecordVoice();
  const setVoiceText = useVoiceTextStore((state) => state.setVoiceText);
  const setIsChatBotOpen = useIsChatBotOpenStore(
    (state) => state.setIsChatBotOpen
  );

  function onStopRecording() {
    stopRecording();
    setIsChatBotOpen(true);
  }

  useEffect(() => {
    setVoiceText(text);
  }, [text]);

  return (
    <Button
      onMouseDown={startRecording} // Start recording when mouse is pressed
      onMouseUp={onStopRecording} // Stop recording when mouse is released
      onTouchStart={startRecording} // Start recording when touch begins on a touch device
      onTouchEnd={onStopRecording} // Stop recording when touch ends on a touch device
      className="border-none bg-secondary text-primary w-1 h-7 hover:bg-destructive"
      onClick={(e) => e.preventDefault()}
    >
      <Mic />
    </Button>
  );
};

export default Microphone;
