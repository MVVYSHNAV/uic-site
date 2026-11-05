'use client';

import React, { useEffect, useRef, useState } from 'react';

// Isometric camera and geometry utilities from @lucasmarkes/hairline
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;
const poly = (pts: [number, number][]) => 'M' + pts.map((p) => r2(p[0]) + ' ' + r2(p[1])).join('L') + 'Z';
const seg = (a: [number, number], b: [number, number]) => `M${r2(a[0])} ${r2(a[1])}L${r2(b[0])} ${r2(b[1])}`;
const open = (pts: [number, number][]) => (pts.length < 2 ? '' : 'M' + pts.map((p) => r2(p[0]) + ' ' + r2(p[1])).join('L'));

interface CamType {
  az: number;
  k: number;
  S: number;
  ox: number;
  oy: number;
}

const Cam = (azDeg: number, k: number, S: number): CamType => ({
  az: rad(azDeg),
  k,
  S,
  ox: 0,
  oy: 0,
});

function proj(C: CamType) {
  const c = Math.cos(C.az);
  const s = Math.sin(C.az);
  const zf = Math.sqrt(1 - C.k * C.k);
  return (x: number, y: number, z: number): [number, number] => {
    const X = x * c - y * s;
    const Y = x * s + y * c;
    return [C.ox + C.S * X, C.oy + C.S * (Y * C.k - z * zf)];
  };
}

function unproj(C: CamType, sx: number, sy: number, z: number): [number, number] {
  const c = Math.cos(C.az);
  const s = Math.sin(C.az);
  const zf = Math.sqrt(1 - C.k * C.k);
  const X = (sx - C.ox) / C.S;
  const Y = ((sy - C.oy) / C.S + z * zf) / C.k;
  return [X * c + Y * s, -X * s + Y * c];
}

function fit(C: CamType, pts: number[][], cx: number, cy: number) {
  C.ox = 0;
  C.oy = 0;
  const P = proj(C);
  let a = 1e9, b = -1e9, c = 1e9, d = -1e9;
  for (const p of pts) {
    const q = P(p[0], p[1], p[2]);
    a = Math.min(a, q[0]);
    b = Math.max(b, q[0]);
    c = Math.min(c, q[1]);
    d = Math.max(d, q[1]);
  }
  C.ox = cx - (a + b) / 2;
  C.oy = cy - (c + d) / 2;
}

interface RingPoint {
  u: number;
  v: number;
  nu: number;
  nv: number;
}

function rrect(u0: number, v0: number, u1: number, v1: number, r: number, n = 4): RingPoint[] {
  r = Math.max(0, Math.min(r, (u1 - u0) / 2, (v1 - v0) / 2));
  const out: RingPoint[] = [];
  for (const [cu, cv, a0] of [
    [u1 - r, v1 - r, 0],
    [u0 + r, v1 - r, 90],
    [u0 + r, v0 + r, 180],
    [u1 - r, v0 + r, 270],
  ]) {
    for (let k = 0; k <= n; k++) {
      const a = rad(a0 + (90 * k) / n);
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      out.push({ u: cu + r * ca, v: cv + r * sa, nu: ca, nv: sa });
    }
  }
  return out;
}

function hull(input: [number, number][]): [number, number][] {
  const pts = input.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const x = (o: [number, number], a: [number, number], b: [number, number]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: [number, number][] = [], up: [number, number][] = [];
  for (const p of pts) {
    while (lo.length > 1 && x(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop();
    lo.push(p);
  }
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (up.length > 1 && x(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop();
    up.push(p);
  }
  lo.pop();
  up.pop();
  return lo.concat(up);
}

const ringAt = (P: (x: number, y: number, z: number) => [number, number], ring: RingPoint[], z: number): [number, number][] =>
  ring.map((q) => P(q.u, q.v, z));

const facing = (C: CamType) => {
  const s = Math.sin(C.az);
  const c = Math.cos(C.az);
  return (q: RingPoint) => q.nu * s + q.nv * c >= -1e-6;
};

function run(ring: RingPoint[], keep: (q: RingPoint) => boolean): RingPoint[] {
  const n = ring.length;
  let s = -1;
  for (let i = 0; i < n; i++) {
    if (keep(ring[i]) && !keep(ring[(i + n - 1) % n])) {
      s = i;
      break;
    }
  }
  if (s < 0) return keep(ring[0]) ? ring.slice() : [];
  const out: RingPoint[] = [];
  for (let k = 0; k < n && keep(ring[(s + k) % n]); k++) out.push(ring[(s + k) % n]);
  return out;
}

function prism(
  P: (x: number, y: number, z: number) => [number, number],
  front: (q: RingPoint) => boolean,
  ring: RingPoint[],
  inner: RingPoint[] | null,
  z0: number,
  z1: number
) {
  return {
    sil: poly(hull(ringAt(P, ring, z1).concat(ringAt(P, ring, z0)))),
    crease: inner ? open(ringAt(P, run(inner, front), z1)) : '',
  };
}

const rings = (x0: number, y0: number, x1: number, y1: number, r: number, b: number): [RingPoint[], RingPoint[]] => [
  rrect(x0, y0, x1, y1, r),
  rrect(x0 + b, y0 + b, x1 - b, y1 - b, Math.max(0.3, r - b)),
];

interface SpringType {
  x: number;
  v: number;
  t: number;
  k: number;
  c: number;
  m: number;
  eps: number;
}

function spring(x: number, o: { k?: number; c?: number; m?: number; eps?: number } = {}): SpringType {
  return { x, v: 0, t: x, k: o.k ?? 100, c: o.c ?? 18, m: o.m ?? 1, eps: o.eps ?? 0.01 };
}

function stepS(sp: SpringType, dt: number): boolean {
  const n = Math.max(1, Math.ceil(dt * 240));
  const h = dt / n;
  for (let i = 0; i < n; i++) {
    const a = (-sp.k * (sp.x - sp.t) - sp.c * sp.v) / sp.m;
    sp.v += a * h;
    sp.x += sp.v * h;
  }
  if (Math.abs(sp.x - sp.t) < sp.eps && Math.abs(sp.v) < sp.eps * 10) {
    sp.x = sp.t;
    sp.v = 0;
    return false;
  }
  return true;
}

export function HairlineBridge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [statusText, setStatusText] = useState('rest');

  useEffect(() => {
    const svg = svgRef.current;
    const stage = containerRef.current;
    if (!svg || !stage) return;

    const C = Cam(45, 0.5, 1.62);
    fit(C, [[-10, -10, -6], [146, 86, -6], [146, -10, -6], [-10, 86, -6], [22, 22, 50], [116, 62, 42]], 200, 160);
    const P = proj(C);
    const front = facing(C);

    // Clear previous
    svg.replaceChildren();

    const NS = 'http://www.w3.org/2000/svg';
    const mk = (tag: string, attrs: Record<string, string>, parent?: SVGElement): SVGElement => {
      const el = document.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      if (parent) parent.appendChild(el);
      return el;
    };

    const solid = (parent: SVGElement) => {
      const g = mk('g', {}, parent);
      const sil = mk('path', { class: 'sil' }, g) as SVGPathElement;
      const cr = mk('path', { class: 'nf lo' }, g) as SVGPathElement;
      return { g, sil, cr };
    };

    const put = (el: { sil: SVGPathElement; cr: SVGPathElement }, s: { sil: string; crease: string }) => {
      el.sil.setAttribute('d', s.sil);
      el.cr.setAttribute('d', s.crease);
    };

    const rootG = mk('g', {}, svg);

    // 1. Foundation Block Plinth
    const [pr, pi] = rings(-8, -8, 144, 84, 8, 1.8);
    put(solid(rootG), prism(P, front, pr, pi, -5, 0));

    // Conduit guide rail on the plinth floor
    mk('path', {
      d: `${seg(P(42, 32, 0.2), P(98, 56, 0.2))} ${seg(P(44, 28, 0.2), P(100, 52, 0.2))}`,
      class: 'dash lo',
    }, rootG);

    // 2. Terminal Console (left flank)
    const [tr, ti] = rings(8, 8, 46, 42, 4, 1.4);
    const termSolid = solid(rootG);
    put(termSolid, prism(P, front, tr, ti, 0, 12));

    // Terminal upright display panel
    const [sr, si] = rings(14, 12, 40, 22, 2.5, 1.0);
    const dispSolid = solid(rootG);
    put(dispSolid, prism(P, front, sr, si, 12, 38));

    // Terminal screen scanlines
    mk('path', {
      d: [20, 26, 32].map((z) => seg(P(18, 22, z), P(36, 22, z))).join(' '),
      class: 'nf lo',
    }, rootG);

    // Terminal status dot
    const termDot = mk('ellipse', {
      rx: String(r2(0.9 * C.S)),
      ry: String(r2(0.9 * C.S * C.k)),
      cx: String(r2(P(15, 34, 12.2)[0])),
      cy: String(r2(P(15, 34, 12.2)[1])),
      class: 'dot',
    }, rootG);

    // 3. Conduit Transaction Gate & Token Pucks
    const [kr, ki] = rings(62, 38, 78, 48, 3, 0.9);
    const gateSolid = solid(rootG);
    put(gateSolid, prism(P, front, kr, ki, 0, 4));

    // 3 moving Token Pucks
    const pucks = [solid(rootG), solid(rootG), solid(rootG)];
    const puckSpring = spring(0.32, { k: 90, c: 16, m: 1 });
    let puckDrawn = NaN;

    // 4. Card Validator Plinth (right flank)
    const [vr, vi] = rings(94, 46, 136, 78, 4, 1.4);
    const valSolid = solid(rootG);
    put(valSolid, prism(P, front, vr, vi, 0, 10));

    // Card slot recess
    mk('path', {
      d: poly([P(104, 52, 10.2), P(126, 62, 10.2), P(124, 65, 10.2), P(102, 55, 10.2)]),
      class: 'fo lo',
    }, rootG);

    // Identity NFC Pass Card with spring lift
    const [cr, ci] = rings(103, 53, 127, 65, 2.2, 0.8);
    const cardSolid = solid(rootG);
    const cardSpring = spring(10, { k: 110, c: 18, m: 1 });
    let cardDrawn = NaN;

    const cardLoop = mk('path', { class: 'nf lo' }, rootG);
    const cardDot = mk('ellipse', {
      rx: String(r2(0.9 * C.S)),
      ry: String(r2(0.9 * C.S * C.k)),
      class: 'dot off',
    }, rootG);

    function drawCard(z: number) {
      if (Math.abs(z - cardDrawn) < 0.05) return;
      cardDrawn = z;
      put(cardSolid, prism(P, front, cr, ci, z, z + 22));
      cardLoop.setAttribute(
        'd',
        poly([
          P(107, 65.2, z + 7),
          P(117, 65.2, z + 7),
          P(117, 65.2, z + 17),
          P(107, 65.2, z + 17),
        ])
      );
      const dotPt = P(121, 65.2, z + 15);
      cardDot.setAttribute('cx', String(r2(dotPt[0])));
      cardDot.setAttribute('cy', String(r2(dotPt[1])));
    }

    function drawPucks(t: number) {
      if (Math.abs(t - puckDrawn) < 0.005) return;
      puckDrawn = t;
      [-0.08, 0, 0.08].forEach((offset, idx) => {
        const pos = clamp(t + offset, 0.04, 0.96);
        const px = 42 + pos * 56;
        const py = 30 + pos * 24;
        const [pkr, pki] = rings(px - 4, py - 3.2, px + 4, py + 3.2, 1.6, 0.5);
        put(pucks[idx], prism(P, front, pkr, pki, 0.5, 4.5));
      });
    }

    drawCard(10);
    drawPucks(0.32);

    let over: [number, number] | null = null;
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.06, (now - lastTime) / 1000);
      lastTime = now;
      stepS(puckSpring, dt);
      stepS(cardSpring, dt);
      drawPucks(clamp(puckSpring.x, 0.05, 0.95));
      drawCard(clamp(cardSpring.x, 10, 18));
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    function retarget() {
      if (!over) {
        puckSpring.t = 0.32;
        cardSpring.t = 10;
        dispSolid.sil.classList.remove('hi');
        cardSolid.sil.classList.remove('hi');
        pucks.forEach((p) => p.sil.classList.remove('hi'));
        termDot.setAttribute('class', 'dot');
        cardDot.setAttribute('class', 'dot off');
        setStatusText('rest');
      } else if (over[0] < 54) {
        puckSpring.t = 0.14;
        cardSpring.t = 10;
        dispSolid.sil.classList.add('hi');
        cardSolid.sil.classList.remove('hi');
        pucks.forEach((p) => p.sil.classList.remove('hi'));
        termDot.setAttribute('class', 'dot');
        cardDot.setAttribute('class', 'dot off');
        setStatusText('auth · req');
      } else if (over[0] > 92) {
        puckSpring.t = 0.92;
        cardSpring.t = 16.5;
        dispSolid.sil.classList.remove('hi');
        cardSolid.sil.classList.add('hi');
        pucks.forEach((p) => p.sil.classList.add('hi'));
        termDot.setAttribute('class', 'dot off');
        cardDot.setAttribute('class', 'dot');
        setStatusText('auth · ok');
      } else {
        puckSpring.t = 0.54;
        cardSpring.t = 12;
        dispSolid.sil.classList.remove('hi');
        cardSolid.sil.classList.remove('hi');
        pucks.forEach((p, idx) => p.sil.classList.toggle('hi', idx === 1));
        termDot.setAttribute('class', 'dot m');
        cardDot.setAttribute('class', 'dot m');
        setStatusText('sig · 92');
      }
    }

    const onPointerMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const sx = ((e.clientX - rect.left) / rect.width) * 400;
      const sy = ((e.clientY - rect.top) / rect.height) * 320;
      over = unproj(C, sx, sy, 0);
      retarget();
    };

    const onPointerLeave = () => {
      over = null;
      retarget();
    };

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="portal-hairline-bridge" aria-hidden="true">
      <div className="portal-hairline-hud">
        <span className="hud-led" />
        <span className="hud-text">{statusText}</span>
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 400 320"
        role="img"
        aria-label="Hairline isometric transaction bridge: computer initiating encrypted NFC transaction to user pass"
      />
    </div>
  );
}
