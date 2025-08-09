import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoaderCircle size={36} className="animate-spin text-muted-medium cursor-progress" />
    </div>
  );
}
