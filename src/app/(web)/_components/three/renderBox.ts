
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface RenderBoxOptions {
  width: number;
  height: number;
  fitContainer?: boolean;    // 是否自適應容器大小
  maintainAspect?: boolean;  // 是否保持寬高比
  position?: 'absolute' | 'relative'; // 定位方式
  fullCover?: boolean;       // 是否完全覆蓋容器
}

const RenderBox = (node: HTMLDivElement, options: RenderBoxOptions) => {
  const width = options.width;
  const height = options.height;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.z = 10;
  camera.position.set(0, 7, 10);  // 設置相機位置在較高處且稍微後退
  // camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 0);  // 第二個參數0 表示完全透明
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 限制最大像素比
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  // 啟用陰影
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  if (options.position) {
    canvas.style.position = options.position;
  }

  // 如果需要完全覆蓋容器
  if (options.fullCover) {
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // 確保容器有正確的定位
    if (window.getComputedStyle(node).position === 'static') {
      node.style.position = 'relative';
    }
  }
  let cleanup: (() => void) | undefined;
  if (options.fitContainer) {
    const resizeHandler = () => {
      const newWidth = node.clientWidth;
      const newHeight = options.maintainAspect
        ? (node.clientWidth * height) / width
        : node.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    cleanup = () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }
  node.appendChild(renderer.domElement);

  // 添加 OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 添加阻尼效果，使旋轉更平滑
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;    // 允許縮放

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

  return { scene, camera, renderer, controls, cleanup };
};

export default RenderBox;