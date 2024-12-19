import { useState, useRef } from "react";
import { send, upload } from "@/assets";
import Image from "next/image";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";
import { IMessage, IUser } from "@/types/interfaces";

type InputsProps = {
  user: IUser;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

export default function Inputs({ user, socket, setUser }: InputsProps) {
  const [input, setInput] = useState("");

  const uploadInput = useRef<HTMLInputElement>(null);

  function sendMessage() {
    if (input) {
      const msg: IMessage = { content: input, type: "text", user };

      socket.emit("send_message", msg, user.room);

      setInput("");
    } else {
      uploadInput.current?.click();
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const img = URL.createObjectURL(file);
      const msg: IMessage = { content: img, type: "image", user };

      socket.emit("send_message", msg, user.room);
    }
  }

  function logout() {
    socket.emit("logout", user);
    setUser(null);
  }

  return (
    <div className="w-full absolute bottom-0 text-xl grid grid-cols-5 gradient md:bg-none md:text-3xl md:flex md:justify-center md:relative">
      <input
        className="focus:outline-none rounded-2xl p-3 text-white placeholder-slate-200 col-span-4 gradient md:w-6/12 md:mr-3"
        type="text"
        placeholder="Enter your message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <input
        className="hidden"
        type="file"
        ref={uploadInput}
        onChange={(e) => handleImageUpload(e)}
      />
      <button
        className="w-full py-2 px-3 bg-sky-400 text-white font-fold rounded-md text-xl gradient md:w-1/12 md:text-2xl md:mr-3"
        onClick={sendMessage}
      >
        <Image
          src={input ? send : upload}
          className="w-6 md:w-12 mx-auto"
          alt="send"
          height={20}
          width={20}
        />
      </button>
      <button
        className="w-full py-2 px-3 bg-sky-400 text-white font-fold rounded-md text-xl gradient md:w-2/12 md:text-2xl"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
