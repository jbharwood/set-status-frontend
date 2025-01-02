"use client";

import { updateProductionRoleCaptureStatus } from "@/apiRequests";
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
  useIsEditModalOpenStore,
  useSelectedCaptureStatusStore,
  useSelectedProductionRoleCaptureStatusStore,
} from "@/stores/index";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";

export default function EditModal() {
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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      notes: selectedProductionRoleCaptureStatus?.notes || "",
    },
  });

  const watchedNotes = watch("notes");

  const productionRoleCaptureStatusMutation = useMutation({
    mutationFn: updateProductionRoleCaptureStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productionRoleCaptureStatuses"],
      });
    },
  });

  function onSubmit(data: { notes: string }) {
    if (selectedProductionRoleCaptureStatus && selectedCaptureStatus) {
      const temp = { ...selectedProductionRoleCaptureStatus };
      temp.capture_status_id = captureStatusIdMap[selectedCaptureStatus];
      temp.notes = data.notes;
      console.log("Submitting data:", temp); // Debugging log
      productionRoleCaptureStatusMutation.mutate(temp);
      setSelectedProductionRoleCaptureStatus(null);
      setIsEditModalOpen(false);
      reset();
    }
  }

  return (
    <Dialog
      open={isEditModalOpen}
      onOpenChange={() => {
        setIsEditModalOpen(false);
        setSelectedProductionRoleCaptureStatus(null);
        setSelectedCaptureStatus(null);
        reset();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    ref={(e) => {
                      field.ref(e);
                      inputRef.current = e;
                    }}
                    onFocus={(e) =>
                      e.currentTarget.setSelectionRange(
                        e.currentTarget.value.length,
                        e.currentTarget.value.length
                      )
                    }
                    className={`col-span-3 w-full capture-status-border ${selectedCaptureStatus?.toLowerCase()}`}
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={
                selectedProductionRoleCaptureStatus?.notes !== "" &&
                watchedNotes === selectedProductionRoleCaptureStatus?.notes
              }
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
