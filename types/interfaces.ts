export interface IMessage {
    content: string;
    type: "text" | "image" | "server";
    user: IUser;
}

export interface IUser {
    id?: string;
    name?: string;
    current?: {
      name?: string, 
      id?: string
    }
    room?: string;
}