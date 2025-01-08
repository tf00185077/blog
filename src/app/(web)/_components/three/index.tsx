"use client";
import { useState, useCallback } from "react";
import RenderBox from "./renderBox";
import human, { legAnimation, handAnimation } from "./mine-craft/human";
const initScene = async (node: HTMLDivElement) => {
  const { scene, renderer, camera, controls } = RenderBox(node);

  scene.add(human);

  const animate = (timestamp: number) => {
    requestAnimationFrame(animate);
    legAnimation(timestamp);
    handAnimation(timestamp);
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