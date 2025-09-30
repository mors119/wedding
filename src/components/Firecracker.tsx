import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLoader, useThree } from '@react-three/fiber';
import gsap from 'gsap';

import vert from '@/shaders/firework/vertex.glsl';
import frag from '@/shaders/firework/fragment.glsl';

type FireworkProps = {
  count: number;
  origin: THREE.Vector3 | [number, number, number];
  size: number;
  texture: THREE.Texture;
  radius: number;
  color: THREE.Color | string | number;
  onComplete?: () => void;
};

export function Firework({
  count,
  origin,
  size,
  texture,
  radius,
  color,
  onComplete,
}: FireworkProps) {
  const { size: viewportSize } = useThree();
  const pointsRef = useRef<THREE.Points | null>(null);

  // uniforms: React에서 재생성되지 않도록 useMemo
  const uniforms = useMemo(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resolution = new THREE.Vector2(
      viewportSize.width * dpr,
      viewportSize.height * dpr,
    );

    // 텍스처 플래그(원본 코드와 동일)
    texture.flipY = false;

    return {
      uSize: new THREE.Uniform(size),
      uResolution: new THREE.Uniform(resolution),
      uTexture: new THREE.Uniform(texture),
      uColor: new THREE.Uniform(new THREE.Color(color as THREE.Color)),
      uProgress: new THREE.Uniform(0),
    };
  }, [size, texture, color, viewportSize.width, viewportSize.height]);

  // 리사이즈 시 uResolution 갱신
  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    uniforms.uResolution.value.set(
      viewportSize.width * dpr,
      viewportSize.height * dpr,
    );
  }, [viewportSize.width, viewportSize.height, uniforms]);

  // BufferGeometry 생성(입자 구면 분포)
  const geometry = useMemo(() => {
    const positionsArray = new Float32Array(count * 3);
    const sizesArray = new Float32Array(count);
    const timeMultipliersArray = new Float32Array(count);

    const tmp = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const spherical = new THREE.Spherical(
        radius * (0.75 + Math.random() * 0.25),
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2,
      );
      tmp.setFromSpherical(spherical);

      positionsArray[i3] = tmp.x;
      positionsArray[i3 + 1] = tmp.y;
      positionsArray[i3 + 2] = tmp.z;

      sizesArray[i] = Math.random();
      timeMultipliersArray[i] = 1 + Math.random();
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positionsArray, 3),
    );
    geom.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1));
    geom.setAttribute(
      'aTimeMultiplier',
      new THREE.Float32BufferAttribute(timeMultipliersArray, 1),
    );

    return geom;
  }, [count, radius]);

  // ShaderMaterial 생성
  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return mat;
  }, [uniforms]);

  // 라이프사이클: GSAP으로 uProgress 0→1, 완료 시 onComplete + 메모리 해제
  useEffect(() => {
    const tween = gsap.to(uniforms.uProgress, {
      value: 1,
      duration: 3,
      ease: 'linear',
      onComplete: () => {
        onComplete?.();
      },
    });
    return () => {
      tween.kill();
      // 메모리 정리
      material.dispose();
      geometry.dispose();
    };
  }, [uniforms, geometry, material, onComplete]);

  // origin을 group/points position으로 전달
  const originVec =
    origin instanceof THREE.Vector3
      ? origin
      : new THREE.Vector3(origin[0], origin[1], origin[2]);

  return (
    <points ref={pointsRef} position={originVec}>
      {/* geometry/material을 직접 주입 */}
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </points>
  );
}

export function FireworksManager({ complete }: { complete: boolean }) {
  const textures = useLoader(THREE.TextureLoader, [
    '/particles/3.png',
    '/particles/4.png',
    '/particles/5.png',
    '/particles/6.png',
    '/particles/7.png',
    '/particles/8.png',
  ]);

  const { viewport } = useThree(); // 카메라 기준 월드 단위 폭/높이
  const [items, setItems] = useState<
    Array<{
      id: number;
      count: number;
      origin: [number, number, number];
      size: number;
      texture: THREE.Texture;
      radius: number;
      color: THREE.ColorRepresentation;
    }>
  >([]);
  const idRef = useRef(0);

  // 공통 스폰 유틸: 특정 위치에 발사
  const spawnAt = useCallback(
    (
      origin: [number, number, number],
      opt?: Partial<{
        count: number;
        size: number;
        radius: number;
        color: THREE.ColorRepresentation;
        texture: THREE.Texture;
      }>,
    ) => {
      const count = opt?.count ?? Math.round(500 + Math.random() * 600);
      const size = opt?.size ?? 0.28 + Math.random() * 0.08;
      const radius = opt?.radius ?? 0.9 + Math.random() * 0.6;
      const texture =
        opt?.texture ?? textures[Math.floor(Math.random() * textures.length)];
      const color =
        opt?.color ?? new THREE.Color().setHSL(Math.random(), 1, 0.7).getHex();

      setItems((prev) => [
        ...prev,
        { id: idRef.current++, count, origin, size, texture, radius, color },
      ]);
    },
    [textures],
  );

  // 랜덤 스폰(기존 클릭용)
  const spawnRandom = useCallback(() => {
    const origin: [number, number, number] = [
      (Math.random() - 0.5) * 2,
      Math.random(),
      (Math.random() - 0.5) * 2,
    ];
    spawnAt(origin);
  }, [spawnAt]);

  // 클릭으로 생성
  useEffect(() => {
    const handler = () => spawnRandom();
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [spawnRandom]);

  // 완료 시 인트로 연출(좌/우 6발씩)
  const introLaunched = useRef(false);

  useEffect(() => {
    if (!complete || introLaunched.current) return;

    introLaunched.current = true;

    // 화면 기준 좌/우 위치 계산
    const w = viewport.width;
    const h = viewport.height;

    // y 레일 3개 (아래→위)
    const lanesY = [
      -h * 0.1,
      h * 0.15,
      h * 0.4,
      -h * 0.45,
      -h * 0.33,
      h * 0.31,
    ];

    const leftX = -w * 0.35;
    const rightX = w * 0.35;

    const common = {
      count: 700,
      size: 0.28,
      radius: 0.9,
    };

    const palette = ['#FFD166', '#EF476F', '#06D6A0', '#118AB2', '#E0AAFF'];

    // 좌/우 각각 3발씩, 살짝 딜레이 스태거
    lanesY.forEach((y, i) => {
      const delay = i * 0.18;

      gsap.delayedCall(delay, () =>
        spawnAt([leftX, y, 0], {
          ...common,
          color: palette[(i * 2) % palette.length],
        }),
      );
      gsap.delayedCall(delay + 0.06, () =>
        spawnAt([rightX, y + (Math.random() - 0.5) * h * 0.06, 0], {
          ...common,
          color: palette[(i * 2 + 1) % palette.length],
        }),
      );
    });

    // gsap.delayedCall(0.35, () =>
    //   spawnAt([0, h * 0.25, 0], {
    //     ...common,
    //     color: '#ffffff',
    //     radius: 1.1,
    //     size: 0.18,
    //   }),
    // );
  }, [complete, viewport.width, viewport.height, spawnAt]);

  const handleComplete = useCallback((id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  return (
    <>
      {items.map((it) => (
        <Firework
          key={it.id}
          count={it.count}
          origin={it.origin}
          size={it.size}
          texture={it.texture}
          radius={it.radius}
          color={it.color}
          onComplete={() => handleComplete(it.id)}
        />
      ))}
    </>
  );
}
