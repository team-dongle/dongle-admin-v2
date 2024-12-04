export interface UserType {
  _id: number;
  username: string;
  password?: string;
  name: string;
  role: "ADMIN" | "CLUB";
  club: { _id: number; name: string } | null;
}

export interface UserPayload {
  username: string;
  password: string;
  name: string;
  role: "CLUB";
}
