export interface NoticeType {
  _id: number;
  title: string;
  content: string;
  createdAt: string | Date;
  attachments?: Record<string, string | number>;
  author: { name: string };
}

export interface NoticePayload {
  title: string;
  content: string;
  attachments?: { id: string; url: string; fileName: string }[];
}
