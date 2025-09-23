// src/components/ui/LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
