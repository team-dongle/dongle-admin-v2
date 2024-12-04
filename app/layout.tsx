import type { Metadata, Viewport } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "동글 관리자",
  description: "우리의 동아리, 우리의 동글",
  metadataBase: new URL("https://admin.dongle.world"),
  openGraph: {
    images: [{ url: "./thumbnail.png", alt: "동글 썸네일" }],
    locale: "ko",
    url: "https://admin.dongle.world",
    description: "우리의 동아리, 우리의 동글",
    type: "website",
    siteName: "동글 관리자",
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
  initialScale: 1,
  width: "device-width",
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
