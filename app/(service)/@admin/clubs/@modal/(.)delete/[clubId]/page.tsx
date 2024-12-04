import ModalOverlay from "@/components/common/modal/ModalOverlay";
import Modal from "@/components/common/modal/Modal";
import DeleteClub from "@/components/domain/@admin/clubs/delete/DeleteClub";
import { getClubDetail } from "@/apis/club";

export default async function DeleteClubModal({
  params,
}: {
  params: Promise<{ clubId: number }>;
}) {
  const clubId = (await params).clubId;
  const clubDetail = await getClubDetail(clubId);

  return (
    <ModalOverlay>
      <Modal title="동아리 삭제">
        <DeleteClub clubId={clubId} clubName={clubDetail.result.name} />
      </Modal>
    </ModalOverlay>
  );
}
