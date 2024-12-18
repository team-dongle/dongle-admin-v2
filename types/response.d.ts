import { NoticeType } from "@/types/notice";
import { ClubType } from "@/types/club";
import { CategoryType } from "@/types/category";
import { UserType } from "@/types/user";
import { AttachmentType } from "@/types/file";
import { BannerType } from "@/types/banner";
import { ReportType } from "@/types/report";

export interface GeneralResponse {
  code: number;
  message?: string;
}

/**
 *  Auth
 */
export interface LoginResponse extends GeneralResponse {
  result: {
    accessToken: string;
    refreshToken: string;
    role: "ADMIN" | "CLUB";
  };
}

export interface TokenRefreshResponse extends GeneralResponse {
  result: { accessToken: string; refreshToken: string };
}

/**
 *  Club
 */
export interface ClubListResponse extends GeneralResponse {
  result: { count: number; rows: ClubType[] };
}

export interface ClubDetailResponse extends GeneralResponse {
  result: ClubType;
}

export interface ClubReportListResponse extends GeneralResponse {
  result: { count: number; rows: ReportType[] };
}

/**
 *  User
 */
export interface UserProfileResponse extends GeneralResponse {
  result: {
    _id: number;
    username: string;
    role: "ADMIN" | "CLUB";
    name: string;
    club: { _id: number; name: string } | null;
  };
}

export interface UserListResponse extends GeneralResponse {
  result: {
    count: number;
    rows: UserType[];
  };
}

export interface UserDetailResponse extends GeneralResponse {
  result: UserType;
}

/**
 *  Notice
 */
export interface NoticeListResponse extends GeneralResponse {
  result: { count: number; rows: NoticeType[] };
}

export interface NoticeDetailResponse extends GeneralResponse {
  result: NoticeType;
}

/**
 *  Category
 */
export interface CategoryListResponse extends GeneralResponse {
  result: { count: number; rows: CategoryType[] };
}

/**
 *  Banner
 */
export interface BannerListResponse extends GeneralResponse {
  result: { count: number; rows: BannerType[] };
}

/**
 *  Report
 */
export interface ReportListResponse extends GeneralResponse {
  result: { count: number; rows: ReportType[] };
}

/**
 *  Upload
 */
export interface UploadLogoResponse extends GeneralResponse {
  result: { url: string };
}

export interface UploadAttachmentResponse extends GeneralResponse {
  result: AttachmentType;
}

export interface UploadThumbnailResponse extends GeneralResponse {
  result: { key: string; fileName: string; url: string };
}

export interface UploadBannerResponse extends GeneralResponse {
  result: { url: string };
}

export interface UploadReportImageResponse extends GeneralResponse {
  result: { url: string };
}
