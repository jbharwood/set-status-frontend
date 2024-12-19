"use client";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Chat, Inputs, SignUp } from "@/components";
import { IMessage, IUser } from "@/types/interfaces";

const socket = io("http://localhost:3001");

export default function Home() {
  const [chat, setChat] = useState<IMessage[]>([]);
  const [userNameInput, setUserNameInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      if (!user) return;

      setChat((prev) => [...prev, msg]);
    });

    socket.on("join_room", (data) => {
      if (!user) return;

      setChat((prev) => [
        ...prev,
        {
          content: `${data.user} joined ${data.room}`,
          type: "server",
          user: { name: "server" },
          room: data.room,
        },
      ]);
    });

    socket.on("logout", (newUser, room) => {
      setChat((prev) => [
        ...prev,
        {
          content: `${newUser.name} left`,
          type: "server",
          user: { name: "server" },
          room,
        },
      ]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("join_room");
      socket.off("logout");
    };
  });

  return (
    <main className="h-screen max-h-screen max-w-screen mx-auto md:container md:p-20 md:pt-4">
      {user ? (
        <>
          <Chat user={user} chat={chat} />
          <Inputs user={user} socket={socket} setUser={setUser} />
        </>
      ) : (
        <SignUp
          socket={socket}
          userNameInput={userNameInput}
          setUserNameInput={setUserNameInput}
          roomInput={roomInput}
          setRoomInput={setRoomInput}
          setUser={setUser}
        />
      )}
    </main>
  );
}
