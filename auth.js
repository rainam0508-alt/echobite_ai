function getCurrentUser() {
  try {
    const saved = localStorage.getItem('echoUser');
    if (saved) return JSON.parse(saved);

    const token = localStorage.getItem('token');
    if (token) {
      return { name: 'User', email: '' };
    }
  } catch (error) {
    console.error('Error reading user session:', error);
  }
  return null;
}

function logoutUser() {
  localStorage.removeItem('echoUser');
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function updateNavAuth() {
  const container = document.getElementById('nav-auth');
  if (!container) return;

  const user = getCurrentUser();

  if (user) {
    const displayName = user.name || (user.email ? user.email.split('@')[0] : 'User');
    container.innerHTML = `
      <span class="user-greeting" title="${escapeHtml(user.email || '')}">👤 ${escapeHtml(displayName)}</span>
      <button type="button" class="logout-btn" onclick="logoutUser()">Logout</button>
    `;
  } else {
    container.innerHTML = `<a href="login.html" class="login-btn">Login</a>`;
  }
}

document.addEventListener('DOMContentLoaded', updateNavAuth);
