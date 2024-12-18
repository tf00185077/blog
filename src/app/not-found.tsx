import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[100%]">
      <h1 className="text-4xl font-bold">Still in development...</h1>
      <Link href="/" className="mt-4 px-6 py-2 text-text-accent rounded-lg hover:text-text-main transition-colors">
        Return Home
      </Link>
    </div>
  );
}