 // Loading animatsiyasini boshqarish (3 sekund)
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loader = document.getElementById('loader-wrapper');
        const content = document.getElementById('main-content');
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        content.style.opacity = '1';
      }, 3000); // 3000 ms = 3 soniya
    });