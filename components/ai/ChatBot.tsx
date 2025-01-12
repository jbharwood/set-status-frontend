"use client";

import ChatScrollAnchor from "../ChatScrollAnchor";
import AIChat from "./AIChat";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { useActions, useUIState } from "ai/rsc";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChatInputs } from "@/lib/chatSchema";
import { useEnterSubmit } from "@/hooks/useEnterSubmit";
import { UserMessage } from "./AIMessage";
import { AI } from "@/lib/actions";
import { useIsChatBotOpenStore } from "@/stores";

export default function ChatBot() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();
  const isChatBotOpen = useIsChatBotOpenStore((state) => state.isChatBotOpen);

  const form = useForm<ChatInputs>({
    defaultValues: {
      message: "",
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

  if (!isChatBotOpen) return null;

  return (
    <div className="fixed right-4 z-50 flex bg-background rounded h-[90vh] w-[40%] mt-10">
      <div className="w-full h-full flex flex-col justify-between">
        {/* <h1>Chat Bot</h1> */}
        <div className=" p-2 overflow-auto">
          <AIChat messages={messages} />
          <ChatScrollAnchor trackVisibility={true} />
        </div>
        {/* <div className="mb-2 w-full from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]"> */}
        <div className="w-full mx-auto sm:max-w-2xl sm:px-4">
          {/* <div className="px-4 flex justify-center flex-col py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-xl sm:border md:py-4 bg-white"> */}
          <form ref={formRef} onSubmit={form.handleSubmit(submitHandler)}>
            <div className="relative flex flex-col w-full overflow-hidden max-h-60 grow">
              <div className="flex sm:rounded-3xl w-[80%]">
                <TextareaAutosize
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  placeholder="Send a message."
                  className="min-h-[60px] w-full rounded-3xl resize-none pl-4 pr-16 py-[1.3rem] focus-within:outline-none sm:text-sm"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  rows={1}
                  {...form.register("message")}
                />
              </div>
              <div className="absolute right-0 top-4 sm:right-4">
                <Button
                  type="submit"
                  size="icon"
                  disabled={form.watch("message") === ""}
                >
                  <SendHorizonal className="w-5 h-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </form>
          {/* <Button
            variant="outline"
            size="lg"
            className="p-4 mt-4 rounded-full bg-background"
            onClick={(e) => {
              e.preventDefault();
              setMessages([]);
            }}
          >
            <PlusIcon className="w-5 h-5" />
            <span>New Chat</span>
          </Button> */}
          {/* </div> */}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
