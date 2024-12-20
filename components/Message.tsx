import React from "react";
import { IMessage, IUser } from "../types/interfaces";

type MessageProps = {
  content: string;
  type: IMessage["type"];
  own: boolean;
  user: IUser;
};

export default function Message({ content, type, own, user }: MessageProps) {
  return (
    <div className="bg-gray-100 border border-slate-200 rounded-md break-words">
      {type === "text" ? (
        `${user.name} : ${content}`
      ) : (
        <div>
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
