import ReportList from "@/components/domain/@club/reports/ReportList";

export default function Page() {
  return (
    <section className="relative h-full w-full">
      <h1 className="mb-12 text-3xl font-normal">활동보고서 관리</h1>
      <ReportList
        reports={[
          {
            _id: 1,
            title: "활동보고서 1",
            content: "동아리 활동보고서",
            images: [],
            club: { _id: 1, name: "동글" },
            createdAt: new Date(),
          },
          {
            _id: 2,
            title: "활동보고서 2",
            content: "동아리 활동보고서입니다람쥐",
            images: [],
            club: { _id: 2, name: "둥글" },
            createdAt: new Date(),
          },
        ]}
      />
    </section>
  );
}
