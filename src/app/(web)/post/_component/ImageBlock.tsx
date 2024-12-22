import { MediaProps } from "../_helper/type";
import NextImage from "next/image";
const Media = (props: MediaProps) => {
  const entityKey = props.block.getEntityAt(0);
  if (!entityKey) return <p className="text-red-500">圖片丟失</p>;

  const entity = props.contentState.getEntity(entityKey);
  const { src, file } = entity.getData() as { src: string; file: { displayWidth: number; displayHeight: number; }; };
  return <NextImage className="max-w-full" width={file.displayWidth} height={file.displayHeight} src={src} alt="插入的圖片" />;
};
export default Media;