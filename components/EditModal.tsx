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
import {
  useEditModalEventStore,
  useIsNotesEnabledStore,
  useIsWebViewStore,
} from "@/stores/index";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function EditModal() {
  const editModalEvent = useEditModalEventStore(
    (state) => state.editModalEvent
  );
  const setEditModalEvent = useEditModalEventStore(
    (state) => state.setEditModalEvent
  );
  const isNotesEnabled = useIsNotesEnabledStore(
    (state) => state.isNotesEnabled
  );
  const isWebView = useIsWebViewStore((state) => state.isWebView);
  const { productionRoleCaptureStatus, captureStatus, cb } = editModalEvent;
  const [status, setStatus] = useState<keyof typeof captureStatusIdMap | null>(
    editModalEvent.captureStatus as keyof typeof captureStatusIdMap
  );

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
    setStatus(editModalEvent.captureStatus);
  }, [productionRoleCaptureStatus, reset]);

  const watchedNotes = watch("notes");

  function onSubmit(data: { notes: string }) {
    if (status && productionRoleCaptureStatus) {
      const temp = { ...productionRoleCaptureStatus };
      temp.captureStatusId = captureStatusIdMap[status];
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

  function onStatusClick(color: keyof typeof captureStatusIdMap) {
    if (status !== color) {
      reset({ notes: "" });
    }
    setStatus(color);
  }

  if (!isWebView && captureStatus) {
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
          setStatus(null);
        }}
      >
        <DialogContent className="!max-w-[80vw] h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              Edit {productionRoleCaptureStatus?.productionRole.name}{" "}
              <span
                className={`capture-status-text ${captureStatus?.toLowerCase()}`}
              >
                {captureStatus}
              </span>{" "}
              Capture Status
            </DialogTitle>
          </DialogHeader>
          <VisuallyHidden>
            <DialogDescription>
              Edit Production Role Capture Status
            </DialogDescription>
          </VisuallyHidden>
          <div className="flex">
            <div
              className={`w-[33%] h-[40vh] cursor-pointer ${status === "Green" ? "bg-green-500" : "bg-slate-500"} hover:bg-green-400 border border-black rounded-tl rounded-bl`}
              onClick={() => onStatusClick("Green")}
            />
            <div
              className={`w-[33%] h-[40vh] cursor-pointer ${status === "Yellow" ? "bg-amber-500" : "bg-slate-500"} hover:bg-amber-400 border border-black`}
              onClick={() => onStatusClick("Yellow")}
            />
            <div
              className={`w-[33%] h-[40vh] cursor-pointer ${status === "Red" ? "bg-red-500" : "bg-slate-500"} hover:bg-red-400 border border-black rounded-tr rounded-br`}
              onClick={() => onStatusClick("Red")}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {isNotesEnabled && (
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
                        className={`col-span-3 w-full capture-status-border ${status?.toLowerCase()}`}
                      />
                    )}
                  />
                </div>
              </div>
            )}
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
            Edit {productionRoleCaptureStatus?.productionRole.name}{" "}
            <span
              className={`capture-status-text ${captureStatus?.toLowerCase()}`}
            >
              {captureStatus}
            </span>{" "}
            Capture Status
          </DialogTitle>
        </DialogHeader>
        <VisuallyHidden>
          <DialogDescription>
            Edit Production Role Capture Status
          </DialogDescription>
        </VisuallyHidden>
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
