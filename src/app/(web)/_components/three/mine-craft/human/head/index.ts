import * as THREE from "three";
import hairFactory from "./hair";
import eyeFactory from "./eye";
import noseFactory from "./nose";
import { skinMaterial } from "../helper";
const head = new THREE.Group();

const topHair = hairFactory(1, 1, 0.2);
topHair.rotateX(Math.PI / 2);

const backHair = hairFactory(1, 1, 0.4);
backHair.position.z = -0.4;
backHair.position.y = -0.4;


const faceGeometry = new THREE.BoxGeometry(1, .8, 0.7);
const face = new THREE.Mesh(faceGeometry, skinMaterial);
face.position.z = 0.15;
face.position.y = -0.5;

const leftEye = eyeFactory({ whitesOfEyeWidth: 0.3, whitesOfEyeHeight: 0.15 }, { irisWidth: 0.15, irisHeight: 0.15, irisPositionX: 0.08 });
leftEye.position.z = 0.51;
leftEye.position.x = -0.25;
leftEye.position.y = -0.3;

const rightEye = eyeFactory({ whitesOfEyeWidth: 0.3, whitesOfEyeHeight: 0.15 }, { irisWidth: 0.15, irisHeight: 0.15, irisPositionX: -0.08 });
rightEye.position.z = 0.51;
rightEye.position.x = 0.25;
rightEye.position.y = -0.3;

const nose = noseFactory(0.35, 0.15);
nose.position.z = 0.51;
nose.position.y = -0.6;

head.add(topHair);
head.add(backHair);
head.add(face);
head.add(leftEye);
head.add(rightEye);
head.add(nose);
export default head;
