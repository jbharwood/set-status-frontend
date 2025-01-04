import React from "react";
import {
  IMessage,
  IProductionRoleCaptureStatusesHistory,
} from "../types/interfaces";
import { useUser } from "@clerk/nextjs";

type MessageProps = {
  content: IProductionRoleCaptureStatusesHistory;
  type: IMessage["type"];
};

export default function Message({ content, type }: MessageProps) {
  const { user } = useUser();
  const { last_modified_by, last_modified_time, notes } = content;

  return (
    <div className="bg-slate-200/80 dark:bg-black/50 border-slate-200 rounded-md break-words mt-1">
      {type === "text" ? (
        <div className="flex gap-2 p-1">
          <img
            src={user?.imageUrl}
            alt="user"
            className="rounded-full h-6 w-6"
          />
          {last_modified_by} - {last_modified_time} : {notes}
        </div>
      ) : (
        <div className="flex gap-2 p-1">
          <img
            src={user?.imageUrl}
            alt="user"
            className="rounded-full h-6 w-6"
          />
          {user?.fullName} :
          <img
            src={notes}
            className="rounded-md"
            alt="image"
            key={notes}
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
}
