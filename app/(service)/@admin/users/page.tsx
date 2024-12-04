import UserList from "@/components/domain/@admin/users/UserList";
import { getUserList } from "@/apis/user";

export default async function Page() {
  const userList = await getUserList();

  return (
    <section className="relative h-full w-full">
      <h1 className="mb-12 text-3xl font-normal max-md:mb-6">회원 관리</h1>
      <div className="bottom-0 mb-4 h-auto w-full rounded-md bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-bold text-gray-700">Information</h2>
        <ol className="flex list-decimal flex-col gap-1.5 pl-4">
          <li className="text-sm text-gray-700">
            <span className="underline underline-offset-4">회원 추가 후</span>{" "}
            동아리 생성이 가능합니다. 꼭 회원 생성 후 동아리 생성을 진행해
            주세요.
          </li>
          <li className="text-sm text-gray-700">
            타인에게 계정을 공유하지 마세요. 계정 공유로 인한 피해는 책임지지
            않습니다.
          </li>
          <li className="text-sm text-gray-700">
            회원 삭제 시 소속 동아리도 함께 삭제됩니다. 회원 삭제는 신중하게
            부탁 드립니다.
          </li>
          <li className="text-sm text-gray-700">
            비밀번호는 서버에 암호화되어 저장됩니다.{" "}
            <span className="underline underline-offset-4">
              분실 시 복구가 불가능
            </span>
            하오니 신중하게 작성하고 보관해주시길 바랍니다.
          </li>
        </ol>
      </div>
      <UserList users={userList.result.rows} />
    </section>
  );
}
