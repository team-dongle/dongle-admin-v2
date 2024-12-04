"use server";

import { cookies, headers as nextHeaders } from "next/headers";

export async function fetchData<T = unknown>(
  url: string,
  options: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";
    headers?: HeadersInit;
    body?: FormData | Record<string, any>;
    cache?: RequestCache;
  },
) {
  const headerList = await nextHeaders();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const apiEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;
  const { method, headers, body, cache } = options;
  const requestIp = (headerList.get("x-forwarded-for") ?? "127.0.0.1").split(
    ",",
  )[0];

  const _requestHeader: Headers = new Headers(headers);

  _requestHeader.set("x-forwarded-for", requestIp);

  if (accessToken) _requestHeader.set("Authorization", `Bearer ${accessToken}`);

  const _response = await fetch(`${apiEndpoint}${url}`, {
    method: method,
    headers: _requestHeader,
    body: body instanceof FormData ? body : JSON.stringify(body),
    cache: cache,
  });

  return (await _response.json()) as Promise<T>;
}
