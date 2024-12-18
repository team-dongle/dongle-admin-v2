"use server";

import { fetchData } from "@/apis/fetch";
import {
  ClubDetailResponse,
  ClubListResponse,
  ClubReportListResponse,
  GeneralResponse,
} from "@/types/response";
import { ClubPayload } from "@/types/club";

export async function getClubList() {
  return await fetchData<ClubListResponse>("/clubs", {
    method: "GET",
    cache: "default",
  });
}

export async function getClubDetail(clubId: number) {
  return await fetchData<ClubDetailResponse>(`/clubs/${clubId}`, {
    method: "GET",
  });
}

export async function getClubReports(clubId: number) {
  return await fetchData<ClubReportListResponse>(`/clubs/${clubId}/reports`, {
    method: "GET",
  });
}

export async function createClub(clubData: ClubPayload) {
  return await fetchData<GeneralResponse>("/clubs/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: clubData,
  });
}

export async function updateClub(clubId: number, clubData: ClubPayload) {
  return await fetchData<GeneralResponse>(`/clubs/${clubId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: clubData,
  });
}

export async function deleteClub(clubId: number) {
  return await fetchData<GeneralResponse>(`/clubs/${clubId}`, {
    method: "DELETE",
  });
}
