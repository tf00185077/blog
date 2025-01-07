"use client";
import { useState, useCallback } from "react";
import * as THREE from "three";
import loadModel from "./TryModel";
import CustomHumanHead from "./CustomHumanHead";
const initScene = async (node: HTMLDivElement) => {
  const width = 300;
  const height = 300;
  const scene = new THREE.Scene();
  try {
    const model = await loadModel();
    model.scale.set(0.1, 0.1, 0.1); // 調整模型大小
    model.position.set(0, -10, 0);     // 調整模型位置
    scene.add(model);
  } catch (error) {
    console.error('Failed to load model:', error);
  }
  const camera = new THREE.PerspectiveCamera();
  camera.position.z = 10;
  // camera.position.y = 2;
  camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,               // 啟用 alpha 通道
    antialias: true           // 可選：啟用抗鋸齒
  });
  renderer.setClearColor(0x000000, 0);  // 第二個參數是 alpha 值，0 表示完全透明
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
  const {update:headUpdate, dispose:headDispose} = CustomHumanHead(scene);
  
  const animate = () => {
    requestAnimationFrame(animate);
    headUpdate?.();
    renderer.render(scene, camera);
  };
  animate();

  return () => {
    headDispose?.();
  };
};

export default function Home() {
  const [initialized, setInitialized] = useState(false);

  const threeDivRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null && !initialized) {
        initScene(node);
        setInitialized(true);
      }
    },
    [initialized]
  );

  return (
    <main>
      <div
        className=""
        ref={threeDivRef}
      ></div>
    </main>
  );
}