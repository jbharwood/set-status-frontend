"use client";

import {
  useEditModalEventStore,
  useIsChatBotOpenStore,
  useIsEditModeStore,
  useIsFilterModalOpenStore,
  useIsShowChatStore,
  useIsWebViewStore,
  useNotifyModalEventStore,
  useSelectedStageIDStore,
  useSocketStore,
} from "@/stores";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_URL);

export default function useSocketHandler() {
  const queryClient = useQueryClient();
  const setSocket = useSocketStore((state) => state.setSocket);
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const { user } = useUser();

  useEffect(() => {
    setSocket(socket);
  }, [socket]);

  useEffect(() => {
    socket.on("production_role_capture_status_update", (data) => {
      const queryKey = [data.entity, data.id].filter(Boolean);
      queryClient.invalidateQueries({ queryKey });
    });

    return () => {
      socket.off("production_role_capture_status_update");
    };
  });

  useEffect(() => {
    if (user && selectedStageID) {
      socket?.emit("join_room", {
        user: user.fullName,
        room: selectedStageID,
      });
    }
  }, [user, selectedStageID, socket]);
}
