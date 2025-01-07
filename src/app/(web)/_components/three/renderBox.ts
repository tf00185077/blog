
import * as THREE from 'three';
const RenderBox = (node: HTMLDivElement) => {
  const width = 300;
  const height = 300;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 0);  // 第二個參數0 表示完全透明
  renderer.setSize(width, height);
  node.appendChild(renderer.domElement);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(2, 2, 5);  // 從右上方打光
  scene.add(mainLight);
  // 添加補光
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
  fillLight.position.set(-2, 0, 3);  // 從左側打補光
  scene.add(fillLight);
  // 添加環境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  return { scene, camera, renderer };
};

export default RenderBox;