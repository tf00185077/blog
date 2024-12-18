import SelfIntroduce from './components/selfIntroduce';
const Home = async () => {
  return (
    <div className="min-h-screen">
      <SelfIntroduce />
      {/* 主要內容板塊 */}

      {/* 作品集 */}
      {/* <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
        </div>
        <div className="col-span-1 space-y-6">
          <div className="aspect-square bg-gray-50 rounded-lg p-4 flex items-center justify-center">
          </div>
          <div className="aspect-[4/3] bg-gray-50 rounded-lg p-4">
          </div>
        </div>


        <div className="col-span-1 space-y-4">
          <div className="aspect-[9/16] bg-gray-50 rounded-lg p-4">

          </div>
          <div className="aspect-[9/16] bg-gray-50 rounded-lg p-4">

          </div>
        </div>
      </div> */}
    </div>
  );
};
export default Home;