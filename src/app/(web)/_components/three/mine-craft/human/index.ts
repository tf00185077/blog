import head from "./head";
import body from "./body";
import handFactory from "./hand";
import legFactory from "./leg";

import * as THREE from "three";

interface HumanParts {
  leftLeg?: THREE.Object3D;
  rightLeg?: THREE.Object3D;
  leftHand?: THREE.Object3D;
  rightHand?: THREE.Object3D;
}

const human = new THREE.Group();
const leftHand = handFactory({ handWidth: 0.5, handHeight: 0.8, handDepth: 0.5 }, { clothWidth: 0.5, clothHeight: 0.4, clothDepth: 0.5 });
leftHand.name = 'leftHand';
leftHand.position.x = -0.8;
leftHand.position.y = -1.2;

const rightHand = handFactory({ handWidth: 0.5, handHeight: 0.8, handDepth: 0.5 }, { clothWidth: 0.5, clothHeight: 0.4, clothDepth: 0.5 });
rightHand.name = 'rightHand';
rightHand.position.x = 0.8;
rightHand.position.y = -1.2;

const handAnimationSetting = () => {
  const speed = 0.005;  // 控制走路速度
  const maxRotation = Math.PI / 4;  // 控制腿擺動的最大角度
  return function update(timestamp: number) {
    rightHand.rotation.x = Math.sin(timestamp * speed) * maxRotation;
    leftHand.rotation.x = Math.sin(timestamp * speed + Math.PI) * maxRotation;
  };
};
const handAnimation = handAnimationSetting();

const leftLeg = legFactory({ legWidth: 0.5, legHeight: 0.4, legDepth: 0.7 }, { paintWidth: 0.5, paintHeight: 1, paintDepth: 0.7 });
leftLeg.name = 'leftLeg';
leftLeg.position.x = -0.25;
leftLeg.position.y = -2.5;

const rightLeg = legFactory({ legWidth: 0.5, legHeight: 0.4, legDepth: 0.7 }, { paintWidth: 0.5, paintHeight: 1, paintDepth: 0.7 });
rightLeg.name = 'rightLeg';
rightLeg.position.x = 0.25;
rightLeg.position.y = -2.5;

const legAnimationSetting = () => {
  const speed = 0.005;  // 控制走路速度
  const maxRotation = Math.PI / 4;  // 控制腿擺動的最大角度
  return function update(timestamp: number) {
    // 使用 sin 函數創建來回擺動，左右腿位相差 π
    leftLeg.rotation.x = Math.sin(timestamp * speed) * maxRotation;
    rightLeg.rotation.x = Math.sin(timestamp * speed + Math.PI) * maxRotation;
  };
};
const legAnimation = legAnimationSetting();


human.add(head, body, leftHand, rightHand, leftLeg, rightLeg);
human.position.y = 1.5;

const createHuman = () => {
  const humanInstance = human.clone(true);
  const { leftLeg, rightLeg, leftHand, rightHand } = humanInstance.children.reduce((acc, child) => {
    if (child.name === 'leftLeg') acc.leftLeg = child;
    if (child.name === 'rightLeg') acc.rightLeg = child;
    if (child.name === 'leftHand') acc.leftHand = child;
    if (child.name === 'rightHand') acc.rightHand = child;
    return acc;
  }, {} as HumanParts);

  const createAnimation = () => {
    const speed = 0.005;
    const maxRotation = Math.PI / 4;

    return function update(timestamp: number) {
      if (leftLeg) leftLeg.rotation.x = Math.sin(timestamp * speed) * maxRotation;
      if (rightLeg) rightLeg.rotation.x = Math.sin(timestamp * speed + Math.PI) * maxRotation;
      if (leftHand) leftHand.rotation.x = Math.sin(timestamp * speed) * maxRotation;
      if (rightHand) rightHand.rotation.x = Math.sin(timestamp * speed + Math.PI) * maxRotation;
    };
  };
  return {
    model: humanInstance,
    animate: createAnimation()
  };
};

  export default human;
  export { legAnimation, handAnimation, createHuman };



