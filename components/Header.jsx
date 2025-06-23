import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
      <Link href="/">
        <h1 className="text-2xl font-bold">Artistly</h1>
      </Link>
      <nav className="flex gap-4 text-sm sm:text-base">
        <Link href="/artists" className="hover:text-blue-600">
          Artists
        </Link>
        <Link href="/onboarding" className="hover:text-blue-600">
          Join as Artist
        </Link>
        <Link href="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
      </nav>
    </header>
  );
}
