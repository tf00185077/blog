import * as THREE from "three";
import { skinMaterial, clothMaterial } from './helper';
interface HandProps {
  handWidth?: number;
  handHeight?: number;
  handDepth?: number;
}
interface ClothProps {
  clothWidth?: number;
  clothHeight?: number;
  clothDepth?: number;
}
const handFactory = (handProps: HandProps, clothProps: ClothProps) => {
  const { handWidth = 1, handHeight = 1, handDepth = 1 } = handProps;
  const { clothWidth = 1, clothHeight = 1, clothDepth = 1 } = clothProps;
  const hand = new THREE.Group();
  const clothGeometry = new THREE.BoxGeometry(clothWidth, clothHeight, clothDepth);
  const clothMesh = new THREE.Mesh(clothGeometry, clothMaterial);

  const handGeometry = new THREE.BoxGeometry(handWidth, handHeight, handDepth);
  const handMesh = new THREE.Mesh(handGeometry, skinMaterial);
  handMesh.position.y = -0.60;
  hand.add(clothMesh);
  hand.add(handMesh);
  return hand;
};
export default handFactory;
