let page = 1
const d = document
const $container = d.getElementById("container")

const $btnPrevious = d.querySelector(".btnPrevious")
const $btnNext = d.querySelector(".btnNext")

$btnNext.addEventListener("click", e => {
    if(page <= 42){
        page += 1
        mostrarContenido()
    }
   
})

$btnPrevious.addEventListener("click", e => {
    if(page > 1){
        page -= 1
        mostrarContenido()
    }
   
})

const mostrarContenido = async()=>{
    try {
        const url = `https://rickandmortyapi.com/api/character?page=${page}`
        const res = await fetch(url)
        if(res.status !== 200){
            throw {status: res.status, statusText: res.statusText || "Ocurrio un error"}
        }else{      
            const data = await res.json()
           
            let pages = ""
            data.results.forEach(el => {
                pages += `
                   <figure class="figure">
                        <img class="img" src="${el.image}">
                        <figcaption class="figcaption">${el.name}</figcaption>
                        <div class="information">
                            <p class="info"><b>Estatus: </b>${el.status}</p>
                            <p  class="info"><b>Especie: </b>${el.species}</p>
                            <p  class="info"><b>Genero:</b>${el.gender}</p>
                        </div>
                   </figure>                     
                `
            });
            $container.innerHTML = pages
            console.log(res, data)
        }

    } catch (error) {
        console.log(error)
    }
}

mostrarContenido()

