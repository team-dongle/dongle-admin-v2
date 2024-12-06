export interface BannerType {
  _id: number;
  name: string;
  description: string;
  imageUrl: string;
  href?: string;
  order: number;
}

export interface BannerPayload {
  name: string;
  description: string;
  imageUrl: string;
  href?: string;
}

export interface SortableBannerType extends Omit<BannerType, "_id"> {
  id: number;
}
