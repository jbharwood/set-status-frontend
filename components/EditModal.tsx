"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { captureStatusIdMap } from "@/lib/helpers";
import useIsEditModalOpenStore from "@/stores/useIsEditModalOpenStore";
import useSelectedCaptureStatusStore from "@/stores/useSelectedCaptureStatusStore";
import useSelectedProductionRoleCaptureStatusStore from "@/stores/useSelectedProductionRoleCaptureStatusStore";
import { IProductionRoleCaptureStatus } from "@/types/interfaces";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Dispatch, SetStateAction, useState } from "react";

type EditModalProps = {
  updateProductionRoleCaptureStatus: (
    productionRoleCaptureStatus: IProductionRoleCaptureStatus
  ) => void;
};

export default function EditModal({
  updateProductionRoleCaptureStatus,
}: EditModalProps) {
  const isEditModalOpen = useIsEditModalOpenStore(
    (state) => state.isEditModalOpen
  );
  const setIsEditModalOpen = useIsEditModalOpenStore(
    (state) => state.setIsEditModalOpen
  );
  const selectedCaptureStatus = useSelectedCaptureStatusStore(
    (state) => state.selectedCaptureStatus
  );
  const setSelectedCaptureStatus = useSelectedCaptureStatusStore(
    (state) => state.setSelectedCaptureStatus
  );
  const selectedProductionRoleCaptureStatus =
    useSelectedProductionRoleCaptureStatusStore(
      (state) => state.selectedProductionRoleCaptureStatus
    );
  const setSelectedProductionRoleCaptureStatus =
    useSelectedProductionRoleCaptureStatusStore(
      (state) => state.setSelectedProductionRoleCaptureStatus
    );
  const [notes, setNotes] = useState(
    selectedProductionRoleCaptureStatus?.notes
  );

  function handleSubmit() {
    if (selectedProductionRoleCaptureStatus && selectedCaptureStatus) {
      const temp = { ...selectedProductionRoleCaptureStatus };
      temp.capture_status_id = captureStatusIdMap[selectedCaptureStatus];
      temp.notes = notes;
      updateProductionRoleCaptureStatus(temp);
      setSelectedProductionRoleCaptureStatus(null);
      setIsEditModalOpen(false);
    }
  }

  return (
    <Dialog
      open={isEditModalOpen}
      onOpenChange={() => {
        setIsEditModalOpen(false);
        setSelectedProductionRoleCaptureStatus(null);
        setSelectedCaptureStatus(null);
        setNotes("");
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Edit {selectedProductionRoleCaptureStatus?.production_role_name}{" "}
            <span
              className={`capture-status-text ${selectedCaptureStatus?.toLowerCase()}`}
            >
              {selectedCaptureStatus}
            </span>{" "}
            Capture Status
          </DialogTitle>
        </DialogHeader>
        <VisuallyHidden.Root>
          <DialogDescription>
            Edit Production Role Capture Status
          </DialogDescription>
        </VisuallyHidden.Root>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Textarea
              ref={(ref: HTMLTextAreaElement) => ref && ref.focus()}
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              className={`col-span-3 w-full capture-status-border ${selectedCaptureStatus?.toLowerCase()}`}
              defaultValue={selectedProductionRoleCaptureStatus?.notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={
              selectedProductionRoleCaptureStatus?.notes !== "" &&
              selectedProductionRoleCaptureStatus
                ? selectedProductionRoleCaptureStatus.notes === notes
                : false
            }
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
