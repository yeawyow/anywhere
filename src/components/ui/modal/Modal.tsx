import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'; // ขนาดของ Modal
  customWidth?: string; // ความกว้างที่กำหนดเอง
  fullscreen?: boolean; // เปิดใช้งาน fullscreen หรือไม่
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  customWidth,
  fullscreen = false,
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  // ถ้า fullscreen กำหนดความกว้างและความสูงเต็มจอ
  const fullscreenClasses = fullscreen
    ? 'w-full h-full max-w-none max-h-none'
    : `${sizeClasses[size]} ${customWidth ? customWidth : ''}`;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={onClose}>
        {/* Overlay (พื้นหลังมืด) */}
        <div className="fixed inset-0 bg-black bg-opacity-50" />

        {/* Modal Content (อยู่ตรงกลาง) */}
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <Dialog.Panel
            className={`bg-white rounded-lg p-6 shadow-lg w-full ${fullscreenClasses}`}
          >
            {title && (
              <Dialog.Title className="text-lg font-semibold">
                {title}
              </Dialog.Title>
            )}
            <div className="mt-2">{children}</div>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
