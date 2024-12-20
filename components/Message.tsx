import React from "react";
import { IMessage, IUser } from "../types/interfaces";

type MessageProps = {
  content: string;
  type: IMessage["type"];
  user: IUser;
};

export default function Message({ content, type, user }: MessageProps) {
  return (
    <div className="bg-gray-100 border border-slate-200 rounded-md break-words">
      {type === "text" ? (
        <div className="flex gap-2 p-1">
          <img src={user.image} alt="user" className="rounded-full h-6 w-6" />
          {user.name} : ${content}
        </div>
      ) : (
        <div className="flex gap-2 p-1">
          <img src={user.image} alt="user" className="rounded-full h-6 w-6" />
          {user.name} :
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
