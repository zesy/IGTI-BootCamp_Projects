//================== DOM ELEMENTS ===================
const menuDailyCurve = document.getElementById("menuDailyCurve");
const slcLang = document.getElementById('lang');

const nConfirmed = document.getElementById("nConfirmed");
const nDeaths = document.getElementById("nDeaths");
const nRecovered = document.getElementById("nRecovered");
const nActives = document.getElementById("nActives");

const txtConfirmed = document.getElementById("txtConfirmed");
const txtDeaths = document.getElementById("txtDeaths");
const txtRecovered = document.getElementById("txtRecovered");
const txtActives = document.getElementById("txtActives");

const opConfirmed = document.getElementById("opConfirmed");
const opDeaths = document.getElementById("opDeaths");
const opRecovered = document.getElementById("opRecovered");
const opActives = document.getElementById("opActives");


const dataUpdate = document.getElementById("dataupdate");
const txtDataUpdate = document.getElementById("txtdataupdate");

const titleNewCases = document.getElementById("titleNewCases");

const slcTop10 = document.getElementById("slcTop10");
const slcCountry = document.getElementById("slcCountry");

const canvasPie = document.getElementById("newCasesPie");
const canvasBar = document.getElementById("deathsTop10Bar");

const titleDailyCurve = document.getElementById("titleDailyCurve");

const dataConfirmed = document.getElementById("dataConfirmed");
const dataDeaths = document.getElementById("dataDeaths");
const dataRecovered = document.getElementById("dataRecovered");
const dataActives = document.getElementById("dataActives");

const btnSearchDaily = document.getElementById("btnSearchDaily");
const txtFormCountry = document.getElementById("txtFormCountry");
const txtFormTo = document.getElementById("txtFormTo");
const txtFormFrom = document.getElementById("txtFormFrom");
const txtSlcDateInterval = document.getElementById("txtSlcDateInterval");
const txtFormData = document.getElementById("txtFormData");

const initdate = document.getElementById("initdate");
const enddate = document.getElementById("enddate");

const dataTypeSelector = document.getElementById("dataTypeSelector");

const lineConfirmed = document.getElementById("lineConfirmed");
const lineDeaths = document.getElementById("lineDeaths");
const lineRecovered = document.getElementById("lineRecovered");
const formSearchDaily = document.getElementById("formSearchDaily");

const smallConfirmed = document.getElementById("smallConfirmed");
const smallDeaths = document.getElementById("smallDeaths");
const smallRecovered = document.getElementById("smallRecovered");

//================== LANGUAGE ELEMENTS ===================
const lang = {
    'pt-br': {
        confirmed: 'Confirmados',
        death: 'Mortes',
        recovered: 'Recuperados',
        active: 'Ativos',
        country: 'Pa??s',
        date: 'Data',
        error: 'Erro! Ainda n??o h?? dados no dia selecionado.',
        txtdaily: 'Di??rio',
        txtnewcases: "Novos Casos",
        lastupdate: "??ltima Atualiza????o",
        dailycurve: "Curva Di??ria",
        slcperiod: "Selecione o per??odo",
        from: "De",
        to: "At??",
        search: "Pesquisar",
        data: "Dados"
    },
    'eng': {
        confirmed: 'Confirmed',
        death: 'Deaths',
        recovered: 'Recovered',
        active: 'Actives',
        country: 'Country',
        date: 'Date',
        error: 'Error! There is still no data on the selected day.',
        txtdaily: 'Daily',
        txtnewcases: "New Cases",
        lastupdate: "Last Update",
        dailycurve: "Daily Curve",
        slcperiod: "Select the period",
        from: "From",
        to: "To",
        search: "Search",
        data: "Data"
    }
};