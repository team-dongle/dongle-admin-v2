import ServiceLogo from "@/components/common/ServiceLogo";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="m-[0_auto] flex h-screen w-auto flex-col items-center justify-center gap-4 p-6">
      <ServiceLogo type="full" />
      <h1 className="text-xl font-semibold text-gray-500">
        페이지를 찾을 수 없습니다.
      </h1>
      <Link
        href="/"
        className="text-md text-gray-300 hover:text-sky-500 hover:underline"
      >
        메인 페이지로 돌아가기
      </Link>
    </div>
  );
}
