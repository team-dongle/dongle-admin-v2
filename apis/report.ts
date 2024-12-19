import { ReportPayload } from "@/types/report";
import { fetchData } from "@/apis/fetch";
import {
  GeneralResponse,
  ReportDetailResponse,
  ReportListResponse,
} from "@/types/response";

export async function getReportList() {
  return await fetchData<ReportListResponse>("/reports", { method: "GET" });
}

export async function getReportDetail(reportId: number) {
  return await fetchData<ReportDetailResponse>(`/reports/${reportId}`, {
    method: "GET",
  });
}

export async function createReport(payload: ReportPayload) {
  return await fetchData<GeneralResponse>("/reports/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
}

export async function updateReport(reportId: number, payload: ReportPayload) {
  return await fetchData<GeneralResponse>(`/reports/${reportId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
}

export async function deleteReport(reportId: number) {
  return await fetchData<GeneralResponse>(`/reports/${reportId}`, {
    method: "DELETE",
  });
}
