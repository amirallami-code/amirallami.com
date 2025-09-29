"use client";

import * as THREE from 'three';
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
    order: number;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    arcAlt: number;
    color: string;
};

export type GlobeConfig = {
    pointSize?: number;
    globeColor?: string;
    showAtmosphere?: boolean;
    atmosphereColor?: string;
    atmosphereAltitude?: number;
    emissive?: string;
    emissiveIntensity?: number;
    shininess?: number;
    polygonColor?: string;
    ambientLight?: string;
    directionalLeftLight?: string;
    directionalTopLight?: string;
    pointLight?: string;
    arcTime?: number;
    arcLength?: number;
    rings?: number;
    maxRings?: number;
    initialPosition?: {
        lat: number;
        lng: number;
    };
    autoRotate?: boolean;
    autoRotateSpeed?: number;
};

interface WorldProps {
    globeConfig: GlobeConfig;
    data: Position[];
}

const shiraz = { lat: 29.5918, lng: 52.5837 };

const cities = [
    { name: "New York", lat: 40.7128, lng: -74.006 },
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
    { name: "Toronto", lat: 43.65107, lng: -79.347015 },
    { name: "Edmonton", lat: 53.5461, lng: -113.4938 },
    { name: "Melbourne", lat: -37.8136, lng: 144.9631 },
    { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
    { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
    { name: "Texas", lat: 31.9686, lng: -99.9018 },
    { name: "Madrid", lat: 40.4168, lng: -3.7038 },
    { name: "Berlin", lat: 52.52, lng: 13.405 },
    { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "Mumbai", lat: 19.076, lng: 72.8777 },
];

export const sampleArcs: Position[] = [];

let order = 1;
cities.forEach((city) => {
    sampleArcs.push({
        order: order++,
        startLat: shiraz.lat,
        startLng: shiraz.lng,
        endLat: city.lat,
        endLng: city.lng,
        arcAlt: 0.3 + Math.random() * 0.2,
        color: "#507dbb",
    });
});


export function Globe({ globeConfig, data }: WorldProps) {
    const globeRef = useRef<ThreeGlobe | null>(null);
    const groupRef = useRef<THREE.Group>(null!);
    const [isInitialized, setIsInitialized] = useState(false);

    const defaultProps = {
        pointSize: 1.5,
        atmosphereColor: "#3a3a6d",
        showAtmosphere: true,
        atmosphereAltitude: 0.12,
        polygonColor: "rgba(255,255,255,0.08)",
        globeColor: "#0b0b1a",
        emissive: "#000000",
        emissiveIntensity: 0.15,
        shininess: 0.7,
        arcTime: 2000,
        arcLength: 0.9,
        rings: 2,
        maxRings: 4,
        ...globeConfig,
    };

    useEffect(() => {
        if (!globeRef.current && groupRef.current) {
            globeRef.current = new ThreeGlobe();
            groupRef.current.add(globeRef.current);
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (!globeRef.current || !isInitialized) return;

        const globeMaterial = globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
        globeMaterial.color = new Color(globeConfig.globeColor);
        globeMaterial.emissive = new Color(globeConfig.emissive);
        globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.15;
        globeMaterial.shininess = globeConfig.shininess || 0.7;
    }, [
        isInitialized,
        globeConfig.globeColor,
        globeConfig.emissive,
        globeConfig.emissiveIntensity,
        globeConfig.shininess,
    ]);

    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data) return;

        const arcs = data;
        const points = [];
        for (let i = 0; i < arcs.length; i++) {
            const arc = arcs[i];
            points.push({
                size: arc.startLat === shiraz.lat ? defaultProps.pointSize * 1.6 : defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.startLat,
                lng: arc.startLng,
            });
            points.push({
                size: arc.endLat === shiraz.lat ? defaultProps.pointSize * 1.6 : defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.endLat,
                lng: arc.endLng,
            });
        }

        const filteredPoints = points.filter(
            (v, i, a) =>
                a.findIndex((v2) =>
                    ["lat", "lng"].every(
                        (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
                    ),
                ) === i,
        );

        globeRef.current
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .showAtmosphere(defaultProps.showAtmosphere)
            .atmosphereColor(defaultProps.atmosphereColor)
            .atmosphereAltitude(defaultProps.atmosphereAltitude)
            .hexPolygonColor(() => defaultProps.polygonColor);

        globeRef.current
            .arcsData(data)
            .arcStartLat((d) => (d as { startLat: number }).startLat)
            .arcStartLng((d) => (d as { startLng: number }).startLng)
            .arcEndLat((d) => (d as { endLat: number }).endLat)
            .arcEndLng((d) => (d as { endLng: number }).endLng)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .arcColor((e: any) => e.color)
            .arcAltitude((e) => (e as { arcAlt: number }).arcAlt)
            .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
            .arcDashLength(defaultProps.arcLength)
            .arcDashInitialGap((e) => (e as { order: number }).order)
            .arcDashGap(15)
            .arcDashAnimateTime(() => defaultProps.arcTime);

        globeRef.current
            .pointsData(filteredPoints)
            .pointColor((e) => (e as { color: string }).color)
            .pointsMerge(true)
            .pointAltitude(0.0)
            .pointRadius(2.2);

        globeRef.current
            .ringsData([])
            .ringColor(() => "#ffffff")
            .ringMaxRadius(defaultProps.maxRings)
            .ringPropagationSpeed(RING_PROPAGATION_SPEED)
            .ringRepeatPeriod(
                (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
            );
    }, [
        isInitialized,
        data,
        defaultProps.pointSize,
        defaultProps.showAtmosphere,
        defaultProps.atmosphereColor,
        defaultProps.atmosphereAltitude,
        defaultProps.polygonColor,
        defaultProps.arcLength,
        defaultProps.arcTime,
        defaultProps.rings,
        defaultProps.maxRings,
    ]);

    return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
    const { gl, size } = useThree();

    useEffect(() => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(size.width, size.height);
        gl.setClearColor(0x000000, 0);
    }, [gl, size.height, size.width]);

    return null;
}

export function World(props: WorldProps) {
    const { globeConfig } = props;
    const scene = new Scene();
    scene.fog = new Fog(0x000000, 400, 2000);
    return (
        <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
            <WebGLRendererConfig />
            <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
            <directionalLight
                color={globeConfig.directionalLeftLight}
                position={new Vector3(-400, 100, 400)}
            />
            <directionalLight
                color={globeConfig.directionalTopLight}
                position={new Vector3(-200, 500, 200)}
            />
            <pointLight
                color={globeConfig.pointLight}
                position={new Vector3(-200, 500, 200)}
                intensity={1}
            />
            <Globe {...props} />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minDistance={cameraZ}
                maxDistance={cameraZ}
                autoRotateSpeed={0.3}
                autoRotate={true}
                minPolarAngle={Math.PI / 3.5}
                maxPolarAngle={Math.PI - Math.PI / 3}
            />
        </Canvas>
    );
}
export default function GithubGlobeContainer() {
    const globeConfig = {
        pointSize: 4,
        globeColor: "#45638b",
        showAtmosphere: true,
        atmosphereColor: "#507dbb",
        atmosphereAltitude: 0.1,
        emissive: "#507dbb",
        emissiveIntensity: 0.4,
        shininess: 0.9,
        polygonColor: "#ffffff",
        ambientLight: "#0e1533",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 1000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 22.3193, lng: 114.1694 },
        autoRotate: true,
        autoRotateSpeed: 0.5,
    };

    return (
        <div className="absolute max-w-[1500px] inset-0 w-full h-full overflow-visible">
            <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-github-background/80 z-20" />
            <div className="absolute w-96 right-0 inset-y-0 h-full bg-gradient-to-r pointer-events-none select-none from-transparent to-github-background/80 z-20" />
            <World globeConfig={globeConfig} data={sampleArcs} />
        </div>
    );
}