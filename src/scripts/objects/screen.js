import { getLanguages } from '../services/languages.js';

async function renderRepository(repo, languages) {
  return `<li>
    <div class="repo-item">
      <a href="${repo.html_url}" target="_blank">${repo.name}
        <div class="info-item">
          <span>🍴 ${repo.forks}</span>
          <span>⭐ ${repo.stargazers_count}</span>
          <span>👀 ${repo.watchers}</span>
          <span>👨‍💻 ${languages}</span>
        </div>
      </a>
    </div>
  </li>`;
}

const screen = {
  userProfile: document.querySelector('.profile-data'),
  async renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
      <img src="${user.avatarUrl || 'https://via.placeholder.com/150'}" alt="Foto de perfil do usuário" />
      <div class="data">
        <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
        <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
        <p class="follower">
          <span>${user.followers} Seguidores </span> • <span>${user.following} Seguindo</span>
        </p>
      </div>
    </div>`;

    // Busca linguagens e monta HTML dos repositórios
    const languagesList = await Promise.all(
      user.repositories.map(repo => getLanguages(repo.owner.login, repo.name))
    );
    const repositoriesItens = await Promise.all(
      user.repositories.map((repo, i) => renderRepository(repo, languagesList[i]))
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
        <h2>Repositórios</h2>
        <ul>${repositoriesItens.join('')}</ul>
      </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  }
};

export { screen };