import * as THREE from "three";

const noseFactory = (width: number, height: number) => {
  const noseMaterial = new THREE.MeshBasicMaterial({ color: '#997260' });
  const noseGeometry = new THREE.PlaneGeometry(width, height);
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  return nose;
};
export default noseFactory;

