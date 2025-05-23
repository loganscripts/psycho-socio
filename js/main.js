// main.js

document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const themeToggleBtn = document.getElementById('toggle-theme');
  const langSwitch = document.getElementById('lang-switch');
  const voiceToggleBtn = document.getElementById('toggle-voice');
  const navLinks = document.querySelectorAll('.nav-link');
  const introTextEl = document.getElementById('intro-text');
  const subtitleEl = document.querySelector('.subtitle');

  // localStorage keys
  const THEME_KEY = 'theme';
  const LANG_KEY = 'lang';
  const VOICE_KEY = 'voice';

  // default intro texts for typing effect
  const introTexts = {
    en: "welcome to the ultimate guide on psychopaths vs sociopaths.",
    ru: "добро пожаловать в полное руководство по психопатам и социопатам."
  };

  // set theme from localStorage or system preference
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggleBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    themeToggleBtn.textContent = prefersDark ? '🌙' : '☀️';
  }

  // set language from localStorage or default english
  const savedLang = localStorage.getItem(LANG_KEY) || 'en';
  langSwitch.value = savedLang;

  // set voice from localStorage or off by default
  const savedVoice = localStorage.getItem(VOICE_KEY) || 'off';
  voiceToggleBtn.dataset.voice = savedVoice;
  voiceToggleBtn.textContent = savedVoice === 'on' ? '🔊' : '🔈';

  // apply language texts on page
  function updateLanguage(lang) {
    // update subtitle text
    if (subtitleEl) {
      subtitleEl.textContent = subtitleEl.getAttribute(`data-text-${lang}`) || '';
    }
    // update nav links text
    navLinks.forEach(link => {
      const page = link.getAttribute('data-page');
      const translations = {
        en: {
          home: 'Home',
          psychopath: 'Psychopath',
          sociopath: 'Sociopath',
          comparison: 'Comparison',
          quiz: 'Quiz',
          sources: 'Sources',
          about: 'About',
        },
        ru: {
          home: 'Главная',
          psychopath: 'Психопат',
          sociopath: 'Социопат',
          comparison: 'Сравнение',
          quiz: 'Тест',
          sources: 'Источники',
          about: 'О сайте',
        }
      };
      if (translations[lang] && translations[lang][page]) {
        link.textContent = translations[lang][page];
      }
    });
  }

  // typing effect for intro text on homepage
  function typeIntroText(text, element) {
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }

  // toggle theme handler
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    themeToggleBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  });

  // language switch handler
  langSwitch.addEventListener('change', () => {
    const selectedLang = langSwitch.value;
    localStorage.setItem(LANG_KEY, selectedLang);
    updateLanguage(selectedLang);
    if (document.body.classList.contains('home-main')) {
      // if on home page, re-run typing with new lang
      typeIntroText(introTexts[selectedLang], introTextEl);
    }
  });

  // voice toggle handler
  voiceToggleBtn.addEventListener('click', () => {
    if (voiceToggleBtn.dataset.voice === 'on') {
      voiceToggleBtn.dataset.voice = 'off';
      voiceToggleBtn.textContent = '🔈';
      localStorage.setItem(VOICE_KEY, 'off');
      // stop voice if playing
      window.speechSynthesis.cancel();
    } else {
      voiceToggleBtn.dataset.voice = 'on';
      voiceToggleBtn.textContent = '🔊';
      localStorage.setItem(VOICE_KEY, 'on');
    }
  });

  // highlight active nav link based on current page
  function highlightActiveNav() {
    const path = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (path === '' && link.getAttribute('href') === 'index.html') {
        link.classList.add('active');
      } else if (path === link.getAttribute('href')) {
        link.classList.add('active');
      }
    });
  }

  highlightActiveNav();

  // run typing intro if on home page
  if (introTextEl) {
    typeIntroText(introTexts[savedLang], introTextEl);
  }

  // set initial language text
  updateLanguage(savedLang);
});