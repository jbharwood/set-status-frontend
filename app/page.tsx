"use client";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Chat, Inputs, ProductionRoleCaptureStatus } from "@/components";
import { IMessage, IUser } from "@/types/interfaces";
import { useUser } from "@clerk/nextjs";

const socket = io("http://localhost:3001");

export default function Home() {
  const [chat, setChat] = useState<IMessage[]>([]);
  const [userNameInput, setCurrentUserNameInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      setCurrentUser({
        name: user.fullName,
        id: user.id,
        room: "a",
        image: user.imageUrl,
      });
      socket.emit("join_room", { user: user.fullName, room: "a" });
    }
  }, [user]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      if (!currentUser) return;

      setChat((prev) => [...prev, msg]);
    });

    socket.on("join_room", () => {
      if (!currentUser) return;

      setChat([]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("join_room");
    };
  });

  return (
    <>
      {isSignedIn && currentUser && (
        <div className="h-[95%] flex flex-col">
          <div className="flex-grow-[7] bg-blue-500 flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center w-full h-full">
              {Array.from({ length: 7 }).map((_, index) => (
                <ProductionRoleCaptureStatus key={index} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="w-full bg-white rounded-lg shadow p-4 flex flex-col space-y-3 h-56">
              <Chat currentUser={currentUser} chat={chat} />
              <Inputs
                currentUser={currentUser}
                socket={socket}
                setCurrentUser={setCurrentUser}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
