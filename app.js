
const html = (strings, ...vals) => strings.reduce((acc, s, i) => acc + s + (vals[i] ?? ''), '');

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function nl2br(value = '') {
  return escapeHtml(value).replace(/\n/g, '<br>');
}

function renderHeader(data) {
  const { logo, nav_links, cta } = data.header;
  const nav = nav_links.map(link => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join('');
  return `
    <header class="site-header">
      <div class="container header-row">
        <a href="${escapeHtml(logo.href)}" class="logo"><img src="${escapeHtml(logo.src)}" alt="${escapeHtml(logo.alt)}"></a>
        <nav class="nav">${nav}</nav>
        <a class="cta-btn hero-main-btn" href="${escapeHtml(cta.href)}">
          <span class="btn-icon">${escapeHtml(cta.icon)}</span>
          <span>${escapeHtml(cta.label)}</span>
          <span class="btn-arrow">${escapeHtml(cta.arrow)}</span>
        </a>
      </div>
    </header>
  `;
}

function renderHero(hero) {
  if (!hero?.enabled) return '';
  const titleLines = hero.title_lines.map(line => {
    const parts = line.map(part => `<span class="${escapeHtml(part.class)}">${escapeHtml(part.text)}</span>`).join(' ');
    return `<span>${parts}</span>`;
  }).join('<br>');
  const stats = hero.stats.map(stat => `
      <div class="stat">
        <img src="${escapeHtml(stat.icon)}" class="stat-icon" alt="">
        <div>
          <strong>${escapeHtml(stat.value)}</strong>
          <span>${escapeHtml(stat.label)}</span>
        </div>
      </div>`).join('');
  const avatars = hero.mini_team.avatars.map(src => `<img src="${escapeHtml(src)}" class="mini-avatar" alt="">`).join('');
  return `
  <section class="section hero" id="${escapeHtml(hero.id)}">
    <div class="container hero-grid">
      <div class="hero-copy fade-in">
        <h1>${titleLines}</h1>
        <p>${escapeHtml(hero.description)}</p>
        <div class="hero-actions">
          <a class="cta-btn hero-main-btn" href="${escapeHtml(hero.primary_button.href)}">
            <span class="btn-icon">${escapeHtml(hero.primary_button.icon)}</span>
            <span>${escapeHtml(hero.primary_button.label)}</span>
            <span class="btn-arrow">${escapeHtml(hero.primary_button.arrow)}</span>
          </a>
          <a class="ghost-btn hero-secondary-btn" href="${escapeHtml(hero.secondary_button.href)}">
            <span class="play-icon">${escapeHtml(hero.secondary_button.icon)}</span>
            <span>${escapeHtml(hero.secondary_button.label)}</span>
          </a>
        </div>
        <div class="mini-team">
          <div class="avatar-stack">${avatars}</div>
          <span class="mini-sparkle">${escapeHtml(hero.mini_team.sparkle)}</span>
          <span>${escapeHtml(hero.mini_team.text)}</span>
        </div>
        <div class="stats">${stats}</div>
      </div>
      <div class="hero-art">
        <img src="${escapeHtml(hero.image.src)}" class="hero-full-art" alt="${escapeHtml(hero.image.alt)}">
      </div>
    </div>
  </section>`;
}

function renderPricing(pricing) {
  if (!pricing?.enabled) return '';
  const plans = pricing.plans.map(plan => `
    <article class="price-card ${escapeHtml(plan.card_class)}">
      <div>
        <div class="price">${escapeHtml(plan.price)}</div>
        <div class="price-sub">${escapeHtml(plan.price_sub)}</div>
        <h3>${escapeHtml(plan.title)}</h3>
        <ul>${plan.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
      </div>
      <div class="plan-btn">${escapeHtml(plan.button_label)}</div>
    </article>`).join('');
  return `
  <section class="section pricing-wrap" id="${escapeHtml(pricing.id)}">
    <div class="container fade-in">
      <div class="pricing-slider-wrap">
        <button class="slider-btn prev" type="button" id="pricingPrev">‹</button>
        <div class="pricing-grid" id="pricingGrid">${plans}</div>
        <button class="slider-btn next" type="button" id="pricingNext">›</button>
      </div>
    </div>
  </section>`;
}

function renderAbout(about) {
  if (!about?.enabled) return '';
  const cards = about.story_cards.map(card => `
    <div class="about-row">
      <div class="about-text-card ${escapeHtml(card.size_class)}">
        <p>${nl2br(card.text)}</p>
        <img src="${escapeHtml(card.image)}" class="about-inline-art ${escapeHtml(card.image_class)}" alt="">
      </div>
    </div>`).join('');
  return `
  <section class="section about-section" id="${escapeHtml(about.id)}">
    <div class="container">
      <div class="fade-in">
        <div class="about-title-wrap">
          <img src="${escapeHtml(about.title_image.src)}" class="about-title-image" alt="${escapeHtml(about.title_image.alt)}">
        </div>
        <div class="about-stack">
          ${cards}
          <div class="about-sub-title-wrap">
            <span class="about-sub-title-text">${escapeHtml(about.subtitle_prefix)}</span>
            <div class="about-sub-title-logo-wrap">
              <img src="${escapeHtml(about.subtitle_logo.src)}" class="about-sub-title-logo" alt="${escapeHtml(about.subtitle_logo.alt)}">
              <span class="about-question">${escapeHtml(about.subtitle_suffix)}</span>
            </div>
          </div>
          <div class="about-row">
            <div class="about-text-card about-text-card-medium about-text-card-full">
              <p>${escapeHtml(about.definition_text)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderMissionVision(section) {
  if (!section?.enabled) return '';
  const values = section.values.map(v => `<img src="${escapeHtml(v.src)}" class="value-icon-only" alt="${escapeHtml(v.alt)}">`).join('');
  return `
  <section class="section mission-vision-section" id="${escapeHtml(section.id)}">
    <div class="container fade-in">
      <div class="mission-vision-stack">
        <div class="mission-block">
          <h2 class="mission-block-title">${escapeHtml(section.mission_title)}</h2>
          <div class="mission-card mission-card-large"><p>${escapeHtml(section.mission_text)}</p></div>
        </div>
        <div class="mission-block">
          <h2 class="mission-block-title">${escapeHtml(section.vision_title)}</h2>
          <div class="mission-card mission-card-large"><p>${escapeHtml(section.vision_text)}</p></div>
        </div>
      </div>

      <section class="values-section">
        <h2 class="values-title">${escapeHtml(section.values_title)}</h2>
        <div class="values-grid">${values}</div>
      </section>

      <div class="who-serve-section">
        <h2 class="who-serve-title">${escapeHtml(section.who_title)}</h2>
        <div class="who-serve-card">
          <div class="who-serve-text"><p>${escapeHtml(section.who_text)}</p></div>
          <img src="${escapeHtml(section.who_image.src)}" class="who-serve-art" alt="${escapeHtml(section.who_image.alt)}">
        </div>
      </div>
    </div>
  </section>`;
}

function renderTeam(team) {
  if (!team?.enabled) return '';
  return `
  <section class="section team-section" id="${escapeHtml(team.id)}">
    <div class="team-full-wrap fade-in">
      <img src="${escapeHtml(team.image.src)}" class="team-full-image" alt="${escapeHtml(team.image.alt)}">
    </div>
  </section>`;
}

function renderWhy(why) {
  if (!why?.enabled) return '';
  const blocks = why.blocks.map(block => `
    <div class="why-block">
      <h2 class="why-main-title">${escapeHtml(block.title)}</h2>
      <div class="why-subline">
        <span class="why-sparkle">${escapeHtml(block.sparkle)}</span>
        <span class="why-subtitle">${escapeHtml(block.subtitle)}</span>
      </div>
      <div class="why-copy">${block.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}</div>
      <div class="why-contact-note">
        <img src="${escapeHtml(block.contact_note_icon)}" class="why-contact-icon" alt="${escapeHtml(block.contact_note_alt)}">
        <p>${escapeHtml(block.contact_note_text)}</p>
      </div>
      <div class="why-email-row">
        <div class="why-email-pill">
          <div class="why-email-icon-wrap">
            <img src="${escapeHtml(block.email_icon)}" class="why-email-icon" alt="Email icon">
          </div>
          <span class="why-email-address">${escapeHtml(block.email)}</span>
        </div>
        <a class="why-send-btn" href="mailto:${escapeHtml(block.email)}">
          <img src="${escapeHtml(block.email_outline_icon)}" class="why-send-btn-icon" alt="">
          <span>${escapeHtml(block.email_cta)}</span>
          <span class="why-send-arrow">→</span>
        </a>
      </div>
    </div>`).join('');
  return `<section class="section why-bidaya-section" id="${escapeHtml(why.id)}"><div class="container fade-in why-grid">${blocks}</div></section>`;
}

function renderFaqs(faqs) {
  if (!faqs?.enabled) return '';
  const items = faqs.items.map(item => `
    <div class="faq-item${item.open ? ' open' : ''}">
      <button class="faq-question">
        <span>${escapeHtml(item.question)}</span>
        <span class="icon">${item.open ? '−' : '+'}</span>
      </button>
      <div class="faq-answer"><p>${escapeHtml(item.answer)}</p></div>
    </div>`).join('');
  return `
  <section class="section faq-section" id="${escapeHtml(faqs.id)}">
    <div class="faq-bg-shape-wrap"><img src="${escapeHtml(faqs.background_shape)}" class="faq-bg-shape" alt=""></div>
    <div class="container fade-in faq-container">
      <div class="faq-heading-wrap">
        <img src="${escapeHtml(faqs.left_question_image)}" class="faq-question-mark faq-question-mark-left" alt="">
        <div class="faq-heading-center">
          <h2 class="faq-main-title">${escapeHtml(faqs.title)}</h2>
          <p class="faq-subtext">${escapeHtml(faqs.subtitle)}</p>
        </div>
        <img src="${escapeHtml(faqs.right_question_image)}" class="faq-question-mark faq-question-mark-right" alt="">
      </div>
      <div class="faq-content-wrap">
        <div class="faq-left-col">
          <div class="faq-list">${items}</div>
          <div class="faq-form-inline">
            <p class="faq-form-note">${escapeHtml(faqs.form_note)}</p>
            <div class="faq-ask-row">
              <input type="text" placeholder="${escapeHtml(faqs.input_placeholder)}" aria-label="Question input">
              <button class="faq-submit-btn" type="button">${escapeHtml(faqs.submit_label)}</button>
            </div>
          </div>
        </div>
        <div class="faq-right-col"><img src="${escapeHtml(faqs.side_image)}" class="faq-side-illustration" alt="FAQ illustration"></div>
      </div>
    </div>
  </section>`;
}

function renderContact(contact) {
  if (!contact?.enabled) return '';
  const cards = contact.cards.map(card => `
    <div class="contact-method-card">
      <div class="contact-icon-ring">
        <div class="contact-icon-circle">
          <img src="${escapeHtml(card.icon)}" class="contact-method-icon" alt="${escapeHtml(card.icon_alt)}">
        </div>
      </div>
      <h3 class="contact-method-title">${escapeHtml(card.title)}</h3>
      <p class="contact-method-handle">${escapeHtml(card.handle)}</p>
      <a class="contact-method-btn ${card.card_type === 'outline' ? 'contact-method-btn-outline' : 'contact-method-btn-filled'}" href="${escapeHtml(card.button_url)}"${card.button_url.startsWith('http') ? ' target="_blank" rel="noreferrer"' : ''}>
        <span>${escapeHtml(card.button_label)}</span>
        <span class="contact-btn-arrow">→</span>
      </a>
    </div>`).join('');
  const pill = contact.bottom_pill.map(item => `<span class="${escapeHtml(item.class)}">${escapeHtml(item.text)}</span>`).join('');
  return `
  <section class="section contact-section-new" id="${escapeHtml(contact.id)}">
    <div class="contact-shell fade-in">
      <div class="contact-header-new">
        <div class="contact-title-row">
          <h2 class="contact-title-new">${escapeHtml(contact.title)}</h2>
          <img src="${escapeHtml(contact.sparkle_image)}" class="contact-sparkle" alt="">
        </div>
        <p class="contact-top-note">${escapeHtml(contact.top_note_prefix)} <span>${escapeHtml(contact.top_note_highlight)}</span></p>
        <p class="contact-subtext-new">${escapeHtml(contact.subtext)}</p>
      </div>
      <div class="contact-cards-grid">${cards}</div>
      <div class="contact-bottom-pill">${pill}</div>
    </div>
  </section>`;
}

const sectionRenderers = {
  hero: renderHero,
  pricing: renderPricing,
  about: renderAbout,
  mission_vision: renderMissionVision,
  team: renderTeam,
  why: renderWhy,
  faqs: renderFaqs,
  contact: renderContact
};

async function loadSite() {
  const response = await fetch('content/site.json', { cache: 'no-store' });
  const data = await response.json();

  document.title = data.site?.title || document.title;
  document.getElementById('site-header').innerHTML = renderHeader(data);

  const order = Array.isArray(data.site?.section_order) ? data.site.section_order : Object.keys(sectionRenderers);
  const main = document.getElementById('page-content');
  main.innerHTML = order.map(key => sectionRenderers[key] ? sectionRenderers[key](data[key]) : '').join('');

  document.getElementById('site-footer').textContent = data.site?.footer_text || '';

  setupInteractions();
}

function setupInteractions() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(other => {
        other.classList.remove('open');
        const icon = other.querySelector('.icon');
        if (icon) icon.textContent = '+';
      });
      if (!isOpen) {
        item.classList.add('open');
        const icon = item.querySelector('.icon');
        if (icon) icon.textContent = '−';
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  const links = document.querySelectorAll('.nav a');
  const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const activeObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
      }
    })
  }, {rootMargin:'-40% 0px -45% 0px', threshold:0});
  sections.forEach(section => activeObserver.observe(section));

  const pricingCards = Array.from(document.querySelectorAll('#pricingGrid .price-card'));
  let currentCenter = Math.min(1, pricingCards.length - 1);

  function renderPlans() {
    const total = pricingCards.length;
    pricingCards.forEach((card, index) => {
      card.classList.remove('is-left', 'is-center', 'is-right', 'is-hidden');
      const diff = (index - currentCenter + total) % total;
      if (diff === 0) {
        card.classList.add('is-center');
      } else if (diff === total - 1) {
        card.classList.add('is-left');
      } else if (diff === 1) {
        card.classList.add('is-right');
      } else {
        card.classList.add('is-hidden');
      }
    });
  }

  function rotatePlans(direction) {
    const total = pricingCards.length;
    if (!total) return;
    currentCenter = (currentCenter + direction + total) % total;
    renderPlans();
  }

  document.getElementById('pricingPrev')?.addEventListener('click', () => rotatePlans(-1));
  document.getElementById('pricingNext')?.addEventListener('click', () => rotatePlans(1));

  if (pricingCards.length) renderPlans();
}

loadSite().catch(err => {
  console.error(err);
  document.getElementById('page-content').innerHTML = '<div class="container section"><p>Unable to load site content.</p></div>';
});
