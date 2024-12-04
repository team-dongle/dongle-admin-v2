import React from "react";
import DongleLogoExpanded from "@/assets/icons/service-logo-full.svg";
import DongleLogo from "@/assets/icons/service-logo.svg";
import DongleLogoText from "@/assets/icons/service-logo-text.svg";
import Link from "next/link";

interface Props {
  type: "logo" | "text" | "full";
}

const ServiceLogo = ({ type = "text" }: Props) => {
  return (
    <Link href="/">
      {type === "full" && <DongleLogoExpanded width={150} height={70} />}
      {type === "logo" && <DongleLogo width={50} height={50} />}
      {type === "text" && <DongleLogoText width={100} height={30} />}
    </Link>
  );
};

export default ServiceLogo;
