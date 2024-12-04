import { fetchData } from "@/apis/fetch";
import { CategoryListResponse } from "@/types/response";

export async function getCategoryList() {
  return await fetchData<CategoryListResponse>("/categories", {
    method: "GET",
    cache: "default",
  });
}
