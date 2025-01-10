"use client";
import { useState, useCallback } from "react";
import RenderBox from "./renderBox";
import { createHuman } from "./mine-craft/human";
import { map, initMap, cleanupAnimation } from "./map";
const initScene = async (node: HTMLDivElement) => {
  const { scene, renderer, camera, controls } = RenderBox(node, { width: 300, height: 300, position: 'absolute', fullCover: true, fitContainer: true });

  const { model: humanModel, animate: humanAnimate } = createHuman();
  humanModel.position.set(0, 0, 0);
  scene.add(humanModel);

  await initMap();
  scene.add(map);

  const animate = (timestamp: number) => {
    requestAnimationFrame(animate);
    humanAnimate(timestamp);
    controls.update();
    renderer.render(scene, camera);
  };
  animate(10000);

  return () => {
    cleanupAnimation();
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
    <main className="w-[calc(100dvw)] h-[calc(100dvh-64px)] absolute top-0 left-0">
      <div
        className=" w-full h-full absolute top-0 left-0"
        ref={threeDivRef}
      ></div>
    </main>
  );
}