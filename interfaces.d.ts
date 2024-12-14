interface IMessage {
    content: string;
    type: "text" | "image" | "server";
    user: IUser;
}

interface IUser {
    id?: string;
    name?: string;
    current?: {
      name: input, 
      id: socket.id
    }
}