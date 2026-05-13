import { useEffect, useRef } from 'react';

const MAP_FRAME = {
  left: 0.2,
  top: 0.1,
  width: 0.74,
  height: 0.68,
};

const GEO_BOUNDS = {
  minLng: -135,
  maxLng: 110,
  minLat: -38,
  maxLat: 62,
};

const LANDMARKS = [
  {
    id: 'texas-am',
    label: 'Texas A&M',
    lng: -96.34,
    lat: 30.62,
    radius: 4.1,
    alpha: 0.98,
    glow: 18,
    color: 'rgba(255,223,150,1)',
    labelDx: -18,
    labelDy: 22,
    driftRadiusX: 6,
    driftRadiusY: 5,
    spring: 0.01,
  },
  {
    id: 'nyc',
    label: 'Jefferies NYC',
    lng: -74.0,
    lat: 40.71,
    radius: 3.5,
    alpha: 0.96,
    glow: 16,
    color: 'rgba(180,246,255,1)',
    labelDx: 14,
    labelDy: -18,
    driftRadiusX: 6,
    driftRadiusY: 5,
    spring: 0.01,
  },
  {
    id: 'pes',
    label: 'PES',
    lng: 77.53,
    lat: 12.94,
    radius: 3.2,
    alpha: 0.94,
    glow: 14,
    color: 'rgba(255,223,150,1)',
    labelDx: -34,
    labelDy: -18,
    driftRadiusX: 4,
    driftRadiusY: 3,
    spring: 0.012,
  },
  {
    id: 'jpmc',
    label: 'JPMC',
    lng: 77.63,
    lat: 13.01,
    radius: 3.9,
    alpha: 0.98,
    glow: 18,
    color: 'rgba(180,246,255,1)',
    labelDx: 14,
    labelDy: 20,
    driftRadiusX: 4,
    driftRadiusY: 3,
    spring: 0.012,
  },
];

const RELAY_POINTS = [
  {
    id: 'amsterdam',
    label: 'Amsterdam',
    lng: 4.9,
    lat: 52.37,
    radius: 2.4,
    alpha: 0.78,
    glow: 12,
    color: 'rgba(160,248,255,1)',
    labelDx: 12,
    labelDy: -16,
  },
  {
    id: 'germany',
    label: 'Germany',
    lng: 10.45,
    lat: 51.16,
    radius: 2.3,
    alpha: 0.76,
    glow: 11,
    color: 'rgba(160,248,255,1)',
    labelDx: 10,
    labelDy: 16,
  },
  {
    id: 'dubai',
    label: 'Dubai',
    lng: 55.27,
    lat: 25.2,
    radius: 2.5,
    alpha: 0.82,
    glow: 12,
    color: 'rgba(160,248,255,1)',
    labelDx: 12,
    labelDy: -16,
  },
  { id: 'mumbai', lng: 72.88, lat: 19.08, radius: 2.0, color: 'rgba(160,248,255,1)' },
  {
    id: 'thailand',
    label: 'Thailand',
    lng: 100.5,
    lat: 13.75,
    radius: 2.5,
    alpha: 0.8,
    glow: 12,
    color: 'rgba(160,248,255,1)',
    labelDx: 12,
    labelDy: -16,
  },
];

const ROUTE_SEGMENTS = [
  ['texas-am', 'nyc'],
  ['nyc', 'amsterdam'],
  ['amsterdam', 'germany'],
  ['germany', 'dubai'],
  ['dubai', 'mumbai'],
  ['mumbai', 'jpmc'],
  ['jpmc', 'pes'],
  ['pes', 'thailand'],
];

const OUTLINE_PATHS = [
  [
    [-130, 54],
    [-124, 50],
    [-124, 45],
    [-122, 40],
    [-118, 34],
    [-114, 32],
    [-109, 31],
    [-104, 29],
    [-97, 25],
    [-90, 26],
    [-84, 28],
    [-81, 26],
    [-79, 31],
    [-77, 36],
    [-74, 41],
    [-70, 44],
    [-66, 47],
    [-63, 48],
  ],
  [
    [-130, 54],
    [-122, 59],
    [-110, 61],
    [-96, 59],
    [-84, 56],
    [-72, 52],
    [-63, 48],
  ],
  [
    [-97, 25],
    [-92, 18],
    [-88, 18],
    [-85, 15],
    [-83, 10],
    [-80, 9],
  ],
  [
    [-80, 9],
    [-78, 2],
    [-78, -8],
    [-76, -16],
    [-73, -25],
    [-68, -36],
    [-60, -33],
    [-53, -24],
    [-49, -14],
    [-47, -4],
    [-50, 2],
    [-58, 7],
    [-68, 10],
    [-76, 10],
    [-80, 9],
  ],
  [
    [-10, 52],
    [0, 54],
    [12, 55],
    [24, 55],
    [36, 53],
    [48, 50],
    [60, 49],
    [72, 46],
    [84, 42],
    [96, 37],
    [106, 30],
  ],
  [
    [-17, 35],
    [-5, 36],
    [8, 34],
    [20, 30],
    [28, 21],
    [31, 8],
    [28, -8],
    [22, -22],
    [14, -34],
    [6, -33],
    [-1, -24],
    [-6, -10],
    [-10, 7],
    [-17, 35],
  ],
  [
    [34, 31],
    [42, 30],
    [50, 28],
    [58, 26],
    [64, 24],
    [69, 23],
    [73, 20],
    [76, 15],
    [77, 12],
    [79, 9],
    [82, 12],
    [85, 18],
    [88, 22],
    [90, 24],
  ],
  [
    [90, 24],
    [96, 20],
    [101, 14],
    [105, 8],
  ],
];

const INTERIOR_CLOUDS = [
  { lng: -116, lat: 52, count: 12, spreadLng: 18, spreadLat: 8 },
  { lng: -103, lat: 40, count: 22, spreadLng: 24, spreadLat: 12 },
  { lng: -84, lat: 36, count: 14, spreadLng: 18, spreadLat: 10 },
  { lng: -61, lat: -12, count: 12, spreadLng: 20, spreadLat: 18 },
  { lng: 10, lat: 50, count: 12, spreadLng: 20, spreadLat: 8 },
  { lng: 18, lat: 6, count: 14, spreadLng: 22, spreadLat: 18 },
  { lng: 51, lat: 28, count: 10, spreadLng: 16, spreadLat: 8 },
  { lng: 78, lat: 21, count: 18, spreadLng: 13, spreadLat: 10 },
  { lng: 92, lat: 30, count: 10, spreadLng: 16, spreadLat: 10 },
];

function createSeededRandom(seed) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function geoToCanvas(lng, lat, width, height) {
  const xRatio = (lng - GEO_BOUNDS.minLng) / (GEO_BOUNDS.maxLng - GEO_BOUNDS.minLng);
  const yRatio = (GEO_BOUNDS.maxLat - lat) / (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat);

  return {
    x: (MAP_FRAME.left + xRatio * MAP_FRAME.width) * width,
    y: (MAP_FRAME.top + yRatio * MAP_FRAME.height) * height,
  };
}

function withAlpha(color, alpha) {
  const [r, g, b] = color.match(/\d+/g);
  return `rgba(${r},${g},${b},${alpha})`;
}

function samplePath(points, stepDegrees = 6) {
  const sampled = [];

  for (let i = 0; i < points.length - 1; i++) {
    const [lngA, latA] = points[i];
    const [lngB, latB] = points[i + 1];
    const distance = Math.hypot(lngB - lngA, latB - latA);
    const steps = Math.max(2, Math.ceil(distance / stepDegrees));

    for (let step = 0; step < steps; step++) {
      const t = step / steps;
      sampled.push({
        lng: lngA + (lngB - lngA) * t,
        lat: latA + (latB - latA) * t,
      });
    }
  }

  const [finalLng, finalLat] = points[points.length - 1];
  sampled.push({ lng: finalLng, lat: finalLat });
  return sampled;
}

function createStar(rand, lng, lat, width, height, options = {}) {
  const home = geoToCanvas(lng, lat, width, height);
  return {
    id: options.id ?? `star-${Math.round(rand() * 1e9)}`,
    type: options.type ?? 'map',
    label: options.label ?? '',
    color: options.color ?? 'rgba(130,245,255,1)',
    x: home.x + (rand() - 0.5) * 7,
    y: home.y + (rand() - 0.5) * 7,
    homeX: home.x,
    homeY: home.y,
    vx: (rand() - 0.5) * 0.2,
    vy: (rand() - 0.5) * 0.2,
    r: options.radius ?? rand() * 1.0 + 0.7,
    alpha: options.alpha ?? rand() * 0.18 + 0.2,
    glow: options.glow ?? 8,
    spring: options.spring ?? 0.007,
    driftRadiusX: options.driftRadiusX ?? rand() * 7 + 4,
    driftRadiusY: options.driftRadiusY ?? rand() * 6 + 4,
    orbitOffset: rand() * Math.PI * 2,
    orbitSpeed: options.orbitSpeed ?? rand() * 0.22 + 0.16,
    twinkleOffset: rand() * Math.PI * 2,
    twinkleSpeed: options.twinkleSpeed ?? rand() * 1.2 + 0.8,
    labelDx: options.labelDx ?? 12,
    labelDy: options.labelDy ?? -14,
  };
}

function buildScene(width, height) {
  const rand = createSeededRandom(20260513);
  const stars = [];
  const starsById = {};

  const ambientCount = Math.min(34, Math.floor((width * height) / 60000));
  for (let i = 0; i < ambientCount; i++) {
    stars.push({
      id: `ambient-${i}`,
      type: 'ambient',
      label: '',
      color: 'rgba(130,245,255,1)',
      x: rand() * width,
      y: rand() * height,
      homeX: rand() * width,
      homeY: rand() * height,
      vx: (rand() - 0.5) * 0.18,
      vy: (rand() - 0.5) * 0.18,
      r: rand() * 1.2 + 0.25,
      alpha: rand() * 0.16 + 0.06,
      glow: 6,
      spring: 0.003,
      driftRadiusX: rand() * 16 + 8,
      driftRadiusY: rand() * 14 + 7,
      orbitOffset: rand() * Math.PI * 2,
      orbitSpeed: rand() * 0.16 + 0.08,
      twinkleOffset: rand() * Math.PI * 2,
      twinkleSpeed: rand() * 0.8 + 0.5,
      labelDx: 0,
      labelDy: 0,
    });
  }

  OUTLINE_PATHS.forEach((path) => {
    samplePath(path, 5.5).forEach((point) => {
      stars.push(
        createStar(rand, point.lng, point.lat, width, height, {
          type: 'outline',
          radius: rand() * 0.9 + 0.65,
          alpha: rand() * 0.15 + 0.2,
          glow: 8,
          spring: 0.0075,
          driftRadiusX: rand() * 5 + 3,
          driftRadiusY: rand() * 5 + 3,
        }),
      );
    });
  });

  INTERIOR_CLOUDS.forEach((cloud) => {
    for (let i = 0; i < cloud.count; i++) {
      const lng = cloud.lng + (rand() - 0.5) * cloud.spreadLng;
      const lat = cloud.lat + (rand() - 0.5) * cloud.spreadLat;

      stars.push(
        createStar(rand, lng, lat, width, height, {
          type: 'field',
          radius: rand() * 1.0 + 0.55,
          alpha: rand() * 0.16 + 0.18,
          glow: 8,
          spring: 0.0065,
          driftRadiusX: rand() * 6 + 4,
          driftRadiusY: rand() * 5 + 4,
        }),
      );
    }
  });

  RELAY_POINTS.forEach((relay) => {
    const star = createStar(rand, relay.lng, relay.lat, width, height, {
      id: relay.id,
      type: 'relay',
      radius: relay.radius,
      label: relay.label,
      alpha: relay.alpha ?? 0.6,
      glow: relay.glow ?? 10,
      color: relay.color,
      labelDx: relay.labelDx,
      labelDy: relay.labelDy,
      spring: 0.009,
      driftRadiusX: 4,
      driftRadiusY: 3,
      orbitSpeed: 0.2,
    });

    stars.push(star);
    starsById[star.id] = star;
  });

  LANDMARKS.forEach((landmark) => {
    const star = createStar(rand, landmark.lng, landmark.lat, width, height, {
      ...landmark,
      type: 'anchor',
      orbitSpeed: 0.19,
    });

    stars.push(star);
    starsById[star.id] = star;
  });

  return { stars, starsById };
}

function drawRoutes(ctx, scene, time) {
  ROUTE_SEGMENTS.forEach(([fromId, toId], index) => {
    const from = scene.starsById[fromId];
    const to = scene.starsById[toId];
    if (!from || !to) return;

    const pulse = 0.5 + ((Math.sin(time * 1.25 + index * 0.75) + 1) / 2) * 0.5;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = `rgba(255,223,150,${0.14 + pulse * 0.16})`;
    ctx.lineWidth = 1 + pulse * 0.5;
    ctx.stroke();
  });
}

function drawLabels(ctx, scene, mouse, time) {
  ctx.save();
  ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
  ctx.textBaseline = 'middle';

  scene.stars.forEach((star) => {
    if (!star.label) return;

    const isAnchor = star.type === 'anchor';
    const hover = Math.max(0, 1 - Math.hypot(star.x - mouse.x, star.y - mouse.y) / 120);
    const shimmer = 0.5 + ((Math.sin(time * 1.5 + star.twinkleOffset) + 1) / 2) * 0.25;
    const opacity = isAnchor
      ? 0.38 + shimmer * 0.18 + hover * 0.34
      : 0.14 + shimmer * 0.12 + hover * 0.4;
    const x = star.x + star.labelDx;
    const y = star.y + star.labelDy;

    ctx.font = isAnchor
      ? '11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
      : '10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
    const textWidth = ctx.measureText(star.label).width;

    ctx.strokeStyle = `rgba(0,229,255,${isAnchor ? 0.12 + hover * 0.18 : 0.08 + hover * 0.2})`;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(x - 5, y);
    ctx.stroke();

    ctx.fillStyle = `rgba(4,12,16,${isAnchor ? 0.34 + hover * 0.18 : 0.22 + hover * 0.16})`;
    ctx.fillRect(x - 6, y - 10, textWidth + 12, 18);

    ctx.fillStyle = `rgba(232,248,255,${opacity})`;
    ctx.fillText(star.label, x, y);
  });

  ctx.restore();
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ mouse: { x: -9999, y: -9999 }, animId: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let scene = buildScene(window.innerWidth, window.innerHeight);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      scene = buildScene(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (event) => {
      stateRef.current.mouse = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = performance.now() * 0.001;
      const { mouse } = stateRef.current;
      const { stars } = scene;

      for (const star of stars) {
        const targetX = star.homeX + Math.sin(time * star.orbitSpeed + star.orbitOffset) * star.driftRadiusX;
        const targetY =
          star.homeY + Math.cos(time * (star.orbitSpeed * 0.92) + star.orbitOffset) * star.driftRadiusY;

        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 110 && distance > 0) {
          const force = ((110 - distance) / 110) * 0.55;
          star.vx += (dx / distance) * force;
          star.vy += (dy / distance) * force;
        }

        star.vx += (targetX - star.x) * star.spring;
        star.vy += (targetY - star.y) * star.spring;
        star.vx *= 0.95;
        star.vy *= 0.95;
        star.x += star.vx;
        star.y += star.vy;
      }

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];

          const homeDistance = Math.hypot(a.homeX - b.homeX, a.homeY - b.homeY);
          const connectionDistance =
            a.type === 'ambient' || b.type === 'ambient'
              ? 60
              : a.type === 'anchor' || b.type === 'anchor' || a.type === 'relay' || b.type === 'relay'
                ? 88
                : a.type === 'outline' || b.type === 'outline'
                  ? 54
                  : 66;

          if (homeDistance > connectionDistance) continue;

          const currentDistance = Math.hypot(a.x - b.x, a.y - b.y);
          if (currentDistance > connectionDistance) continue;

          const opacity =
            (1 - currentDistance / connectionDistance) *
            (a.type === 'ambient' || b.type === 'ambient'
              ? 0.08
              : a.type === 'outline' || b.type === 'outline'
                ? 0.14
                : 0.11);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,229,255,${opacity})`;
          ctx.lineWidth = a.type === 'anchor' || b.type === 'anchor' ? 0.9 : 0.6;
          ctx.stroke();
        }
      }

      drawRoutes(ctx, scene, time);

      for (const star of stars) {
        const twinkle = 0.72 + ((Math.sin(time * star.twinkleSpeed + star.twinkleOffset) + 1) / 2) * 0.6;
        const alpha = Math.min(1, star.alpha * twinkle);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.shadowBlur = star.glow;
        ctx.shadowColor = withAlpha(star.color, star.type === 'anchor' ? 0.72 : 0.55);
        ctx.fillStyle = withAlpha(star.color, alpha);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      drawLabels(ctx, scene, mouse, time);
      stateRef.current.animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(stateRef.current.animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ opacity: 0.8 }} />;
}
