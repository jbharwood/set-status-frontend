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
import { useEditModalEventStore } from "@/stores/index";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

export default function EditModal() {
  const editModalEvent = useEditModalEventStore(
    (state) => state.editModalEvent
  );
  const setEditModalEvent = useEditModalEventStore(
    (state) => state.setEditModalEvent
  );
  const { productionRoleCaptureStatus, captureStatus, cb } = editModalEvent;

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      notes: productionRoleCaptureStatus?.notes || "",
    },
  });

  useEffect(() => {
    reset({
      notes: productionRoleCaptureStatus?.notes || "",
    });
  }, [productionRoleCaptureStatus, reset]);

  const watchedNotes = watch("notes");

  function onSubmit(data: { notes: string }) {
    if (captureStatus && productionRoleCaptureStatus) {
      const temp = { ...productionRoleCaptureStatus };
      temp.capture_status_id = captureStatusIdMap[captureStatus];
      temp.notes = data.notes
        ? data.notes
        : "Production Role Capture Status updated";

      cb(temp);
      setEditModalEvent({
        productionRoleCaptureStatus: null,
        captureStatus: null,
        cb: () => {},
      });
      reset();
    }
  }

  return (
    <Dialog
      open={productionRoleCaptureStatus !== null}
      onOpenChange={() => {
        setEditModalEvent({
          productionRoleCaptureStatus: null,
          captureStatus: null,
          cb: () => {},
        });
        reset();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Edit {productionRoleCaptureStatus?.production_role_name}{" "}
            <span
              className={`capture-status-text ${captureStatus?.toLowerCase()}`}
            >
              {captureStatus}
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
                    className={`col-span-3 w-full capture-status-border ${captureStatus?.toLowerCase()}`}
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={
                productionRoleCaptureStatus?.notes !== "" &&
                watchedNotes === productionRoleCaptureStatus?.notes
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
