/* particles-config.js */

particlesJS('particles-js', {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: { value: '#8a2be2' },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 0.15,
      random: false
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: '#8a2be2',
      opacity: 0.08,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.3,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: false },
      resize: true
    },
    modes: {
      grab: { distance: 130, line_linked: { opacity: 0.2 } }
    }
  },
  retina_detect: true
});
