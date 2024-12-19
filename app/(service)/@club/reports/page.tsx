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
      <ReportList reports={reportList.result.rows} />
    </section>
  );
}
