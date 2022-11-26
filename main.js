const CARDS = 10;

//Peticion de pokemones al API

for (let i = 1; i <= CARDS; i++) {
    let id = getRandomId(150);
    searchPokemonById(id)
}


function getRandomId(max){
    return Math.floor(Math.random()*max)+1    
}

let draggableElement = document.querySelector('.draggable-elements');
let droppableElement = document.querySelector('.droppable-elements');

let pokemonSearch = [];
let pokemonNames = [];

async function searchPokemonById(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()
    //arreglo de los pokemones 
    pokemonSearch.push(data);

    //arreglo de los nombres
    pokemonNames.push(data.name);
    pokemonNames = pokemonNames.sort(()=>Math.random()-0.5);


    draggableElement.innerHTML = '';
    droppableElement.innerHTML = '';
    pokemonSearch.forEach(pokemon => {
    //Dibujando pokemones    
        draggableElement.innerHTML += `
        <div class="pokemon">
            <img id="${pokemon.name}" draggable="true" src="${pokemon.sprites.front_default}" alt="Pokemon" class="image">
        </div>`;      
    });
    //Insertando nombres
    pokemonNames.forEach(names => {
        droppableElement.innerHTML += `
        <div class="names">
            <p>${names}</p>
        </div>`
    })

    let pokemons = document.querySelectorAll('.image');
    pokemons = [...pokemons];
    pokemons.forEach(pokemon =>{
        pokemon.addEventListener('dragstart', event=>{
            event.dataTransfer.setData('text', event.target.id);
        });
    });

    let names = document.querySelectorAll('.names');
    let wrongMsg = document.querySelector('.wrong');
    let point = 0;
    names = [...names];
    names.forEach(name =>{
        name.addEventListener('dragover', event=>{
            event.preventDefault();
 
        });
        name.addEventListener('drop', event=>{
            const draggableElementData = event.dataTransfer.getData('text');
            let pokemonElement = document.querySelector(`#${draggableElementData}`);
             
            if(event.target.innerText == draggableElementData){
                point++;
                event.target.innerHTML = ''
                event.target.appendChild(pokemonElement);
                wrongMsg.innerText = '';
                if(point == CARDS){
                    draggableElement.innerHTML = '<p class="win">GANASTEE!!</p>'
                }
            }else{
                wrongMsg.innerText = '!Ups!';
            }
        });
    });
}

