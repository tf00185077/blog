import * as THREE from "three";

interface WhitesOfEyeProps {
  whitesOfEyeWidth?: number;
  whitesOfEyeHeight?: number;
}
interface IrisProps {
  irisWidth?: number;
  irisHeight?: number;
  irisPositionX?: number;
  irisPositionY?: number;
}

const eyeFactory = (whitesOfEyeProps: WhitesOfEyeProps, irisProps: IrisProps) => {
  const { whitesOfEyeWidth = 1, whitesOfEyeHeight = 1 } = whitesOfEyeProps;
  const { irisWidth = 1, irisHeight = 1, irisPositionX = 0, irisPositionY = 0 } = irisProps;
  const eye = new THREE.Group();

  const whitesOfEyesMaterial = new THREE.MeshBasicMaterial({ color: 'white' });
  const whitesOfEyesGeometry = new THREE.PlaneGeometry(whitesOfEyeWidth, whitesOfEyeHeight);
  const whitesOfEye = new THREE.Mesh(whitesOfEyesGeometry, whitesOfEyesMaterial);

  const irisMaterial = new THREE.MeshBasicMaterial({ color: '#392121' });
  const irisGeometry = new THREE.PlaneGeometry(irisWidth, irisHeight);
  const iris = new THREE.Mesh(irisGeometry, irisMaterial);
  iris.position.z = 0.01;
  iris.position.x = irisPositionX;
  iris.position.y = irisPositionY;


  eye.add(whitesOfEye);
  eye.add(iris);
  return eye;
};
export default eyeFactory;

