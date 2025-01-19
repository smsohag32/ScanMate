const LoadingSpinner = () => {
   return (
      <div className="flex justify-center items-center flex-col py-8 space-y-4">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 animate-spin text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor">
            <circle
               cx="12"
               cy="12"
               r="10"
               strokeWidth="4"
               className="opacity-25"
            />
            <circle
               cx="12"
               cy="12"
               r="10"
               strokeWidth="4"
               strokeDasharray="60, 60"
               strokeLinecap="round"
               className="opacity-75"
            />
         </svg>
         <p className="text-xl text-primary font-semibold">Generating Code...</p>
      </div>
   );
};

export default LoadingSpinner;
