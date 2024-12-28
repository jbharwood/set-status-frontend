"use client";

import { IMessage, IUser } from "@/types/interfaces";
import { useEffect, useRef } from "react";
import { Message } from "@/components/index";

type ChatProps = {
  chat: Array<IMessage>;
  currentUser: IUser;
};

export default function Chat({ chat }: ChatProps) {
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
        };

        return <Message key={index} {...messageOutput} />;
      })}
      <div ref={scroller} />
    </div>
  );
}
