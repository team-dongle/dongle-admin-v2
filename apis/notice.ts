import { fetchData } from "@/apis/fetch";
import { GeneralResponse, NoticeListResponse } from "@/types/response";
import { NoticePayload } from "@/types/notice";

export async function getNoticeList() {
  return await fetchData<NoticeListResponse>("/notices", {
    method: "GET",
    cache: "default",
  });
}

export async function createNotice(payload: NoticePayload) {
  return await fetchData<GeneralResponse>("/notices/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
}

export async function deleteNotice(noticeId: number) {
  return await fetchData<GeneralResponse>(`/notices/${noticeId}`, {
    method: "DELETE",
  });
}
