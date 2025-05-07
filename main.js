// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).
// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).
// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.


// Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
// Note del docente
// Scrivi la funzione getDashboardData(query), che deve:
// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london

async function fetchData(url){
    const response = await fetch(url)
    const obj = await response.json()
    return obj
}

async function getDashboardData(query){
    
    const responseCities = await fetchData(`http://localhost:5001/destinations?search=${query}`)
    const responseWeather = await fetchData(`http://localhost:5001/weathers?search=${query}`)
    const responseAirport = await fetchData(`http://localhost:5001/airports?search=${query}`)

    const promises = [responseCities, responseWeather, responseAirport]
    const [cities, weather, airport] = await Promise.all(promises)

    return {
        name: cities[0].name,
        country: cities[0].country,
        temperature: weather[0].temperature,
        weather: weather[0].weather_description,
        airport: airport[0].name
    }
}

(async() => {
    try{
        const result = await getDashboardData('london')
        console.log('Risultato', result)
    }catch(error){
        console.error(error)
    }finally{
        console.log('Codice eseguito correttamente')
    }
})()

getDashboardData('london')
