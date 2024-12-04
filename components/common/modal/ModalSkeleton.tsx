"use client";

import React from "react";
import ModalOverlay from "@/components/common/modal/ModalOverlay";
import Modal from "@/components/common/modal/Modal";

const ModalSkeleton = () => {
  return (
    <ModalOverlay>
      <Modal>
        <div className="flex h-auto flex-col items-start justify-start gap-4">
          <div className="h-4 w-1/4 animate-skeleton-gradient rounded-l bg-gradient-to-br from-gray-200 via-white to-gray-200 bg-[length:400%_400%]" />
          <div className="h-4 w-full animate-skeleton-gradient rounded-l bg-gradient-to-br from-gray-200 via-white to-gray-200 bg-[length:400%_400%]" />
          <div className="h-4 w-full animate-skeleton-gradient rounded-l bg-gradient-to-br from-gray-200 via-white to-gray-200 bg-[length:400%_400%]" />
          <div className="h-4 w-full animate-skeleton-gradient rounded-l bg-gradient-to-br from-gray-200 via-white to-gray-200 bg-[length:400%_400%]" />
          <div className="h-4 w-full animate-skeleton-gradient rounded-l bg-gradient-to-br from-gray-200 via-white to-gray-200 bg-[length:400%_400%]" />
          <div className="h-4 w-full animate-skeleton-gradient rounded-l bg-gradient-to-br from-gray-200 via-white to-gray-200 bg-[length:400%_400%]" />
          <div className="h-[100px] w-full animate-skeleton-gradient rounded-l bg-gradient-to-br from-gray-200 via-white to-gray-200 bg-[length:400%_400%]" />
        </div>
      </Modal>
    </ModalOverlay>
  );
};

export default ModalSkeleton;
