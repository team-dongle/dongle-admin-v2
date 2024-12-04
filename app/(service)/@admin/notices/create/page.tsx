import CreateNotice from "@/components/domain/@admin/notices/create/CreateNotice";

export default function Page() {
  return (
    <>
      <h1 className="mb-12 text-3xl font-normal max-md:mb-6">공지사항 작성</h1>
      <CreateNotice />
    </>
  );
}
