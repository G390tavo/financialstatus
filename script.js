document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.style.display = 'none', 1000);

  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    contents.forEach(c => c.classList.remove('active'));
    document.getElementById(tab.textContent.trim().toLowerCase()).classList.add('active');
  }));

  const darkToggle = document.getElementById('darkModeToggle');
  darkToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark', darkToggle.checked);
  });
});
