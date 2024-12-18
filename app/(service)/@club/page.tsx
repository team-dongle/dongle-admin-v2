import { getProfile } from "@/apis/user";
import Banner from "@/components/domain/common/dashboard/Banner";
import Section from "@/components/domain/common/dashboard/Section";
import Notices from "@/components/domain/common/dashboard/Notices";
import ClubTotalPageView from "@/components/domain/@club/dashboard/analytics/ClubTotalPageView";
import { getBannerList } from "@/apis/banner";
import { getNoticeList } from "@/apis/notice";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  if (role !== "CLUB") return null;

  const {
    result: { name, club },
  } = await getProfile();
  const bannerList = await getBannerList();
  const notices = await getNoticeList();

  return (
    <>
      <h1 className="mb-12 text-3xl font-normal">
        안녕하세요, <span className="font-bold text-sky-700">{name}</span> 님!
      </h1>
      <div className="mb-10 h-auto w-full">
        <Banner banners={bannerList.result.rows} />
      </div>
      <div className="grid h-auto w-full grid-flow-row grid-cols-2 gap-8 max-md:grid-cols-1">
        <Section
          title="공지사항"
          linkTo={`${process.env.NEXT_PUBLIC_SERVICE_URL}/notice`}
        >
          <Notices notices={notices.result.rows} />
        </Section>
        <Section title="동아리 조회수">
          <ClubTotalPageView clubId={club?._id} />
        </Section>
      </div>
    </>
  );
}
