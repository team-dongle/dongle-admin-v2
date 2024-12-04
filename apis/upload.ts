"use client";

import {
  UploadAttachmentResponse,
  UploadBannerResponse,
  UploadLogoResponse,
  UploadThumbnailResponse,
} from "@/types/response";
import { fetchData } from "@/apis/fetch";

export async function uploadLogo(image: FormData) {
  return await fetchData<UploadLogoResponse>("/upload/logo", {
    method: "POST",
    body: image,
  });
}

export async function uploadAttachment(attachment: FormData) {
  return await fetchData<UploadAttachmentResponse>("/upload/attachment", {
    method: "POST",
    body: attachment,
  });
}

export async function uploadThumbnail(thumbnail: FormData) {
  return await fetchData<UploadThumbnailResponse>("/upload/thumbnail", {
    method: "POST",
    body: thumbnail,
  });
}

export async function uploadBanner(banner: FormData) {
  return await fetchData<UploadBannerResponse>("/upload/banner", {
    method: "POST",
    body: banner,
  });
}
