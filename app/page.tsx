"use client";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Chat, Inputs, SignUp } from "@/components";
import { IMessage, IUser } from "@/types/interfaces";
import NavBar from "@/components/NavBar";

const socket = io("http://localhost:3001");

export default function Home() {
  const [chat, setChat] = useState<IMessage[]>([]);
  const [userNameInput, setUserNameInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [user, setUser] = useState<IUser | null>({
    name: "test",
    id: "test",
    room: "a",
  });

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      if (!user) return;

      setChat((prev) => [...prev, msg]);
    });

    socket.on("join_room", () => {
      if (!user) return;

      setChat([]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("join_room");
    };
  });

  useEffect(() => {
    if (user?.name === "test") {
      socket.emit("join_room", user);
    }
  }, [user]);

  return (
    <main className="h-screen w-screen max-h-screen max-w-screen mx-auto">
      {user && <NavBar />}
      {user ? (
        <>
          <div className="h-[95%] flex flex-col">
            <div className="flex-grow-[7] bg-blue-500 flex items-center justify-center">
              <h1 className="text-white text-xl">Top Container</h1>
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="w-full bg-white rounded-lg shadow p-4 flex flex-col space-y-3 h-56">
                <Chat user={user} chat={chat} />
                <Inputs user={user} socket={socket} setUser={setUser} />
              </div>
            </div>
          </div>
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
