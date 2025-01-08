import * as THREE from "three";
import {  paintMaterial, shoesMaterial } from "./helper";
interface LegProps {
  legWidth?: number;
  legHeight?: number;
  legDepth?: number;
}
interface PaintProps {
  paintWidth?: number;
  paintHeight?: number;
  paintDepth?: number;
}
const legFactory = (legProps: LegProps, paintProps: PaintProps) => {
  const { legWidth = 1, legHeight = 1, legDepth = 1 } = legProps;
  const { paintWidth = 1, paintHeight = 1, paintDepth = 1 } = paintProps;
  const leg = new THREE.Group();
 
  // 創建褲子部分
  const paintGeometry = new THREE.BoxGeometry(paintWidth, paintHeight, paintDepth);
  const paintMesh = new THREE.Mesh(paintGeometry, paintMaterial);
  // 將褲子向下移動自身高度的一半
  paintMesh.position.y = -paintHeight / 2;
  
  // 創建鞋子部分
  const shoesGeometry = new THREE.BoxGeometry(legWidth, legHeight, legDepth);
  const shoesMesh = new THREE.Mesh(shoesGeometry, shoesMaterial);
  // 將鞋子放在褲子下方
  shoesMesh.position.y = -(paintHeight + legHeight / 2);

  leg.add(shoesMesh);
  leg.add(paintMesh);
  return leg;
};
export default legFactory;  
