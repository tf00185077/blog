import { EntityMap } from "./type";
import { uploadImage } from "@/lib/utils/upladImage";
const createImageMap = (entityMap: EntityMap) => {
  const imageMap = new Map<string, EntityMap[string][]>();

  Object.values(entityMap).forEach(entity => {
    if (entity.type === 'IMAGE') {
      const fileName = entity.data.file.name;
      if (!imageMap.has(fileName)) {
        imageMap.set(fileName, []);
      }
      imageMap.get(fileName)!.push(entity);
    }
  });

  return imageMap;
};

const processImage = async (
  image: File,
  imageMap: Map<string, EntityMap[string][]>
): Promise<void> => {
  const imagePath = await uploadImage(image);
  const entities = imageMap.get(image.name) || [];

  entities.forEach(entity => {
    entity.data.src = imagePath;
    delete entity.data.tempKey;
  });
};

export { createImageMap, processImage };
