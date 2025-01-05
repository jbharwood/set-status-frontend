"use client";

import {
  Chat,
  Inputs,
  ProductionRoleCaptureStatuses,
  EditModal,
  TopBar,
} from "@/components/index";
import { useUser } from "@clerk/nextjs";
import {
  useIsEditModeStore,
  useNotifyModalEventStore,
  useIsShowChatStore,
  useSelectedStageIDStore,
  useEditModalEventStore,
  useSocketStore,
} from "@/stores/index";
import NotifyModal from "@/components/NotifyModal";
import {
  useSocketHandler,
  useSearchParamsHandler,
  useFullScreen,
} from "@/hooks";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStageCaptureStatus } from "@/apiRequests/stageStatus";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const isShowChat = useIsShowChatStore((state) => state.isShowChat);
  const isEditMode = useIsEditModeStore((state) => state.isEditMode);
  const notifyModalEvent = useNotifyModalEventStore(
    (state) => state.notifyModalEvent
  );
  const editModalEvent = useEditModalEventStore(
    (state) => state.editModalEvent
  );
  const socket = useSocketStore((state) => state.socket);

  const stageCaptureStatus = useQuery({
    queryKey: [
      "stageCaptureStatus",
      "single",
      { stage_id: selectedStageID, company_id: 1 },
    ],
    queryFn: () =>
      selectedStageID !== null
        ? getStageCaptureStatus(selectedStageID, 1)
        : Promise.resolve([]),
  });

  const getStatusGradientClass = () => {
    if (stageCaptureStatus.data) {
      return `status-gradient-${stageCaptureStatus.data.status}`;
    }
  };

  useSocketHandler();
  useSearchParamsHandler();

  useEffect(() => {
    if (user && selectedStageID) {
      socket?.emit("join_room", {
        user: user.fullName,
        room: selectedStageID,
      });
    }
  }, [user, selectedStageID]);

  return (
    <main>
      {isSignedIn && user && (
        <div
          className={`h-screen w-[98.5vw] xl:w-[98vw] flex flex-col ${stageCaptureStatus ? getStatusGradientClass() : ""}`}
        >
          <TopBar />
          {selectedStageID && (
            <>
              <div className="flex-grow overflow-auto">
                <ProductionRoleCaptureStatuses />
              </div>
              {isShowChat && (
                <div className="flex items-center justify-center w-full p-2">
                  <div className="w-full bg-white/80 dark:bg-slate-800/80 rounded-lg shadow p-2 flex flex-col space-y-3 h-56">
                    <Chat />
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
