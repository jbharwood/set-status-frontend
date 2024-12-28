type ProductionCaptureStatusProps = {
  setIsEditModalOpen: (value: boolean) => void;
};

export default function ProductionRoleCaptureStatus({
  setIsEditModalOpen,
}: ProductionCaptureStatusProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-full w-36"
      onClick={() => setIsEditModalOpen(true)}
    >
      <div className="border border-black bg-slate-500 h-[7.5%] w-36 flex items-center justify-center">
        Animators
      </div>
      <div className="border border-black bg-green-500 h-[30%] w-36 cursor-pointer hover:bg-green-400" />
      <div className="border border-black bg-yellow-500 h-[30%] w-36 cursor-pointer hover:bg-yellow-400" />
      <div className="border border-black bg-red-500 h-[30%] w-36 cursor-pointer hover:bg-red-400" />
    </div>
  );
}
