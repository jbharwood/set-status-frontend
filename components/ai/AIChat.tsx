import type { UIState } from "@/lib/actions";

export default function AIChat({ messages }: { messages: UIState[number][] }) {
  return (
    <div className="relative mx-auto max-w-2xl pt-2 px-14">
      {messages.map((message, index) => (
        <div key={index} className="pb-4">
          {message.display}
        </div>
      ))}
    </div>
  );
}
