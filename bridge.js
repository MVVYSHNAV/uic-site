/**
 * Bridge: a workstation terminal and an NFC identity validator connected by a
 * secure conduit rail. The pointer unseals the transaction, driving an
 * encrypted authentication token across the bridge and lifting the verified card.
 */
const {
  Cam, clamp, facing, fit, flatDot, mk, open, place, pointer, poly,
  prism, proj, put, rad, register, ringAt, rings, rrect, run, seg,
  solid, spring, stepS, disposer, unproj,
} = HL;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.62);
  fit(C, [[-10, -10, -6], [146, 86, -6], [146, -10, -6], [-10, 86, -6], [22, 22, 50], [116, 62, 42]], 200, 160);
  const P = proj(C), front = facing(C);
  let speed = value, over = null;

  const g = mk("g", {}, svg);

  // 1. Ground Plinth: foundation block
  const [pr, pi] = rings(-8, -8, 144, 84, 8, 1.8);
  put(solid(g), prism(P, front, pr, pi, -5, 0));

  // Conduit guide rail on the plinth floor
  mk("path", {
    d: `${seg(P(42, 32, 0.2), P(98, 56, 0.2))} ${seg(P(44, 28, 0.2), P(100, 52, 0.2))}`,
    class: "dash lo",
  }, g);

  // 2. Terminal Console (left flank)
  const [tr, ti] = rings(8, 8, 46, 42, 4, 1.4);
  const termSolid = solid(g);
  put(termSolid, prism(P, front, tr, ti, 0, 12));

  // Terminal upright display panel
  const [sr, si] = rings(14, 12, 40, 22, 2.5, 1.0);
  const dispSolid = solid(g);
  put(dispSolid, prism(P, front, sr, si, 12, 38));

  // Terminal screen scanlines
  mk("path", {
    d: [20, 26, 32].map((z) => seg(P(18, 22, z), P(36, 22, z))).join(" "),
    class: "nf lo",
  }, g);

  // Terminal status dot
  const termDot = flatDot(g, C, 0.9, "dot");
  place(termDot, P(15, 34, 12.2));

  // 3. Conduit Transaction Gate & Token Pucks
  const [kr, ki] = rings(62, 38, 78, 48, 3, 0.9);
  const gateSolid = solid(g);
  put(gateSolid, prism(P, front, kr, ki, 0, 4));

  // Moving Token Pucks (train of 3 cryptographic packets)
  const pucks = [solid(g), solid(g), solid(g)];
  const puckSpring = spring(0.32, { k: 90, c: 16, m: 1 });
  let puckDrawn = NaN;

  // 4. Card Validator Plinth (right flank)
  const [vr, vi] = rings(94, 46, 136, 78, 4, 1.4);
  const valSolid = solid(g);
  put(valSolid, prism(P, front, vr, vi, 0, 10));

  // Card slot recess
  mk("path", {
    d: poly([P(104, 52, 10.2), P(126, 62, 10.2), P(124, 65, 10.2), P(102, 55, 10.2)]),
    class: "fo lo",
  }, g);

  // Identity NFC Pass Card standing in slot with spring-loaded lift
  const [cr, ci] = rings(103, 53, 127, 65, 2.2, 0.8);
  const cardSolid = solid(g);
  const cardSpring = spring(10, { k: 110, c: 18, m: 1 });
  let cardDrawn = NaN;

  // Card chip / antenna track
  const cardLoop = mk("path", { class: "nf lo" }, g);

  // Card validator authentication dot
  const cardDot = flatDot(g, C, 0.9, "dot off");

  function drawCard(z) {
    if (Math.abs(z - cardDrawn) < 0.05) return;
    cardDrawn = z;
    put(cardSolid, prism(P, front, cr, ci, z, z + 22));
    cardLoop.setAttribute("d", poly([
      P(107, 65.2, z + 7), P(117, 65.2, z + 7),
      P(117, 65.2, z + 17), P(107, 65.2, z + 17),
    ]));
    place(cardDot, P(121, 65.2, z + 15));
  }

  function drawPucks(t) {
    if (Math.abs(t - puckDrawn) < 0.005) return;
    puckDrawn = t;
    [-0.08, 0, 0.08].forEach((offset, idx) => {
      const pos = clamp(t + offset, 0.04, 0.96);
      const px = 42 + pos * 56, py = 30 + pos * 24;
      const [pkr, pki] = rings(px - 4, py - 3.2, px + 4, py + 3.2, 1.6, 0.5);
      put(pucks[idx], prism(P, front, pkr, pki, 0.5, 4.5));
    });
  }

  drawCard(10);
  drawPucks(0.32);

  const B = register(stage, (dt) => {
    const s1 = stepS(puckSpring, dt * (speed / 16));
    const s2 = stepS(cardSpring, dt);
    drawPucks(clamp(puckSpring.x, 0.05, 0.95));
    drawCard(clamp(cardSpring.x, 10, 18));
    return s1 || s2;
  });
  bag.add(B.unregister);

  function retarget() {
    if (!over) {
      puckSpring.t = 0.32;
      cardSpring.t = 10;
      dispSolid.sil.classList.remove("hi");
      cardSolid.sil.classList.remove("hi");
      pucks.forEach((p) => p.sil.classList.remove("hi"));
      termDot.setAttribute("class", "dot");
      cardDot.setAttribute("class", "dot off");
      read.textContent = "rest";
    } else if (over[0] < 54) {
      puckSpring.t = 0.14;
      cardSpring.t = 10;
      dispSolid.sil.classList.add("hi");
      cardSolid.sil.classList.remove("hi");
      pucks.forEach((p) => p.sil.classList.remove("hi"));
      termDot.setAttribute("class", "dot");
      cardDot.setAttribute("class", "dot off");
      read.textContent = "auth · req";
    } else if (over[0] > 92) {
      puckSpring.t = 0.92;
      cardSpring.t = 16.5;
      dispSolid.sil.classList.remove("hi");
      cardSolid.sil.classList.add("hi");
      pucks.forEach((p) => p.sil.classList.add("hi"));
      termDot.setAttribute("class", "dot off");
      cardDot.setAttribute("class", "dot");
      read.textContent = "auth · ok";
    } else {
      puckSpring.t = 0.54;
      cardSpring.t = 12;
      dispSolid.sil.classList.remove("hi");
      cardSolid.sil.classList.remove("hi");
      pucks.forEach((p, idx) => p.sil.classList.toggle("hi", idx === 1));
      termDot.setAttribute("class", "dot m");
      cardDot.setAttribute("class", "dot m");
      read.textContent = "sig · 92";
    }
    B.wake();
  }

  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0); retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { speed = v; if (over) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "bridge",
  means: "A terminal and validation plinth unseal an encrypted handshake along a data conduit to an identity card.",
  rules: [1, 4, 8],
  range: [8, 16, 24],
  tour: [[125, 115], [200, 160], [275, 185], null],
  mount,
});
