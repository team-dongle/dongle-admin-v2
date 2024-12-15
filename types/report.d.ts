export interface ReportType {
  _id: number;
  title: string;
  content: string;
  images: { _id: number; url: string }[];
  club: { _id: number; name: string };
  createdAt: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date;
}

export interface ReportPayload {
  title: string;
  content: string;
  images: { _id: number; url: string }[];
}
