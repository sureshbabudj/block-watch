import Link from "next/link";

export function NavBar() {
  return (
    <div className="fixed bottom-0 border-gray-100 border-2 left-0 bg-white shadow-xl rounded-full w-full h-16 mb-1">
      <ul className="flex justify-around items-center h-full">
        <li className="text-orange-500">
          <Link href="/">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
            </svg>
          </Link>
        </li>
        <li className="text-gray-400 relative">
          <Link href="/main">
            <div className="absolute h-8 w-8 top-0 right-0">
              <svg
                className="absolute text-orange-500 border-white"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                stroke="#fff"
                strokeWidth="3"
              >
                <circle cx="85" cy="15" r="15" />
              </svg>
            </div>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M20.4 14.5L16 10 4 20" />
            </svg>
          </Link>
        </li>
        <li className="text-gray-400">
          <Link href="/signin">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10" cy="20.5" r="1" />
              <circle cx="18" cy="20.5" r="1" />
              <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
            </svg>
          </Link>
        </li>
        <li className="text-gray-400">
          <Link href="/main">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>
        </li>
      </ul>
    </div>
  );
}
