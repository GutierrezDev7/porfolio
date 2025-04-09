import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '@#!$¨&{}[]<>/+-*=%1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const specialChars = '@#!$¨&';
    const programChars = '{}[]<>/';
    const mathChars = '+-*=%';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    const charTypes = [];
    const colors = [];
    const speeds = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      const rand = Math.random();
      if (rand < 0.15) {
        charTypes[i] = 'special';
        colors[i] = `hsl(${Math.random() * 360}, 100%, 70%)`;
        speeds[i] = 0.8 + Math.random() * 0.4;
      } else if (rand < 0.35) {
        charTypes[i] = 'program';
        colors[i] = `hsl(${Math.random() * 60 + 180}, 100%, 65%)`;
        speeds[i] = 1 + Math.random() * 0.5;
      } else if (rand < 0.55) {
        charTypes[i] = 'math';
        colors[i] = `hsl(${Math.random() * 60 + 120}, 100%, 60%)`;
        speeds[i] = 1.2 + Math.random() * 0.6;
      } else {
        charTypes[i] = 'alpha';
        colors[i] = `hsl(${Math.random() * 60 + 240}, 100%, 75%)`;
        speeds[i] = 1.5 + Math.random() * 0.7;
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Reduzi a opacidade para suavizar o efeito
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < columns; i++) {
        let text = '';
        const type = charTypes[i];
        if (type === 'special') {
          text = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
          ctx.font = `${fontSize * 1.2}px monospace`;
          ctx.fillStyle = colors[i];
          ctx.shadowBlur = 15;
          ctx.shadowColor = colors[i];
        } else if (type === 'program') {
          text = programChars.charAt(Math.floor(Math.random() * programChars.length));
          ctx.font = `${fontSize}px monospace`;
          ctx.fillStyle = colors[i];
          ctx.shadowBlur = 8;
          ctx.shadowColor = colors[i];
        } else if (type === 'math') {
          text = mathChars.charAt(Math.floor(Math.random() * mathChars.length));
          ctx.font = `${fontSize}px monospace`;
          ctx.fillStyle = colors[i];
          ctx.shadowBlur = 5;
          ctx.shadowColor = colors[i];
        } else {
          text = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.font = `${fontSize}px monospace`;
          ctx.fillStyle = colors[i];
          ctx.shadowBlur = 3;
          ctx.shadowColor = colors[i];
        }
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const opacity = y > canvas.height * 0.8 ?
          1 - (y - canvas.height * 0.8) / (canvas.height * 0.2) : 1;
        ctx.globalAlpha = opacity;
        ctx.fillText(text, x, y);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        drops[i] += speeds[i] * 0.3; // Reduzi ainda mais a velocidade
        if (drops[i] * fontSize > canvas.height) {
          drops[i] = 0; // Reinicia a posição da coluna
          colors[i] = `hsl(${Math.random() * 360}, 100%, 70%)`; // Atualiza a cor para um novo ciclo
        }
      }
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default MatrixRain;