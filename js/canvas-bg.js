/* ==========================================================================
   FUNDSLEUTH - THREE.JS & THREEUI WEBGL 3D SHADER ENGINE
   Taste Skill + GSAP + ThreeUI Interactive Background
   ========================================================================== */

(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Check if Three.js is available
    if (typeof THREE !== 'undefined') {
        initThreeJS();
    } else {
        initCanvas2DFallback();
    }

    function initThreeJS() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 40;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 1. Interactive 3D Particles WebGL Cloud
        const particleCount = 280;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorPalette = [
            new THREE.Color('#FF6B00'), // Orange highlight
            new THREE.Color('#4F46E5'), // Indigo accent
            new THREE.Color('#0D9488'), // Teal accent
            new THREE.Color('#D97706')  // Amber accent
        ];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 90;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 90;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const pMaterial = new THREE.PointsMaterial({
            size: 0.8,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.NormalBlending
        });

        const particleSystem = new THREE.Points(geometry, pMaterial);
        scene.add(particleSystem);

        // 2. Floating 3D Geometric Nodes (ThreeUI Style)
        const nodesGroup = new THREE.Group();
        const nodeGeom = new THREE.IcosahedronGeometry(1.8, 1);

        for (let i = 0; i < 12; i++) {
            const wireframeMat = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x4F46E5 : 0xFF6B00,
                wireframe: true,
                transparent: true,
                opacity: 0.35
            });

            const mesh = new THREE.Mesh(nodeGeom, wireframeMat);
            mesh.position.set(
                (Math.random() - 0.5) * 70,
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 30
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            mesh.userData = {
                rotSpeedX: (Math.random() - 0.5) * 0.015,
                rotSpeedY: (Math.random() - 0.5) * 0.015
            };

            nodesGroup.add(mesh);
        }

        scene.add(nodesGroup);

        // Mouse Parallax & Interaction
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
        });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Render Loop
        let clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Wave motion for particle system
            particleSystem.rotation.y = elapsedTime * 0.03;
            particleSystem.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

            // Rotate 3D wireframe nodes
            nodesGroup.children.forEach(node => {
                node.rotation.x += node.userData.rotSpeedX;
                node.rotation.y += node.userData.rotSpeedY;
                node.position.y += Math.sin(elapsedTime + node.position.x) * 0.01;
            });

            // Mouse parallax easing
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            camera.rotation.y = -targetX;
            camera.rotation.x = -targetY;

            renderer.render(scene, camera);
        }

        animate();
    }

    // 2D Canvas Fallback if WebGL isn't loaded
    function initCanvas2DFallback() {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        }

        window.addEventListener('resize', resize);

        class P {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.r = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(255, 107, 0, ' : 'rgba(79, 70, 229, ';
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = this.color + '0.3)';
                ctx.fill();
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < 70; i++) particles.push(new P());
        }

        function loop() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(loop);
        }

        resize();
        loop();
    }
})();
