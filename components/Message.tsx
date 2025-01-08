import {
  IMessage,
  IProductionRoleCaptureStatusesHistory,
} from "../types/interfaces";

type MessageProps = {
  content: IProductionRoleCaptureStatusesHistory;
  type: IMessage["type"];
};

export default function Message({ content }: MessageProps) {
  const {
    lastModifiedBy,
    notes,
    lastModifiedTime,
    captureStatus,
    productionRole,
  } = content;
  const { name: captureStatusName } = captureStatus;
  const { abbreviation } = productionRole;
  const localTime = new Date(lastModifiedTime).toLocaleString();

  return (
    <div className="bg-slate-200/80 dark:bg-black/50 border-slate-200 rounded-md break-words mt-1">
      <div className="flex gap-2 p-1">
        <div
          className={`capture-status-bg ${captureStatusName?.toLowerCase()} rounded-full h-6 w-6`}
        />
        <span className="text-gray-600 dark:text-gray-300">{localTime}</span>{" "}
        {""}
        {lastModifiedBy} ({abbreviation}): {notes}
      </div>
    </div>
  );
}
