export default function CircleSpinner() {
  return (
    <svg className="w-8 h-8 transform-gpu origin-center animate-spinner-rotate" viewBox="0 0 50 50">
      <circle
        className="animate-spinner-dash stroke-gray-300 fill-none"
        cx="25"
        cy="25"
        r="20"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}