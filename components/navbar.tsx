import Link from "next/link";
import SearchBar from "./search-bar";

export default function Navbar({}: {}) {
  return (
    <nav className=" flex justify-between items-center px-6 py-4 bg-white border-b">
      <div className="flex-1">
        <h1 className="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          <Link href="/">PokéDex App</Link>
        </h1>
      </div>
        <SearchBar />
      <div className="flex-1" />
    </nav>
  );
}
