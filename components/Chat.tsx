import { IMessage, IUser } from "@/types/interfaces";
import { Message, ServerMessage } from "./Messages";
import { useEffect, useRef } from "react";

type ChatProps = {
  chat: Array<IMessage>;
  user: IUser;
};

export default function Chat({ chat, user }: ChatProps) {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scroller.current) return;

    scroller.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chat]);

  return (
    <div className="h-full pb-12 md:p-4">
      <div className="w-full h-full max-h-screen rounded-md overflow-y-auto gradient pt-2 md:pt-6">
        {chat.map((message, index) => {
          const messageOutput = {
            ...message,
            own: message.user.id === user?.id,
          };
          return messageOutput.type === "server" ? (
            <ServerMessage key={index} {...message} />
          ) : (
            <Message key={index} {...messageOutput} />
          );
        })}
        <div ref={scroller} className="pb-2 md:pb-6" />
      </div>
    </div>
  );
}
