"use client";

import React from "react";
import ServiceLogo from "@/components/common/ServiceLogo";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import { serviceLogout } from "@/apis/auth";

interface Props {
  role: "CLUB" | "ADMIN";
  children: React.ReactNode;
}

const ServiceLayout = ({ role, children }: Props) => {
  return (
    <>
      <header className="fixed left-0 top-0 z-10 flex h-screen w-48 flex-col items-center justify-start gap-20 border-b border-gray-100 bg-sky-900 pt-10 max-md:h-20 max-md:w-full max-md:flex-row max-md:justify-between max-md:px-12 max-md:pt-0">
        <ServiceLogo type="text" />
        <Navigation role={role} />
        <button
          className="my-4 h-14 w-full rounded-md border-0 text-base text-[rgba(255,255,255,0.25)] max-md:hidden"
          onClick={async () => await serviceLogout()}
        >
          로그아웃
        </button>
      </header>
      <main className="min-h-screen bg-gray-100 pb-36 pl-60 pr-12 pt-16 max-md:p-8 max-md:pb-60 max-md:pt-28">
        {children}
      </main>
      <footer className="absolute right-0 flex h-24 w-[calc(100%-12rem)] translate-y-[-100%] flex-col items-center justify-center gap-1 bg-gray-100 max-md:left-0 max-md:w-full max-md:items-start max-md:pl-10">
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
    </>
  );
};

export default ServiceLayout;
