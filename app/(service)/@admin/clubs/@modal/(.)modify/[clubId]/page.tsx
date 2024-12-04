import { getClubDetail } from "@/apis/club";
import ModifyClubForm from "@/components/domain/common/clubs/modify/ModifyClubForm";
import Modal from "@/components/common/modal/Modal";
import ModalOverlay from "@/components/common/modal/ModalOverlay";

export default async function ModifyClubModal({
  params,
}: {
  params: Promise<{ clubId: number }>;
}) {
  const clubId = (await params).clubId;
  const { result } = await getClubDetail(clubId);

  return (
    <ModalOverlay>
      <Modal title="동아리 수정">
        <ModifyClubForm defaultValue={result} />
      </Modal>
    </ModalOverlay>
  );
}
