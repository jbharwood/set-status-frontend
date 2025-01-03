import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNotifyModalEventStore } from "@/stores/index";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function NotifyModal() {
  const notifyModalEvent = useNotifyModalEventStore(
    (state) => state.notifyModalEvent
  );
  const { eventName, eventPrompt, cb } = notifyModalEvent;
  const setNotifyModalEvent = useNotifyModalEventStore(
    (state) => state.setNotifyModalEvent
  );

  return (
    <Dialog
      open={notifyModalEvent.eventName !== ""}
      onOpenChange={() => {
        setNotifyModalEvent({ eventName: "", eventPrompt: "", cb: () => {} });
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{eventName}</DialogTitle>
        </DialogHeader>
        <VisuallyHidden.Root>
          <DialogDescription>{eventPrompt}</DialogDescription>
        </VisuallyHidden.Root>
        {eventPrompt}
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              cb();
              setNotifyModalEvent({
                eventName: "",
                eventPrompt: "",
                cb: () => {},
              });
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
