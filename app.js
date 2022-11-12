const poke_container = document.getElementById("poke-container");
const SearchContainer = document.getElementById("search-container");


const SearchElement = document.createElement("input");
SearchElement.setAttribute("type", "text");
SearchElement.setAttribute("name", "searchBar");
SearchElement.setAttribute("placeholder", "Search...");
SearchContainer.appendChild(SearchElement);

const RegionElement = document.getElementById("select-option");
const SortElement = document.getElementById("sort");
const TypeElement = document.getElementById("type-select");
const TypeList = document.getElementById("type-select")

const value = RegionElement.value;


const pokeCache = {};
let pokemon_count = 151;
let i = 1;

let pokemons = [];
let tempPoke;

//look by query, do gens since data is avilable, put info in new array (use .map or .filter)

/*Colors for the generations*/
const colors = {
    generation1: "linear-gradient(145deg, " +'#1111ff' + ", " + '#ff1111' + ", " + '#ffd733' +")",
    generation2: "linear-gradient(145deg, " +'#daa520' + ", " + '#c0c0c0' + ", " + '#4fd9ff' +")",
    generation3: "linear-gradient(145deg, " +'#a00000' + ", " + '#0000a0' + ", " + '#00a000' +")",
    generation4: "linear-gradient(145deg, " +'#aaaaff' + ", " + '#ffaaaa' + ", " + '#999999' +")",
    generation5: "linear-gradient(145deg, " +'#444444' + ", " + '#e1e1e1' + ")",
    generation6: "linear-gradient(145deg, " +'#6376b8' + ", " + '#ed5540' + ")",
    generation7: "linear-gradient(145deg, " +'#f1912b' + ", " + '#5599ca' + ")",
    generation8: "linear-gradient(145deg, " +'#00d1f6' + ", " + '#9e2306' + ")",
    generation85: "linear-gradient(145deg, " +'#fad709' + ", " + '#f1f4f4' + ", " + '#5e6365' +")",
    generation9: "linear-gradient(145deg, " +'#c91421' + ", " + '#632ea6' + ")",
}
/*Colors for the types*/
const infoColors = {
    Bug: '#A6B91A',
    Dark: '#705746',
    Dragon: '#6F35FC',
    Electric: '#F7D02C',
    Fairy: '#D685AD',
    Fighting: '#C22E28',
    Fire: '#EE8130',
    Flying: '#A98FF3',
    Ghost: '#735797',
    Grass: '#7AC74C',
    Ground: '#E2BF65',
    Ice: '#96D9D6',
    Normal: '#A8A77A',
    Poison: '#A33EA1',
    Psychic: '#F95587',
    Rock: '#B6A136',
    Steel: '#B7B7CE',
    Water: '#6390F0',
}
/* This for the load screen no touch Ant*/
function onReady(callback) {
    const intervalId = window.setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 5000);
}

function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function (){
    setVisible('.page', true);
    setVisible('#loading', false)
})
/*Clears the poke-container for the Gens/Region*/
function clearBox(element){
    document.getElementById("poke-container").innerHTML = "";
}
/*Changes the  i and pokemon_count for the fetch function. Which is triggered by the select change*/
RegionElement.addEventListener('change', function handleChangeRegion (event){
    if (event.target.value === 'Kanto'){
        pokemon_count = 151;
        i = 1;
        clearBox();
        fetchPokemon();
    }
    if (event.target.value === 'Johto'){
        pokemon_count = 251;
        i = 152;
        clearBox();
        fetchPokemon();
    }
    if (event.target.value === 'Hoenn'){
        pokemon_count = 386;
        i = 252;
        clearBox();
        fetchPokemon();
    }
    if (event.target.value === 'Sinnoh'){
        pokemon_count = 493;
        i = 387;
        clearBox();
        fetchPokemon();
    }
    if (event.target.value === 'Unova'){
        pokemon_count = 649;
        i = 494;
        clearBox();
        fetchPokemon();
    }
    if (event.target.value === 'Kalos'){
        pokemon_count = 721;
        i = 650;
        clearBox();
        fetchPokemon();
    }
    if (event.target.value === 'Alola'){
        pokemon_count = 809;
        i = 722;
        clearBox();
        fetchPokemon();
    }
    if (event.target.value === 'Galar'){
        pokemon_count = 898;
        i = 810;
        clearBox();
        fetchPokemon();
    }
    if (event.target.value === 'Hisui'){
        pokemon_count = 905;
        i = 899;
        clearBox();
        fetchPokemon();
    }
})


const getPokemon = async (id) =>{
    const url = `https://updated-pokemon-apis-production.up.railway.app/Pokemon/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data);
    pokemons.push(data);
}


const fetchPokemon =  async () => {
    pokemons.length = 0;
    for (i ; i <= pokemon_count; i++) {
        await getPokemon(i);
    }
    tempPoke = [...pokemons]
    createSearchFilter();

    console.log(pokemons);
}


const  createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon')


    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const generation = pokemon.generation
    const type = Object.values(pokemon.type);

    //console.log(type)
    pokemonEl.setAttribute("id", name);
    const id = pokemon.id.toString().padStart(3,'0')

    //const filteredPokemonsByType = Object.values(pokemon).filter(gen => type === "Fire");
    //console.log('Filtered by eletric', filteredPokemonsByType);


    const color = colors[generation]

    pokemonEl.style.background = color;



    const pokemonHTMLString = `
     <div id="tilecard" class="tile-card" onclick="selectPokemon(${pokemon.id})">
        <div class="img-container">
                <img id="poke" src="https://pokeimage-production.up.railway.app/pokeImg/${pokemon.id}.png">
            </div>
            <div class="info">
                <span class="number">#${pokemon.id.toString().padStart(3,'0')}</span>
                <h3 class="name">${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h3>
            </div>
     </div>
            `



    pokemonEl.setAttribute("class", "pokemon");
    pokemonEl.innerHTML = pokemonHTMLString;


    poke_container.appendChild(pokemonEl)

    createSearchFilter(name);


};

const  createFilter = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon')

    const generation = pokemon.generation

    pokemonEl.setAttribute("id", pokemon.name);

    const color = colors[generation]

    pokemonEl.style.background = color;


    const pokemonHTMLString = `
     <div id="tilecard" class="tile-card" onclick="selectPokemon(${pokemon.id})">
        <div class="img-container">
                <img id="poke" src="https://pokeimage-production.up.railway.app/pokeImg/${pokemon.id}.png">
            </div>
            <div class="info">
                <span class="number">${pokemon.id.toString().padStart(3,'0')}</span>
                <h3 class="name">${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h3>
            </div>
     </div>
            `



    pokemonEl.setAttribute("class", "pokemon");
    pokemonEl.innerHTML = pokemonHTMLString;

    poke_container.appendChild(pokemonEl)

    createSearchFilter(name);
};


const selectPokemon = async (id) => {

    if (!pokeCache[id]){
        const url = `https://updated-pokemon-apis-production.up.railway.app/pokemon/${id}`;
        const res = await fetch(url);
        const pokeman = await res.json();
        pokeCache[id] = pokeman;
        displayCard(pokeman);
    }
    else{
        displayCard(pokeCache[id]);
    }

};

const displayCard = (pokeman) => {
    const ability = pokeman.abilities;
    const type = Object.values(pokeman.type).map((type) => type).join('/');

    const htmlString = `
        <div class="poke_card" onclick="closeCard()">
            <div class="poke-card-body" id="poke-card-body">
                <div class="left-side">
                    <h1 class="num">#${pokeman.id.toString().padStart(3,'0')}</h1>
                    <h2 class="card-name">${pokeman.name}</h2>
                    <h2 class="card-title"><em>The ${pokeman.category} Pokemon</em></h2>
                    <img src="https://pokeimage-production.up.railway.app/pokeImg/${pokeman.id}.png" class="card-img" id="card-img" onclick="play()">
                    <audio id="audio" src="https://pokeimage-production.up.railway.app/pokeCry/${pokeman.id}.mp3"></audio>
                    <h3 class="poke-height">${type}</h3>
                    <h3 class="poke-height">${pokeman.height}</h3>
                    <h3 class="poke-height">${pokeman.weight}</h3>
                </div>
                <div class="right-side">
                    <h2 class="section-header">Entry:</h2>
                    <div class="enrty-container">
                        <p class="enrty-info">${pokeman.entry}</p>
                    </div>
                    <h2 class="section-header">Abilities:</h2>
                    <div class="ability-container">
                         <p class="ability-info">${ability}</p>
                    </div>
                    <h2 class="section-header">Base Stats</h2>
                    <div class="bs-container">
                        <div class="stat-columns">
                            <div class="stat-name">HP</div>
                            <div class="stat-val">${pokeman.stats.HP}</div>
                        </div>
                        <div class="stat-columns">
                            <div class="stat-name">Attack</div>
                            <div class="stat-val">${pokeman.stats.Attack}</div>
                        </div>
                        <div class="stat-columns">
                            <div class="stat-name">Defense</div>
                            <div class="stat-val">${pokeman.stats.Defense}</div>
                        </div>
                        <div class="stat-columns">
                            <div class="stat-name">Sp. Attack</div>
                            <div class="stat-val">${pokeman.stats.SpAtk}</div>
                        </div>
                        <div class="stat-columns">
                            <div class="stat-name">Sp. Defense</div>
                            <div class="stat-val">${pokeman.stats.SpDef}</div>
                        </div>
                        <div class="stat-columns">
                            <div class="stat-name">Speed</div>
                            <div class="stat-val">${pokeman.stats.Speed}</div>
                        </div>
                    </div>
                    <div id="evoInfo">
                        <div id="evoIn"></div>
                    </div>
                </div>
            </div>
        </div>
    `;


    poke_container.innerHTML = htmlString + poke_container.innerHTML;

    const cry = document.getElementById("audio")
    const pokeCry = document.getElementById("card-img")

    function play() {
        cry.play();
        cry.volume = .5;
    }

    pokeCry.addEventListener('mouseover', play)
    pokeCry.addEventListener('mouseout', stop)


    const poke = document.getElementById("poke-card-body");

    const poke_type = pokeman.type.T1;
    const poke_type2 = pokeman.type.T2;


    const color = infoColors[poke_type];
    const color2 = infoColors[poke_type2];


    if(Object.keys(pokeman.type).length === 2){
        poke.style.background = "linear-gradient(145deg, " + color + ", " + "#d3d3d3" + ", " + color2 +")";
    }

    if (Object.keys(pokeman.type).length === 1) {
        poke.style.background = "linear-gradient(145deg, " + color + ", " + "#d3d3d3" + ", " + color +")";
    }

};

const closeCard = () => {
    const card = document.querySelector('.poke_card');
    card.parentElement.removeChild(card)
}


fetchPokemon();

const createSearchFilter = (pokemonData) => {
    const cards = document.querySelectorAll(".pokemon");
    SearchElement.addEventListener("keyup", (event) => {
        const val = event.target.value.toLowerCase();
        cards.forEach((card) => {
            if (card.id.toLowerCase().includes(val)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
};


function sortPokemons (array, attr){
    console.log(array);
    console.log(attr);

    if (attr === 'id-asc') {
        array.sort((a, b) => a['id'] - b['id'])
    }
    if (attr === 'id-dsc') {
        array.sort((a, b) => b['id'] - a['id'])
    }
    if (attr === 'name') {
        array.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    }


    poke_container.innerHTML = ""

    array.forEach(pokemon => createFilter(pokemon))
}

function filterPokemons(array,pokeT){
    poke_container.innerHTML = ""
    array = array.filter((type)=> type.type.T1 === e.target.value || type.type.T2 === pokeT)
    array.forEach((pokemon) => {
        filterPokemons(pokemon)
    })
}

SortElement.addEventListener('change', () =>{
    sortPokemons(tempPoke, SortElement.value)
})


TypeElement.addEventListener('change', (e) => {
    tempPoke = pokemons
    if (TypeList.value === e.target.value && e.target.value !== "all types") {
        poke_container.innerHTML = "";
        tempPoke = tempPoke.filter((type)=> type.type.T1 === e.target.value || type.type.T2 === e.target.value);
        console.log(tempPoke)
        tempPoke.forEach(pokemon => createFilter(pokemon))
        return;
    }

    if (e.target.value === "all types") {
        poke_container.innerHTML = "";
        tempPoke.forEach(pokemon => createPokemonCard(pokemon))
    }

    else {

    }

})




