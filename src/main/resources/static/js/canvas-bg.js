/* ==========================================================================
   FUNDSLEUTH - LIVE RUNNING REAL FINANCIAL PHOTOGRAPHY & THREE.JS ENGINE
   Real Non-AI Financial Market Imagery + WebGL 3D Particle Cloud
   ========================================================================== */

(function () {
    // 1. Live Running Real Financial Photography Slideshow Engine
    initLivePhotographySlideshow();

    // 2. Three.js / Canvas 3D Interactive WebGL Layer
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    if (typeof THREE !== 'undefined') {
        initThreeJS(canvas);
    } else {
        initCanvas2DFallback(canvas);
    }

    function initLivePhotographySlideshow() {
        let container = document.getElementById('bg-slideshow-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'bg-slideshow-container';
            document.body.prepend(container);
        }

        let tintOverlay = document.getElementById('bg-overlay-tint');
        if (!tintOverlay) {
            tintOverlay = document.createElement('div');
            tintOverlay.className = 'bg-overlay-tint';
            document.body.prepend(tintOverlay);
        }

        // Authentic, real-world photography (non-AI generated) of stock markets, charts, and trading data
        const realFinancePhotos = [
            'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=80', // Real candlestick stock chart
            'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1920&q=80', // Real stock market ticker board
            'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1920&q=80', // Financial analytics workstation
            'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1920&q=80', // Real trading graph monitor
            'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1920&q=80'  // Currency & wealth growth
        ];

        const slideElements = [];
        realFinancePhotos.forEach((url, idx) => {
            const slide = document.createElement('div');
            slide.className = 'bg-slide' + (idx === 0 ? ' active' : '');
            slide.style.backgroundImage = `url('${url}')`;
            container.appendChild(slide);
            slideElements.push(slide);
        });

        let currentIdx = 0;
        setInterval(() => {
            slideElements[currentIdx].classList.remove('active');
            currentIdx = (currentIdx + 1) % slideElements.length;
            slideElements[currentIdx].classList.add('active');
        }, 6500);
    }

    function initThreeJS(canvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 40;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Interactive 3D Particles WebGL Cloud
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorPalette = [
            new THREE.Color('#FF6B00'),
            new THREE.Color('#4F46E5'),
            new THREE.Color('#0D9488')
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
            size: 0.75,
            vertexColors: true,
            transparent: true,
            opacity: 0.55,
            blending: THREE.NormalBlending
        });

        const particleSystem = new THREE.Points(geometry, pMaterial);
        scene.add(particleSystem);

        // Floating 3D Geometric Nodes
        const nodesGroup = new THREE.Group();
        const nodeGeom = new THREE.IcosahedronGeometry(1.6, 1);

        for (let i = 0; i < 8; i++) {
            const wireframeMat = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x4F46E5 : 0xFF6B00,
                wireframe: true,
                transparent: true,
                opacity: 0.25
            });

            const mesh = new THREE.Mesh(nodeGeom, wireframeMat);
            mesh.position.set(
                (Math.random() - 0.5) * 70,
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 30
            );
            mesh.userData = {
                rotSpeedX: (Math.random() - 0.5) * 0.012,
                rotSpeedY: (Math.random() - 0.5) * 0.012
            };

            nodesGroup.add(mesh);
        }

        scene.add(nodesGroup);

        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.0006;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.0006;
        });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        let clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            particleSystem.rotation.y = elapsedTime * 0.025;
            particleSystem.rotation.x = Math.sin(elapsedTime * 0.015) * 0.08;

            nodesGroup.children.forEach(node => {
                node.rotation.x += node.userData.rotSpeedX;
                node.rotation.y += node.userData.rotSpeedY;
                node.position.y += Math.sin(elapsedTime + node.position.x) * 0.008;
            });

            targetX += (mouseX - targetX) * 0.04;
            targetY += (mouseY - targetY) * 0.04;

            camera.rotation.y = -targetX;
            camera.rotation.x = -targetY;

            renderer.render(scene, camera);
        }

        animate();
    }

    function initCanvas2DFallback(canvas) {
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
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.r = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(255, 107, 0, ' : 'rgba(79, 70, 229, ';
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = this.color + '0.25)';
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
            for (let i = 0; i < 50; i++) particles.push(new P());
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
