"use client";

import { useSocketStore } from "@/stores";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function useSocketHandler() {
  const queryClient = useQueryClient();
  const setSocket = useSocketStore((state) => state.setSocket);

  useEffect(() => {
    setSocket(socket);
  }, [socket]);

  useEffect(() => {
    socket.on("get_production_role_capture_statuses", (data) => {
      const queryKey = [data.entity, data.id].filter(Boolean);
      queryClient.invalidateQueries({ queryKey });
    });

    socket.on("get_production_role_capture_statuses_history", (data) => {
      const queryKey = [data.entity, data.id].filter(Boolean);
      queryClient.invalidateQueries({ queryKey });
    });

    return () => {
      socket.off("get_production_role_capture_statuses");
      socket.off("get_production_role_capture_statuses_history");
    };
  });
}
