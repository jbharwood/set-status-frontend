"use client";

import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { RefreshCcw, SendHorizonal, X } from "lucide-react";
import { useActions, useUIState } from "ai/rsc";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChatInputs } from "@/lib/chatSchema";
import { useEnterSubmit } from "@/hooks/useEnterSubmit";
import { AI } from "@/lib/actions";
import { useIsChatBotOpenStore, useVoiceTextStore } from "@/stores";
import { useEffect } from "react";
import {
  Microphone,
  ChatScrollAnchor,
  AIChat,
  UserMessage,
} from "@/components/index";
import { useRecordVoice } from "@/hooks";

export default function ChatBot() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();
  const isChatBotOpen = useIsChatBotOpenStore((state) => state.isChatBotOpen);
  const { text } = useRecordVoice();
  const voiceText = useVoiceTextStore((state) => state.voiceText);
  const setVoiceChatText = useVoiceTextStore((state) => state.setVoiceText);
  const setIsChatBotOpen = useIsChatBotOpenStore(
    (state) => state.setIsChatBotOpen
  );
  const { reset } = useForm();

  const form = useForm<ChatInputs>({
    defaultValues: {
      message: text || "",
    },
  });

  const { formRef, onKeyDown } = useEnterSubmit();

  const submitHandler: SubmitHandler<ChatInputs> = async (data) => {
    const value = data.message.trim();
    formRef.current?.reset();
    if (!value) return;

    setMessages((currentMessages: any) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    try {
      const responseMessage = await sendMessage(value);
      setMessages((currentMessages: any) => [
        ...currentMessages,
        responseMessage,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset({ message: "" });
  }, [isChatBotOpen]);

  useEffect(() => {
    if (voiceText) {
      form.setValue("message", voiceText);
    }
  }, [voiceText, form]);

  if (!isChatBotOpen) return null;

  return (
    <div className="fixed right-4 z-50 flex bg-sidebar rounded h-[90vh] w-[40%] mt-10">
      <div className="w-full h-full flex flex-col justify-between">
        <div className=" p-2 overflow-auto">
          <AIChat messages={messages} />
          <ChatScrollAnchor trackVisibility={true} />
        </div>
        <div className="w-full mx-auto sm:max-w-2xl sm:px-4">
          <form ref={formRef} onSubmit={form.handleSubmit(submitHandler)}>
            <div className="relative flex gap-2 w-full overflow-hidden pb-2 max-h-60 grow">
              <div
                className={`flex sm:rounded w-full flex-col-reverse bg-secondary border ${form.watch("message") ? "border-blue-500" : ""} focus-within:border-blue-500`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Microphone iconClassName="w-5 h-5" size="icon" />
                    <Button
                      size="icon"
                      className=" bg-secondary text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={(e) => {
                        e.preventDefault();
                        setMessages([]);
                        setVoiceChatText("");
                        form.reset({ message: "" });
                      }}
                    >
                      <RefreshCcw className="w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      className=" bg-secondary border-none text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={(e) => {
                        e.preventDefault();
                        setMessages([]);
                        setVoiceChatText("");
                        form.reset({ message: "" });
                        setIsChatBotOpen(false);
                      }}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      size="icon"
                      disabled={form.watch("message") === ""}
                      className=" bg-secondary text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <SendHorizonal className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <TextareaAutosize
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  placeholder="Send a message."
                  className="min-h-[40px] w-full bg-secondary rounded-3xl resize-none pl-2 pr-2 py-[0.8rem] sm:text-sm !outline-none"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  rows={1}
                  {...form.register("message")}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
