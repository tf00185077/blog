'use client';
import * as THREE from 'three';
import { treeFactory } from '../tree';
const map = new THREE.Group();
let animationId: number | null = null;
let ground: THREE.Mesh | null = null;
const trees: THREE.Group[] = [];  // 存儲所有樹
const TREE_SPACING = 20;          // 樹之間的間距
const TREE_COUNT = 5;             // 同時存在的樹的數量
const MOVE_SPEED = 0.2;
const GROUND_ANGLE = -Math.PI / 10;
const initMap = () => {
  return new Promise((resolve) => {
    const groundGeometry = new THREE.BoxGeometry(100, 5, 2000);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.8,
      metalness: 0.2,
    });
    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = GROUND_ANGLE;
    ground.position.y = -7;

    for (let i = 0; i < TREE_COUNT; i++) {
      const tree = treeFactory({
        x: -50,  // 地板寬度的一半
        y: -5,   // 貼著地板
        z: -i * TREE_SPACING  // 沿著地板分布
      });
      const scale = 2 + Math.random();  // 或更精確的: 2 + (Math.random() * (3 - 2))
      tree.scale.set(scale, scale, scale);
      tree.position.z = Math.random() * 30;
      tree.position.y = 2;
      tree.position.x = Math.random() > 0.5 ? -30 + Math.random() * 100 : 30 - Math.random() * 100;
      trees.push(tree);
      map.add(tree);
    }

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
  // let treeIndex = TREE_COUNT;
  const animate = () => {
    // 移動地板
    if (ground) {
      if (ground.material instanceof THREE.MeshStandardMaterial && ground.material.map) {
        ground.material.map.offset.y -= 0.0002; // 調整這個值來改變紋理滾動速度
        trees.forEach((tree) => {
          // 移動樹
          tree.position.z -= MOVE_SPEED;  // 向前移動
          const yOffset = MOVE_SPEED * Math.tan(GROUND_ANGLE);
          tree.position.y += yOffset;
          // 如果樹移動到前方太遠，將其重置到後方
          if (tree.position.z < -200) {  // 當樹超出視野
            const scale = 2 + Math.random();  // 或更精確的: 2 + (Math.random() * (3 - 2))
            tree.scale.set(scale, scale, scale);
            tree.position.z = Math.random() * 30;
            tree.position.x = Math.random() > 0.5 ? -25 + Math.random() * 10 : 25 + Math.random() * 10;  // 隨機左右位置
            tree.position.y = 2;  // 重置 Y 軸位置
          }
        });
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