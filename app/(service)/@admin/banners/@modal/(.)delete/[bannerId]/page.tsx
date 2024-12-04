import ModalOverlay from "@/components/common/modal/ModalOverlay";
import Modal from "@/components/common/modal/Modal";
import DeleteBanner from "@/components/domain/@admin/banners/delete/DeleteBanner";

export default async function DeleteBannerModal({
  params,
}: {
  params: Promise<{ bannerId: number }>;
}) {
  const bannerId = (await params).bannerId;
  return (
    <ModalOverlay>
      <Modal title="배너 삭제">
        <DeleteBanner bannerId={bannerId} />
      </Modal>
    </ModalOverlay>
  );
}
