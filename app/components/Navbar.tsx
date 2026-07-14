import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4 flex gap-6">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/bulletins">Bulletins</Link>
    </nav>
  );
}