'use client';

import { useEffect, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/**
 * (#8) Lightweight WebGL shader band — a slow, marble-like vein flow rendered
 * with a single fragment shader (no Three.js). Capability-gated: falls back to
 * a static gradient when WebGL is unavailable or prefers-reduced-motion is set.
 * Kept subtle and paused when off-screen.
 */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; }
  return v;
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy;
  uv.x*=u_res.x/u_res.y;
  float t=u_time*0.03;
  vec2 q=vec2(fbm(uv*2.0+t), fbm(uv*2.0-t+5.2));
  float v=fbm(uv*3.0+q*2.5);
  float veins=smoothstep(0.35,0.65,v);
  vec3 black=vec3(0.08,0.075,0.065);
  vec3 brass=vec3(0.66,0.525,0.35);
  vec3 col=mix(black, brass, pow(veins,1.6)*0.55);
  gl_FragColor=vec4(col,1.0);
}
`;
const VERT = `attribute vec2 p; void main(){ gl_Position=vec4(p,0.0,1.0); }`;

export function ShaderBand({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting), { threshold: 0.01 });
    io.observe(canvas);

    const start = performance.now();
    const loop = () => {
      if (visible) {
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, (performance.now() - start) / 1000);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      io.disconnect();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-stone-900 text-paper">
      {/* Fallback gradient (shown until/if the shader draws over it). */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 100% at 30% 20%, #2a2520 0%, #14120f 60%, #0e0d0b 100%)' }}
      />
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      <div aria-hidden className="absolute inset-0 bg-stone-900/45" />
      <Container className="relative py-band-lg">
        <Reveal className="max-w-2xl">
          {eyebrow ? <p className="eyebrow text-brass">{eyebrow}</p> : null}
          <h2 className="mt-4 text-display-md font-normal text-paper">{title}</h2>
          {children ? <div className="mt-6 text-fluid-base text-paper/80">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  );
}
