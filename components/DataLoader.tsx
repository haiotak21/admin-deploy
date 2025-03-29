'use client';

import { ReactNode } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export const DataLoader = ({
  isLoading,
  error,
  children,
}: {
  isLoading: boolean;
  error: Error | null;
  children: ReactNode;
}) => {
  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
      {children}
      <Toaster position="bottom-right" />
    </>
  );
};