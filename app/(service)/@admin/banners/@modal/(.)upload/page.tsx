import ModalOverlay from "@/components/common/modal/ModalOverlay";
import Modal from "@/components/common/modal/Modal";
import UploadBannerForm from "@/components/domain/@admin/banners/upload/UploadBannerForm";

export default function BannerUploadModal() {
  return (
    <ModalOverlay>
      <Modal title="배너 업로드">
        <UploadBannerForm />
      </Modal>
    </ModalOverlay>
  );
}
