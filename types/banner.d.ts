export interface BannerType {
  _id: number;
  name: string;
  description: string;
  url: string;
  order: number;
}

export interface BannerPayload {
  name: string;
  description: string;
  url: string;
}

export interface SortableBannerType extends Omit<BannerType, "_id"> {
  id: number;
}
