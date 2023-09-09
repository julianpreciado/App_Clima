let urlBase = 'https://api.openweathermap.org/data/2.5/weather' // url sacada de la pagina OpenWeatherMap de Current Weather Data / API doc / Built-in API request by city name
let api_key = 'cb166aa7afdb18dbf708416b65f493cb'
let difKelvin = 273.15

document.getElementById('botonBusqueda').addEventListener('click', () => { // el boton busqueda escucha el click de la ciudad
    const ciudad = document.getElementById('ciudadEntrada').value // traigo el valor ingresado
    if (ciudad) {
        fetchDatosClima(ciudad)
    } // si no se ingresa nada, no se busca nada
})

function fetchDatosClima(ciudad) {
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`) // ?q= es de query
        .then(response => response.json())
        .then(response => mostrarDatosClima(response)) // los datos se muestran con esa funcion mostrarDatosClima
}

function mostrarDatosClima(response) {
    const divDatosClima = document.getElementById('datosClima') // en ese id, aparecen los datos del clima de esa ciudad
    divDatosClima.innerHTML = '' // inicia vacio
    // console.log(response)
    const ciudadNombre = (response.name + ', ' + response.sys.country) // obtenido del dom, revisar el path para ubicar la info necesaria
    const temperatura = response.main.temp // main.temp sale de la consola del dom, debe tener la ruta clara
    const humedad = response.main.humidity
    const descripcion = response.weather[0].description // weather[0].description sale de la consola del dom, debe tener la ruta clara
    const icono = response.weather[0].icon // mostrar icono asociado al clima

    const ciudadTitulo = document.createElement('h2') // asi creo elementos dentro del div de html
    ciudadTitulo.textContent = ciudadNombre // una vez creado el documento h2, le cargo la info del dom de response.name

    const temperaturaInfo = document.createElement('p')
    temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura - difKelvin)} grados C`

    const humedadInfo = document.createElement('p')
    humedadInfo.textContent = `La humedad es: ${humedad} %`

    const iconoInfo = document.createElement('img') // con imagenes no es textCPntent sino .src y el enlace de la imagen
    iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png` // asi es dinamico y aparecera el icono del clima particular

    const descripcionInfo = document.createElement('p')
    descripcionInfo.textContent = `La descripccion meteorologica es: ${descripcion}`

    divDatosClima.appendChild(ciudadTitulo) // appendChild muestra el elemento en la pagina web
    divDatosClima.appendChild(temperaturaInfo)
    divDatosClima.appendChild(humedadInfo)
    divDatosClima.appendChild(iconoInfo)
    divDatosClima.appendChild(descripcionInfo)
}




