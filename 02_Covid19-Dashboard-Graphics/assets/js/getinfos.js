const getCovidApi = axios.create({
    baseURL: 'https://api.covid19api.com'
});

async function getSummary(){
    let summary = await getCovidApi.get('/summary')
                .then((resp) => {
                    return resp.data;
                })
                .catch((err)=>{
                    throw err;
                });                ;
    
    return summary;
}

async function getCountryInfo(country, datafrom, datato){
    let infos = await getCovidApi(`/total/country/${country}?from=${datafrom}&to=${datato}`)
                .then((resp) => {
                    return resp.data;
                })
                .catch((err)=>{
                    throw err;
                });

    return infos;
}

export {getSummary, getCountryInfo};