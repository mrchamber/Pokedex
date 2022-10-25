const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++){
        const url = `https://updated-pokemon-apis-production.up.railway.app/pokemon/${i}`;
        promises.push(fetch(url).then((res)=> res.json()));
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.image,
            type: data.type,
            abilities: data.abilities,
            HP: data.stats.HP,
            Attack: data.stats.Attack,
            Defense: data.stats.Defense,
            SpAtk: data.stats.SpAtk,
            SpDef: data.stats.SpDef,
            Speed: data.stats.Speed
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map (pokeman => `
    <div class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-img" src="${pokeman.image}"/>
        <h2 class="card-num">#${pokeman.id.toString().padStart(3,'0')}</h2>
        <h2 class="card-title">${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
    </div>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    const url = `https://updated-pokemon-apis-production.up.railway.app/pokemon/${id}`;
    const res = await fetch(url)
    const pokeman = await res.json();
    displayPopup(pokeman);
};

const displayPopup = (pokeman)  => {
    const htmlString = `
        <div class="popup">
            <button id ="closeBtn" onclick="closePopup()">Close</button>
            <div class="cardPop">
            <img class="card-imgPop" src="${pokeman.image}"/>
            <h2 class="card-num">#${pokeman.id.toString().padStart(3,'0')}</h2>
            <h2 class="card-titlePop">${pokeman.name}</h2>
            <p class="info"><small>Type: </small>${pokeman.type} | <small>Abilites: </small>${pokeman.abilities} | <small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight}</p>
            <table class="info">
                <tr>
                    <th>Base Stats</th>
                    <th>Base Stats</th>
                </tr>
                <tr>
                    <td>HP</td>
                    <td>${pokeman.stats.HP}</td>
                </tr>
                    <td>Attack</td>
                    <td>${pokeman.stats.Attack}</td>
                <tr>
                    <td>Defense</td>
                     <td>${pokeman.stats.Defense}</td>
                </tr>
                    <td>Sp. Attack</td>
                    <td>${pokeman.stats.SpAtk}</td>
                <tr>
                    <td>Sp. Defense</td>
                    <td>${pokeman.stats.SpDef}</td>
                </tr>
                <tr>
                    <td>Speed</td>  
                    <td>${pokeman.stats.Speed}</td>   
                </tr>
            </table>
            </div>
        </div>`;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    console.log(htmlString);
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}

fetchPokemon();
