// Student results carousel.
// To add or change a slide, edit PROOF below and drop the photo into assets/proof/.
// A slide whose photo is missing shows a "Result photo" placeholder instead.
const PROOF = [
  { file: "result-1.jpg", caption: "<b>Student result #1</b> (add caption)" },
  { file: "result-2.jpg", caption: "<b>Student result #2</b> (add caption)" },
  { file: "result-3.jpg", caption: "<b>Student result #3</b> (add caption)" },
  { file: "result-4.jpg", caption: "<b>Student result #4</b> (add caption)" },
  { file: "result-5.jpg", caption: "<b>Student result #5</b> (add caption)" },
];

function proofList(base) {
  return PROOF.map((p) => ({ src: base + p.file, caption: p.caption }));
}

function mountProofCarousel(slides) {
  const track = document.getElementById("proof-track");
  const thumb = document.getElementById("proof-thumb");
  const count = document.getElementById("proof-count");
  const prev = document.getElementById("proof-prev");
  const next = document.getElementById("proof-next");
  const lightbox = document.getElementById("lightbox");
  if (!track) return;

  slides.forEach((s) => {
    const card = document.createElement("figure");
    card.className = "proof-card";
    card.innerHTML = `<button type="button" aria-label="Enlarge photo"><img alt="" loading="lazy" /></button><figcaption class="proof-caption"></figcaption>`;
    const img = card.querySelector("img");
    img.src = s.src;
    img.addEventListener("error", () => {
      card.querySelector("button").outerHTML = `<div class="proof-placeholder">Result photo</div>`;
    });
    card.querySelector("figcaption").innerHTML = s.caption;
    card.querySelector("button").addEventListener("click", () => {
      if (!lightbox) return;
      lightbox.querySelector("img").src = img.src;
      lightbox.hidden = false;
    });
    track.appendChild(card);
  });

  const current = () => Math.round(track.scrollLeft / track.clientWidth);
  const go = (i) => track.scrollTo({ left: i * track.clientWidth });
  const update = () => {
    const i = current();
    count.textContent = `${i + 1} / ${slides.length}`;
    thumb.style.width = `${100 / slides.length}%`;
    thumb.style.left = `${(100 / slides.length) * i}%`;
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
  };

  prev.addEventListener("click", () => go(current() - 1));
  next.addEventListener("click", () => go(current() + 1));
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  if (lightbox) {
    lightbox.addEventListener("click", () => (lightbox.hidden = true));
    document.addEventListener("keydown", (e) => e.key === "Escape" && (lightbox.hidden = true));
  }
  update();
}
