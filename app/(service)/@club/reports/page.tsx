import ReportList from "@/components/domain/@club/reports/ReportList";
import { getProfile } from "@/apis/user";
import { getClubReports } from "@/apis/club";

export default async function Page() {
  const {
    result: { club },
  } = await getProfile();

  if (!club) return;

  const reportList = await getClubReports(club._id);

  return (
    <section className="relative h-full w-full">
      <h1 className="mb-12 text-3xl font-normal">활동보고서 관리</h1>
      <div className="mb-4 h-auto w-full rounded-md bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-bold text-gray-700">Information</h2>
        <ol className="flex list-decimal flex-col gap-1.5 pl-4">
          <li className="text-sm text-gray-700">
            활동보고서 제목은 5자 이상, 20자 미만으로 작성 가능합니다.
          </li>
          <li className="text-sm text-gray-700">
            활동보고서 본문은 100자 이상, 1000자 미만으로 작성 가능합니다.
          </li>
          <li className="text-sm text-gray-700">
            활동 사진은 최소 1장, 최대 3장 업로드 가능합니다.
          </li>
        </ol>
      </div>
      <ReportList reports={reportList.result.rows} />
    </section>
  );
}
