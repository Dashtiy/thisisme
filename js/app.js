document.addEventListener('DOMContentLoaded', () => {
    console.log("🚛 Dash's Dev Diary initialized successfully. Welcome to the code highway.");

    // 1. Synthesize mechanical hover sound (Web Audio API)
    function playGearClick() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(140, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.04);
            
            gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.04);
        } catch (e) {
            // Audio context handled safely
        }
    }

    // Attach hover sound to navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-brand');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            playGearClick();
        });
    });

    // 2. Dynamic Pillar Cards Data
    const pillarData = [
        {
            badgeText: "01 / Logistics",
            badgeClass: "bg-success",
            title: "Behind the Wheel",
            description: "Night-shift heavy transport across Swedish highways. Building the discipline, focus, and stamina required to navigate through the dark."
        },
        {
            badgeText: "02 / Codebase",
            badgeClass: "bg-primary",
            title: "Front-End Studies",
            description: "Day-time transition into web development through vocational school. Mastering semantic HTML, modular Sass architecture, and JavaScript."
        },
        {
            badgeText: "03 / Toolkit",
            badgeClass: "bg-warning text-dark",
            title: "Tech Stack",
            description: "Working with HTML5, CSS3, Bootstrap 5, Git version control, and VS Code to craft responsive, modern, and accessible web experiences."
        },
        {
            badgeText: "04 / Future",
            badgeClass: "bg-info text-dark",
            title: "Next Milestones",
            description: "Leveling up into advanced JavaScript, DOM manipulation, and dynamic user interfaces to build fully interactive applications."
        }
    ];

    // 3. Render Cards Dynamically into the DOM
    const journeyRow = document.querySelector('#journey');
    if (journeyRow) {
        journeyRow.innerHTML = pillarData.map(pillar => `
            <div class="col-md-3">
                <div class="card h-100 p-4 shadow-sm">
                    <div class="card-body">
                        <span class="badge ${pillar.badgeClass} mb-3">${pillar.badgeText}</span>
                        <h3 class="h5 fw-bold mb-3">${pillar.title}</h3>
                        <p class="text-secondary small mb-0">
                            ${pillar.description}
                        </p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 4. Hero title click status toggle
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        heroTitle.style.cursor = 'pointer';
        heroTitle.title = 'Click to toggle status mode!';
        
        let isNightShift = true;
        heroTitle.addEventListener('click', () => {
            isNightShift = !isNightShift;
            if (isNightShift) {
                heroTitle.style.color = '#e1e1e6';
                console.log("Mode: Night Shift (Logistics & Drive)");
            } else {
                heroTitle.style.color = '#00b37e';
                console.log("Mode: Day Shift (Front-End & Code)");
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("matrix-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Resize canvas to full screen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Characters used for the rain (mix of binary, code symbols, and numbers)
    const characters = "0101010101<>/{}[]JS_DOM_SYS_ADR#$";
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);

    // Track the y position of each column
    let drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {
        // Semi-transparent black creates the fading trail effect
        ctx.fillStyle = "rgba(5, 5, 10, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00f59b"; // Neon green / cyan matching your theme
        ctx.font = fontSize + "px 'JetBrains Mono', monospace";

        for (let i = 0; i < drops.length; i++) {
            // Pick a random character
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop to top randomly once it hits the bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Run animation loop (~30 fps)
    setInterval(drawMatrix, 33);
});