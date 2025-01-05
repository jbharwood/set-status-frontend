import {
  IMessage,
  IProductionRoleCaptureStatusesHistory,
} from "../types/interfaces";

type MessageProps = {
  content: IProductionRoleCaptureStatusesHistory;
  type: IMessage["type"];
};

export default function Message({ content, type }: MessageProps) {
  const {
    last_modified_by,
    notes,
    formatted_last_modified_time,
    capture_status_name,
    production_role_abbreviation,
  } = content;

  return (
    <div className="bg-slate-200/80 dark:bg-black/50 border-slate-200 rounded-md break-words mt-1">
      <div className="flex gap-2 p-1">
        <div
          className={`capture-status-bg-${capture_status_name?.toLowerCase()} rounded-full h-6 w-6`}
        />
        {last_modified_by} ({production_role_abbreviation}) -{" "}
        {formatted_last_modified_time} : {notes}
      </div>
    </div>
  );
}
