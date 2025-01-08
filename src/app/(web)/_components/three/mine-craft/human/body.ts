import * as THREE from "three";
import { skinMaterial, clothMaterial } from "./helper";
const body = new THREE.Group();

const clothGeometry = new THREE.BoxGeometry(1, 1.5, 0.75);
const clothMesh = new THREE.Mesh(clothGeometry, clothMaterial);
clothMesh.position.y = -1.65;

const neckGroup = new THREE.Group();
const neckGeometry = new THREE.PlaneGeometry(0.15, 0.15);
const neckMesh1 = new THREE.Mesh(neckGeometry, skinMaterial);
neckMesh1.position.x = -0.05;
const neckMesh2 = new THREE.Mesh(neckGeometry, skinMaterial);
neckMesh2.position.x = 0.05;
const neckMesh3 = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.10), skinMaterial);
neckMesh3.position.y = -0.1;

neckGroup.position.y = -0.95;
neckGroup.position.z = 0.38;
neckGroup.add(neckMesh1);
neckGroup.add(neckMesh2);
neckGroup.add(neckMesh3);


body.add(clothMesh);
body.add(neckGroup);

export default body;
