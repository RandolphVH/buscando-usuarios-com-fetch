import { repoLanguagesUrl } from '../variables.js';

export async function getLanguages(owner, repo) {
  const response = await fetch(repoLanguagesUrl(owner, repo));
  const data = await response.json();
  return Object.keys(data).join(', ') || 'N/A';
}