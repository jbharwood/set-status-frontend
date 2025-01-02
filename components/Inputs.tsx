"use client";

import { useState, useRef } from "react";
import { send, upload } from "@/assets";
import Image from "next/image";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";
import { IMessage } from "@/types/interfaces";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { useSelectedStageIDStore, useSocketStore } from "@/stores";

export default function Inputs() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const uploadInput = useRef<HTMLInputElement>(null);
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const socket = useSocketStore((state) => state.socket);

  function sendMessage() {
    if (input && user) {
      const msg: IMessage = { content: input, type: "text", user: user };
      socket?.emit("send_message", msg, selectedStageID);
      setInput("");
    } else {
      uploadInput.current?.click();
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (
      file &&
      (file.type === "image/jpeg" || file.type === "image/png") &&
      user
    ) {
      const img = URL.createObjectURL(file);
      const msg: IMessage = { content: img, type: "image", user: user };
      socket?.emit("send_message", msg, selectedStageID);
    }
  }

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        className="focus:outline-none focus:ring focus:border-blue-300"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <Input
        className="hidden"
        type="file"
        ref={uploadInput}
        onChange={(e) => handleImageUpload(e)}
      />
      <Button
        className="w-full px-3 bg-blue-400 text-white font-fold rounded-md text-xl md:w-12 md:text-2xl"
        onClick={sendMessage}
      >
        <Image
          src={input ? send : upload}
          className="w-6 md:w-12 mx-auto"
          alt="send"
          height={20}
          width={20}
        />
      </Button>
    </div>
  );
}
