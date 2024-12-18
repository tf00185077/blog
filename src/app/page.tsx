import SelfIntroduce from './components/selfIntroduce';
import Link from 'next/link';
const Home = async () => {
  return (
    <div className="min-h-screen">
      <SelfIntroduce />

      {/* 作品集 */}
      <div className=" grid grid-cols-2 gap-6 p-8">
        {/* 大文章區塊 */}
        <div className="col-span-2 aspect-[5/1] bg-gray-50 rounded-lg p-4">
        </div>

        {/* 兩個小文章區塊 */}
        <div className="col-span-1 aspect-[5/2] bg-gray-50 rounded-lg p-4">
        </div>
        <div className="col-span-1 aspect-[5/2] bg-gray-50 rounded-lg p-4">
        </div>
        <div className="col-span-2 flex justify-end">
          <Link
            href="/post"
            className="px-6 py-2 text-text-accent rounded-lg hover:text-text-main transition-colors"
          >
            see more...
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;