"use client";

import {
  Filter,
  MessageCircle,
  MessageCircleOff,
  RefreshCcw,
  Pen,
  PenOff,
  NotebookPen,
  Notebook,
  Laptop,
  Clapperboard,
} from "lucide-react";
import { ButtonWithTooltip, SearchStagesCombobox } from "@/components/index";
import {
  useIsShowChatStore,
  useSelectedStageIDStore,
  useIsEditModeStore,
  useNotifyModalEventStore,
  useIsNotesEnabledStore,
  useIsFilterModalOpenStore,
  useIsWebViewStore,
} from "@/stores/index";
import {
  getProductionRoleCaptureStatuses,
  updateProductionRoleCaptureStatus,
} from "@/apiRequests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IProductionRoleCaptureStatus } from "@/types/interfaces";
import { useSearchParams } from "next/navigation";
import { Separator } from "./ui/separator";

export default function TobBar() {
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const isShowChat = useIsShowChatStore((state) => state.isShowChat);
  const setIsShowChat = useIsShowChatStore((state) => state.setIsShowChat);
  const isEditMode = useIsEditModeStore((state) => state.isEditMode);
  const setIsEditMode = useIsEditModeStore((state) => state.setIsEditMode);
  const isWebView = useIsWebViewStore((state) => state.isWebView);
  const setIsWebView = useIsWebViewStore((state) => state.setIsWebView);
  const setNotifyModalEvent = useNotifyModalEventStore(
    (state) => state.setNotifyModalEvent
  );
  const isNotesEnabled = useIsNotesEnabledStore(
    (state) => state.isNotesEnabled
  );
  const setIsNotesEnabled = useIsNotesEnabledStore(
    (state) => state.setIsNotesEnabled
  );
  const setIsFilterModalOpen = useIsFilterModalOpenStore(
    (state) => state.setIsFilterModalOpen
  );
  const searchParams = useSearchParams();

  const queryClient = useQueryClient();
  const productionRoleCaptureStatusMutation = useMutation({
    mutationFn: updateProductionRoleCaptureStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ["productionRoleCaptureStatuses", "list"],
          ["productionRoleCaptureStatusesHistory", "list"],
          ["stageCaptureStatus", "single"],
        ],
      });
    },
  });

  const productionRoleCaptureStatuses = useQuery({
    queryKey: [
      "productionRoleCaptureStatuses",
      "list",
      { company_id: 1, stage_id: selectedStageID, is_active: true },
    ],
    queryFn: () =>
      selectedStageID !== null
        ? getProductionRoleCaptureStatuses({
            company_id: 1,
            stage_id: selectedStageID,
            is_active: true,
          })
        : Promise.resolve([]),
  });

  function handleResetStageStatuses() {
    setNotifyModalEvent({
      eventName: "Reset Stage Statuses",
      eventPrompt:
        "Are you sure you want to reset all stage statuses to yellow status?",
      cb: () => {
        productionRoleCaptureStatuses.data?.forEach(
          (prcs: IProductionRoleCaptureStatus) => {
            const temp = { ...prcs };
            temp.notes = "Production Role Capture Statuses reset";
            temp.capture_status_id = 3;
            productionRoleCaptureStatusMutation.mutate(temp);
          }
        );
      },
    });
  }

  function handleWebView() {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("isWebView", (!isWebView).toString());
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
    setIsWebView(!isWebView);
  }

  return (
    <div className="bg-white dark:bg-sidebar shadow h-10 w-full">
      <div className="flex gap-2 ml-4">
        <div className="w-full flex-1 md:w-auto md:flex-none mt-1">
          <SearchStagesCombobox />
        </div>
        {selectedStageID && (
          <div className="flex gap-2 mt-2.5">
            <ButtonWithTooltip
              icon={isWebView ? Laptop : Clapperboard}
              toggleIcon={isWebView ? Laptop : Clapperboard}
              tooltipText={isWebView ? "Web View" : "Stage View"}
              toggleTooltipText={isWebView ? "Web View" : "Stage View"}
              className="w-1 h-5"
              onClick={handleWebView}
            />
            <ButtonWithTooltip
              icon={isShowChat ? MessageCircle : MessageCircleOff}
              tooltipText={isShowChat ? "Show Feed" : "Hide Feed"}
              toggleTooltipText={isShowChat ? "Show Feed" : "Hide Feed"}
              className="w-1 h-5"
              onClick={() => setIsShowChat(!isShowChat)}
            />
            <ButtonWithTooltip
              icon={isNotesEnabled ? NotebookPen : Notebook}
              toggleIcon={isNotesEnabled ? NotebookPen : Notebook}
              tooltipText={
                isNotesEnabled
                  ? "Capture Status Notes Enabled"
                  : "Capture Status Notes Disabled"
              }
              toggleTooltipText={
                isNotesEnabled
                  ? "Capture Status Notes Enabled"
                  : "Capture Status Notes Disabled"
              }
              className="w-1 h-5"
              onClick={() => setIsNotesEnabled(!isNotesEnabled)}
            />
            <ButtonWithTooltip
              icon={isEditMode ? Pen : PenOff}
              toggleIcon={isEditMode ? Pen : PenOff}
              tooltipText={
                isEditMode ? "Edit Mode Enabled" : "Edit Mode Disabled"
              }
              toggleTooltipText={
                isEditMode ? "Edit Mode Enabled" : "Edit Mode Disabled"
              }
              className="w-1 h-5"
              onClick={() => setIsEditMode(!isEditMode)}
            />
            {isEditMode && (
              <>
                <Separator orientation="vertical" className="bg-gray-500" />
                <ButtonWithTooltip
                  icon={Filter}
                  tooltipText="Filter Production Roles"
                  className="w-1 h-5"
                  onClick={() => setIsFilterModalOpen(true)}
                />
                <ButtonWithTooltip
                  icon={RefreshCcw}
                  tooltipText="Reset Stage Statuses"
                  className="w-1 h-5"
                  onClick={handleResetStageStatuses}
                />
              </>
            )}
            <div className="mb-5"></div>
          </div>
        )}
      </div>
    </div>
  );
}
