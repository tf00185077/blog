"use client";
import { useState, useCallback } from "react";
import RenderBox from "./renderBox";
import { createHuman } from "./mine-craft/human";
const initScene = async (node: HTMLDivElement) => {
  const { scene, renderer, camera, controls } = RenderBox(node, { width: 300, height: 300 });
  const { model: humanModel, animate: humanAnimate } = createHuman();
  scene.add(humanModel);

  const animate = (timestamp: number) => {
    requestAnimationFrame(animate);
    humanAnimate(timestamp);
    controls.update();
    renderer.render(scene, camera);
  };
  animate(10000);

  return () => {
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