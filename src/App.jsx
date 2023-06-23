import { useEffect, useState } from "react"
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'                

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
    const [fact, setFact] = useState()  
    const [imageUrl, setImageUrl] = useState()
                 
// para recuperar la cita al cargar la pagina
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => {
            return res.json()
        }) 
        .then(data => { 
            const { fact } = data
            setFact(fact) 
    })
    }, [])
// para recuoerar la imagen cada vez que tenemos una cita nueva 

useEffect(() => {
    if (!fact) return 

    const threeFirstWords = fact.split(' ', 3).join(' ') 
    console.log(threeFirstWords) 
    
    fetch (`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
    .then(res => res.json())
    .then(response => { 
        const { url } = response 
        setImageUrl(url) 
})
}, [fact])

    return(
        <main>
        <h1>App de gatitos </h1>

        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three wrds for ${fact}`} />}
        </main>
    )
}
