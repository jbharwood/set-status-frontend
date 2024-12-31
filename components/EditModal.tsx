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
import { captureStatusColorMap, captureStatusIdMap } from "@/lib/helpers";
import {
  CaptureStatus,
  IProductionRoleCaptureStatus,
} from "@/types/interfaces";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Dispatch, SetStateAction } from "react";

type EditModalProps = {
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedCaptureStatus: CaptureStatus;
  setSelectedCaptureStatus: Dispatch<SetStateAction<CaptureStatus>>;
  selectedProductionRoleCaptureStatus: IProductionRoleCaptureStatus;
};

export default function EditModal({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedCaptureStatus,
  setSelectedCaptureStatus,
  selectedProductionRoleCaptureStatus,
}: EditModalProps) {
  const statusColor = selectedCaptureStatus
    ? `text-${captureStatusColorMap[selectedCaptureStatus]}`
    : "";
  const borderColor = selectedCaptureStatus
    ? `focus:border-${captureStatusColorMap[selectedCaptureStatus]}`
    : "";

  function notes() {
    return selectedCaptureStatus &&
      selectedProductionRoleCaptureStatus?.capture_status_id ===
        captureStatusIdMap[selectedCaptureStatus]
      ? selectedProductionRoleCaptureStatus?.notes
      : "";
  }

  return (
    <Dialog
      open={isEditModalOpen}
      onOpenChange={() => {
        setIsEditModalOpen(false);
        setSelectedCaptureStatus(null);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Edit {selectedProductionRoleCaptureStatus?.production_role_name}{" "}
            <span className={statusColor}>{selectedCaptureStatus}</span> Capture
            Status
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
              className={`col-span-3 w-full ${borderColor}`}
              defaultValue={notes()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
