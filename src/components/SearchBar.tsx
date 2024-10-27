export function SearchBar() {
  return (
    <div className="relative">
      <span className="absolute text-gray-500 inset-y-0 left-0 pl-8 flex items-center">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>

      <input
        className="block w-full text-gray-600 rounded-full py-3 px-3 bg-gray-200 pl-16 font-thin pr-4 outline-none text-base"
        type="text"
        placeholder="Pencarian..."
      />
    </div>
  );
}
