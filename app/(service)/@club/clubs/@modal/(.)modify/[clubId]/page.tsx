import ModalOverlay from "@/components/common/modal/ModalOverlay";
import Modal from "@/components/common/modal/Modal";
import ModifyClubForm from "@/components/domain/common/clubs/modify/ModifyClubForm";
import { getClubDetail } from "@/apis/club";

export default async function ClubModifyModal({
  params,
}: {
  params: Promise<{ clubId: number }>;
}) {
  const clubId = (await params).clubId;
  const clubData = await getClubDetail(clubId);

  return (
    <ModalOverlay>
      <Modal title="동아리 수정">
        <ModifyClubForm defaultValue={clubData.result} />
      </Modal>
    </ModalOverlay>
  );
}
