// URLs, EndPoints & Options 
const baseUrl = 'https://api.covid19api.com';
const summaryUrl = '/summary';
const countriesUrl = '/countries';
const countryUrl = '/total/country';
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

//DO FETCH
function doFetch(endpoint){
    return fetch(baseUrl+endpoint, requestOptions).then(resp => {
        if(resp.ok)
            return resp.json();
        else
            throw new Error(`${resp.status} - ${resp.statusText}`);
    }).catch(error => {
        throw error;
    });
}

//MSG ERROR ON SPAN TAG
const showError = (error) => {
    document.getElementById('span-error').textContent = lang[getLang()].erro;
    console.log(error);
};
const clearError = () => document.getElementById('span-error').textContent = '';
