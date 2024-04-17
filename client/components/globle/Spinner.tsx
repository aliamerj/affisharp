"use client";
export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <style jsx>{`
        .spinner-border {
          color: #135d66;
          border-top-color: transparent;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
