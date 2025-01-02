import React from "react";
import { IMessage } from "../types/interfaces";
import { useCurrentUser } from "@/context/UserContext";

type MessageProps = {
  content: string;
  type: IMessage["type"];
};

export default function Message({ content, type }: MessageProps) {
  const { currentUser } = useCurrentUser();

  return (
    <div className="bg-slate-200/80 dark:bg-black/50 border-slate-200 rounded-md break-words mt-1">
      {type === "text" ? (
        <div className="flex gap-2 p-1">
          <img
            src={currentUser?.image}
            alt="user"
            className="rounded-full h-6 w-6"
          />
          {currentUser?.name} : {content}
        </div>
      ) : (
        <div className="flex gap-2 p-1">
          <img
            src={currentUser?.image}
            alt="user"
            className="rounded-full h-6 w-6"
          />
          {currentUser?.name} :
          <img
            src={content}
            className="rounded-md"
            alt="image"
            key={content}
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
}
