"use client";

import React from "react";
import ServiceLogo from "@/components/common/ServiceLogo";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const LoginLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <header className="flex h-auto w-full items-center justify-center">
        <ServiceLogo type="full" />
      </header>
      <main>{children}</main>
      <footer className="flex h-auto w-full flex-col items-center justify-center gap-0.5">
        <span className="text-xs text-gray-300">
          © by dongle. All Right Reserved.
        </span>
        <Link
          className="text-xs text-gray-300"
          href={`mailto:${process.env.NEXT_PUBLIC_SERVICE_CONTACT_EMAIL}`}
        >
          Contact: {process.env.NEXT_PUBLIC_SERVICE_CONTACT_EMAIL}
        </Link>
      </footer>
    </div>
  );
};

export default LoginLayout;
