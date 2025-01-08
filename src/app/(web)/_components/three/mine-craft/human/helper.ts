import * as THREE from "three";
const skinMaterial = new THREE.MeshStandardMaterial({
  color: '#ecd7bb',  // 膚色
  emissive: '#ecd7bb',
  emissiveIntensity: 0.4,
  roughness: 0.6,    // 較光滑的皮膚質感
  metalness: 0.0     // 皮膚不是金屬質感
});
const clothMaterial = new THREE.MeshPhongMaterial({
  color: '#4660d9',
  shininess: 20,
  specular: 0x222222
});

const paintMaterial = new THREE.MeshPhongMaterial({
  color: '#7186e7',
  shininess: 20,
  specular: 0x222222
});

const shoesMaterial = new THREE.MeshPhongMaterial({
  color: '#858080',
  shininess: 20,
  specular: 0x222222
});

export { skinMaterial, clothMaterial, paintMaterial, shoesMaterial };
