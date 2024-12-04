import ModalOverlay from "@/components/common/modal/ModalOverlay";
import Modal from "@/components/common/modal/Modal";
import CreateUserForm from "@/components/domain/@admin/users/create/CreateUserForm";

export default function CreateUserModal() {
  return (
    <ModalOverlay>
      <Modal title="회원 추가">
        <CreateUserForm />
      </Modal>
    </ModalOverlay>
  );
}
