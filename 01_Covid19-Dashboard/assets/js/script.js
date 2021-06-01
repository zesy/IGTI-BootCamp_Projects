//DOM Elements
const selectCountries = document.getElementById('combo');
const txtconf = document.getElementById('confirmed');
const txtdeath = document.getElementById('death');
const txtrecovered = document.getElementById('recovered');
const txtactives = document.getElementById('active');
const txttconf = document.getElementById('tconfirmed');
const txttdeath = document.getElementById('tdeath');
const txttrecovered = document.getElementById('trecovered');
const txttactives = document.getElementById('tactive');

// COUNTRIES =====================
//ADD COUNTRIES TO TAG SELECT
const loadCountriesSelect = (countries) => {
    selectCountries.appendChild(new Option('Global', 'global'));
    for(con of countries){
        selectCountries.appendChild(new Option(con.Country, con.Slug));
    }
};

//INIT FETCH DO SEARCH COUNTRIES
const initCountries = async () => {
    try {
        const c = await doFetch(countriesUrl);
        loadCountriesSelect(c);
    } catch (error) {
        showError(error);
    }
};
initCountries();
// END COUNTRIES ==============================================

// SUMMARY ====================================================

//INIT FETCH INITAL SUMMARY
const initSummary = async () => {
    try {
        const s = await doFetch(summaryUrl);
        loadSummary(s);
        setData(s.Global['Date'])
        console.log("DATA SUMMARY: "+s.Global['Date']);
    } catch (error) {
        showError(error);
    }
};

//LOAD INITIAL SUMMARY ON FIELDS
const loadSummary = (summary) => {
    clearError('');
    setInfos(
        summary.Global['TotalConfirmed'],
        summary.Global['TotalDeaths'],
        summary.Global['TotalRecovered'],
        summary.Global['TotalConfirmed'] - (+summary.Global['TotalDeaths']+summary.Global['TotalRecovered'])
    ),
    setDailyInfos('', '', '', '');
};

//SET INFO ON FIELDS
const setInfos = (confirmed, death, recovered, active) => {
    txtconf.textContent = confirmed.toLocaleString('pt-BR');
    txtdeath.textContent = death.toLocaleString('pt-BR');
    txtrecovered.textContent = recovered.toLocaleString('pt-BR');
    txtactives.textContent = active.toLocaleString('pt-BR');
};

const setDailyInfos = (tconfirmed, tdeath, trecovered, tactive) => {
    txttconf.textContent = tconfirmed;
    txttdeath.textContent = tdeath;
    txttrecovered.textContent = trecovered;
    txttactives.textContent = tactive;
}

//SET INITIAL SUMMARY DATE ON DATE FIELD
const setData = (dt) => {
    const ndata = new Date(dt);
    const dia = (ndata.getDate()).toString().padStart(2, '0');
    const mes = (ndata.getMonth()+1).toString().padStart(2, '0');
    document.getElementById('sdata').value = `${ndata.getFullYear()}-${mes}-${dia}`;
}

//CALL THE INITIAL SUMMARY
initSummary();
// FIM SUMMARY ==================================================

//GET VALUE OF INPUTs
const getSlcCountry = () => document.getElementById('combo').value;
const getSlcDate = () => document.getElementById('sdata').value;

//UPDATE INFO ON FIELDS
function updateInfos(sc, sd) {
    setInfos(0,0,0,0);
    setDailyInfos('', '', '','');
    if(sc == 'global')
        initSummary();
    else
        initSearch(sc, sd);
};
//ADD EVENT ON BUTTON
document.getElementById("btnSearch").addEventListener("click", () => {updateInfos(getSlcCountry(), getSlcDate());}, false);

// GET DATE AND TRANSFORM TO ISODATE =================================
const doDateParam = (theDate) => {
    let fromDate = new Date(theDate);
    fromDate = new Date(fromDate.setDate(fromDate.getDate() - 2));

    let toDate = new Date(theDate);

    return `?from=${fromDate.toISOString()}&to=${toDate.toISOString()}`;
};
// END DATE ================================================================

//INIT FETCH ON SEARCH INFO
const initSearch = async (scountry, sdate) => {
    try {
        const jsonCountry = await doFetch(countryUrl+'/'+scountry+doDateParam(sdate));
        loadCountryInfos(jsonCountry);
    } catch (error) {
        showError(error);
    }
};

//LOAD INFO ON FIELDS
const loadCountryInfos = (info) => {
    clearError('');
    if (info.length > 3){
        setInfos(0,0,0,0);
        setDailyInfos('', '', '', '');
        showError();
    }
    else{
        setInfos(
            info[2].Confirmed,
            info[2].Deaths,
            info[2].Recovered,
            info[2].Active
        );
        setDailyInfos(
            calcDif(
                info[0].Confirmed,
                info[1].Confirmed,
                info[2].Confirmed
            ), 
            calcDif(
                info[0].Deaths,
                info[1].Deaths,
                info[2].Deaths
            ), 
            calcDif(
                info[0].Recovered,
                info[1].Recovered,
                info[2].Recovered
            ),
            calcDifActive(
                info[0].Active,
                info[1].Active,
                info[2].Active
            )
        );
    }
}

//CALCULATE DIFERENCE OF NUMBERS, COMPARE CURRENT DATE TO YESTERDAY OF CURRENT DATE
const calcDif = (twoAgo, oneAgo, current) => {
    let dailyOneAgo = oneAgo - twoAgo;
    let dailyCurrent = current - oneAgo;

    let strCurrent = dailyCurrent.toLocaleString('pt-BR').replace('-', '');
    let arrow = '';
    if(dailyCurrent == 0)
        arrow = '\u2212 ';
    else if(dailyOneAgo > dailyCurrent) // -
        arrow = '\u2B9F ';
    else if (dailyOneAgo < dailyCurrent) // +
        arrow = '\u2B9D ';

    return `${arrow} ${lang[getLang()].txtdia}: ${strCurrent}`;
}
//CALCULATE DIFERENCE OF NUMBERS, COMPARE CURRENT DATE TO YESTERDAY OF CURRENT DATE
const calcDifActive = (twoAgo, oneAgo, current) => {
    let finalString = calcDif(twoAgo, oneAgo, current);
    finalString = finalString.replace(lang[getLang()].txtdia+':', '');
    return finalString;
}