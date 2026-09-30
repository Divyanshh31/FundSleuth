/* ==========================================================================
   FUNDSLEUTH - CINEMATIC FINANCIAL INTELLIGENCE WEBGL ENGINE
   Bloomberg Terminal × Modern Fintech × Three.js WebGL 3D Background Engine
   ========================================================================== */

(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check Three.js availability
    if (typeof THREE !== 'undefined') {
        initFinancialWebGL(canvas);
    } else {
        init2DFallback(canvas);
    }

    // Touchpad & Mouse 3D Motion Frame Deck (Hero Section Card)
    initTouchpadMotionShowcase();

    function initFinancialWebGL(canvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 45);

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // ------------------------------------------------------------------
        // DEPTH LAYER 1: Financial Market Perspective Grid (Background)
        // ------------------------------------------------------------------
        const gridGroup = new THREE.Group();
        const gridHelper = new THREE.GridHelper(120, 40, 0x4F46E5, 0xE2E8F0);
        gridHelper.position.y = -18;
        gridHelper.material.opacity = 0.28;
        gridHelper.material.transparent = true;
        gridGroup.add(gridHelper);
        scene.add(gridGroup);

        // ------------------------------------------------------------------
        // DEPTH LAYER 2: 3D Candlesticks & Financial Bar Structures (Midground)
        // ------------------------------------------------------------------
        const barsGroup = new THREE.Group();
        const barCount = 18;
        const barGeom = new THREE.BoxGeometry(0.8, 1, 0.8);

        for (let i = 0; i < barCount; i++) {
            const isGain = Math.random() > 0.35;
            const barMat = new THREE.MeshBasicMaterial({
                color: isGain ? 0x10B981 : 0xEF4444,
                wireframe: true,
                transparent: true,
                opacity: 0.35
            });

            const bar = new THREE.Mesh(barGeom, barMat);
            const height = Math.random() * 12 + 3;
            bar.scale.set(1, height, 1);
            bar.position.set(
                (Math.random() - 0.5) * 80,
                -18 + height / 2,
                (Math.random() - 0.5) * 40
            );

            // Wick line top/bottom
            const wickGeom = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, -height / 2 - 2, 0),
                new THREE.Vector3(0, height / 2 + 2, 0)
            ]);
            const wickMat = new THREE.LineBasicMaterial({
                color: isGain ? 0x10B981 : 0xEF4444,
                transparent: true,
                opacity: 0.25
            });
            const wick = new THREE.Line(wickGeom, wickMat);
            bar.add(wick);

            barsGroup.add(bar);
        }
        scene.add(barsGroup);

        // ------------------------------------------------------------------
        // DEPTH LAYER 2B: Dynamic Flowing Market Spline Curve (Midground)
        // ------------------------------------------------------------------
        const curvePoints = [];
        for (let i = 0; i < 20; i++) {
            curvePoints.push(new THREE.Vector3(
                (i - 10) * 5,
                Math.sin(i * 0.4) * 6 + (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 15
            ));
        }
        const curveSpline = new THREE.CatmullRomCurve3(curvePoints);
        const curveGeom = new THREE.BufferGeometry().setFromPoints(curveSpline.getPoints(100));
        const curveMat = new THREE.LineBasicMaterial({
            color: 0xFF6B00,
            transparent: true,
            opacity: 0.45,
            linewidth: 2
        });
        const marketCurve = new THREE.Line(curveGeom, curveMat);
        scene.add(marketCurve);

        // ------------------------------------------------------------------
        // DEPTH LAYER 2C: Connected Mutual Fund Portfolio Nodes (Midground)
        // ------------------------------------------------------------------
        const nodesGroup = new THREE.Group();
        const nodeCount = 14;
        const nodePositions = [];
        const nodeGeom = new THREE.IcosahedronGeometry(1.2, 1);

        for (let i = 0; i < nodeCount; i++) {
            const isFund = i < 4;
            const nodeMat = new THREE.MeshBasicMaterial({
                color: isFund ? 0xFF6B00 : 0x4F46E5,
                wireframe: true,
                transparent: true,
                opacity: 0.4
            });

            const mesh = new THREE.Mesh(nodeGeom, nodeMat);
            const pos = new THREE.Vector3(
                (Math.random() - 0.5) * 65,
                (Math.random() - 0.5) * 35 + 4,
                (Math.random() - 0.5) * 30
            );
            mesh.position.copy(pos);
            nodePositions.push(pos);

            mesh.userData = {
                rotSpeedX: (Math.random() - 0.5) * 0.015,
                rotSpeedY: (Math.random() - 0.5) * 0.015,
                initialY: pos.y
            };
            nodesGroup.add(mesh);
        }

        // Create connection lines between nearby nodes
        const linesGeom = new THREE.BufferGeometry();
        const linePos = [];
        for (let a = 0; a < nodeCount; a++) {
            for (let b = a + 1; b < nodeCount; b++) {
                if (nodePositions[a].distanceTo(nodePositions[b]) < 28) {
                    linePos.push(nodePositions[a].x, nodePositions[a].y, nodePositions[a].z);
                    linePos.push(nodePositions[b].x, nodePositions[b].y, nodePositions[b].z);
                }
            }
        }
        linesGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
        const linesMat = new THREE.LineBasicMaterial({
            color: 0x6366F1,
            transparent: true,
            opacity: 0.2
        });
        const networkLines = new THREE.LineSegments(linesGeom, linesMat);
        nodesGroup.add(networkLines);

        scene.add(nodesGroup);

        // ------------------------------------------------------------------
        // DEPTH LAYER 3: Glowing Financial Ticker Particles (Foreground)
        // ------------------------------------------------------------------
        const particleCount = 120;
        const pGeom = new THREE.BufferGeometry();
        const pPositions = new Float32Array(particleCount * 3);
        const pColors = new Float32Array(particleCount * 3);

        const colorsList = [
            new THREE.Color('#FF6B00'),
            new THREE.Color('#10B981'),
            new THREE.Color('#6366F1')
        ];

        for (let i = 0; i < particleCount; i++) {
            pPositions[i * 3] = (Math.random() - 0.5) * 90;
            pPositions[i * 3 + 1] = (Math.random() - 0.5) * 70;
            pPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

            const c = colorsList[Math.floor(Math.random() * colorsList.length)];
            pColors[i * 3] = c.r;
            pColors[i * 3 + 1] = c.g;
            pColors[i * 3 + 2] = c.b;
        }

        pGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
        pGeom.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

        const pMat = new THREE.PointsMaterial({
            size: 0.6,
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            blending: THREE.NormalBlending
        });
        const particlesSystem = new THREE.Points(pGeom, pMat);
        scene.add(particlesSystem);

        // ------------------------------------------------------------------
        // INTERACTION & PHYSICS: Smooth Pointer Lerping & Scroll Parallax
        // ------------------------------------------------------------------
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;
        let currentRotX = 0, currentRotY = 0;
        let scrollY = 0, targetScrollY = 0;

        function updatePointer(x, y) {
            if (prefersReducedMotion) return;
            mouseX = (x - window.innerWidth / 2) * 0.00035;
            mouseY = (y - window.innerHeight / 2) * 0.00035;
        }

        window.addEventListener('pointermove', (e) => updatePointer(e.clientX, e.clientY));
        window.addEventListener('mousemove', (e) => updatePointer(e.clientX, e.clientY));
        window.addEventListener('mouseleave', () => { mouseX = 0; mouseY = 0; });
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
        });

        window.addEventListener('scroll', () => {
            targetScrollY = window.scrollY * 0.012;
        });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Main WebGL Render Loop
        const clock = new THREE.Clock();

        function renderLoop() {
            requestAnimationFrame(renderLoop);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            if (!prefersReducedMotion) {
                // Lerped smooth mouse parallax
                targetX += (mouseX - targetX) * 0.05;
                targetY += (mouseY - targetY) * 0.05;

                currentRotX += (targetY - currentRotX) * 0.05;
                currentRotY += (targetX - currentRotY) * 0.05;

                camera.rotation.x = -currentRotX;
                camera.rotation.y = -currentRotY;

                // Smooth Scroll Parallax Reaction
                scrollY += (targetScrollY - scrollY) * 0.05;
                camera.position.y = 5 - scrollY * 0.4;
                camera.position.z = 45 - Math.sin(scrollY * 0.2) * 5;

                // Autonomous Scene Motion (Always alive)
                gridGroup.rotation.y = time * 0.02;
                nodesGroup.children.forEach(node => {
                    if (node.userData.rotSpeedX) {
                        node.rotation.x += node.userData.rotSpeedX;
                        node.rotation.y += node.userData.rotSpeedY;
                        node.position.y = node.userData.initialY + Math.sin(time * 1.2 + node.position.x) * 0.4;
                    }
                });

                particlesSystem.rotation.y = time * 0.015;

                // Dynamic curve wave animation
                const positions = marketCurve.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(time * 2 + i) * 0.005;
                }
                marketCurve.geometry.attributes.position.needsUpdate = true;
            }

            renderer.render(scene, camera);
        }

        renderLoop();
    }

    // 2D Fallback for older browsers
    function init2DFallback(canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        function loop() {
            ctx.clearRect(0, 0, width, height);
            requestAnimationFrame(loop);
        }
        loop();
    }

    // Touchpad & Mouse Driven 3D Motion Picture Showcase Frame Engine
    function initTouchpadMotionShowcase() {
        const labels = [
            "Stock Candlestick & Technical Analysis",
            "Stock Exchange Order Book & Ticker Screen",
            "Live Technical Trading Graph Monitors",
            "Financial Data & Analytics Workstation"
        ];

        let currentIdx = 0;
        const totalSlides = 4;

        setInterval(() => {
            const currentSlide = document.getElementById(`mouse-slide-${currentIdx}`);
            if (currentSlide) currentSlide.classList.remove('active');

            currentIdx = (currentIdx + 1) % totalSlides;
            const nextSlide = document.getElementById(`mouse-slide-${currentIdx}`);
            if (nextSlide) nextSlide.classList.add('active');

            const labelElem = document.getElementById('showcase-label');
            if (labelElem) labelElem.innerText = labels[currentIdx];
        }, 5000);

        let targetRotX = 0, targetRotY = 0;
        let currentRotX = 0, currentRotY = 0;

        function updatePhysics(clientX, clientY) {
            const card = document.getElementById('interactive-mouse-showcase');
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const percentX = (clientX - centerX) / (window.innerWidth / 2);
            const percentY = (clientY - centerY) / (window.innerHeight / 2);

            targetRotX = -percentY * 14;
            targetRotY = percentX * 14;
        }

        window.addEventListener('pointermove', (e) => updatePhysics(e.clientX, e.clientY));
        window.addEventListener('mousemove', (e) => updatePhysics(e.clientX, e.clientY));
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) updatePhysics(e.touches[0].clientX, e.touches[0].clientY);
        });

        function animateFrame() {
            const card = document.getElementById('interactive-mouse-showcase');
            if (card) {
                currentRotX += (targetRotX - currentRotX) * 0.1;
                currentRotY += (targetRotY - currentRotY) * 0.1;
                card.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(0, 0, 15px)`;
            }
            requestAnimationFrame(animateFrame);
        }
        animateFrame();
    }
})();
