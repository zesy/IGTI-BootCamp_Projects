import {getSummary, getCountryInfo} from './getinfos.js';

// ----------- ADD EVENTS LISTENERS ----------- 
slcTop10.addEventListener('change', updateRenderTop10);
slcLang.addEventListener('change', () => {changeLang();});

// GET SUMMARY DATA
const summarydata = await getSummary();

// ----------- INIT SUMMARY DATA ----------- 
(async function setSummaryFields(){
    nConfirmed.textContent = summarydata.Global.TotalConfirmed.toLocaleString("pt-br");
    nDeaths.textContent = summarydata.Global.TotalDeaths.toLocaleString("pt-br");
    nRecovered.textContent = summarydata.Global.TotalRecovered.toLocaleString("pt-br");
    nActives.textContent = (summarydata.Global.TotalConfirmed - (summarydata.Global.TotalDeaths + summarydata.Global.TotalRecovered)).toLocaleString("pt-br");
    dataUpdate.textContent = renderDataFormat(summarydata.Global.Date, 'pt-br');

    updateChartDatas(dailyPie, [summarydata.Global.NewConfirmed, summarydata.Global.NewDeaths, summarydata.Global.NewRecovered]);
    renderTop10('TotalDeaths');
    
    // ONLY TO POP COUNTRIES
    popCountriesOnSelect();
})();

// ----------- RENDER CHART BAR OF TOP 10 ----------- 
function updateRenderTop10(){renderTop10(slcTop10.value);}

function renderTop10(selector){
    //order the object
    const ordened = _.orderBy(summarydata.Countries, selector, 'desc');
    //take the firsts 10 objects
    const top10 = _.take(ordened, 10);
    //Object with countryes and their numbers by 'selector'
    let top10numbers = {
        contry: [],
        numbers: []
    };
    // Push info to top10numbers
    _.forEach(top10, (value) => {
        top10numbers.contry.push(value.Country);
        top10numbers.numbers.push(value[selector]);
    })
    updateChartDatas(deathsTop10Bar, top10numbers.numbers, top10numbers.contry);
}

// ----------- LANG CONFIGURATION ----------- 
function getLang() {return slcLang.value;};
function changeLang(){
    txtConfirmed.textContent = "Total "+lang[getLang()].confirmed;
    txtDeaths.textContent = "Total "+lang[getLang()].death;
    txtRecovered.textContent = "Total "+lang[getLang()].recovered;
    txtActives.textContent = "Total "+lang[getLang()].active;
    titleNewCases.textContent = lang[getLang()].txtnewcases + " - " + lang[getLang()].txtdaily;

    opConfirmed.textContent = lang[getLang()].confirmed;
    opDeaths.textContent = lang[getLang()].death;
    opRecovered.textContent = lang[getLang()].recovered;
    
    dataConfirmed.textContent = lang[getLang()].confirmed;
    dataDeaths.textContent = lang[getLang()].death;
    dataRecovered.textContent = lang[getLang()].recovered;

    txtDataUpdate.textContent = lang[getLang()].lastupdate + ": ";
    dataUpdate.textContent = renderDataFormat(summarydata.Global.Date, 'pt-br');

    titleDailyCurve.textContent = lang[getLang()].dailycurve + " - Covid-19";
    menuDailyCurve.textContent = lang[getLang()].dailycurve;
    btnSearchDaily.textContent = lang[getLang()].search;
    txtFormCountry.textContent = lang[getLang()].country + ":";
    txtFormTo.textContent = lang[getLang()].to + ":";
    txtFormFrom.textContent = lang[getLang()].from + ":";
    txtSlcDateInterval.textContent = lang[getLang()].slcperiod+":";
    txtFormData.textContent = lang[getLang()].data + ":";

    updateChartDatas(dailyPie, false, [lang[getLang()].confirmed, lang[getLang()].death, lang[getLang()].recovered]);
}

// ----------- DATA FORMAT CONFIGURATION ----------- 
function renderDataFormat(data){
    let nd = new Date(data);
    let day = nd.getDate().toString().padStart(2, '0');
    let month = (nd.getMonth()+1).toString().padStart(2, '0');
    let fullyear = nd.getFullYear();
    let hours = nd.getHours().toString().padStart(2, '0');
    let minutes = nd.getMinutes().toString().padStart(2, '0');
    let seconds = nd.getSeconds().toString().padStart(2, '0');

    if(getLang() == 'pt-br')
        return `${day}/${month}/${fullyear} | ${hours}:${minutes}:${seconds}`;
    else if (getLang() == 'eng')
        return `${month}-${day}-${fullyear} | ${hours}:${minutes}:${seconds}`;
    else
    return data;
}

// ----------- POP COUNTRIES ON SELECT ----------- 
function popCountriesOnSelect(){
    const ordenedCountry = _.orderBy(summarydata.Countries, 'Country', 'asc');
    for(let con of ordenedCountry){
        if(con.Slug === "brazil")
            slcCountry.appendChild(new Option(con.Country, con.Slug, true, true));
        else
            slcCountry.appendChild(new Option(con.Country, con.Slug));
    }
}