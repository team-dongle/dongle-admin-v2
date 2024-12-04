import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./utils/jwt";
import { TokenRefreshResponse } from "./types/response";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  if (accessToken && refreshToken && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (accessToken && isTokenExpired(accessToken)) {
    const response = NextResponse.next();
    const _refreshRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/refresh`,
      {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          Refresh: `${refreshToken}`,
        }),
      },
    );

    if (!_refreshRequest.ok) {
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      response.cookies.delete("role");

      return response;
    }

    const { result: _result } =
      (await _refreshRequest.json()) as TokenRefreshResponse;

    response.cookies.set("accessToken", _result.accessToken);
    return response;
  }
}

export const config = {
  matcher: ["/", "/login", "/(.)clubs/:path*", "/users/:path*"],
};
