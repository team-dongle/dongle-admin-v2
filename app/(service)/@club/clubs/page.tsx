import { getProfile } from "@/apis/user";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Page() {
  const {
    result: { club },
  } = await getProfile();

  if (!club) return notFound();

  return (
    <section className="relative h-full w-full">
      <h1 className="mb-12 text-3xl font-normal max-md:mb-6">동아리 관리</h1>
      <div className="mb-4 h-auto w-full rounded-md bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-bold text-gray-700">Information</h2>
        <ol className="flex list-decimal flex-col gap-1.5 pl-4">
          <li className="text-sm text-gray-700">
            서버 과부화 문제로 잦은 동아리 로고 변경은 삼가 부탁드립니다.
          </li>
        </ol>
      </div>
      <div className="flex flex-col items-start justify-start gap-4">
        <Link
          scroll={false}
          className="text-md flex h-12 w-full items-center justify-start rounded-lg bg-white px-4 py-6 text-black shadow"
          href={`/clubs/modify/${club._id}`}
        >
          동아리 수정 바로가기
        </Link>
        <Link
          className="text-md flex h-12 w-full items-center justify-start rounded-lg bg-white px-4 py-6 text-black shadow"
          href={`${process.env.NEXT_PUBLIC_SERVICE_URL}/detail/${club._id}`}
        >
          동아리 정보 바로가기
        </Link>
      </div>
    </section>
  );
}
