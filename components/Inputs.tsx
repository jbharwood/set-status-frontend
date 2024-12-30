"use client";

import { useState, useRef } from "react";
import { send, upload } from "@/assets";
import Image from "next/image";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";
import { IMessage } from "@/types/interfaces";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCurrentUser } from "@/context/UserContext";

type InputsProps = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};

export default function Inputs({ socket }: InputsProps) {
  const [input, setInput] = useState("");
  const { currentUser } = useCurrentUser();

  const uploadInput = useRef<HTMLInputElement>(null);

  function sendMessage() {
    if (input && currentUser) {
      const msg: IMessage = { content: input, type: "text", user: currentUser };
      socket.emit("send_message", msg, currentUser.room);
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
      currentUser
    ) {
      const img = URL.createObjectURL(file);
      const msg: IMessage = { content: img, type: "image", user: currentUser };
      socket.emit("send_message", msg, currentUser.room);
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
