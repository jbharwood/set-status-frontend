import { IMessage, IUser } from "@/types/interfaces";
import { Message } from "./index";
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
    <div className="flex flex-col overflow-y-auto h-full">
      {chat.map((message, index) => {
        const messageOutput = {
          ...message,
          own: message.user.id === user?.id,
        };

        return <Message key={index} {...messageOutput} />;
      })}
      <div ref={scroller} />
    </div>
  );
}
