import ModalOverlay from "@/components/common/modal/ModalOverlay";
import Modal from "@/components/common/modal/Modal";
import DeleteReport from "@/components/domain/@club/reports/delete/DeleteReport";

export default async function ReportDeleteModal({
  params,
}: {
  params: Promise<{ reportId: number }>;
}) {
  const reportId = (await params).reportId;
  return (
    <ModalOverlay>
      <Modal title="활동보고서 삭제">
        <DeleteReport reportId={reportId} />
      </Modal>
    </ModalOverlay>
  );
}
