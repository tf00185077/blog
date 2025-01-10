'use client';
import * as THREE from 'three';
const map = new THREE.Group();
let animationId: number | null = null;
let ground: THREE.Mesh | null = null;
const initMap = () => {
  return new Promise((resolve) => {
    const groundGeometry = new THREE.BoxGeometry(100, 5, 2000);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.8,
      metalness: 0.2,
    });
    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 10;
    ground.position.y = -7;
    new THREE.TextureLoader().load(
      '/models/texture-grass.jpg',
      (texture) => {
        // 使用最近點過濾來保持紋理清晰
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;

        // 關閉 mipmaps 以避免模糊
        texture.generateMipmaps = false;

        // 紋理重複設置
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 8);  // 減少重複次數可能會更清晰

        // 顏色空間設置
        texture.colorSpace = THREE.SRGBColorSpace;

        groundMaterial.map = texture;
        groundMaterial.needsUpdate = true;

        map.add(ground as THREE.Mesh);
        startAnimation();
        resolve(map);
      }
    );
  });
};
const startAnimation = () => {
  const animate = () => {
    // 移動地板
    if (ground) {
      if (ground.material instanceof THREE.MeshStandardMaterial && ground.material.map) {
        ground.material.map.offset.y -= 0.0002; // 調整這個值來改變紋理滾動速度
      }
    }

    animationId = requestAnimationFrame(animate);
  };

  animate();
};

const cleanupAnimation = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
};
export { map, initMap, cleanupAnimation };