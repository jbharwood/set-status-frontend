import React from "react";
import { IMessage, IUser } from "../../types/interfaces";

type MessageProps = {
  content: string;
  type: IMessage["type"];
  own: boolean;
  user: IUser;
};

export default function Message({ content, type, own, user }: MessageProps) {
  return (
    <p className={`message px-1 md:px-6 py-1 flex ${own ? "justify-end" : ""}`}>
      {!own && (
        <span
          className={`logo text-2xl bg-blue-600 text-white rounded-full py-2 text-center px-4 mr-2 flex items-center ${
            type === "text" ? "my-auto" : "max-h-12"
          }`}
        >
          {user.name && user.name.charAt(0).toUpperCase()}
        </span>
      )}
      <span
        className={`text-xl md:text-3xl py-2 rounded-2xl 
            ${type === "text" ? "px-6" : "px-2"}
            ${own ? "bg-sky-400 text-white" : "bg-slate-300"}
            `}
      >
        {type === "text" ? (
          content
        ) : (
          <img src={content} className="rounded-md" alt="image" key={content} />
        )}
      </span>
    </p>
  );
}
