import {getSummary, getCountryInfo} from './getinfos.js';

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
    
    smallConfirmed.textContent = lang[getLang()].confirmed;
    smallDeaths.textContent = lang[getLang()].death;
    smallRecovered.textContent = lang[getLang()].recovered;

    updateChartDatas(dailyPie, false, [lang[getLang()].confirmed, lang[getLang()].death, lang[getLang()].recovered]);
}

// ----------- ADD EVENTS LISTENERS ----------- 
slcTop10.addEventListener('change', updateRenderTop10);
slcLang.addEventListener('change', changeLang);
formSearchDaily.addEventListener('submit', searchByCountry, false);
dataTypeSelector.addEventListener('change', () => {changeDataType(countryInfo)});

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

// ----------- DATE FORMAT CONFIGURATION ----------- 
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

// ----------- SEARCH BY COUNTRY
const getSelectedCountry = () => slcCountry.value;
const getSelectedDateFrom = () => initdate.value;
const getSelectedDateTo = () => enddate.value;
const getDataType = () => dataTypeSelector.value;
var countryInfo = {};

async function searchByCountry(evt){
    evt.preventDefault();
    let datefromiso = new Date(getSelectedDateFrom());
    datefromiso = new Date(datefromiso.setDate(datefromiso.getDate() - 1)).toISOString();
    let datetoiso = new Date(getSelectedDateTo());
    datetoiso = datetoiso.setHours(datetoiso.getHours() + 23, datetoiso.getMinutes() + 59);
    datetoiso = new Date(datetoiso).toISOString();
    countryInfo = await getCountryInfo(getSelectedCountry(), datefromiso, datetoiso);

    dataTypeSelector.removeAttribute("disabled");
    changeDataType(countryInfo);

    lineConfirmed.textContent = getTotal(countryInfo, 'Confirmed').toLocaleString("pt-br");
    lineDeaths.textContent = getTotal(countryInfo, 'Deaths').toLocaleString("pt-br");
    lineRecovered.textContent = getTotal(countryInfo, 'Recovered').toLocaleString("pt-br");

}
function changeDataType(countryInfo){
    const datatype = getDataType();
    const theinfos = getInfos(countryInfo, datatype);
    const calculed = calcDailyInfos(theinfos);
    const dateinfos = getDatesInfos(countryInfo);
    const infoaverage = averageData(countryInfo, datatype);
    
    updateChartDatas(dailyCurve, calculed, dateinfos, [datatype, 'Média/Average'], infoaverage);
}

function getDatesInfos(countryinfo){
    let dateinfo = [];
    _.forEach(countryinfo, (val) => {
        dateinfo.push(val.Date.substring(0, 10));
    });
    _.pullAt(dateinfo, 0);
    return dateinfo;
}
function getInfos(countryinfo, infotype){
    let info = [];
    _.forEach(countryinfo, (val) => {
        info.push(val[infotype])
    });
    return info;
}
function calcDailyInfos(info){
    let dailyinfo = [];
    for(let i = 1; i < info.length; i++){
        dailyinfo.push(info[i] - info[i-1]);
    }
    return dailyinfo;
}
function averageData(info, infotype){
    let first = _.head(info);
    let last = _.last(info);

    return (last[infotype] - first[infotype]) / (info.length - 1);
}
function getTotal(info, infotype){
    let first = _.head(info);
    let last = _.last(info);

    return (last[infotype] - first[infotype]);
}
