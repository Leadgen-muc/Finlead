// Basic interactivity: mobile nav, form validation + fake submit (no server)
document.addEventListener('DOMContentLoaded', function () {
  // Set copyright year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (expanded) mainNav.style.display = '';
    else mainNav.style.display = 'block';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        if (window.innerWidth <= 800 && mainNav.style.display === 'block') {
          mainNav.style.display = '';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
    
      // Witwenrenten-Rechner
  const calcForm = document.getElementById('calcForm');
  const calcResult = document.getElementById('calcResult');

  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      calcResult.textContent = '';

      const rente = parseFloat(calcForm.rente.value);
      const art = calcForm.art.value;

      if (isNaN(rente) || rente <= 0 || !art) {
        calcResult.textContent = 'Bitte geben Sie gültige Werte ein.';
        return;
      }

      let faktor = 0;
      if (art === 'klein') faktor = 0.25;
      if (art === 'gross') faktor = 0.55;
      if (art === 'gross_alt') faktor = 0.60;

      const betrag = rente * faktor;

      calcResult.textContent = `Geschätzte Witwenrente: ca. ${betrag.toFixed(2)} € pro Monat (brutto).`;
    });
  }
  });

  // Simple client-side form handling (no backend)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    // basic HTML5 validity check
    if (!form.checkValidity()) {
      status.textContent = 'Bitte fülle alle Felder korrekt aus.';
      form.reportValidity();
      return;
    }

    // gather data
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    // For this template we don't have a server.
    // Option A: open mail client with mailto (uncomment to enable)
    // const mailto = `mailto:you@example.com?subject=${encodeURIComponent('Anfrage von ' + data.name)}&body=${encodeURIComponent(data.message + '\n\n' + data.email)}`;
    // window.location.href = mailto;

    // Option B: fake submit & show success message
    status.textContent = 'Danke! Deine Nachricht wurde lokal erfasst. (Kein Server konfiguriert)';
    form.reset();
  });
});
