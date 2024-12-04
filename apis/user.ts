import { fetchData } from "@/apis/fetch";
import {
  GeneralResponse,
  UserListResponse,
  UserProfileResponse,
} from "@/types/response";
import { UserPayload } from "@/types/user";

export async function getProfile() {
  return await fetchData<UserProfileResponse>("/users/profile", {
    method: "GET",
  });
}

export async function getUserList() {
  return await fetchData<UserListResponse>("/users", { method: "GET" });
}

export async function createUser(payload: UserPayload) {
  return await fetchData<GeneralResponse>("/users/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
}

export async function deleteUser(userId: number) {
  return await fetchData<GeneralResponse>(`/users/${userId}`, {
    method: "DELETE",
  });
}
