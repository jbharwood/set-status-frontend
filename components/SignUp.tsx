import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";
import { IUser } from "@/types/interfaces";

type SignUpProps = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  userNameInput: string;
  setUserNameInput: React.Dispatch<React.SetStateAction<string>>;
  roomInput: string;
  setRoomInput: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

export default function SignUp({
  socket,
  userNameInput,
  setUserNameInput,
  setUser,
  setRoomInput,
  roomInput,
}: SignUpProps) {
  function addUser() {
    setUser({ name: userNameInput, id: socket.id, room: roomInput });
    socket.emit("join_room", { user: userNameInput, room: roomInput });
    setUserNameInput("");
    setRoomInput("");
  }

  return (
    <div className="w-full h-full flex flex=col items-center justify-center">
      <div className="text-center grid gap-2 gradient p-8 rounded-md">
        <h1 className="text-6xl font-bold text-white">Chat App</h1>
        <h2 className="text-2xl text-white">Username:</h2>
        <input
          type="text"
          className="text-2xl text-center rounded-md p-2 my-2 text-blue-400 placeholder-blue-300 focus:outline-none"
          placeholder="..."
          value={userNameInput}
          onChange={(e) => setUserNameInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
        />
        <h2 className="text-2xl text-white">Room:</h2>
        <input
          type="text"
          className="text-2xl text-center rounded-md p-2 my-2 text-blue-400 placeholder-blue-300 focus:outline-none"
          placeholder="..."
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
        />
        <button
          className={`text-xl w-full text-white font-bold py-2 px-3 rounded-md ${
            userNameInput && roomInput ? "bg-sky-400" : "bg-slate-400"
          }`}
          disabled={!userNameInput || !roomInput}
          onClick={addUser}
        >
          Join Chat
        </button>
      </div>
    </div>
  );
}
