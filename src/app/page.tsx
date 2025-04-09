"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Instagram } from 'lucide-react';
import MatrixRain from "./components/MatrixRain";

// Implementação manual de debounce
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const technologies = [
    { name: "TypeScript", icon: "devicon-typescript-plain", color: "bg-blue-600" },
    { name: "React", icon: "devicon-react-original", color: "bg-cyan-500" },
    { name: "Node.js", icon: "devicon-nodejs-plain", color: "bg-green-600" },
    { name: "Tailwind", icon: "devicon-tailwindcss-plain", color: "bg-sky-400" },
    { name: "HTML5", icon: "devicon-html5-plain", color: "bg-orange-500" },
  ];

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = debounce(() => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setIsVisible(window.scrollY > 300);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal elements on scroll
  useEffect(() => {
    const revealSections = () => {
      const sections = document.querySelectorAll('.reveal-section');
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
          section.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', revealSections);
    revealSections();
    
    return () => window.removeEventListener('scroll', revealSections);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const rotateCarousel = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveIndex((prev: number) => (prev + 1) % technologies.length);
    } else {
      setActiveIndex((prev: number) => (prev - 1 + technologies.length) % technologies.length);
    }
  };

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Uma plataforma de comércio eletrônico completa com painel de administração e gateway de pagamento integrado.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://public.readdy.ai/ai/img_res/6f11e0e5f9b93ff4daa99aa9dec49c48.jpg'
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Painel de análise de dados em tempo real com visualizações interativas e relatórios personalizáveis.',
      tech: ['TypeScript', 'React', 'D3.js', 'Firebase'],
      image: 'https://public.readdy.ai/ai/img_res/f12ec3ef4ddefae77827063d5c48b62d.jpg'
    },
    {
      id: 3,
      title: 'App de Gestão de Tarefas',
      description: 'Aplicativo de produtividade para gerenciamento de tarefas com recursos de colaboração em equipe.',
      tech: ['React Native', 'Redux', 'Node.js', 'MongoDB'],
      image: 'https://public.readdy.ai/ai/img_res/27dbbae0cc1b568cb2c8aff63af82d62.jpg'
    },
    {
      id: 4,
      title: 'Plataforma de Cursos Online',
      description: 'Sistema de gerenciamento de aprendizado com conteúdo em vídeo, quizzes e certificados.',
      tech: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'AWS'],
      image: 'https://public.readdy.ai/ai/img_res/6615f15e6772ad0a1486ea53ebf0ab3e.jpg'
    }
  ];

  const buttonBaseStyles = "px-8 py-6 text-lg transition-transform duration-300 !rounded-button whitespace-nowrap cursor-pointer";
  const buttonPrimaryStyles = "bg-transparent border-2 border-purple-500 text-white hover:bg-purple-500/10";
  const buttonExpandEffect = "hover:scale-105";

  const arrowButtonStyles = "w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-md hover:scale-110 transition-transform duration-300 z-10";

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-teal-500 to-green-500 p-3 rounded-full shadow-xl hover:shadow-[0_0_20px_rgba(72,187,120,0.7)] transition-all duration-300 z-40 cursor-pointer"
      >
        <i className="fas fa-arrow-up text-white text-lg"></i>
      </motion.button>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-40 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:drop-shadow-glow transition duration-300">
            GG
          </div>
          <div className="hidden md:flex space-x-8">
            {[{ label: "Início", ref: heroRef }, { label: "Sobre", ref: aboutRef }, { label: "Tecnologias", ref: techRef }, { label: "Projetos", ref: projectsRef }, { label: "Contato", ref: contactRef }].map(({ label, ref }) => (
              <button
                key={label}
                onClick={() => scrollToSection(ref)}
                className="text-gray-300 hover:text-white transition duration-300 p-2 rounded-lg hover:shadow-[0_0_10px_rgba(168,85,247,0.7)]"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-24 bg-gradient-to-br from-black via-gray-900 to-purple-900 overflow-hidden"
      >
        <MatrixRain />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-[0_0_50px_rgba(128,0,255,1)] animate-fade-in">
            Gustavo Gutierrez
          </h1>
          <p className="text-3xl md:text-4xl text-gray-200 mt-8 max-w-4xl leading-relaxed drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] text-center">
            Desenvolvedor Full Stack apaixonado por transformar ideias em experiências digitais inovadoras e impactantes.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center reveal-section opacity-0 transform translate-y-8 transition-all duration-1000">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Sobre Mim
              </span>
            </h2>
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-2 reveal-section opacity-0 transform translate-y-8 transition-all duration-1000">
                <div className="rounded-2xl overflow-hidden border border-purple-500/20 shadow-xl shadow-purple-500/10 relative">
                  <img 
                    src="/imagens/eu2.png" 
                    alt="Gustavo Gutierrez" 
                    className="w-full h-auto object-cover object-top"
                  />
                  <div className="absolute inset-0 border-4 border-purple-500 rounded-2xl animate-pulse"></div>
                </div>
              </div>
              <div className="md:col-span-3 reveal-section opacity-0 transform translate-y-8 transition-all duration-1000 delay-300">
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Sou um desenvolvedor especializado em criar aplicações web modernas utilizando tecnologias como React, Node.js, TypeScript e Tailwind CSS. Estou sempre em busca de desafios que envolvam criatividade, performance e design de alto nível.
                </p>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Com mais de 4 meses de experiência no desenvolvimento de soluções digitais, tenho trabalhado com empresas de diversos segmentos, ajudando-as a transformar suas ideias em produtos digitais de sucesso.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-3">Educação</h3>
                    <p className="text-gray-300">Cursando Analise e desenvolvimento de sistemas<br/>Faculdade Unigoias (3º Periodo)</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-3">Experiência</h3>
                    <p className="text-gray-300">4 meses em desenvolvimento web<br/>4 meses com React e Node.js</p>
                  </div>
                </div>
                <Button 
                  className={`${buttonBaseStyles} ${buttonPrimaryStyles} ${buttonExpandEffect}`}
                >
                  Baixar Currículo <i className="fas fa-download ml-2"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section ref={techRef} className="min-h-screen py-24 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-wide">
            Tecnologias
          </h2>

          {/* Carrossel */}
          <div className="relative h-[350px] max-w-5xl mx-auto mt-[-20px]" style={{ perspective: "1200px" }}>
            <div
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d", transition: "transform 1s ease-in-out" }}
            >
              {technologies.map((tech, index) => {
                const angle = (index - activeIndex) * (360 / technologies.length);
                const radius = 300; // Aumentado para um tamanho maior

                return (
                  <div
                    key={index}
                    className="absolute w-[180px] h-[230px] left-1/2 top-1/2"
                    style={{
                      transform: `
                        translate(-50%, -50%)
                        rotateY(${angle}deg)
                        translateZ(${radius}px)
                      `,
                      opacity: Math.abs(angle) > 90 ? 0.2 : 1,
                      zIndex: Math.abs(angle) > 90 ? 0 : 10,
                      transformStyle: "preserve-3d",
                      transition: "all 0.5s ease-in-out",
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md border border-purple-600/20 rounded-2xl p-4 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(128,0,255,0.2)] hover:scale-110 hover:shadow-purple-500/40 transition-all duration-500 cursor-pointer">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4">
                        <img
                          src={`/imagens/${tech.name === "Node.js" ? "node" : tech.name.toLowerCase().replace(/\./g, "-")}.png`}
                          alt={tech.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-extrabold text-white tracking-wide mb-1 text-center">{tech.name}</h3>
                      <p className="text-sm text-gray-400 text-center">Experiência sólida</p>
                      <div className="w-12 h-1 mt-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-center mt-6 space-x-6">
            <button
              onClick={() => rotateCarousel("prev")}
              className="w-10 h-10 flex items-center justify-center text-white rounded-full transition-transform duration-300 hover:scale-110 hover:text-purple-500 bg-gray-800/50 border border-gray-700 hover:border-purple-500 shadow-md"
              aria-label="Anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => rotateCarousel("next")}
              className="w-10 h-10 flex items-center justify-center text-white rounded-full transition-transform duration-300 hover:scale-110 hover:text-purple-500 bg-gray-800/50 border border-gray-700 hover:border-purple-500 shadow-md"
              aria-label="Próximo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-24 bg-black relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center reveal-section opacity-0 transform translate-y-8 transition-all duration-1000">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Projetos
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative h-80 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden reveal-section opacity-0 transform translate-y-8 transition-all duration-1000 hover:z-10 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:border-purple-500 transition-shadow duration-300"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:opacity-30"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-100 transition-all duration-500">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>
                    <p className="text-gray-400 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">{project.description}</p>
                  </div>
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t, i) => (
                        <Badge key={i} className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 hover:shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-shadow duration-300">{t}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                      <Button className={`${buttonBaseStyles} ${buttonPrimaryStyles} ${buttonExpandEffect}`}>
                        <i className="fab fa-github mr-2"></i> Código
                      </Button>
                      <Button className={`${buttonBaseStyles} ${buttonPrimaryStyles} ${buttonExpandEffect}`}>
                        Demo ao vivo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-24 bg-black relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center reveal-section opacity-0 transform translate-y-8 transition-all duration-1000">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Contato
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="reveal-section opacity-0 transform translate-y-8 transition-all duration-1000">
              <h3 className="text-2xl font-semibold mb-6 text-white">Vamos conversar</h3>
              <p className="text-gray-300 mb-8">
                Estou disponível para projetos freelance, oportunidades de trabalho ou simplesmente para trocar ideias sobre tecnologia e desenvolvimento.
              </p>
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mr-4 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.7)] transition-shadow duration-300">
                    <Mail className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Email</h4>
                    <p className="text-white group-hover:text-purple-300 transition-colors duration-300">gustavogutierrez0311@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mr-4 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.7)] transition-shadow duration-300">
                    <MapPin className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Localização</h4>
                    <p className="text-white group-hover:text-purple-300 transition-colors duration-300">Goiânia - GO, Brasil</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mr-4 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.7)] transition-shadow duration-300">
                    <Phone className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Telefone</h4>
                    <p className="text-white group-hover:text-purple-300 transition-colors duration-300">+55 62982772393</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mr-4 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.7)] transition-shadow duration-300">
                    <Instagram className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Instagram</h4>
                    <p className="text-white group-hover:text-purple-300 transition-colors duration-300">@gustavoo_gutierrez</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal-section opacity-0 transform translate-y-8 transition-all duration-1000 delay-300">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
                <h3 className="text-2xl font-semibold mb-6 text-white">Envie uma mensagem</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nome</label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Seu nome" 
                      className="w-full bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white placeholder-gray-400 focus:ring-purple-500 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu.email@exemplo.com" 
                      className="w-full bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white placeholder-gray-400 focus:ring-purple-500 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Mensagem</label>
                    <Textarea 
                      id="message" 
                      placeholder="Sua mensagem aqui..." 
                      rows={5}
                      className="w-full bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white placeholder-gray-400 focus:ring-purple-500 rounded-lg"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className={`${buttonBaseStyles} ${buttonPrimaryStyles} ${buttonExpandEffect}`}
                  >
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add reveal class to sections */}
      <style>{`
        .reveal-section {
          transition: all 1s ease;
        }
        .reveal-section.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default App;