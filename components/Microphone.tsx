"use client";

import { useRecordVoice } from "@/hooks/index";
import { Mic } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useIsChatBotOpenStore, useVoiceTextStore } from "@/stores";
import { cn } from "@/lib/utils";

type MicrophoneProps = {
  buttonClassName?: string;
  iconClassName?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
};

const Microphone = ({
  buttonClassName,
  iconClassName,
  size,
}: MicrophoneProps) => {
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
      size={size}
      onMouseDown={startRecording} // Start recording when mouse is pressed
      onMouseUp={onStopRecording} // Stop recording when mouse is released
      onTouchStart={startRecording} // Start recording when touch begins on a touch device
      onTouchEnd={onStopRecording} // Stop recording when touch ends on a touch device
      className={cn(
        `border-none bg-secondary text-primary hover:bg-destructive`,
        buttonClassName
      )}
      onClick={(e) => e.preventDefault()}
    >
      <Mic className={iconClassName} />
    </Button>
  );
};

export default Microphone;
