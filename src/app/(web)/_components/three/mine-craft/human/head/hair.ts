import * as THREE from "three";
const hairFactory = (width:number, height:number,depth:number)=>{
  const hairMaterial = new THREE.MeshPhongMaterial({
    color: 'orange', 
    shininess: 20,
    specular: 0x222222
  });
  const hairGeometry = new THREE.BoxGeometry(width, height, depth);
  const hair = new THREE.Mesh(hairGeometry, hairMaterial);
  return hair;
}
export default hairFactory;
