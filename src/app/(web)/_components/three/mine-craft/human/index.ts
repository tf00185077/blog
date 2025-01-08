import head from "./head";
import body from "./body";
import handFactory from "./hand";
import legFactory from "./leg";

import * as THREE from "three";

const human = new THREE.Group();

const leftHand = handFactory({ handWidth: 0.5, handHeight: 0.8, handDepth: 0.5 }, { clothWidth: 0.5, clothHeight: 0.4, clothDepth: 0.5 });
leftHand.position.x = -0.8;
leftHand.position.y = -1.2;

const rightHand = handFactory({ handWidth: 0.5, handHeight: 0.8, handDepth: 0.5 }, { clothWidth: 0.5, clothHeight: 0.4, clothDepth: 0.5 });
rightHand.position.x = 0.8;
rightHand.position.y = -1.2;

const handAnimationSetting = () => {
  const speed = 0.005;  // 控制走路速度
  const maxRotation = Math.PI / 4;  // 控制腿擺動的最大角度
  return function update(timestamp: number) {
    rightHand.rotation.x = Math.sin(timestamp * speed) * maxRotation;
    leftHand.rotation.x = Math.sin(timestamp * speed + Math.PI) * maxRotation;
  };
}
const handAnimation = handAnimationSetting();

const leftLeg = legFactory({ legWidth: 0.5, legHeight: 0.4, legDepth: 0.7 }, { paintWidth: 0.5, paintHeight: 1, paintDepth: 0.7 });
leftLeg.position.x = -0.25;
leftLeg.position.y = -2.5;

const rightLeg = legFactory({ legWidth: 0.5, legHeight: 0.4, legDepth: 0.7 }, { paintWidth: 0.5, paintHeight: 1, paintDepth: 0.7 });
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
export default human;
export { legAnimation, handAnimation };



