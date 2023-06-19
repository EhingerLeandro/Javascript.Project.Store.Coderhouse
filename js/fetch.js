//Consumiendo API pública con datos sobre países.
const traerPaises = async()=>{
    try{
        let response = await fetch("https://restcountries.com/v3.1/region/South America/");
        let data = await response.json();
        let spanishCountries = data.filter(item =>(item.languages).hasOwnProperty('spa'));
        spanishCountries.forEach( item=>{
            let card=document.createElement('div');
            card.innerHTML= `
            <h4>${item.name.common}</h4>
            <div class='card_image'>
                <img class='pic' src='${item.flags.png}'>
            </div>`;
        
            card.classList.add(`cards`);
            card.classList.add(`cardz`);
            contain_countries.append(card);
        })
    }catch(error){
        console.log('error: '+ error)
    }
}
traerPaises();