import ModalOverlay from "@/components/common/modal/ModalOverlay";
import Modal from "@/components/common/modal/Modal";
import ReportDetail from "@/components/domain/@club/reports/detail/ReportDetail";
import { getReportDetail } from "@/apis/report";

export default async function ReportDetailModal({
  params,
}: {
  params: Promise<{ reportId: number }>;
}) {
  const reportId = (await params).reportId;
  const {
    result: { title, content, images },
  } = await getReportDetail(reportId);

  return (
    <ModalOverlay>
      <Modal title="활동보고서">
        <ReportDetail title={title} content={content} images={images} />
      </Modal>
    </ModalOverlay>
  );
}
