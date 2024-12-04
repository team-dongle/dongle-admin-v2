import React from "react";
import { cookies } from "next/headers";
import ServiceLayout from "@/components/layout/ServiceLayout";
import "@/styles/keen-slider.min.css";

interface Props {
  admin: React.ReactNode;
  club: React.ReactNode;
}

export default async function Layout({ admin, club }: Props) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  return (
    <ServiceLayout role={role === "ADMIN" ? "ADMIN" : "CLUB"}>
      {role === "ADMIN" ? admin : club}
    </ServiceLayout>
  );
}
