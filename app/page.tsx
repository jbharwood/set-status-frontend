"use client";

import {
  Chat,
  Inputs,
  ProductionRoleCaptureStatuses,
  EditModal,
  TopBar,
  FilterModal,
  StageTable,
  ChatBot,
} from "@/components/index";
import { useUser } from "@clerk/nextjs";
import {
  useIsEditModeStore,
  useNotifyModalEventStore,
  useIsShowChatStore,
  useSelectedStageIDStore,
  useEditModalEventStore,
  useIsFilterModalOpenStore,
  useIsWebViewStore,
  useIsChatBotOpenStore,
} from "@/stores/index";
import NotifyModal from "@/components/modals/NotifyModal";
import { useSocketHandler, useSearchParamsHandler } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { getStageCaptureStatus } from "@/apiRequests/stageStatus";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const isShowChat = useIsShowChatStore((state) => state.isShowChat);
  const isEditMode = useIsEditModeStore((state) => state.isEditMode);
  const isWebView = useIsWebViewStore((state) => state.isWebView);
  const isChatBotOpen = useIsChatBotOpenStore((state) => state.isChatBotOpen);
  const notifyModalEvent = useNotifyModalEventStore(
    (state) => state.notifyModalEvent
  );
  const editModalEvent = useEditModalEventStore(
    (state) => state.editModalEvent
  );
  const isFilterModalOpen = useIsFilterModalOpenStore(
    (state) => state.isFilterModalOpen
  );

  const stageCaptureStatus = useQuery({
    queryKey: [
      "stageCaptureStatus",
      "single",
      { stageId: selectedStageID, companyId: 1 },
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

  return (
    <main className="font-markProRegular">
      {isSignedIn && user && (
        <div
          className={`${stageCaptureStatus ? getStatusGradientClass() : ""} h-screen w-[97.25vw] xl:w-[98vw] flex flex-col`}
        >
          <div className={!selectedStageID ? "flex flex-col flex-1" : ""}>
            <div className={`${!isWebView ? "hidden-in-fullscreen" : ""}`}>
              <TopBar />
            </div>
            {!selectedStageID && (
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-3">
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                  <StageTable />
                </div>
              </div>
            )}
          </div>
          {selectedStageID && (
            <>
              <div className="flex-grow overflow-auto">
                <ProductionRoleCaptureStatuses />
              </div>
              {isShowChat && isWebView && (
                <div className="flex items-center justify-center w-full p-2">
                  <div className="w-full bg-white/80 dark:bg-slate-800/80 rounded-lg shadow p-2 flex flex-col space-y-3 h-56">
                    <Chat />
                    {isEditMode && <Inputs />}
                  </div>
                </div>
              )}
              {editModalEvent && <EditModal />}
              {notifyModalEvent && <NotifyModal />}
              {isFilterModalOpen && <FilterModal />}
            </>
          )}
          {isChatBotOpen && <ChatBot />}
        </div>
      )}
    </main>
  );
}
