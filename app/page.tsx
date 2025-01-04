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
import {
  useIsEditModeStore,
  useNotifyModalEventStore,
  useIsShowChatStore,
  useSelectedStageIDStore,
  useSocketStore,
  useEditModalEventStore,
} from "@/stores/index";
import { useQueryClient } from "@tanstack/react-query";
import NotifyModal from "@/components/NotifyModal";
import { useSearchParams } from "next/navigation";

const socket = io("http://localhost:3001");

export default function Home() {
  const [chat, setChat] = useState<IMessage[]>([]);
  const { isSignedIn, user } = useUser();
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const setSelectedStageID = useSelectedStageIDStore(
    (state) => state.setSelectedStageID
  );
  const isShowChat = useIsShowChatStore((state) => state.isShowChat);
  const isEditMode = useIsEditModeStore((state) => state.isEditMode);
  const setSocket = useSocketStore((state) => state.setSocket);
  const notifyModalEvent = useNotifyModalEventStore(
    (state) => state.notifyModalEvent
  );
  const editModalEvent = useEditModalEventStore(
    (state) => state.editModalEvent
  );
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const stageID = searchParams.get("stageID");

  useEffect(() => {
    if (stageID && !isNaN(Number(stageID))) {
      setSelectedStageID(parseInt(stageID));
    }
  }, [stageID]);

  useEffect(() => {
    setSocket(socket);
  }, [socket]);

  useEffect(() => {
    if (user && selectedStageID) {
      socket.emit("join_room", {
        user: user.fullName,
        room: selectedStageID,
      });
    }
  }, [user, selectedStageID]);

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

    socket.on("leave_room", () => {
      setChat([]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("join_room");
      socket.off("get_production_role_capture_statuses");
      socket.off("leave_room");
    };
  });

  return (
    <main>
      {isSignedIn && user && (
        <div className="h-screen w-[98.5vw] xl:w-[98vw] flex flex-col bg-gradient-to-r from-green-300 to-green-400">
          <TopBar />
          {selectedStageID && (
            <>
              <div className="flex-grow overflow-auto">
                <ProductionRoleCaptureStatuses />
              </div>
              {isShowChat && (
                <div className="flex items-center justify-center w-full p-2">
                  <div className="w-full bg-white/80 dark:bg-slate-800/80 rounded-lg shadow p-2 flex flex-col space-y-3 h-56">
                    <Chat chat={chat} />
                    {isEditMode && <Inputs />}
                  </div>
                </div>
              )}
              {editModalEvent && <EditModal />}
              {notifyModalEvent && <NotifyModal />}
            </>
          )}
        </div>
      )}
    </main>
  );
}
