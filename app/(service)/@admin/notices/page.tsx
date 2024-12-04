import NoticeList from "@/components/domain/@admin/notices/NoticeList";
import { getNoticeList } from "@/apis/notice";

export default async function Page() {
  const noticeList = await getNoticeList();
  return (
    <section className="relative h-full w-full">
      <h1 className="mb-12 text-3xl font-normal max-md:mb-6">공지사항 관리</h1>
      <NoticeList notices={noticeList.result.rows} />
    </section>
  );
}
