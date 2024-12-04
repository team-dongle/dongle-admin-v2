import ModalOverlay from "@/components/common/modal/ModalOverlay";
import Modal from "@/components/common/modal/Modal";
import DeleteUser from "@/components/domain/@admin/users/delete/DeleteUser";

export default async function DeleteUserModal({
  params,
}: {
  params: Promise<{ userId: number }>;
}) {
  const userId = (await params).userId;

  return (
    <ModalOverlay>
      <Modal title="회원 삭제">
        <DeleteUser userId={userId} />
      </Modal>
    </ModalOverlay>
  );
}
