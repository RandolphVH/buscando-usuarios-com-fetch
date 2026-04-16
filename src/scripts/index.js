import { getUser } from './services/user.js';
import { getRepositories } from './services/repositories.js';
import { user } from './objects/user.js';
import { screen } from './objects/screen.js';

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if(validateEmptyInput(userName)) return;
    getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;
    
    if (isEnterKeyPressed) {
        if(validateEmptyInput(userName)) return;
        getUserData(userName);
    }
})

function validateEmptyInput(userName) {
    if(userName.length === 0){
        alert('Digite um nome de usuário do GitHub para realizar a busca');
        return true;
    }
}

function setLoading(isLoading) {
    const button = document.getElementById('btn-search');
    if(isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

async function getUserData(userName) {
    setLoading(true);
    
    const userResponse = await getUser(userName);
    
    if(userResponse.message === 'Not Found') {
        setLoading(false);
        screen.renderNotFound();
        return;
    }
    
    const repositoriesResponse = await getRepositories(userName);
    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse)
    
    setLoading(false);
    screen.renderUser(user);
}