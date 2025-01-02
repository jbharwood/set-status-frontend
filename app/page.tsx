"use client";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import {
  Chat,
  Inputs,
  ProductionRoleCaptureStatuses,
  EditModal,
  TopBar,
} from "@/components/index";
import { IMessage } from "@/types/interfaces";
import { useUser } from "@clerk/nextjs";
import { useCurrentUser } from "@/context/UserContext";
import { useSelectedProductionRoleCaptureStatusStore } from "@/stores/index";
import { useQueryClient } from "@tanstack/react-query";

const socket = io("http://localhost:3001");

export default function Home() {
  const [chat, setChat] = useState<IMessage[]>([]);
  const { isSignedIn } = useUser();
  const { currentUser } = useCurrentUser();
  const selectedProductionRoleCaptureStatus =
    useSelectedProductionRoleCaptureStatusStore(
      (state) => state.selectedProductionRoleCaptureStatus
    );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentUser) {
      socket.emit("join_room", { user: currentUser.name, room: "a" });
    }
  }, [currentUser]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    socket.on("join_room", () => {
      setChat([]);
    });

    socket.on("get_production_role_capture_statuses", (data) => {
      const queryKey = [...data, data.id].filter(Boolean);
      queryClient.invalidateQueries({ queryKey });
    });

    return () => {
      socket.off("receive_message");
      socket.off("join_room");
      socket.off("get_production_role_capture_statuses");
    };
  }, [queryClient]);

  return (
    <main>
      {isSignedIn && currentUser && (
        <div className="h-screen w-[98.5vw] xl:w-[98vw] flex flex-col bg-gradient-to-r from-green-300 to-green-400">
          <div className="flex-grow flex flex-col items-center justify-center overflow-auto">
            <TopBar />
            <ProductionRoleCaptureStatuses />
          </div>
          <div className="flex items-center justify-center w-full p-2">
            <div className="w-full bg-white/80 dark:bg-slate-800/80 rounded-lg shadow p-2 flex flex-col space-y-3 h-56">
              <Chat chat={chat} />
              <Inputs socket={socket} />
              {selectedProductionRoleCaptureStatus && <EditModal />}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
