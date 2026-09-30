/* ==========================================================================
   FUNDSLEUTH - INTERACTIVE TOUCHPAD & MOUSE 3D MOTION PICTURE ENGINE
   Real Financial Photography with Smooth Touchpad / Trackpad Physics
   ========================================================================== */

(function () {
    // 1. Touchpad & Mouse Driven 3D Motion Picture Frame Engine
    initTouchpadMotionShowcase();

    // 2. Soft Background Particles Layer
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    if (typeof THREE !== 'undefined') {
        initThreeJS(canvas);
    } else {
        initCanvas2DFallback(canvas);
    }

    function initTouchpadMotionShowcase() {
        const labels = [
            "Stock Candlestick & Technical Analysis",
            "Stock Exchange Order Book & Ticker Screen",
            "Live Technical Trading Graph Monitors",
            "Financial Data & Analytics Workstation"
        ];

        let currentIdx = 0;
        const totalSlides = 4;

        // Auto-rotate running pictures every 5 seconds
        setInterval(() => {
            const currentSlide = document.getElementById(`mouse-slide-${currentIdx}`);
            if (currentSlide) currentSlide.classList.remove('active');

            currentIdx = (currentIdx + 1) % totalSlides;
            const nextSlide = document.getElementById(`mouse-slide-${currentIdx}`);
            if (nextSlide) nextSlide.classList.add('active');

            const labelElem = document.getElementById('showcase-label');
            if (labelElem) labelElem.innerText = labels[currentIdx];
        }, 5000);

        let targetRotateX = 0, targetRotateY = 0;
        let targetTransX = 0, targetTransY = 0;
        let currentRotateX = 0, currentRotateY = 0;
        let currentTransX = 0, currentTransY = 0;

        function updatePhysics(clientX, clientY) {
            const card = document.getElementById('interactive-mouse-showcase');
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const percentX = (clientX - centerX) / (window.innerWidth / 2);
            const percentY = (clientY - centerY) / (window.innerHeight / 2);

            targetRotateX = -percentY * 16; // Tilt up / down
            targetRotateY = percentX * 16;  // Tilt left / right
            targetTransX = percentX * 14;
            targetTransY = percentY * 14;
        }

        // Mouse, Trackpad & Pointer Movement Listeners
        window.addEventListener('pointermove', (e) => {
            updatePhysics(e.clientX, e.clientY);
        });

        window.addEventListener('mousemove', (e) => {
            updatePhysics(e.clientX, e.clientY);
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                updatePhysics(e.touches[0].clientX, e.touches[0].clientY);
            }
        });

        // Smooth Animation Frame Loop for Silky Touchpad Physics
        function animatePhysics() {
            const card = document.getElementById('interactive-mouse-showcase');
            if (card) {
                currentRotateX += (targetRotateX - currentRotateX) * 0.1;
                currentRotateY += (targetRotateY - currentRotateY) * 0.1;
                currentTransX += (targetTransX - currentTransX) * 0.1;
                currentTransY += (targetTransY - currentTransY) * 0.1;

                card.style.transform = `rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translate3d(${currentTransX.toFixed(2)}px, ${currentTransY.toFixed(2)}px, 20px)`;
            }
            requestAnimationFrame(animatePhysics);
        }

        animatePhysics();
    }

    function initThreeJS(canvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 40;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorPalette = [
            new THREE.Color('#FF6B00'),
            new THREE.Color('#4F46E5')
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
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.25,
            blending: THREE.NormalBlending
        });

        const particleSystem = new THREE.Points(geometry, pMaterial);
        scene.add(particleSystem);

        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.0004;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.0004;
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

            particleSystem.rotation.y = elapsedTime * 0.015;

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
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.r = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(255, 107, 0, ' : 'rgba(79, 70, 229, ';
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = this.color + '0.12)';
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
            for (let i = 0; i < 30; i++) particles.push(new P());
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
