"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#135d66] to-[#0a3d40]">
      <div className="text-center p-6 max-w-lg w-full">
        <div className="mb-4 p-2 rounded-full bg-white shadow-lg inline-block">
          <svg
            className="w-16 h-16 text-[#135d66]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Oops! Something Went Wrong
        </h2>
        <p className="text-gray-300 mb-6">
          {error?.message ||
            "We encountered an unexpected issue. Please try again or contact support if the problem persists."}
        </p>
        <button
          onClick={reset}
          className="bg-white text-[#135d66] hover:bg-gray-100 font-bold py-2 px-4 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-90 focus:outline-none focus:ring-4 focus:ring-[#135d66]/50 shadow-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
