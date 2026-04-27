const baseUrl = 'https://api.github.com/users';
const repositoriesQuantity = 10;
const repoLanguagesUrl = (owner, repo) => `https://api.github.com/repos/${owner}/${repo}/languages`;

export { baseUrl, repositoriesQuantity, repoLanguagesUrl };