'use client'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// 改為返回 Promise
const loadModel = async (): Promise<THREE.Group> => {
    const loader = new OBJLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            '/models/Minotaur_Male_Lores.obj',
            (obj) => {
                obj.scale.set(0.1, 0.1, 0.1); // 調整模型大小
                obj.position.set(0, -10, 0);     // 調整模型位置
                resolve(obj);
            },
            // 添加載入進度回調（可選）
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // 添加錯誤處理
            (error) => {
                console.error('An error occurred loading the model:', error);
                reject(error);
            }
        );
    });
}

export default loadModel;