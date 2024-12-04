import ModalOverlay from "@/components/common/modal/ModalOverlay";
import Modal from "@/components/common/modal/Modal";
import DeleteNotice from "@/components/domain/@admin/notices/delete/DeleteNotice";

export default async function DeleteNoticeModal({
  params,
}: {
  params: Promise<{ noticeId: number }>;
}) {
  const noticeId = (await params).noticeId;
  return (
    <ModalOverlay>
      <Modal title="공지사항 삭제">
        <DeleteNotice noticeId={noticeId} />
      </Modal>
    </ModalOverlay>
  );
}
