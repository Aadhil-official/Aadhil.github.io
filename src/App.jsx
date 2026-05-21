import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { z } from 'zod';
import { Toaster } from 'react-hot-toast';
import * as THREE from 'three';
import profilePhoto from './assets/MyPic.png';
import cvFile from './assets/CV.pdf';
import { dismiss, error as showError, loading as showLoading, success } from './utils/toastify';
import { useTheme } from './context/ThemeContext';
import './styles/global.css';

// ── Data ─────────────────────────────────────────────────────────────────────
const personal = {
  name: 'Mohamed Aadhil',
  email: 'mhmdaxdhill@gmail.com',
  phone: '+94 750 213 273',
  location: 'Colombo, Sri Lanka',
  github: 'https://github.com/Aadhil-official',
  linkedin: 'https://www.linkedin.com/in/mohamed-aadhil-716645248',
  whatsapp: 'https://wa.me/+94750213273',
};

const positions = ['Software Engineer', 'Full Stack Developer', 'Backend Developer', 'Java Developer', 'Frontend Developer'];

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#stack" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const skillGroups = [
  { title: 'Languages', color: '#6366f1', skills: ['Java', 'Python', 'JavaScript', 'PHP', 'C', 'HTML', 'CSS'] },
  { title: 'Frameworks', color: '#0ea5e9', skills: ['Spring Boot', 'React', 'Next.js', 'React Native', 'Node.js', 'Laravel', 'FastAPI', 'Tailwind CSS', 'Bootstrap'] },
  { title: 'Databases', color: '#10b981', skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'MS SQL'] },
  { title: 'Cloud & DevOps', color: '#f59e0b', skills: ['Docker', 'AWS', 'Git', 'GitHub', 'Bitbucket', 'Linux', 'Postman'] },
  { title: 'Other', color: '#ec4899', skills: ['Machine Learning', 'Scikit-learn', 'TF-IDF', 'SEO', 'WordPress', 'Jira', 'Asana', 'Figma', 'Agile', 'Blender'] },
];

const services = [
  {
    title: 'Full-Stack Development',
    desc: 'Building scalable, production-ready web applications using Spring Boot + React/Next.js with clean architecture and maintainable codebases.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    ),
  },
  {
    title: 'Backend Engineering',
    desc: 'Designing robust REST APIs, JWT-secured services, microservices architecture, and efficient database-driven systems that power real applications.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
    ),
  },
  {
    title: 'AI / ML Integration',
    desc: 'Building ML models (spam detection, NLP with TF-IDF), integrating AI-powered RAG chatbots, and optimizing Core Web Vitals for performance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
    ),
  },
  {
    title: 'Mobile Development',
    desc: 'Creating cross-platform mobile apps with React Native, delivering smooth user experiences with consistent UI/UX across iOS and Android.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
    ),
  },
];

const experiences = [
  {
    num: '01',
    title: 'Software Engineer Intern',
    company: 'DigitalBee Labs',
    location: 'Colombo, Sri Lanka',
    period: 'May 2025 – Nov 2025',
    tags: ['Laravel', 'Python', 'ML', 'SEO', 'WordPress', 'RAG'],
    desc: 'Worked on live production systems involving full-stack development, SEO optimization, AI/ML integration, and WordPress customization. Built spam email detection ML models using Python/Scikit-learn, optimized Core Web Vitals, and integrated AI-powered RAG chatbot solutions.',
  },
];

const education = [
  {
    num: '01',
    degree: 'B.Sc (Hons) Information Technology & Management',
    school: 'University of Moratuwa',
    period: '2022 – 2026',
    desc: 'Final-year undergraduate · CGPA 3.45 · Focused on software engineering, system design, databases, and modern development practices.',
    tags: ['Software Engineering', 'Database Systems', 'Data Science', 'Agile'],
  },
  {
    num: '02',
    degree: 'G.C.E Advanced Level – Physical Science Stream',
    school: 'Baduriya National School',
    period: '2018 – 2020',
    desc: 'Strong foundation in mathematics and physical sciences, demonstrating analytical thinking, problem-solving skills, and a logical approach to complex challenges.',
    tags: ['Chemistry: A', 'Mathematics: B', 'Physics: C'],
  },
];

const projects = [
  {
    title: 'Arctic Management System',
    badge: 'Internal CMS',
    badgeColor: '#6366f1',
    desc: 'Centralized CMS for managing company operational data, job activities, and customer support workflows with role-based access control.',
    stack: ['Spring Boot', 'React', 'MongoDB'],
    href: 'https://github.com/orgs/sftreprjct/repositories',
  },
  {
    title: 'Metro Mobiles',
    badge: 'E-Commerce',
    badgeColor: '#0ea5e9',
    desc: 'Microservices-based electronics store with scalable order processing, inventory management, and service-to-service integration.',
    stack: ['Spring Boot', 'React', 'MySQL'],
    href: 'https://github.com/orgs/Metro-Mobiles/repositories',
  },
  {
    title: 'Hotel Room Booking',
    badge: 'Ongoing',
    badgeColor: '#f59e0b',
    desc: 'Public booking platform with REST-driven room management, reservation workflows, and a polished customer-facing frontend.',
    stack: ['Spring Boot', 'React', 'PostgreSQL'],
    href: 'https://github.com/orgs/HtlBooking/repositories',
  },
  {
    title: 'Smart Laundry System',
    badge: 'Full-Stack',
    badgeColor: '#10b981',
    desc: 'Cloud-based laundry management platform with order tracking, payments, SMS notifications, and service scheduling automation.',
    stack: ['Spring Boot', 'React Native', 'MySQL'],
    href: 'https://github.com/orgs/Smart-Laundry-System/repositories',
  },
  {
    title: 'This Portfolio',
    badge: 'Personal',
    badgeColor: '#ec4899',
    desc: 'Modern portfolio website with Three.js 3D visuals, Framer Motion animations, dark/light mode, particle canvas, and EmailJS contact form.',
    stack: ['React', 'Three.js', 'Framer Motion', 'EmailJS'],
    href: 'https://github.com/Aadhil-official/Aadhil.github.io',
  },
  {
    title: 'P10 LED Display Controller',
    badge: 'Hardware',
    badgeColor: '#f43f5e',
    desc: 'ESP32-based controller for configurable P10 LED text displays supporting Wi-Fi, Ethernet, SD card inputs, and adjustable font/speed settings.',
    stack: ['ESP32', 'C', 'EasyEDA', 'Proteus', 'Blender'],
    href: '',
  },
  {
    title: 'StudyHub',
    badge: 'Individual',
    badgeColor: '#8b5cf6',
    desc: 'Developing a web application featuring an interactive video conference setup (similar to Zoom with YouTube), supporting screen/video sharing and live chat options for students and teachers.',
    stack: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Google Cloud'],
    href: 'https://github.com/Aadhil-official/StudyHub',
  },
  {
    title: 'Agencypro',
    badge: 'Contract',
    badgeColor: '#14b8a6',
    desc: 'Developing a responsive website and an internal management system equipped with tools designed to effectively oversee and manage stakeholders.',
    stack: ['Next.js', 'MySQL', 'Tailwind CSS'],
    href: 'https://github.com/Aadhil-official/agencypro',
  },
  {
    title: 'E Commerce Application',
    badge: 'Team Project',
    badgeColor: '#f97316',
    desc: 'Led a team to design and implement a dynamic sitemap improving navigation, scalability, and SEO performance. Managed workflow planning, task delegation, and comprehensive system handover documentation.',
    stack: ['Next.js', 'Slack'],
    href: 'https://samwoohub.lk/',
  },
];

const formSchema = z.object({
  user_name: z.string().trim().min(2, 'Enter your name.'),
  user_email: z.string().trim().email('Enter a valid email address.'),
  message: z.string().trim().min(24, 'Please share at least a short brief (24 chars).'),
});

// ── Animation Helpers ─────────────────────────────────────────────────────────
const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const staggerItem = (i = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

// ── Three.js 3D Hero Scene ────────────────────────────────────────────────────
function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambLight);

    const pointLight1 = new THREE.PointLight(0xdc2626, 6, 15);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6366f1, 4, 12);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // ── Main Icosahedron (wireframe + solid)
    const geoIco = new THREE.IcosahedronGeometry(1.3, 1);
    const matIcoSolid = new THREE.MeshPhongMaterial({
      color: 0x1a0808,
      emissive: 0x3d0000,
      specular: 0xff4444,
      shininess: 80,
      transparent: true,
      opacity: 0.85,
    });
    const meshIco = new THREE.Mesh(geoIco, matIcoSolid);
    scene.add(meshIco);

    const matWire = new THREE.MeshBasicMaterial({ color: 0xdc2626, wireframe: true, transparent: true, opacity: 0.35 });
    const wireIco = new THREE.Mesh(geoIco, matWire);
    wireIco.scale.setScalar(1.01);
    scene.add(wireIco);

    // ── Orbiting torus ring
    const geoTorus = new THREE.TorusGeometry(2.0, 0.022, 8, 80);
    const matTorus = new THREE.MeshBasicMaterial({ color: 0xdc2626, transparent: true, opacity: 0.5 });
    const torus1 = new THREE.Mesh(geoTorus, matTorus);
    torus1.rotation.x = Math.PI / 3;
    scene.add(torus1);

    const geoTorus2 = new THREE.TorusGeometry(2.4, 0.015, 8, 80);
    const matTorus2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.3 });
    const torus2 = new THREE.Mesh(geoTorus2, matTorus2);
    torus2.rotation.x = Math.PI / 5;
    torus2.rotation.y = Math.PI / 4;
    scene.add(torus2);

    // ── Floating particles around shape
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2.8 + Math.random() * 1.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xdc2626, size: 0.035, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Octahedron satellites
    const satGeo = new THREE.OctahedronGeometry(0.18, 0);
    const satMat = new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x3730a3, shininess: 100, transparent: true, opacity: 0.9 });

    const satellites = Array.from({ length: 5 }, (_, i) => {
      const mesh = new THREE.Mesh(satGeo, satMat);
      const angle = (i / 5) * Math.PI * 2;
      const r = 2.0;
      mesh.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * 1.2, Math.sin(angle) * r);
      scene.add(mesh);
      return { mesh, angle, r, speed: 0.003 + Math.random() * 0.004, yOffset: mesh.position.y };
    });

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animate
    let frame;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      meshIco.rotation.x = t * 0.18 + mouseY * 0.5;
      meshIco.rotation.y = t * 0.26 + mouseX * 0.5;
      wireIco.rotation.copy(meshIco.rotation);

      torus1.rotation.z = t * 0.2;
      torus1.rotation.y = mouseX * 0.3;
      torus2.rotation.z = -t * 0.15;
      torus2.rotation.x = Math.PI / 5 + mouseY * 0.2;

      particles.rotation.y = t * 0.05;
      particles.rotation.x = t * 0.03;

      satellites.forEach((sat, i) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.r;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.r;
        sat.mesh.position.y = sat.yOffset + Math.sin(t * 0.8 + i) * 0.25;
        sat.mesh.rotation.x = t * 0.6;
        sat.mesh.rotation.y = t * 0.4;
      });

      pointLight1.position.x = Math.sin(t * 0.5) * 3;
      pointLight1.position.y = Math.cos(t * 0.4) * 2;
      pointLight2.position.x = Math.cos(t * 0.4) * 3;
      pointLight2.position.y = Math.sin(t * 0.5) * 2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="three-canvas" aria-hidden="true" />;
}

// ── Typing Animation ──────────────────────────────────────────────────────────
function TypingTitle() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = positions[index];
    let timeout;
    if (!deleting && text.length < full.length) {
      timeout = setTimeout(() => setText(full.slice(0, text.length + 1)), 65);
    } else if (!deleting && text.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(full.slice(0, text.length - 1)), 38);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIndex((p) => (p + 1) % positions.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return <span className="typing-text">{text}<span className="cursor">|</span></span>;
}

// ── Counter ───────────────────────────────────────────────────────────────────
function CountUp({ end, suffix = '', decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let current = 0;
        const step = end / 80;
        const t = setInterval(() => {
          current = Math.min(current + step, end);
          setVal(decimals === 0 ? Math.round(current) : current.toFixed(decimals));
          if (current >= end) clearInterval(t);
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, decimals]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Theme Toggle ──────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
          <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const Icons = {
  GitHub: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>,
  LinkedIn: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  WhatsApp: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
  Mail: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
  Phone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" /></svg>,
  Location: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  Arrow: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width="14" height="14"><path d="M7 17L17 7M7 7h10v10" /></svg>,
  Download: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width="16" height="16"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
  ExternalLink: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>,
  Sun: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
  Moon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>,
};

// ── Marquee ───────────────────────────────────────────────────────────────────
const marqueeItems = ['Spring Boot', 'React', 'Next.js', 'Java', 'Python', 'Docker', 'AWS', 'PostgreSQL', 'MongoDB', 'Machine Learning', 'Laravel', 'Node.js', 'TypeScript', 'Tailwind CSS', 'REST API'];

// ── Scroll To Top Button ──────────────────────────────────────────────────────
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
function App() {
  const { isDark, toggle } = useTheme();
  const formRef = useRef(null);
  const [formState, setFormState] = useState({ user_name: '', user_email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const year = new Date().getFullYear();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(formState);
    if (!parsed.success) { showError(parsed.error.issues[0]?.message); return; }
    if (!formRef.current) { showError('Form not ready. Use email or LinkedIn instead.'); return; }
    const toast = showLoading('Sending message…');
    setIsSubmitting(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      dismiss(toast);
      success('Message sent! I\'ll get back to you soon.');
      setFormState({ user_name: '', user_email: '', message: '' });
    } catch {
      dismiss(toast);
      showError('Send failed. Please email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      <div className="portfolio-app" id="top">
        <ScrollToTopButton />

        {/* ══ NAVBAR ══ */}
        <a href="#about" className="skip-link">Skip to content</a>
        <header className="site-header" role="banner">
          <div className="nav-wrap container">
            <a className="nav-logo" href="#top">
              <span className="pulse-dot" />
              <span>Mohamed <strong>Aadhil</strong></span>
            </a>

            <nav className="desktop-nav" aria-label="Primary">
              {navLinks.map(l => (
                <a key={l.href} href={l.href}>{l.label}</a>
              ))}
            </nav>

            <div className="nav-right">
              <button
                className="theme-btn"
                onClick={toggle}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                title={isDark ? 'Light mode' : 'Dark mode'}
              >
                {isDark ? <Icons.Sun /> : <Icons.Moon />}
              </button>
              <button
                className={`burger${menuOpen ? ' is-open' : ''}`}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen(v => !v)}
              >
                <span /><span /><span />
              </button>
            </div>

            <AnimatePresence>
              {menuOpen && (
                <motion.nav
                  id="mobile-nav"
                  className="mobile-nav"
                  aria-label="Mobile"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  {navLinks.map(l => (
                    <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* ══ HERO ══ */}
        <section className="hero" id="hero">
          {/* 3D Scene */}
          <div className="hero-3d-wrap">
            <ThreeScene />
          </div>

          <div className="hero-content container">
            <motion.div className="hero-left" {...reveal}>
              {/* <motion.div
                className="hero-badge"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="pulse-dot" />
                Available for opportunities
              </motion.div> */}

              <h1 className="hero-title">
                <span className="hero-hi">Welcome to My Portfolio</span>
                <span className="hero-name-big">MOHAMED<br />AADHIL</span>
              </h1>

              <div className="hero-role">
                <span className="hero-role__prefix">I&apos;m a</span>
                <TypingTitle />
              </div>

              <p className="hero-bio">
                Final-year IT undergraduate at University of Moratuwa, Sri Lanka. Building scalable applications with <strong>Spring Boot, React, Next.js</strong> and integrating <strong>AI/ML</strong> solutions. I have completed my internship at DigitalBee Labs.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href={cvFile} download="Mohamed_Aadhil_CV.pdf">
                  <Icons.Download /> Download CV
                </a>
                <a className="btn btn-ghost" href={personal.github} target="_blank" rel="noreferrer">
                  <Icons.GitHub /> GitHub Profile
                </a>
              </div>

              <div className="hero-social">
                {[
                  { href: personal.github, Icon: Icons.GitHub, label: 'GitHub' },
                  { href: personal.linkedin, Icon: Icons.LinkedIn, label: 'LinkedIn' },
                  { href: personal.whatsapp, Icon: Icons.WhatsApp, label: 'WhatsApp' },
                  { href: `mailto:${personal.email}`, Icon: Icons.Mail, label: 'Email' },
                ].map(({ href, Icon, label }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer" aria-label={label} className="social-icon">
                    <Icon />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="hero-right"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="photo-card">
                {/* <div className="photo-card__glow" /> */}
                <img src={profilePhoto} alt="Mohamed Aadhil" className="photo-img" />
                {/* <div className="photo-badge photo-badge--tl">
                  <span className="live-dot" />
                  <span>Open to work</span>
                </div>
                <div className="photo-badge photo-badge--br">
                  <span className="photo-badge__title">University of Moratuwa</span>
                  <span className="photo-badge__sub">CGPA 3.45 · IT&M</span>
                </div> */}
              </div>

              {/* Stats orbit */}
              <div className="hero-stats">
                {[
                  { value: '6+', label: 'Projects' },
                  { value: '3.31', label: 'CGPA' },
                  { value: '5+', label: 'Months Exp.' },
                ].map((s) => (
                  <div key={s.label} className="hero-stat-chip">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Marquee Banner */}
          <div className="marquee-strip">
            <div className="marquee-inner">
              {[...marqueeItems, ...marqueeItems].map((t, i) => (
                <span key={i} className="marquee-item">{t} <span className="mdot">◈</span> </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section className="section" id="about">
          <div className="container">
            <motion.div className="section-eyebrow" {...reveal}>
              <span className="eyebrow-line" />ABOUT ME
            </motion.div>

            <div className="about-grid">
              <motion.div className="about-text" {...reveal}>
                <h2 className="section-heading">
                  Discover the Story,<br />
                  Passion, and Purpose<br />
                  <span className="muted">Behind the Person You See</span>
                </h2>

                <p>Results-driven Software Engineer and final-year IT undergraduate at University of Moratuwa with internship experience building real-world production systems at DigitalBee Labs. Skilled in full-stack development using Spring Boot, React, Next.js, and modern databases.</p>

                <p>Beyond coding — I have experience with AI/ML integration, SEO optimization, Core Web Vitals tuning, and WordPress customization. I thrive in Agile environments and love delivering software that stays maintainable at scale.</p>

                <div className="about-counts">
                  {[
                    { n: 6, s: '+', label: 'Projects Completed' },
                    { n: 5, s: '+', label: 'Months Experience' },
                    { n: 3.31, s: '', label: 'CGPA', decimals: 2 },
                  ].map(({ n, s, label, decimals }) => (
                    <div key={label} className="count-card">
                      <strong><CountUp end={n} suffix={s} decimals={decimals} /></strong>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="about-cards">
                {[
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>, title: 'Education', main: 'B.Sc IT & Management', sub: 'University of Moratuwa' },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="12.01" /></svg>, title: 'Experience', main: 'Software Engineer Intern', sub: 'DigitalBee Labs · 2025' },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, title: 'Location', main: 'Colombo, Sri Lanka', sub: 'Open to remote & on-site' },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>, title: 'Specialty', main: 'Full-Stack + AI/ML', sub: 'Spring Boot · React · Python' },
                ].map((c, i) => (
                  <motion.div key={c.title} className="info-card" {...staggerItem(i)}>
                    <span className="info-card__icon">{c.icon}</span>
                    <h4>{c.title}</h4>
                    <p>{c.main}</p>
                    <small>{c.sub}</small>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <section className="section section-alt" id="stack">
          <div className="container">
            <motion.div className="section-eyebrow eyebrow-light" {...reveal}>
              <span className="eyebrow-line" />TOOLS & TECHNOLOGIES
            </motion.div>
            <div className="skills-header">
              <motion.h2 className="section-heading section-heading--white" {...reveal}>
                A Curated Set of <span className="accent">Tools & Technologies</span><br />
                Mastered to Build Reliable Software
              </motion.h2>
              <motion.p className="section-sub" {...reveal}>
                A carefully selected set of technologies used to build efficient, scalable, and reliable software across the full stack.
              </motion.p>
            </div>

            <div className="skills-grid">
              {skillGroups.map((g, gi) => (
                <motion.div key={g.title} className="skill-block" {...staggerItem(gi)} style={{ '--group-color': g.color }}>
                  <div className="skill-block__header">
                    <span className="skill-block__dot" />
                    <h4>{g.title}</h4>
                  </div>
                  <div className="skill-tags">
                    {g.skills.map((s) => (
                      <span key={s} className="skill-tag">{s}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section className="section section-deep" id="services">
          <div className="container">
            <motion.div className="section-eyebrow eyebrow-light" {...reveal}>
              <span className="eyebrow-line" />SERVICES
            </motion.div>
            <div className="services-top">
              <motion.h2 className="section-heading section-heading--white" {...reveal}>
                Professional Services &<br />
                <span className="muted-white">Unique Value I Offer</span>
              </motion.h2>
              <motion.div {...reveal}>
                <p className="section-sub" style={{ color: 'rgba(255,255,255,0.55)' }}>Specialized engineering services built around real product needs, delivered with quality and attention to detail.</p>
                <a className="btn btn-red" href="#contact" style={{ marginTop: '1.25rem', display: 'inline-flex' }}>Explore More <Icons.Arrow /></a>
              </motion.div>
            </div>

            <div className="services-grid">
              {services.map((s, i) => (
                <motion.article key={s.title} className="service-card" {...staggerItem(i)}>
                  <div className="service-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="card-arrow"><Icons.Arrow /></span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ EXPERIENCE ══ */}
        <section className="section" id="experience">
          <div className="container">
            <motion.div className="section-eyebrow" {...reveal}>
              <span className="eyebrow-line" />CAREER JOURNEY
            </motion.div>
            <div className="exp-top">
              <motion.h2 className="section-heading" {...reveal}>
                A Comprehensive Journey Through<br />
                <span className="muted">My Professional Experience Across Multiple Companies</span>
              </motion.h2>
              <motion.p className="section-sub" {...reveal}>This section presents a professional journey built through real-world experience. Each role contributes to practical skills, adaptability, and a strong understanding of delivering reliable solutions.</motion.p>
            </div>

            <div className="timeline">
              {experiences.map((exp, i) => (
                <motion.article key={exp.title} className="tl-item" {...staggerItem(i, 16)}>
                  <div className="tl-num">{exp.num}</div>
                  <div className="tl-body">
                    <div className="tl-row">
                      <div>
                        <h3>{exp.title}</h3>
                        <p className="tl-company">{exp.company} · {exp.location}</p>
                        <p className="tl-desc">{exp.desc}</p>
                        <div className="tl-tags">
                          {exp.tags.map(t => <span key={t}>{t}</span>)}
                        </div>
                      </div>
                      <span className="tl-period">{exp.period}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div className="section-eyebrow" style={{ marginTop: '4rem' }} {...reveal}>
              <span className="eyebrow-line" />EDUCATION
            </motion.div>

            <div className="timeline">
              {education.map((edu, i) => (
                <motion.article key={edu.degree} className="tl-item" {...staggerItem(i, 16)}>
                  <div className="tl-num">{edu.num}</div>
                  <div className="tl-body">
                    <div className="tl-row">
                      <div>
                        <h3>{edu.degree}</h3>
                        <p className="tl-company">{edu.school}</p>
                        <p className="tl-desc">{edu.desc}</p>
                        <div className="tl-tags">
                          {edu.tags.map(t => <span key={t}>{t}</span>)}
                        </div>
                      </div>
                      <span className="tl-period">{edu.period}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROJECTS ══ */}
        <section className="section section-alt" id="projects">
          <div className="container">
            <motion.div className="section-eyebrow eyebrow-light" {...reveal}>
              <span className="eyebrow-line" />SHOWCASE PROJECTS
            </motion.div>
            <div className="proj-top">
              <motion.h2 className="section-heading section-heading--white" {...reveal}>
                Projects That <span className="accent">Showcase My Experience</span><br />in Software Engineering
              </motion.h2>
              <motion.p className="section-sub" {...reveal} style={{ color: 'rgba(255,255,255,0.55)' }}>
                A curated selection of projects reflecting my experience and growth as a software engineer, each highlighting practical problem-solving and technical depth.
              </motion.p>
            </div>

            <div className="proj-grid">
              {projects.map((p, i) => (
                <motion.article key={p.title} className="proj-card" {...staggerItem(i)}>
                  <div className="proj-card__top">
                    <span className="proj-badge" style={{ '--badge-color': p.badgeColor }}>{p.badge}</span>
                    {p.href !== '' && <a href={p.href} target="_blank" rel="noreferrer" className="proj-link" aria-label="Open repository">
                      <Icons.ExternalLink />
                    </a>}
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="proj-stack">
                    {p.stack.map(s => <span key={s}>{s}</span>)}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section className="section" id="contact">
          <div className="container">
            <motion.div className="section-eyebrow" {...reveal}>
              <span className="eyebrow-line" />GET IN TOUCH
            </motion.div>
            <motion.h2 className="section-heading" {...reveal}>
              Start a Collaboration<br />
              <span className="muted">After Exploring My Work and Expertise</span>
            </motion.h2>

            <div className="contact-layout">
              <motion.div className="contact-left" {...reveal}>
                {[
                  { icon: <Icons.Mail />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                  { icon: <Icons.Phone />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, '')}` },
                  { icon: <Icons.LinkedIn />, label: 'LinkedIn', value: 'in/mohamed-aadhil', href: personal.linkedin },
                  { icon: <Icons.GitHub />, label: 'GitHub', value: 'Aadhil-official', href: personal.github },
                  { icon: <Icons.Location />, label: 'Location', value: personal.location, href: '#' },
                ].map(({ icon, label, value, href }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact-chip">
                    <span className="contact-chip__icon">{icon}</span>
                    <div>
                      <strong>{label}</strong>
                      <span>{value}</span>
                    </div>
                  </a>
                ))}
              </motion.div>

              <motion.form ref={formRef} className="contact-form" onSubmit={handleSubmit} {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="user_name">Name <span className="req">*</span></label>
                    <input id="user_name" name="user_name" type="text" value={formState.user_name} onChange={handleChange} placeholder="Your full name" autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="user_email">Email <span className="req">*</span></label>
                    <input id="user_email" name="user_email" type="email" value={formState.user_email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="message">Message <span className="req">*</span></label>
                  <textarea id="message" name="message" rows={5} value={formState.message} onChange={handleChange} placeholder="Tell me about what you're building or what help you need…" />
                </div>
                <div className="form-topics">
                  {['Web App', 'Mobile App', 'Backend / API', 'Full Stack', 'AI / ML', 'Consulting'].map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <button className="btn btn-dark" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send Message →'}
                </button>
                <small className="form-note">* I review all messages and respond promptly.</small>
              </motion.form>
            </div>
          </div>
        </section>

        {/* ══ FOOTER MARQUEE ══ */}
        <div className="footer-band">
          <div className="marquee-inner marquee-slow">
            {['INNOVATION', 'SCALABLE ARCHITECTURE', 'AI & RAG SOLUTIONS', 'CLEAN CODE', 'FULL-STACK ENGINEERING', 'USER-CENTRIC DESIGN', 'INNOVATION', 'SCALABLE ARCHITECTURE', 'AI & RAG SOLUTIONS', 'CLEAN CODE', 'FULL-STACK ENGINEERING', 'USER-CENTRIC DESIGN'].map((t, i) => (
              <span key={i} className="marquee-item">{t} <span className="mdot">◇</span> </span>
            ))}
          </div>
        </div>

        {/* ══ FOOTER ══ */}
        <footer className="site-footer">
          <div className="container footer-grid">
            <div>
              <div className="footer-logo">
                <span className="logo-dot" />
                <strong>Mohamed Aadhil</strong>
              </div>
              <p className="footer-tagline">Software Engineer · Full-Stack Developer<br />Colombo, Sri Lanka</p>
              <div className="footer-socials">
                {[
                  { href: personal.github, Icon: Icons.GitHub, label: 'GitHub' },
                  { href: personal.linkedin, Icon: Icons.LinkedIn, label: 'LinkedIn' },
                  { href: personal.whatsapp, Icon: Icons.WhatsApp, label: 'WhatsApp' },
                ].map(({ href, Icon, label }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon /></a>
                ))}
              </div>
            </div>

            <div>
              <h5>Quick Links</h5>
              {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            </div>

            <div>
              <h5>Contact</h5>
              <p>{personal.email}</p>
              <p>{personal.phone}</p>
              <p>{personal.location}</p>
              <a className="btn btn-red" href="#contact" style={{ marginTop: '1rem', display: 'inline-flex' }}>Hire Me <Icons.Arrow /></a>
            </div>
          </div>

          <div className="footer-bottom container">
            <small>© {year} Mohamed Aadhil. All rights reserved.</small>
            <small>Built with React · Three.js · Framer Motion</small>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
