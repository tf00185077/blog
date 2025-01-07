
import * as THREE from 'three';
import MouseTracker from './helper/MouseTracker';
interface CustomMesh extends THREE.Mesh {
    update?: () => void;
    dispose?: () => void;
}
const CustomHumanHead = (scene: THREE.Scene) => {
    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
        color: '#FFE5D9',      // 使用 color 而不是 emissive 來更好地反應光源
        emissive: '#320000',   // 添加微弱的自發光
        shininess: 30,         // 降低光澤度使其更自然
    });
    const head = new THREE.Mesh(headGeometry, headMaterial) as CustomMesh;
    scene.add(head);

    // 眼睛材質
    const eyeGeometry = new THREE.SphereGeometry(.25);
    const eyeMaterial = new THREE.MeshPhongMaterial({
        emissive: 'gray',
        shininess: 50,
        specular: 0x222222
    });

    // 左眼
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.scale.x = 1;  // 橫向拉伸
    leftEye.scale.y = 1.2;  // 縱向壓縮
    leftEye.position.set(-0.35, 0.2, 0.8);
    head.add(leftEye);
    // 眼球
    const pupilGeometry = new THREE.SphereGeometry(0.1);
    const pupilMaterial = new THREE.MeshPhongMaterial({
        color: 'black',
        emissive: 'black',
        shininess: 50,
    });
    // 左眼球
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(0, 0, 0.17);
    leftEye.add(leftPupil);

    // 右眼
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.scale.x = 1;  // 橫向拉伸
    rightEye.scale.y = 1.2;  // 縱向壓縮
    rightEye.position.set(0.35, 0.2, 0.8);
    head.add(rightEye);
    // 右眼球
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0, 0, 0.17);
    rightEye.add(rightPupil);

    // 鼻子
    const noseGeometry = new THREE.ConeGeometry(
        0.4,    // 底部半徑
        0.7,    // 高度
        3,      // 分段數（3表示三角形）
        1,      // 高度分段
        false   // 是否開放底部
    );
    const noseMaterial = new THREE.MeshPhongMaterial({
        color: '#FFE5D9',      // 使用 color 而不是 emissive 來更好地反應光源
        emissive: '#320000',   // 添加微弱的自發光
        shininess: 30,         // 降低光澤度使其更自然
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.rotation.x = -Math.PI / 11;
    // nose.rotation.y = -Math.PI / 4;  
    nose.position.set(0, 0.15, 0.8);
    head.add(nose);

    // 添加嘴巴
    // 創建 V 形嘴巴
    // 創建嘴巴材質
    const mouthMaterial = new THREE.MeshPhongMaterial({
        color: '#FFB6B6',      // 淡珊瑚紅
        emissive: '#400000',
        shininess: 35,
    });
    // 創建左邊嘴唇
    const leftMouthGeometry = new THREE.BoxGeometry(0.3, 0.06, 0.03); // 寬度、高度、深度
    const leftMouth = new THREE.Mesh(leftMouthGeometry, mouthMaterial);
    leftMouth.position.set(-0.13, -0.4, 1);  // 位置
    leftMouth.rotation.z = -Math.PI / 6;       // 旋轉約30度
    head.add(leftMouth);
    // 創建右邊嘴唇
    const rightMouthGeometry = new THREE.BoxGeometry(0.3, 0.06, 0.03);
    const rightMouth = new THREE.Mesh(rightMouthGeometry, mouthMaterial);
    rightMouth.position.set(0.13, -0.4, 1);  // 位置
    rightMouth.rotation.z = Math.PI / 6;     // 旋轉約-30度
    head.add(rightMouth);
    const mouseTracker = new MouseTracker();
    //  添加更新方法
    head.update = () => {
        const targetRotation = mouseTracker.getRotation();
        head.rotation.y += (targetRotation.y - head.rotation.y) * 0.05;
        head.rotation.x += (targetRotation.x - head.rotation.x) * 0.05;
    };

    // 清理監聽器的方法
    head.dispose = () => {
        mouseTracker.dispose();
    };
    return {
        head,
        update: head.update,
        dispose: head.dispose
    };
};



export default CustomHumanHead;
