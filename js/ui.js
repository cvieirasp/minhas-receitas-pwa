const recipes = document.getElementById('recipes-list');
const installButton = document.getElementById('install-button');
const messageButton = document.getElementById('message-button');
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
  deferredInstallPrompt = event;
});

document.addEventListener('DOMContentLoaded', function() {
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});

  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

const renderRecipe = (data, id) => {
  const html = `
    <div class="card-panel recipe white row" data-id="${id}">
      <img src="/img/dish.png" alt="recipe thumb">
      <div class="recipe-details">
        <div class="recipe-title">${data.title}</div>
        <div class="recipe-ingredients"><strong>Ingredientes:</strong> ${data.ingredients}l</div>
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;

  recipes.innerHTML += html;
}

const removeRecipe = (id) => {
  const recipe = document.querySelector(`.recipe[data-id="${id}"]`);
  recipe.remove();
}

installButton?.addEventListener('click', () => {
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then((choice) => {
      if(choice.outcome === 'accepted'){
        console.log("Usuário aceitou a instalação");
      }else{
        console.log("Usuário não aceitou a instalação");
      }
  });
});

const form = document.getElementById('contact-form');
form?.addEventListener('submit', event => {
  event.preventDefault();

  if (form.name.value == '' || form.name.value == '' || 
      form.name.value == '' || form.name.value == '') {
    M.toast({html: 'Campos devem ser preenchidos.'});
    return;
  }

  form.name.value = '';
  form.email.value = '';
  form.phone.value = '';
  form.desc.value = '';

  M.toast({html: 'Mensagem enviada com sucesso!'});
});
