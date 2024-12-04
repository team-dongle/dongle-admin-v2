import CreateClubForm from "@/components/domain/@admin/clubs/create/CreateClubForm";
import Modal from "@/components/common/modal/Modal";
import ModalOverlay from "@/components/common/modal/ModalOverlay";

export default function CreateClubModal() {
  return (
    <ModalOverlay>
      <Modal title="동아리 생성">
        <CreateClubForm />
      </Modal>
    </ModalOverlay>
  );
}
