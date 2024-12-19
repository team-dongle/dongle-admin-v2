export interface AttachmentType {
  key: string;
  url: string;
  fileName: string;
}

export interface ThumbnailType {
  id?: number;
  key: string;
  fileName: string;
  url: string;
  alt?: string;
}

export interface ReportImageType {
  id?: string;
  url: string;
}
