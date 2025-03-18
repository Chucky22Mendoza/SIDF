'use client';

import { useDeleteModalStore } from '@/store/DeleteModalStore';
import CenterModal from '../CenterModal';

function DeleteModal() {
  const isOpen = useDeleteModalStore((state) => state.isOpen);
  const onCancel = useDeleteModalStore((state) => state.onCancel);
  const onConfirm = useDeleteModalStore((state) => state.onConfirm);

  return (
    <CenterModal
      isOpen={isOpen}
      allowConfirm
      confirmButtonText="Sí, Eliminar"
      cancelButtonText="Cancelar"
      hasClickBlurClose
      title="¿Seguro que deseas eliminar este elemento?"
      subtitle="Al eliminar este elemento, no podrás recuperarlo."
      onCancel={onCancel}
      onConfirm={onConfirm}
      onClose={onCancel}
    />
  );
}

export default DeleteModal;
