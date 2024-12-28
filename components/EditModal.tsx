import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type EditModalProps = {
  isEditModalOpen: boolean;
  setisEditModalOpen: (value: boolean) => void;
};

export default function EditModal({
  isEditModalOpen,
  setisEditModalOpen,
}: EditModalProps) {
  return (
    <Dialog
      open={isEditModalOpen}
      onOpenChange={() => setisEditModalOpen(false)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Production Role Capture Status</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Textarea
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
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
