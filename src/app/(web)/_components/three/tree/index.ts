import * as THREE from 'three';
const createLeaves = () => {
  const leavesGroup = new THREE.Group();

  // 創建三個三角錐
  const coneGeometry = new THREE.ConeGeometry(
    1,      // 底部半徑
    2,      // 高度
    3,      // 分段數（3 為三角錐）
    1,      // 高度分段
    false,  // 底部開放
    0,      // 起始角度
    Math.PI * 2 // 角度範圍
  );

  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x2D5A27,  // 深綠色
    roughness: 0.8,
    metalness: 0.2
  });
  // 創建三個錐體並設置不同的角度
  const cone1 = new THREE.Mesh(coneGeometry, leafMaterial);
  cone1.position.y = 1;
  // cone1.rotation.x = Math.PI * 0.1;  // 稍微傾斜
  const cone2 = new THREE.Mesh(coneGeometry, leafMaterial);
  cone2.position.y = 0;
  // cone2.rotation.z = Math.PI * 2 / 3;  // 旋轉 120 度
  // cone2.rotation.x = Math.PI * 0.1;
  const cone3 = new THREE.Mesh(coneGeometry, leafMaterial);
  cone3.position.y = -1;
  // cone3.rotation.z = Math.PI * 4 / 3;  // 旋轉 240 度
  // cone3.rotation.x = Math.PI * 0.1;
  // 將三個錐體添加到組中
  leavesGroup.add(cone1);
  leavesGroup.add(cone2);
  leavesGroup.add(cone3);
  return leavesGroup;
};
const treeFactory = (position: { x: number, y: number, z: number; }) => {
  const tree = new THREE.Group();
  // const leaf = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshStandardMaterial({ color: 0x00FF00 }));
  const leaf = createLeaves();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1, 32), new THREE.MeshStandardMaterial({ color: 0x8B4513 }));
  leaf.position.set(0, 0.5, 0);
  trunk.position.set(0, -1.5, 0);
  tree.add(leaf);
  tree.add(trunk);
  tree.position.set(position.x, position.y, position.z);
  tree.rotation.x = -Math.PI / 6
  return tree;
};
export { treeFactory };