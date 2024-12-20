export interface IMessage {
    content: string;
    type: "text" | "image" | "server";
    user: IUser;
}

export interface IUser {
    id?: string;
    name?: string | null;
    current?: {
      name?: string, 
      id?: string
    }
    room?: string;
    image?: string;
}