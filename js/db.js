db.enablePersistence().catch(function(err) {
  if (err.code == 'failed-precondition') {
    // Pode ocorrer quando existem mais de uma aba aberta do aplicativo.
    console.log('persistence failed');
  } else if (err.code == 'unimplemented') {
    // Falta de suporte ao navegador.
    console.log('persistence is not available');
  }
});

db.collection('recipes').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added'){
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if(change.type === 'removed'){
      removeRecipe(change.doc.id);
    }
  });
});

const formAdd = document.getElementById('add-recipe');
formAdd.addEventListener('submit', event => {
  event.preventDefault();
  
  const recipe = {
    name: formAdd.title.value,
    ingredients: formAdd.ingredients.value
  };

  db.collection('recipes').add(recipe).catch(err => 
    console.log(err)
  );

  formAdd.title.value = '';
  formAdd.ingredients.value = '';
});

const recipesContainer = document.getElementById('recipes-list');
recipesContainer.addEventListener('click', event => {
  if(event.target.tagName === 'I'){
    const id = event.target.getAttribute('data-id');
    db.collection('recipes').doc(id).delete();
  }
});
