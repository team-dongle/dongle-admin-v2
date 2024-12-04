import BannerList from "@/components/domain/@admin/banners/BannerList";
import { getBannerList } from "@/apis/banner";

export default async function Page() {
  const bannerList = await getBannerList();

  return (
    <section className="relative h-full w-full">
      <h1 className="mb-12 text-3xl font-normal max-md:mb-6">배너 관리</h1>
      <div className="mb-4 h-auto w-full rounded-md bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-bold text-gray-700">Information</h2>
        <ol className="flex list-decimal flex-col gap-1.5 pl-4">
          <li className="text-sm text-gray-700">
            배너는 최대 5개까지 업로드 가능합니다.
          </li>
          <li className="text-sm text-gray-700">
            권장 사이즈는 가로 896px, 세로 192px입니다. (14:3 비율)
          </li>
          <li className="text-sm text-gray-700">
            업로드 가능한 확장자는 .jpg, .jpeg, .png, .gif 입니다.
          </li>
        </ol>
      </div>
      <BannerList banners={bannerList.result.rows} />
    </section>
  );
}
