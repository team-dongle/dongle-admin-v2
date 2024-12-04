import { fetchData } from "@/apis/fetch";
import { BannerListResponse, GeneralResponse } from "@/types/response";
import { BannerPayload } from "@/types/banner";

export async function getBannerList() {
  return await fetchData<BannerListResponse>("/banners", {
    method: "GET",
    cache: "no-cache",
  });
}

export async function createBanner(payload: BannerPayload) {
  return await fetchData<GeneralResponse>("/banners/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
}

export async function updateBannerOrder(bannerId: number, order: number) {
  return await fetchData<GeneralResponse>(`/banners/${bannerId}/updateOrder`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: { order: order },
  });
}

export async function deleteBanner(bannerId: number) {
  return await fetchData<GeneralResponse>(`/banners/${bannerId}`, {
    method: "DELETE",
  });
}
