import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-white via-pink-50 to-primary/10 px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="rounded-lg bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary/90"
          >
            Go Home
          </Link>
          <Link
            href="/blogs"
            className="rounded-lg border-2 border-primary bg-white px-8 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            View Blogs
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border-2 border-primary bg-white px-8 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
