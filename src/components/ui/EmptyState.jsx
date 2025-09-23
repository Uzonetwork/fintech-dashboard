// src/components/ui/EmptyState.jsx
export default function EmptyState({ title = "No data", description = "" }) {
  return (
    <div className="bg-white p-8 rounded-lg text-center">
      <div className="text-xl font-semibold mb-2">{title}</div>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
}
