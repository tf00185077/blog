'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className='flex items-center p-4 bg-bg-header text-text-main'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>BLOG</h1>
      </div>
      <ul className='flex flex-1 gap-10 justify-center'>
        <li>
          <Link href="/" className={pathname === '/' ? 'font-bold text-text-secondary' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/article?page=1&size=9" className={pathname.startsWith('/article') ? 'font-bold text-text-secondary' : ''}>
            Article
          </Link>
        </li>
        <li>
          <Link href="/post" className={pathname.startsWith('/post') ? 'font-bold text-text-secondary' : ''}>
            Post
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;