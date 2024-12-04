import ClubList from "@/components/domain/@admin/clubs/ClubList";
import { getClubList } from "@/apis/club";

export default async function Page() {
  const clubList = await getClubList();

  return (
    <section className="relative h-full w-full">
      <h1 className="mb-12 text-3xl font-normal max-md:mb-6">동아리 관리</h1>
      <div className="mb-4 h-auto w-full rounded-md bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-bold text-gray-700">Information</h2>
        <ol className="flex list-decimal flex-col gap-1.5 pl-4">
          <li className="text-sm text-gray-700">
            <span className="underline underline-offset-4">회원 추가 후</span>{" "}
            동아리 생성이 가능합니다. 꼭 회원 생성 후 동아리 생성을 진행해
            주세요.
          </li>
          <li className="text-sm text-gray-700">
            서버 과부화 문제로 잦은 동아리 로고 변경은 삼가 부탁드립니다.
          </li>
        </ol>
      </div>
      <ClubList clubs={clubList.result.rows} />
    </section>
  );
}
