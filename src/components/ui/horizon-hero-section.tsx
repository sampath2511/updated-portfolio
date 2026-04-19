// Portfolio Hero Section with Three.js Cosmic Background
import './horizon-hero-section.css';
import { useEffect, useRef, useState } from 'react';
import type { SVGProps } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// @ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// @ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

gsap.registerPlugin(ScrollTrigger);

/* ─── Icons as inline SVGs ─── */
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const ExternalLinkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
);
const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

/* ─── Data ─── */
const skills = [
  { category: 'Languages', items: ['C++', 'Java', 'Python', 'SQL'] },
  { category: 'Frameworks', items: ['React'] },
  { category: 'Developer Tools', items: ['VS Code', 'Git', 'GitHub', 'Salesforce'] },
  { category: 'Databases & Cloud', items: ['MySQL', 'Firebase', 'AWS', 'Salesforce'] },
  { category: 'Core Concepts', items: ['OOP', 'Data Structures', 'DBMS', 'OS', 'Computer Networks', 'Machine Learning'] },
];

const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Vardhaman College of Engineering, Hyderabad',
    year: '2023 – 2027',
    score: 'CGPA: 8.0',
  },
  {
    degree: 'Intermediate — Telangana State Board',
    institution: 'Narayana Junior College',
    year: '2023',
    score: '95.2%',
  },
  {
    degree: 'SSC — Telangana Board',
    institution: 'Montessori High School',
    year: '2021',
    score: 'CGPA: 10.0',
  },
];

const experience = [
  {
    role: 'Salesforce Virtual Intern',
    company: 'Remote',
    period: 'May – July 2025',
    bullets: [
      'Gained hands-on experience in Salesforce platform development including Apex programming and Lightning Web Components (LWC).',
      'Implemented Salesforce object relationships and explored real-world CRM development scenarios.',
      'Completed Trailhead modules and Superbadges focused on practical Salesforce development skills.',
    ],
  },
];

const projects = [
  {
    title: 'TextMorph - Advanced AI Summarization',
    tech: ['Python', 'Streamlit', 'NLP Models', 'SQLite'],
    link: 'https://github.com/sampath2511/Infosys---TextMorph-Advanced-Text-Summarization-and-Paraphrasing',
    bullets: [
      'Developed an AI-powered platform tailored for text simplification via summarization, paraphrasing, and integrated multilingual analysis.',
      'Implemented transformer-based deep learning models (Pegasus, BART, FLAN-T5) to generate concise summaries while preserving semantic meaning.',
      'Designed a scalable full-stack architecture featuring JWT user authentication, detailed text readability scorings, and an admin analytics dashboard.'
    ],
  },
  {
    title: 'Salesforce Development Practice',
    tech: ['Apex', 'LWC', 'Salesforce CRM'],
    bullets: [
      'Focused on developing Salesforce applications using Apex and Lightning Web Components.',
      'Practiced implementing CRM functionalities and automation features through Salesforce Trailhead projects.',
      'Continuously improving backend and cloud development skills through hands-on experimentation.',
    ],
  },
];

const achievements = [
  { text: 'Smart Interviews - Problem Solving & Data Structures Curriculum Certificate', link: 'https://smartinterviews.in/certificate/0052c449' },
  { text: 'Salesforce Developer Training with Agentblazer.' },
  { text: 'Completed hands-on Salesforce development training including Apex programming and Lightning Web Components.' },
  { text: 'Earned Trailhead badges and Superbadges demonstrating real-world Salesforce development expertise.' },
];

const navItems = ['About', 'Profiles', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];

/* ─── Component ─── */
export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('');
  const totalSections = 8;

  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    animationId: number | null;
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
    locations?: number[];
  }>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
  });

  /* ─── Three.js setup ─── */
  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;

      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
      refs.camera.position.set(0, 20, 100);

      refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.35;

      refs.composer = new EffectComposer(refs.renderer);
      refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
      refs.composer.addPass(
        new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.4, 0.3, 0.9)
      );

      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      storeLocations();
      animate();
      setIsReady(true);
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      const starCount = 5000;
      for (let i = 0; i < 3; i++) {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(starCount * 3);
        const col = new Float32Array(starCount * 3);
        const siz = new Float32Array(starCount);
        for (let j = 0; j < starCount; j++) {
          const r = 200 + Math.random() * 800;
          const t = Math.random() * Math.PI * 2;
          const p = Math.acos(Math.random() * 2 - 1);
          pos[j * 3] = r * Math.sin(p) * Math.cos(t);
          pos[j * 3 + 1] = r * Math.sin(p) * Math.sin(t);
          pos[j * 3 + 2] = r * Math.cos(p);
          const c = new THREE.Color();
          const cc = Math.random();
          if (cc < 0.7) c.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          else if (cc < 0.9) c.setHSL(0.08, 0.5, 0.8);
          else c.setHSL(0.6, 0.5, 0.8);
          col[j * 3] = c.r; col[j * 3 + 1] = c.g; col[j * 3 + 2] = c.b;
          siz[j] = Math.random() * 2 + 0.5;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(siz, 1));
        const mat = new THREE.ShaderMaterial({
          uniforms: { time: { value: 0 }, depth: { value: i } },
          vertexShader: `
            attribute float size; attribute vec3 color; varying vec3 vColor;
            uniform float time; uniform float depth;
            void main(){vColor=color;vec3 pos=position;
            float a=time*0.05*(1.0-depth*0.3);mat2 rot=mat2(cos(a),-sin(a),sin(a),cos(a));
            pos.xy=rot*pos.xy;vec4 mv=modelViewMatrix*vec4(pos,1.0);
            gl_PointSize=size*(300.0/-mv.z);gl_Position=projectionMatrix*mv;}`,
          fragmentShader: `varying vec3 vColor;void main(){float d=length(gl_PointCoord-vec2(0.5));
            if(d>0.5)discard;float o=1.0-smoothstep(0.0,0.5,d);gl_FragColor=vec4(vColor,o);}`,
          transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
        });
        const stars = new THREE.Points(geo, mat);
        refs.scene!.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const { current: refs } = threeRefs;
      const geo = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, color1: { value: new THREE.Color(0x0033ff) }, color2: { value: new THREE.Color(0xff0066) }, opacity: { value: 0.3 } },
        vertexShader: `varying vec2 vUv;varying float vE;uniform float time;void main(){vUv=uv;vec3 p=position;float e=sin(p.x*0.01+time)*cos(p.y*0.01+time)*20.0;p.z+=e;vE=e;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
        fragmentShader: `uniform vec3 color1;uniform vec3 color2;uniform float opacity;uniform float time;varying vec2 vUv;varying float vE;void main(){float m=sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);vec3 c=mix(color1,color2,m*0.5+0.5);float a=opacity*(1.0-length(vUv-0.5)*2.0);a*=1.0+vE*0.01;gl_FragColor=vec4(c,a);}`,
        transparent: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
      });
      const nebula = new THREE.Mesh(geo, mat);
      nebula.position.z = -1050;
      refs.scene!.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;
      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
      ];
      layers.forEach((layer) => {
        const pts: THREE.Vector2[] = [];
        for (let i = 0; i <= 50; i++) {
          const x = (i / 50 - 0.5) * 1000;
          const y = Math.sin(i * 0.1) * layer.height + Math.sin(i * 0.05) * layer.height * 0.5 + Math.random() * layer.height * 0.2 - 100;
          pts.push(new THREE.Vector2(x, y));
        }
        pts.push(new THREE.Vector2(5000, -300), new THREE.Vector2(-5000, -300));
        const shape = new THREE.Shape(pts);
        const geo = new THREE.ShapeGeometry(shape);
        const mat = new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: layer.opacity, side: THREE.DoubleSide });
        const m = new THREE.Mesh(geo, mat);
        m.position.z = layer.distance;
        m.position.y = layer.distance;
        m.userData = { baseZ: layer.distance };
        refs.scene!.add(m);
        refs.mountains.push(m);
      });
    };

    const createAtmosphere = () => {
      const { current: refs } = threeRefs;
      const geo = new THREE.SphereGeometry(450, 32, 32);
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader: `varying vec3 vN;uniform float time;void main(){float i=pow(0.7-dot(vN,vec3(0,0,1)),2.0);vec3 a=vec3(0.3,0.6,1.0)*i;float p=sin(time*2.0)*0.1+0.9;a*=p;gl_FragColor=vec4(a,i*0.12);}`,
        side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true,
      });
      refs.scene!.add(new THREE.Mesh(geo, mat));
    };

    const animate = () => {
      const { current: refs } = threeRefs;
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      refs.stars.forEach((s) => { (s.material as THREE.ShaderMaterial).uniforms.time.value = time; });
      if (refs.nebula) (refs.nebula.material as THREE.ShaderMaterial).uniforms.time.value = time * 0.5;
      if (refs.camera && refs.targetCameraX !== undefined) {
        const sf = 0.04;
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * sf;
        smoothCameraPos.current.y += ((refs.targetCameraY ?? 30) - smoothCameraPos.current.y) * sf;
        smoothCameraPos.current.z += ((refs.targetCameraZ ?? 100) - smoothCameraPos.current.z) * sf;
        refs.camera.position.set(
          smoothCameraPos.current.x + Math.sin(time * 0.1) * 2,
          smoothCameraPos.current.y + Math.cos(time * 0.15),
          smoothCameraPos.current.z,
        );
        refs.camera.lookAt(0, 10, -600);
      }
      refs.mountains.forEach((mt, i) => {
        const pf = 1 + i * 0.5;
        mt.position.x = Math.sin(time * 0.1) * 2 * pf;
        mt.position.y = -30 + Math.cos(time * 0.15) * pf;
      });
      refs.composer?.render();
    };

    initThree();

    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      const { current: refs } = threeRefs;
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
      refs.stars.forEach((s) => { s.geometry.dispose(); (s.material as THREE.ShaderMaterial).dispose(); });
      refs.mountains.forEach((m) => { m.geometry.dispose(); (m.material as THREE.MeshBasicMaterial).dispose(); });
      if (refs.nebula) { refs.nebula.geometry.dispose(); (refs.nebula.material as THREE.ShaderMaterial).dispose(); }
      refs.renderer?.dispose();
    };
  }, []);

  const storeLocations = () => {
    const { current: refs } = threeRefs;
    refs.locations = refs.mountains.map((m) => m.position.z);
  };

  /* ─── GSAP entrance ─── */
  useEffect(() => {
    if (!isReady) return;
    gsap.set([navRef.current, heroContentRef.current, scrollProgressRef.current], { visibility: 'visible' });
    const tl = gsap.timeline();
    if (navRef.current) tl.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    if (heroContentRef.current) {
      tl.fromTo(heroContentRef.current.querySelectorAll('.hero-tag'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3');
      tl.fromTo(heroContentRef.current.querySelectorAll('.hero-name'), { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }, '-=0.4');
      tl.fromTo(heroContentRef.current.querySelectorAll('.hero-role'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5');
      tl.fromTo(heroContentRef.current.querySelectorAll('.hero-social-link'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.3');
      tl.fromTo(heroContentRef.current.querySelectorAll('.hero-scroll-hint'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.2');
    }
    if (scrollProgressRef.current) tl.fromTo(scrollProgressRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5');
    return () => { tl.kill(); };
  }, [isReady]);

  /* ─── GSAP scroll reveals ─── */
  useEffect(() => {
    if (!isReady) return;
    const triggers: ScrollTrigger[] = [];
    sectionRefs.current.forEach((sec) => {
      if (!sec) return;
      const cards = sec.querySelectorAll('.glass-card, .timeline-item, .skill-group, .edu-card, .achievement-item, .contact-card');
      if (cards.length) {
        const st = ScrollTrigger.create({
          trigger: sec,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(cards, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' });
          },
          once: true,
        });
        triggers.push(st);
      }
      const heading = sec.querySelector('.section-heading');
      if (heading) {
        const st = ScrollTrigger.create({
          trigger: sec,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(heading, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
          },
          once: true,
        });
        triggers.push(st);
      }
    });
    return () => { triggers.forEach((t) => t.kill()); };
  }, [isReady]);

  /* ─── Scroll handler ─── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);

      const newSection = Math.min(Math.floor(progress * totalSections), totalSections - 1);
      setCurrentSection(newSection);

      const { current: refs } = threeRefs;
      const totalProgress = progress * totalSections;
      const sectionProgress = totalProgress % 1;

      const cameraPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 5, y: 35, z: 200 },
        { x: -5, y: 32, z: 100 },
        { x: 0, y: 40, z: 0 },
        { x: 5, y: 38, z: -100 },
        { x: -5, y: 45, z: -300 },
        { x: 0, y: 50, z: -500 },
        { x: 0, y: 55, z: -700 },
      ];

      const curPos = cameraPositions[newSection] || cameraPositions[0];
      const nxtPos = cameraPositions[newSection + 1] || curPos;
      refs.targetCameraX = curPos.x + (nxtPos.x - curPos.x) * sectionProgress;
      refs.targetCameraY = curPos.y + (nxtPos.y - curPos.y) * sectionProgress;
      refs.targetCameraZ = curPos.z + (nxtPos.z - curPos.z) * sectionProgress;

      refs.mountains.forEach((mt, i) => {
        const speed = 1 + i * 0.9;
        const targetZ = mt.userData.baseZ + scrollY * speed * 0.3;
        if (refs.nebula) refs.nebula.position.z = targetZ - 100;
        if (progress > 0.15) mt.position.z = 600000;
        else if (refs.locations) mt.position.z = refs.locations[i];
      });
      if (refs.nebula && refs.mountains[3]) refs.nebula.position.z = refs.mountains[3].position.z;

      // Active nav tracking
      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const sec = sectionRefs.current[i];
        if (sec && sec.getBoundingClientRect().top <= 200) {
          setActiveNav(navItems[i] || '');
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
  };

  /* ─── JSX ─── */
  return (
    <div ref={containerRef} className="portfolio-root">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* ── Navbar ── */}
      <nav ref={navRef} className="portfolio-nav" style={{ visibility: 'hidden' }}>
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>KS</div>
        <button className={`nav-burger ${navOpen ? 'open' : ''}`} onClick={() => setNavOpen((v) => !v)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <ul className={`nav-links ${navOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item}>
              <button className={`nav-link ${activeNav === item ? 'active' : ''}`} onClick={() => scrollTo(item.toLowerCase())}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Hero ── */}
      <header className="hero-section" ref={heroContentRef} style={{ visibility: 'hidden' }}>
        <p className="hero-tag">Hello, I'm</p>
        <h1 className="hero-name">KUMMARI SAMPATH</h1>
        <p className="hero-role">Computer Science &amp; Engineering Student · Aspiring Software Engineer</p>
        <div className="hero-socials">
          <a href="https://github.com/sampath2511" target="_blank" rel="noreferrer" className="hero-social-link" title="GitHub"><GithubIcon /><span>GitHub</span></a>
          <a href="mailto:sampathkummari25@gmail.com" className="hero-social-link" title="Email"><MailIcon /><span>Email</span></a>
          <a href="tel:+919491734081" className="hero-social-link" title="Phone"><PhoneIcon /><span>+91-9491734081</span></a>
          <a href="https://www.linkedin.com/in/k-sampath-00950228b/" target="_blank" rel="noreferrer" className="hero-social-link" title="LinkedIn"><LinkedinIcon /><span>LinkedIn</span></a>
        </div>
        <div className="hero-scroll-hint" onClick={() => scrollTo('about')}>
          <span>Scroll to explore</span>
          <ChevronDown />
        </div>
      </header>

      {/* ── Scroll sections ── */}
      <div className="portfolio-sections">

        {/* About */}
        <section id="about" className="port-section" ref={(el) => { sectionRefs.current[0] = el; }}>
          <h2 className="section-heading"><span className="heading-num">01</span>About Me</h2>
          <div className="glass-card about-card">
            <p>
              Motivated Computer Science and Engineering student with strong foundations in programming,
              problem solving, and backend development. Passionate about building scalable software systems
              and continuously learning modern technologies.
            </p>
            <p>
              Seeking opportunities to apply my skills in software development and gain practical industry experience.
              Areas of interest include <strong>Junior Software Engineering</strong> and <strong>Backend Engineering</strong>.
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <span className="highlight-number">8.0</span>
                <span className="highlight-label">CGPA</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">4+</span>
                <span className="highlight-label">Languages</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">2025</span>
                <span className="highlight-label">Intern</span>
              </div>
            </div>
          </div>
        </section>

        {/* Profiles */}
        <section id="profiles" className="port-section" ref={(el) => { sectionRefs.current[1] = el; }}>
          <h2 className="section-heading"><span className="heading-num">02</span>DSA Profiles</h2>
          <div className="profiles-grid">
            
            {/* HackerRank */}
            <a href="https://www.hackerrank.com/sampathkummari25" target="_blank" rel="noreferrer" className="profile-card">
              <div className="profile-header">
                <div className="profile-logo" style={{ color: '#00EA64' }}>HR</div>
                <div className="profile-info">
                  <span className="profile-name">HackerRank</span>
                  <span className="profile-user">@sampathkummari25</span>
                </div>
                <div className="profile-link-icon"><ExternalLinkIcon /></div>
              </div>
              <div className="profile-stats">
                <div className="stat-box">
                  <span className="stat-val" style={{ color: '#00EA64' }}>2★</span>
                  <span className="stat-label">Stars</span>
                </div>
                <div className="stat-box">
                  <span className="stat-val" style={{ color: '#00EA64' }}>1</span>
                  <span className="stat-label">Badge</span>
                </div>
              </div>
            </a>

            {/* LeetCode */}
            <a href="https://leetcode.com/sampath___2511" target="_blank" rel="noreferrer" className="profile-card">
              <div className="profile-header">
                <div className="profile-logo" style={{ color: '#FFA116' }}>LC</div>
                <div className="profile-info">
                  <span className="profile-name">LeetCode</span>
                  <span className="profile-user">@sampath___2511</span>
                </div>
                <div className="profile-link-icon"><ExternalLinkIcon /></div>
              </div>
              <div className="profile-stats">
                <div className="stat-box">
                  <span className="stat-val" style={{ color: '#FFA116' }}>72</span>
                  <span className="stat-label">Solved</span>
                </div>
                <div className="stat-box">
                  <span className="stat-val" style={{ color: '#FFA116' }}>1,411</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </a>

            {/* InterviewBit */}
            <a href="https://www.interviewbit.com/profile/k-sampath" target="_blank" rel="noreferrer" className="profile-card">
              <div className="profile-header">
                <div className="profile-logo" style={{ color: '#FF5722' }}>IB</div>
                <div className="profile-info">
                  <span className="profile-name">InterviewBit</span>
                  <span className="profile-user">@k-sampath</span>
                </div>
                <div className="profile-link-icon"><ExternalLinkIcon /></div>
              </div>
              <div className="profile-stats">
                <div className="stat-box">
                  <span className="stat-val" style={{ color: '#FF5722' }}>28</span>
                  <span className="stat-label">Solved</span>
                </div>
                <div className="stat-box">
                  <span className="stat-val" style={{ color: '#FF5722' }}>7,052</span>
                  <span className="stat-label">Score</span>
                </div>
              </div>
            </a>

            {/* CodeChef */}
            <a href="https://www.codechef.com/users/sampath_2511" target="_blank" rel="noreferrer" className="profile-card">
              <div className="profile-header">
                <div className="profile-logo" style={{ color: '#8B4513' }}>CC</div>
                <div className="profile-info">
                  <span className="profile-name">CodeChef</span>
                  <span className="profile-user">@sampath_2511</span>
                </div>
                <div className="profile-link-icon"><ExternalLinkIcon /></div>
              </div>
              <div className="profile-stats">
                <div className="stat-box">
                  <span className="stat-val" style={{ color: '#8B4513' }}>1,474</span>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat-box">
                  <span className="stat-val" style={{ color: '#8B4513' }}>2★</span>
                  <span className="stat-label">Stars</span>
                </div>
              </div>
            </a>

            {/* Codeforces */}
            <a href="https://codeforces.com/profile/sampath11" target="_blank" rel="noreferrer" className="profile-card">
              <div className="profile-header">
                <div className="profile-logo" style={{ color: '#1E88E5' }}>CF</div>
                <div className="profile-info">
                  <span className="profile-name">Codeforces</span>
                  <span className="profile-user">@sampath11</span>
                </div>
                <div className="profile-link-icon"><ExternalLinkIcon /></div>
              </div>
              <div className="profile-stats">
                <div className="stat-box">
                  <span className="stat-val" style={{ color: '#1E88E5' }}>newbie</span>
                  <span className="stat-label">Rank</span>
                </div>
                <div className="stat-box">
                  <span className="stat-val" style={{ color: '#1E88E5' }}>590</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </a>

          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="port-section" ref={(el) => { sectionRefs.current[2] = el; }}>
          <h2 className="section-heading"><span className="heading-num">03</span>Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((group) => (
              <div key={group.category} className="skill-group glass-card">
                <h3 className="skill-category">{group.category}</h3>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span key={item} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="glass-card soft-skills-card">
            <h3 className="skill-category">Soft Skills</h3>
            <div className="skill-tags">
              {['Communication', 'Teamwork', 'Leadership', 'Problem Solving', 'Adaptability'].map((s) => (
                <span key={s} className="skill-tag soft">{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="port-section" ref={(el) => { sectionRefs.current[3] = el; }}>
          <h2 className="section-heading"><span className="heading-num">04</span>Experience</h2>
          <div className="timeline">
            {experience.map((exp, i) => (
              <div key={i} className="timeline-item glass-card">
                <div className="timeline-dot" />
                <div className="timeline-header">
                  <h3>{exp.role}</h3>
                  <span className="timeline-meta">{exp.company} · {exp.period}</span>
                </div>
                <ul className="timeline-bullets">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="port-section" ref={(el) => { sectionRefs.current[4] = el; }}>
          <h2 className="section-heading"><span className="heading-num">05</span>Projects</h2>
          <div className="projects-grid">
            {projects.map((proj, i) => (
              <div key={i} className="glass-card project-card">
                <div className="project-header">
                  <h3>{proj.title}</h3>
                  {proj.link ? (
                    <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex' }} aria-label="View Project">
                      <ExternalLinkIcon />
                    </a>
                  ) : (
                    <ExternalLinkIcon />
                  )}
                </div>
                <div className="skill-tags" style={{ marginBottom: '1rem' }}>
                  {proj.tech.map((t) => <span key={t} className="skill-tag accent">{t}</span>)}
                </div>
                <ul className="timeline-bullets">
                  {proj.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <h3 className="sub-heading">Achievements & Certifications</h3>
          <div className="achievements-list">
            {achievements.map((a, i) => (
              a.link ? (
                <a key={i} href={a.link} target="_blank" rel="noreferrer" className="achievement-item glass-card link-card">
                  <span className="achievement-icon">🎓</span>
                  <p>{a.text}</p>
                  <ExternalLinkIcon style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                </a>
              ) : (
                <div key={i} className="achievement-item glass-card">
                  <span className="achievement-icon">🏆</span>
                  <p>{a.text}</p>
                </div>
              )
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="port-section" ref={(el) => { sectionRefs.current[5] = el; }}>
          <h2 className="section-heading"><span className="heading-num">06</span>Education</h2>
          <div className="education-grid">
            {education.map((edu, i) => (
              <div key={i} className="edu-card glass-card">
                <div className="edu-year">{edu.year}</div>
                <h3>{edu.degree}</h3>
                <p className="edu-institution">{edu.institution}</p>
                <span className="edu-score">{edu.score}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="port-section" ref={(el) => { sectionRefs.current[6] = el; }}>
          <h2 className="section-heading"><span className="heading-num">07</span>Get In Touch</h2>
          <div className="contact-grid">
            <a href="mailto:sampathkummari25@gmail.com" className="contact-card glass-card">
              <MailIcon />
              <span>sampathkummari25@gmail.com</span>
            </a>
            <a href="tel:+919491734081" className="contact-card glass-card">
              <PhoneIcon />
              <span>+91-9491734081</span>
            </a>
            <a href="https://github.com/sampath2511" target="_blank" rel="noreferrer" className="contact-card glass-card">
              <GithubIcon />
              <span>github.com/sampath2511</span>
            </a>
            <a href="https://www.linkedin.com/in/k-sampath-00950228b/" target="_blank" rel="noreferrer" className="contact-card glass-card">
              <LinkedinIcon />
              <span>LinkedIn Profile</span>
            </a>
          </div>
          <p className="contact-cta">Feel free to reach out — I'm always open to new opportunities and collaborations.</p>
        </section>
      </div>

      {/* Footer */}
      <footer className="portfolio-footer">
        <p>© {new Date().getFullYear()} Kummari Sampath. Built with React & Three.js</p>
      </footer>

      {/* Scroll progress */}
      <div ref={scrollProgressRef} className="scroll-progress" style={{ visibility: 'hidden' }}>
        <div className="scroll-text">SCROLL</div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
        <div className="section-counter">
          {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};
