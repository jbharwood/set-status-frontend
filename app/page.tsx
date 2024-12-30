"use client";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import {
  Chat,
  Inputs,
  ProductionRoleCaptureStatus,
  EditModal,
} from "@/components/index";
import { IMessage, IProductionRoleCaptureStatus } from "@/types/interfaces";
import { useUser } from "@clerk/nextjs";
import { useCurrentUser } from "@/context/UserContext";

const socket = io("http://localhost:3001");

export default function Home() {
  const [chat, setChat] = useState<IMessage[]>([]);
  const [productionRoleCaptureStatuses, setProductionRoleCaptureStatuses] =
    useState<IProductionRoleCaptureStatus[]>([]);
  const { isSignedIn } = useUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      socket.emit("join_room", { user: currentUser.name, room: "a" });
    }
  }, [currentUser]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      if (!currentUser) return;

      setChat((prev) => [...prev, msg]);
    });

    socket.on("join_room", () => {
      if (!currentUser) return;

      setChat([]);
    });

    socket.on("get_production_role_capture_statuses", (data) => {
      if (!currentUser) return;

      setProductionRoleCaptureStatuses(data);
      console.log(data);
    });

    return () => {
      socket.off("receive_message");
      socket.off("join_room");
      socket.off("get_production_role_capture_statuses");
    };
  });

  return (
    <>
      {isSignedIn && currentUser && (
        <div className="h-[95%] flex flex-col bg-blue-500">
          <div className="flex-grow-[7] flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center w-full h-full">
              {productionRoleCaptureStatuses.map((prcs) => (
                <ProductionRoleCaptureStatus
                  key={prcs.id}
                  productionRoleCaptureStatus={prcs}
                  setIsEditModalOpen={setIsEditModalOpen}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center w-full p-2">
            <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow p-2 flex flex-col space-y-3 h-56">
              <Chat chat={chat} />
              <Inputs socket={socket} />
              <EditModal
                isEditModalOpen={isEditModalOpen}
                setisEditModalOpen={setIsEditModalOpen}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
