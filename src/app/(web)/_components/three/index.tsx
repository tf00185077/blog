"use client";
import { useState, useCallback } from "react";
// import loadModel from "./TryModel";
import CustomHumanHead from "./CustomHumanHead";
import RenderBox from "./renderBox";
const initScene = async (node: HTMLDivElement) => {
  const { scene, renderer, camera } = RenderBox(node);
  // try {
  //   const model = await loadModel();
  //   scene.add(model);

  // } catch (error) {
  //   console.error('Failed to load model:', error);
  // }

  const { update: headUpdate, dispose: headDispose } = CustomHumanHead(scene);

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