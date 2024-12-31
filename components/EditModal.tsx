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
  selectedProductionRoleCaptureStatus: IProductionRoleCaptureStatus | null;
  updateProductionRoleCaptureStatus: (
    productionRoleCaptureStatus: IProductionRoleCaptureStatus
  ) => void;
};

export default function EditModal({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedCaptureStatus,
  setSelectedCaptureStatus,
  selectedProductionRoleCaptureStatus,
  updateProductionRoleCaptureStatus,
}: EditModalProps) {
  function notes() {
    return selectedCaptureStatus &&
      selectedProductionRoleCaptureStatus?.capture_status_id ===
        captureStatusIdMap[selectedCaptureStatus]
      ? selectedProductionRoleCaptureStatus?.notes
      : "";
  }

  function handleProductionRoleCaptureStatus(note: string) {
    if (selectedProductionRoleCaptureStatus && selectedCaptureStatus) {
      selectedProductionRoleCaptureStatus.capture_status_id =
        captureStatusIdMap[selectedCaptureStatus];
      selectedProductionRoleCaptureStatus.notes = note;
    }
  }

  function handleSubmit() {
    if (selectedProductionRoleCaptureStatus) {
      updateProductionRoleCaptureStatus(selectedProductionRoleCaptureStatus);
      setIsEditModalOpen(false);
    }
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
            <span
              className={
                `text-` + selectedCaptureStatus?.toLowerCase() + `-500`
              }
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
              className={`col-span-3 w-full focus:border-${selectedCaptureStatus?.toLowerCase()}-500`}
              defaultValue={notes()}
              onChange={(e) =>
                handleProductionRoleCaptureStatus(e.target.value)
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
