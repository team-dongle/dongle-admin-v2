import { getProfile } from "@/apis/user";
import Notices from "@/components/domain/common/dashboard/Notices";
import Section from "@/components/domain/common/dashboard/Section";
import Banner from "@/components/domain/common/dashboard/Banner";
import TotalPageView from "@/components/domain/@admin/dashboard/analytics/TotalPageView";
import { getBannerList } from "@/apis/banner";

export default async function Page() {
  const {
    result: { name },
  } = await getProfile();
  const bannerList = await getBannerList();

  return (
    <>
      <h1 className="mb-12 text-3xl font-normal">
        안녕하세요, <span className="font-bold text-sky-700">{name}</span> 님!
      </h1>
      <div className="mb-10 h-auto w-full">
        <Banner banners={bannerList.result.rows} />
      </div>
      <div className="grid h-auto w-full grid-flow-row grid-cols-2 gap-8 max-md:grid-cols-1">
        <Section title="공지사항" linkTo="/notices">
          <Notices />
        </Section>
        <Section title="동글 일별 페이지뷰">
          <TotalPageView />
        </Section>
      </div>
    </>
  );
}
