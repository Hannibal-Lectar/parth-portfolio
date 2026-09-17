/* ==========================================================================
   PORTFOLIO ENGINE & INTERACTIVE LOGIC (app.js)
   Strictly aligned with Parth Ghuge's CV Data & Exact Projects
   ========================================================================== */

// --- MULTILINGUAL GREETING CYCLE DATA (STARTS WITH ENGLISH) ---
const MULTILINGUAL_GREETINGS = [
    { text: "Hi, I'm Parth Ghuge", lang: "English 🇬🇧" },
    { text: "नमस्कार, मी पार्थ घुगे", lang: "Marathi 🚩" },
    { text: "नमस्ते, अहम् पार्थः घोगे", lang: "Sanskrit 🕉️" },
    { text: "নমস্কার, আমি পার্থ ঘুগে", lang: "Bengali 🎨" },
    { text: "नमस्ते, मैं पार्थ घुगे हूँ", lang: "Hindi 🇮🇳" },
    { text: "નમસ્તે, હું પાર્થ ઘુગે છું", lang: "Gujarati 🪔" },
    { text: "வணக்கம், நான் பார்த்த் குஹே", lang: "Tamil 🌺" },
    { text: "నమస్తే, నేను పార్థ్ ఘుగే", lang: "Telugu 🏛️" },
    { text: "ನಮಸ್ಕಾರ, ನಾನು ಪಾರ್ಥ್ ಘುಗೆ", lang: "Kannada 🌿" }
];

let currentLangIndex = 0;

// --- EXACT PORTFOLIO DATA FROM PARTH GHUGE'S CV ---
const DEFAULT_PORTFOLIO_DATA = {
    personal: {
        name: "Parth Ghuge",
        title: "Full-Stack Developer & CS Engineer",
        availability: "Open to Software Engineering Internships & Roles",
        bio: "Computer Science Engineer specializing in Next.js, React, TypeScript, C++, and Data Structures & Algorithms. Passionate about building clean, high-performance web applications.",
        aboutFull: "I am a B.Tech Computer Science student at Lovely Professional University with a strong foundation in Data Structures & Algorithms in C++, modern full-stack web development using Next.js, React, Tailwind CSS, and MongoDB. I thrive on solving complex algorithmic problems and engineering responsive, user-friendly digital experiences.",
        email: "parthghuge81@gmail.com",
        phone: "+91-9860062267",
        location: "Phagwara, Punjab / Maharashtra, India",
        resumeBio: "B.Tech CSE Student at Lovely Professional University (CGPA: 7.00). Experienced in Full-Stack Web Development (Next.js, React, MongoDB, Clerk) and C++ DSA.",
        socials: {
            github: "https://github.com/Hannibal-Lectar",
            linkedin: "https://www.linkedin.com/in/parth-ghuge",
            email: "mailto:parthghuge81@gmail.com"
        }
    },
    typewriterRoles: [
        "Full-Stack Web Applications",
        "Next.js & React Solutions",
        "C++ & DSA Problem Solving",
        "Clean UI with Tailwind CSS"
    ],
    skills: [
        { name: "C++", category: "backend", level: 90 },
        { name: "Python", category: "backend", level: 85 },
        { name: "JavaScript", category: "frontend", level: 90 },
        { name: "TypeScript", category: "frontend", level: 88 },
        { name: "SQL", category: "backend", level: 82 },
        { name: "Next.js", category: "frontend", level: 92 },
        { name: "React", category: "frontend", level: 90 },
        { name: "Tailwind CSS", category: "frontend", level: 95 },
        { name: "MongoDB", category: "backend", level: 85 },
        { name: "Git & GitHub", category: "tools", level: 90 },
        { name: "VS Code", category: "tools", level: 95 }
    ],

    // EXACT PROJECTS FROM CV (ONLY THESE TWO)
    projects: [
        {
            id: "proj-threads",
            title: "Threads Clone – Full-Stack Social Media Platform",
            category: "fullstack",
            tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB", "Clerk Authentication"],
            period: "Jun’ 26 – Jul’ 26",
            shortDesc: "Built and deployed a full-stack social media platform featuring secure authentication, thread creation, comments, user profiles, communities, and advanced search functionality.",
            fullDesc: "Engineered a scalable application using the Next.js App Router, MongoDB, reusable UI components, responsive design principles, and schema-based validation for a seamless user experience.",
            icon: "fa-comments",
            githubUrl: "https://github.com/Hannibal-Lectar"
        },
        {
            id: "proj-tictactoe",
            title: "Tic Tac Toe – DSA Game Project",
            category: "web",
            tags: ["C++", "STL", "Object-Oriented Programming (OOP)", "Data Structures & Algorithms"],
            period: "Jul’ 26 – Aug’ 26",
            shortDesc: "Developed a Tic Tac Toe game as part of the LPU Summer Training Program, demonstrating practical implementation of arrays, functions, OOP, and algorithmic problem-solving in C++.",
            fullDesc: "Built a modular and reusable codebase featuring efficient game logic, input validation, turn management, winner detection, and structured program design, showcasing strong fundamentals in DSA and software development.",
            icon: "fa-gamepad",
            githubUrl: "https://github.com/Hannibal-Lectar"
        }
    ]
};

// --- APP STATE & LOCAL STORAGE INITIALIZATION ---
let portfolioState = JSON.parse(localStorage.getItem('portfolio_user_data')) || JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));

function savePortfolioState() {
    localStorage.setItem('portfolio_user_data', JSON.stringify(portfolioState));
}

// --- DOM INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initTypewriter();
    initThemeSwitcher();
    initNavbarScroll();
    initModalHandlers();
    initContactForm();
    initMultilingualGreeting();
    renderAllContent();
});

// --- MULTILINGUAL INTERACTIVE GREETING ENGINE ---
function initMultilingualGreeting() {
    const greetingEl = document.getElementById('heroName');
    const badgeEl = document.getElementById('langBadge');

    if (!greetingEl) return;

    greetingEl.style.cursor = 'pointer';
    greetingEl.title = 'Click to switch language! 🔄';

    function updateGreeting() {
        const current = MULTILINGUAL_GREETINGS[currentLangIndex];
        
        greetingEl.style.opacity = '0';
        greetingEl.style.transform = 'translateY(-5px)';
        
        setTimeout(() => {
            greetingEl.textContent = current.text;
            if (badgeEl) {
                badgeEl.textContent = current.lang;
            }
            greetingEl.style.opacity = '1';
            greetingEl.style.transform = 'translateY(0)';
        }, 150);
    }

    greetingEl.parentElement.addEventListener('click', () => {
        currentLangIndex = (currentLangIndex + 1) % MULTILINGUAL_GREETINGS.length;
        updateGreeting();
        showToast(`Greeting changed to ${MULTILINGUAL_GREETINGS[currentLangIndex].lang}`, "info");
    });

    updateGreeting();
}

// --- RENDER ALL DYNAMIC CONTENT ---
function renderAllContent() {
    const data = portfolioState.personal;
    
    document.getElementById('navLogoName').textContent = data.name;
    document.getElementById('pageTitle').textContent = `${data.name} | Portfolio`;
    document.getElementById('heroAvailability').textContent = data.availability;
    document.getElementById('heroBio').textContent = data.bio;
    document.getElementById('aboutFullText').textContent = data.aboutFull;
    document.getElementById('contactEmailDisplay').textContent = data.email;
    document.getElementById('contactLocationDisplay').textContent = data.location;
    if (document.getElementById('contactPhoneDisplay')) {
        document.getElementById('contactPhoneDisplay').textContent = data.phone;
    }
    
    document.getElementById('footerName').textContent = data.name;
    document.getElementById('footerYear').textContent = new Date().getFullYear();

    renderProjects('all');
}

// --- PROJECTS RENDERER (ONLY CV PROJECTS) ---
function renderProjects(categoryFilter = 'all') {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    container.innerHTML = '';

    const filteredProjects = portfolioState.projects;

    filteredProjects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'glass-card project-card';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-primary);">${proj.period || ''}</span>
            </div>
            <h3 class="project-title" style="font-size: 1.3rem; margin-bottom: 0.6rem;">${proj.title}</h3>
            <p class="project-desc" style="margin-bottom: 1rem;">${proj.shortDesc}</p>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.2rem; line-height: 1.5;">${proj.fullDesc}</p>
            <div class="project-tags" style="margin-bottom: 1.2rem;">
                ${proj.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
            </div>
            <div class="project-footer">
                <a href="${proj.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
                    <i class="fa-brands fa-github"></i> View GitHub Repo
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- TYPEWRITER ANIMATION ---
function initTypewriter() {
    const typewriterEl = document.getElementById('typewriter');
    if (!typewriterEl) return;

    const roles = portfolioState.typewriterRoles;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// --- THEME SWITCHER ---
function initThemeSwitcher() {
    const themeSelect = document.getElementById('themeSelect');
    if (!themeSelect) return;

    const savedTheme = localStorage.getItem('portfolio_theme') || 'aurora';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeSelect.value = savedTheme;

    themeSelect.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('portfolio_theme', selectedTheme);
    });
}

// --- NAVBAR SCROLL ---
function initNavbarScroll() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// --- MODALS ---
function initModalHandlers() {
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
    });
}

// --- CONTACT FORM ---
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('senderName').value;
        const subject = document.getElementById('senderSubject').value;
        const message = document.getElementById('senderMessage').value;

        showToast(`Thank you, ${name}! Opening mail client...`, "success");
        setTimeout(() => {
            window.location.href = `mailto:${portfolioState.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            form.reset();
        }, 1000);
    });
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = "info") {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-language" style="color: #6366f1;"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// --- CANVAS PARTICLES ---
function initCanvas() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 60);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}
