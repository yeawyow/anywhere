import { Button } from '@headlessui/react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import { IoIosPersonAdd } from 'react-icons/io';
import { useState } from 'react';
import Modal from '../components/ui/modal/Modal';
import StudentRegistrationForm from './Form/StudentRegForm';

export default function StudentRegist() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Breadcrumb pageName="ทะเบียนนักษึกษา" />
      {/* <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      /> */}
      {/* <PageBreadcrumb pageTitle="Profile" /> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          <div className="flex items-center gap-3 mt-1-4">
            <Button
              onClick={() => setIsOpen(true)}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-pink-600 hover:bg-brand-600`}
            >
              ลงทะเบียน
              <IoIosPersonAdd size={20} />
            </Button>
          </div>
        </h3>
        <div className="space-y-6">
          <TableOne />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="ลงทะเบียนนักศึกษา"
        fullscreen={true}
      >
        <StudentRegistrationForm />
      </Modal>
    </>
  );
}
