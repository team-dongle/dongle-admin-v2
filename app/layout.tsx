import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "동글 관리자",
  description: "우리의 동아리, 우리의 동글",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="md:h-screen" lang="ko">
      <body>{children}</body>
    </html>
  );
}
