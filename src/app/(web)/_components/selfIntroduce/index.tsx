import TextArea from './text-area';
import Three from '../three';

const SelfIntroduce = () => {
  return (
    <div className="w-[calc(100dvw-100px)] h-[calc(100dvh-64px)] absolute top-0 left-0">
      <TextArea />
      <Three />
    </div >
  );
};

export default SelfIntroduce;