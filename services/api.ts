export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({query}: {query: string})=>{
    const endpoint = query 
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers
    })

    if(!response.ok){
        //@ts-ignore
        throw new Error('Failed to fetch movcies', response.statusText)
    }

    const data = await response.json();
    console.log(data)
    return data.results;
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDg2ZDMyZDUwNjBlZDQ4NWNkM2FhNWNjNGU0ZWQyMSIsIm5iZiI6MTc0NzQxMzU3NS45OTMsInN1YiI6IjY4Mjc2YTQ3NWIzODkyMWU1ZjMxNWVjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XgXCVA6o57P0WwZkBxZDBEH_Bjvi1l3kB6mV5a9H0Zw'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));