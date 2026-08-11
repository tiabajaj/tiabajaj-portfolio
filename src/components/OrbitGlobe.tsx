import { useEffect, useRef } from "react"
import * as THREE from "three"

function makeSsoLabelTexture() {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 128
    const ctx = canvas.getContext("2d")
    if (!ctx) return new THREE.CanvasTexture(canvas)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = "700 54px Inter, system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#ffffff"
    ctx.shadowColor = "rgba(0,0,0,0.65)"
    ctx.shadowBlur = 10
    ctx.fillText("SSO", canvas.width / 2, canvas.height / 2)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
}

export function OrbitGlobe({ reducedMotion }: { reducedMotion: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.setClearColor(0x000000, 0)
        renderer.outputColorSpace = THREE.SRGBColorSpace

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
        camera.position.set(0, 0.05, 5.4)

        const root = new THREE.Group()
        root.scale.setScalar(0.92)
        scene.add(root)

        const ambient = new THREE.AmbientLight(0x9eb6ff, 0.55)
        const key = new THREE.DirectionalLight(0xffffff, 1.35)
        key.position.set(4.5, 2.2, 3.5)
        const fill = new THREE.DirectionalLight(0x7eb7ff, 0.35)
        fill.position.set(-3, -1, -2)
        scene.add(ambient, key, fill)

        const earthGroup = new THREE.Group()
        root.add(earthGroup)

        const textureLoader = new THREE.TextureLoader()
        const earthTexture = textureLoader.load(
            "https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-blue-marble.jpg"
        )
        earthTexture.colorSpace = THREE.SRGBColorSpace
        earthTexture.anisotropy = 8

        const earth = new THREE.Mesh(
            new THREE.SphereGeometry(1, 64, 64),
            new THREE.MeshStandardMaterial({
                map: earthTexture,
                roughness: 0.92,
                metalness: 0.05,
            })
        )
        earthGroup.add(earth)

        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(1.045, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xb7d4ff,
                transparent: true,
                opacity: 0.14,
                side: THREE.BackSide,
            })
        )
        earthGroup.add(atmosphere)

        const rim = new THREE.Mesh(
            new THREE.SphereGeometry(1.02, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0xddeaff,
                transparent: true,
                opacity: 0.08,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })
        )
        earthGroup.add(rim)

        const orbitRadius = 1.34
        const orbitGroup = new THREE.Group()
        orbitGroup.rotation.x = THREE.MathUtils.degToRad(58)
        orbitGroup.rotation.z = THREE.MathUtils.degToRad(-24)
        root.add(orbitGroup)

        const orbitPoints: THREE.Vector3[] = []
        for (let i = 0; i <= 180; i++) {
            const a = (i / 180) * Math.PI * 2
            orbitPoints.push(new THREE.Vector3(Math.cos(a) * orbitRadius, 0, Math.sin(a) * orbitRadius))
        }
        const orbitGeom = new THREE.BufferGeometry().setFromPoints(orbitPoints)
        const orbitLine = new THREE.Line(
            orbitGeom,
            new THREE.LineBasicMaterial({
                color: 0xff2d2d,
                transparent: true,
                opacity: 0.95,
            })
        )
        orbitGroup.add(orbitLine)

        const satGroup = new THREE.Group()
        orbitGroup.add(satGroup)

        const satellite = new THREE.Mesh(
            new THREE.SphereGeometry(0.035, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0xc8cdd6, roughness: 0.35, metalness: 0.55 })
        )
        satGroup.add(satellite)

        const label = new THREE.Sprite(
            new THREE.SpriteMaterial({
                map: makeSsoLabelTexture(),
                transparent: true,
                depthTest: false,
            })
        )
        label.scale.set(0.42, 0.21, 1)
        label.position.set(0, 0.12, 0)
        satGroup.add(label)

        const setSize = () => {
            const size = canvas.clientWidth || 300
            renderer.setSize(size, size, false)
            camera.aspect = 1
            camera.updateProjectionMatrix()
        }
        setSize()
        window.addEventListener("resize", setSize)

        let yaw = 0.8
        let satAngle = 0.85
        let frame = 0
        const tick = () => {
            if (!reducedMotion) {
                yaw += 0.0028
                satAngle += 0.01
                earth.rotation.y += 0.0012
            }

            root.rotation.y = yaw
            satGroup.position.set(Math.cos(satAngle) * orbitRadius, 0, Math.sin(satAngle) * orbitRadius)
            renderer.render(scene, camera)
            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener("resize", setSize)
            earthTexture.dispose()
            earth.geometry.dispose()
            ;(earth.material as THREE.Material).dispose()
            atmosphere.geometry.dispose()
            ;(atmosphere.material as THREE.Material).dispose()
            rim.geometry.dispose()
            ;(rim.material as THREE.Material).dispose()
            orbitGeom.dispose()
            ;(orbitLine.material as THREE.Material).dispose()
            satellite.geometry.dispose()
            ;(satellite.material as THREE.Material).dispose()
            label.material.map?.dispose()
            label.material.dispose()
            renderer.dispose()
        }
    }, [reducedMotion])

    return (
        <div className="orbit-globe" aria-label="Earth globe with SSO orbit">
            <canvas ref={canvasRef} className="orbit-globe-canvas" />
        </div>
    )
}
