"use client";

import Modal from "@/src/shared/components/ui/Modal";
import type { Profile } from "../../services/profileService";
import ProfileForm from "./ProfileForm";

interface ProfileFormModalProps {
  open: boolean;
  onClose: () => void;
  initial?: Profile | null;
}

export default function ProfileFormModal({
  open,
  onClose,
  initial,
}: ProfileFormModalProps) {
  const isCreate = !initial;

  return (
    <Modal open={open} onClose={onClose} className="sm:max-w-2xl">
      <h2 className="mb-4 text-2xl font-bold text-text-primary">
        {isCreate ? "Completa tu perfil" : "Editar perfil"}
      </h2>
      <ProfileForm initial={initial} onSuccess={onClose} onCancel={onClose} />
    </Modal>
  );
}