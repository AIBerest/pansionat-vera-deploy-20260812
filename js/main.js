const contentUrl = "/data/site-content.json?v=20260811-4";

const getByPath = (source, path) => path.split(".").reduce((value, key) => value?.[key], source);

const veraIcons = {
  pressure: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 26v-8a7 7 0 0 1 7-7h12a7 7 0 0 1 7 7v8"/><rect x="8" y="24" width="32" height="14" rx="7"/><path class="accent" d="M16 31h5l2-4 4 8 2-4h4"/></svg>',
  medication: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 12h12v5H18z"/><rect x="13" y="17" width="22" height="23" rx="4"/><path d="M19 25h10M24 20v10"/><path class="accent" d="M30 33l3 3 6-7"/></svg>',
  hygiene: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 14h22a4 4 0 0 1 4 4v4H13z"/><path d="M13 22h26v15H13z"/><path class="accent" d="M17 30h18"/><path d="M10 14h3m26 0h3M10 37h32"/></svg>',
  attention: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="17" cy="16" r="5"/><path d="M8 39v-5c0-7 4-11 9-11s9 4 9 11v5"/><path d="M10 39h14"/><path class="accent" d="M35 20c-5-5-11 2-5 8l5 5 5-5c6-6 0-13-5-8z"/></svg>',
  shower: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 38V18a10 10 0 0 1 20 0"/><path d="M28 20h12"/><path d="M27 20a9 9 0 0 1 13 0"/><path class="accent" d="M28 28v1m5-1v1m5-1v1M28 34v1m5-1v1m5-1v1"/></svg>',
  toilet: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="14" y="7" width="21" height="14" rx="3"/><path d="M17 21h18v7a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8z"/><path d="M20 36h14"/><path class="accent" d="M30 12h1"/></svg>',
  tv: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="15" width="30" height="21" rx="4"/><path d="M18 40h12M24 15l-7-7m7 7 7-7"/><path class="accent" d="M34 22h1m-1 6h1"/></svg>',
  meal: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 28h28a12 12 0 0 1-12 10h-4a12 12 0 0 1-12-10z"/><path d="M14 28c1-5 5-8 10-8s9 3 10 8"/><path class="accent" d="M18 14c-1 3 1 4 0 7m7-8c-1 3 1 4 0 7m7-8c-1 3 1 4 0 7"/></svg>',
  diabetes: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M17 36c-5-5-6-14 1-22 7 8 6 17 1 22z"/><rect x="27" y="13" width="11" height="24" rx="4"/><path class="accent" d="M32.5 19v8m-4-4h8"/><path d="M10 37h30"/></svg>',
  diet: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="15"/><path d="M24 9v30M13 28c7-1 11-5 11-13"/><path class="accent" d="M30 17c4 2 6 6 5 11M18 34c4-1 8-3 11-6"/></svg>',
  calendar: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="10" y="12" width="28" height="27" rx="4"/><path d="M16 8v8m16-8v8M10 20h28"/><path class="accent" d="M18 30l4 4 8-9"/></svg>',
  document: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 7h14l8 8v26H14z"/><path d="M28 7v9h8M19 24h14M19 30h10"/><path class="accent" d="M22 36l3 3 7-8"/></svg>',
  lungs: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 8v14"/><path d="M24 22c-6-8-13-6-14 5-1 8 3 13 10 11 3-1 4-5 4-16z"/><path d="M24 22c6-8 13-6 14 5 1 8-3 13-10 11-3-1-4-5-4-16z"/><path class="accent" d="M17 25c2 2 4 5 4 9m10-9c-2 2-4 5-4 9"/></svg>',
};

function createVeraIcon(name) {
  const icon = document.createElement("span");
  icon.className = "vera-icon";
  icon.innerHTML = veraIcons[name] || veraIcons.attention;
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

function renderList(element, value) {
  if (!Array.isArray(value)) return;

  const iconSets = {
    "care.bullets": ["pressure", "medication", "hygiene", "attention"],
    "meals.bullets": ["meal", "diabetes", "diet"],
    "settlement.items": ["calendar", "document", "lungs"],
  };
  const icons = iconSets[element.dataset.list] || [];

  element.replaceChildren(...value.map((item, index) => {
    const li = document.createElement("li");
    if (typeof item === "string") {
      li.append(createVeraIcon(icons[index]), document.createTextNode(item));
    } else if (item.title || item.text) {
      const content = document.createElement("span");
      content.className = "list-copy";
      if (item.title) {
        const title = document.createElement("strong");
        title.textContent = item.title;
        content.append(title);
      }
      if (item.text) {
        const text = document.createElement("span");
        text.textContent = item.text;
        content.append(text);
      }
      li.append(createVeraIcon(item.icon || icons[index]), content);
    } else {
      const time = document.createElement("span");
      time.className = "time";
      time.textContent = item.time;
      const label = document.createElement("span");
      label.className = "label";
      label.textContent = item.label;
      li.append(time, label);
    }
    return li;
  }));
}

function renderPromoOffers(element, offers) {
  if (!Array.isArray(offers)) return;

  element.replaceChildren(...offers.map((offer) => {
    const card = document.createElement("article");
    card.className = "promotion-card";
    const title = document.createElement("h3");
    title.textContent = offer.title;
    const text = document.createElement("p");
    if (offer.emphasis && offer.text?.includes(offer.emphasis)) {
      const [before, after] = offer.text.split(offer.emphasis);
      const emphasis = document.createElement("strong");
      emphasis.textContent = offer.emphasis;
      text.append(before, emphasis, after);
    } else {
      text.textContent = offer.text;
    }
    const price = document.createElement("p");
    price.className = "promotion-price";
    price.textContent = offer.price;
    const note = document.createElement("p");
    note.className = "promotion-note";
    note.textContent = offer.note;
    const link = document.createElement("a");
    link.className = "text-link";
    link.href = offer.form === "promotion" ? "#promotion-form" : "#viewing-form";
    if (offer.form === "promotion") link.setAttribute("data-open-promotion", "");
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    link.append(document.createTextNode(offer.cta), arrow);
    if (offer.badge) {
      const badge = document.createElement("p");
      badge.className = "promotion-badge";
      badge.textContent = offer.badge;
      card.append(badge);
    }
    card.append(title, text);
    if (offer.price) card.append(price);
    if (offer.note) card.append(note);
    card.append(link);
    return card;
  }));
}

function renderStaticVeraIcons() {
  document.querySelectorAll("[data-vera-icon]").forEach((element) => {
    element.replaceWith(createVeraIcon(element.dataset.veraIcon));
  });
}

function updateSchema(content) {
  const schema = document.querySelector("#site-schema");
  if (!schema) return;

  const phone = content.contacts.phone.replace(/[^+\d]/g, "");
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": "https://xn----7sbabjsr3bbjhvfs.xn--p1ai/#organization",
        name: content.contacts.legal,
        alternateName: content.siteName,
        url: "https://xn----7sbabjsr3bbjhvfs.xn--p1ai/",
        telephone: phone,
        email: content.contacts.email,
        description: content.seo.description,
        areaServed: {
          "@type": "City",
          name: "Новосибирск",
        },
        sameAs: ["https://2gis.ru/novosibirsk/firm/70000001040994901"],
        address: {
          "@type": "PostalAddress",
          streetAddress: content.contacts.address.replace("Новосибирск, ", ""),
          addressLocality: "Новосибирск",
          addressCountry: "RU",
        },
      },
      { "@type": "WebSite", "@id": "https://xn----7sbabjsr3bbjhvfs.xn--p1ai/#website", url: "https://xn----7sbabjsr3bbjhvfs.xn--p1ai/", name: content.siteName },
      {
        "@type": "FAQPage",
        mainEntity: [
          ["Принимаете ли с деменцией?", "Да, возможность размещения человека с деменцией или болезнью Альцгеймера обсуждается заранее с учётом его состояния и поведения."],
          ["Можно ли после инсульта?", "Да, пансионат оказывает повседневный уход после инсульта: помощь в быту, гигиене, питании и соблюдении назначенного режима."],
          ["Можно ли после инфаркта?", "Возможность размещения после инфаркта оценивается индивидуально по текущему состоянию человека и рекомендациям его врача."],
          ["Принимаете ли лежачих?", "Да, принимаем лежачих пожилых людей и заранее уточняем объём необходимой бытовой помощи и ухода."],
          ["Можно ли с сахарным диабетом?", "Да, предусмотрено диабетическое меню, стол №9 и ежедневный контроль уровня сахара. Назначения передают родственники."],
          ["Сколько стоит размещение?", "При размещении от 3 месяцев действует акционная цена 45 000 ₽ в месяц. Итоговые условия зависят от состояния человека и формата проживания."],
          ["Какие документы нужны?", "Для заселения потребуются флюорография, паспорт, полис, список препаратов и назначения врача."],
          ["Что происходит при ухудшении состояния?", "Связываемся с родственниками, при необходимости вызываем скорую помощь и оказываем первую помощь до приезда специалистов."],
        ].map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
      },
    ],
  });
}

function applyContent(content) {
  document.querySelectorAll("[data-field]").forEach((element) => {
    const value = getByPath(content, element.dataset.field);
    if (value === undefined || value === null) return;
    element.textContent = value;
    if (element.tagName === "A" && element.dataset.field === "contacts.phone") {
      element.href = `tel:${String(value).replace(/[^+\d]/g, "")}`;
    }
    if (element.tagName === "A" && element.dataset.field === "contacts.email") {
      element.href = `mailto:${value}`;
    }
  });

  document.querySelectorAll("[data-list]").forEach((element) => renderList(element, getByPath(content, element.dataset.list)));
  document.querySelectorAll("[data-promo-offers]").forEach((element) => renderPromoOffers(element, content.promo?.offers));
  const promotion = document.querySelector("#promotion");
  if (promotion) promotion.hidden = !content.promo?.enabled;
  renderStaticVeraIcons();

  document.title = content.seo.title || `${content.siteName} в Новосибирске`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", content.seo.description);
  updateSchema(content);
  refreshIcons();
}

function refreshIcons() {
  window.lucide?.createIcons({ attrs: { "aria-hidden": "true", "stroke-width": 1.7 } });
}

async function loadContent() {
  const localPreview = ["localhost", "127.0.0.1"].includes(location.hostname);
  const sources = localPreview ? [contentUrl] : ["/api/content.php", contentUrl];
  for (const source of sources) {
    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) continue;
      const content = await response.json();
      applyContent(content);
      return;
    } catch {
      // The static content file keeps the public landing usable without CMS storage.
    }
  }
}

function initMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (!toggle || !menu) return;

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

function trackAnalyticsEvent(eventName, parameters = {}, metrikaGoal = eventName) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }
  if (typeof window.ym === "function") {
    window.ym(111380915, "reachGoal", metrikaGoal, parameters);
  }
}

function loadAnalyticsScripts() {
  if (document.documentElement.dataset.analyticsLoaded === "true") return;
  document.documentElement.dataset.analyticsLoaded = "true";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", "G-9C5J9G8KH4");
  const google = document.createElement("script");
  google.async = true;
  google.src = "https://www.googletagmanager.com/gtag/js?id=G-9C5J9G8KH4";
  document.head.append(google);

  window.ym = window.ym || function ym() { (window.ym.a = window.ym.a || []).push(arguments); };
  window.ym.l = Date.now();
  window.ym(111380915, "init", { ssr: true, webvisor: true, clickmap: true, ecommerce: "dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce: true, trackLinks: true });
  const yandex = document.createElement("script");
  yandex.async = true;
  yandex.src = "https://mc.yandex.ru/metrika/tag.js?id=111380915";
  document.head.append(yandex);
}

function initAnalyticsConsent() {
  const banner = document.querySelector("[data-cookie-banner]");
  if (!banner) return;
  const storageKey = "vera_analytics_consent";
  let choice = null;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "granted" || stored === "denied") {
      choice = stored;
    } else if (stored) {
      choice = JSON.parse(stored).value || null;
    }
  } catch { choice = null; }

  const remember = (value) => {
    const evidence = { value, version: "2026-08-11", timestamp: new Date().toISOString(), source: "cookie-banner" };
    try { localStorage.setItem("vera_analytics_consent", JSON.stringify(evidence)); } catch { /* Choice lasts for this page view. */ }
    banner.hidden = true;
    if (value === "granted") loadAnalyticsScripts();
  };

  if (choice === "granted") {
    banner.hidden = true;
    loadAnalyticsScripts();
  } else if (choice === "denied") {
    banner.hidden = true;
  } else {
    banner.hidden = false;
  }

  banner.querySelector("[data-cookie-accept]")?.addEventListener("click", () => remember("granted"));
  banner.querySelector("[data-cookie-decline]")?.addEventListener("click", () => remember("denied"));
}

function initAnalyticsTracking() {
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest("a");
    const href = link?.getAttribute("href") || "";
    if (href.startsWith("tel:")) {
      trackAnalyticsEvent("click_phone", { link_location: link.closest("header") ? "header" : "footer" }, "phone_click");
    } else if (href.startsWith("mailto:")) {
      trackAnalyticsEvent("click_email", { link_location: "footer" }, "email_click");
    } else if (href.includes("2gis.ru")) {
      trackAnalyticsEvent("click_2gis", { link_location: link.closest("footer") ? "footer" : "reviews" }, "two_gis_click");
    }

    if (event.target.closest("[data-open-viewing]")) {
      trackAnalyticsEvent("viewing_form_open", {}, "viewing_form_open");
    }
    if (event.target.closest("[data-open-promotion]")) {
      trackAnalyticsEvent("promotion_form_open", {}, "promotion_form_open");
    }
  });
}

function initViewingDialog() {
  const dialog = document.querySelector("#viewing-form");
  if (!dialog) return;

  document.querySelectorAll("[data-open-viewing]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      dialog.showModal();
      dialog.querySelector("input[name='name']")?.focus();
    });
  });

  dialog.querySelectorAll("[data-close-viewing]").forEach((trigger) => {
    trigger.addEventListener("click", () => dialog.close());
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function initPromotionDialog() {
  const dialog = document.querySelector("#promotion-form");
  if (!dialog) return;

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const trigger = event.target.closest("[data-open-promotion], a[href='#promotion-form']");
    if (!trigger) return;
    event.preventDefault();
    dialog.showModal();
    dialog.querySelector("input[name='name']")?.focus();
  });

  dialog.querySelectorAll("[data-close-promotion]").forEach((trigger) => {
    trigger.addEventListener("click", () => dialog.close());
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function initLeadForms() {
  document.addEventListener("submit", async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches("[data-lead-form]")) return;
    const status = form.querySelector("[data-form-status]");
    const submit = form.querySelector("button[type='submit']");
    if (!status || !submit) return;

    event.preventDefault();
    if (!form.reportValidity()) return;

    submit.disabled = true;
    status.textContent = "Отправляем заявку…";
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.type = form.dataset.leadType;

    try {
      const response = await fetch("/api/telegram-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку.");

      const leadType = form.dataset.leadType || "unknown";
      trackAnalyticsEvent("generate_lead", { lead_type: leadType }, `lead_${leadType}`);
      form.reset();
      status.textContent = "Заявка отправлена. Администратор свяжется с вами в ближайшее время.";
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : "Не удалось отправить заявку. Позвоните нам, и мы поможем.";
    } finally {
      submit.disabled = false;
    }
  });
}

function initReveal() {
  const elements = document.querySelectorAll("[data-reveal]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!elements.length || reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-revealed"));
    return;
  }

  const immediateViewport = window.innerHeight * 1.15;
  elements.forEach((element) => {
    if (element.getBoundingClientRect().top < immediateViewport) element.classList.add("is-revealed");
  });
  document.documentElement.classList.add("motion-ready");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px 40%" });
  elements.forEach((element) => observer.observe(element));
}

function initAcceptedCards() {
  const cards = [...document.querySelectorAll("[data-accepted-card]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  cards.forEach((card, index) => card.style.setProperty("--accepted-delay", `${Math.min(index * 65, 390)}ms`));
  if (!cards.length || reducedMotion || !("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  document.documentElement.classList.add("motion-ready");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -8%" });
  cards.forEach((card) => observer.observe(card));
}

function initReviewsCarousel() {
  const carousel = document.querySelector("[data-reviews-carousel]");
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll("[data-review-slide]")];
  const track = carousel.querySelector("[data-reviews-track]");
  const status = carousel.querySelector("[data-review-status]");
  const previous = carousel.querySelector("[data-review-prev]");
  const next = carousel.querySelector("[data-review-next]");
  let current = 0;

  const show = (index) => {
    const visible = window.matchMedia("(max-width: 680px)").matches ? 1 : window.matchMedia("(max-width: 1060px)").matches ? 2 : 3;
    const maxStart = Math.max(0, slides.length - visible);
    current = maxStart === 0 ? 0 : ((index % (maxStart + 1)) + (maxStart + 1)) % (maxStart + 1);
    if (track && slides[current]) track.style.transform = `translateX(-${slides[current].offsetLeft}px)`;
    if (status) status.textContent = `${current + 1}–${Math.min(current + visible, slides.length)} из ${slides.length}`;
    if (previous) previous.disabled = false;
    if (next) next.disabled = false;
  };

  previous?.addEventListener("click", () => show(current - 1));
  next?.addEventListener("click", () => show(current + 1));
  let pointerStart = null;
  carousel.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStart = { id: event.pointerId, x: event.clientX };
  });
  carousel.addEventListener("pointerup", (event) => {
    if (!pointerStart || pointerStart.id !== event.pointerId) return;
    const distance = event.clientX - pointerStart.x;
    pointerStart = null;
    if (Math.abs(distance) < 36) return;
    show(current + (distance < 0 ? 1 : -1));
  });
  carousel.addEventListener("pointercancel", () => { pointerStart = null; });
  window.addEventListener("resize", () => show(current));
  show(0);
}

function initScrollAssist() {
  const progress = document.querySelector("[data-scroll-progress]");
  const button = document.querySelector("[data-back-to-top]");
  if (!progress && !button) return;

  const update = () => {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, window.scrollY / scrollable));
    if (progress) progress.style.transform = `scaleX(${ratio})`;
    button?.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.8);
  };

  button?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

const header = document.querySelector("[data-header]");
if (header) {
  new IntersectionObserver(([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting), { threshold: 0.92 }).observe(document.querySelector("#top"));
}

loadContent();
initMenu();
initAnalyticsConsent();
initAnalyticsTracking();
initViewingDialog();
initPromotionDialog();
initLeadForms();
initReveal();
initAcceptedCards();
initReviewsCarousel();
initScrollAssist();
renderStaticVeraIcons();
refreshIcons();
