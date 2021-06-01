const lang = {
    'pt_br': {
        confirmado: 'Total Confirmados',
        mortes: 'Total Mortes',
        recuperados: 'Total Recuperados',
        ativos: 'Total Ativos',
        pais: 'País',
        labeldata: 'Data',
        erro: 'Erro! Ainda não há dados no dia selecionado.',
        txtdia: 'Diário'
    },
    'eng': {
        confirmado: 'Total Confirmed',
        mortes: 'Total Deaths',
        recuperados: 'Total Recovered',
        ativos: 'Total Actives',
        pais: 'Country',
        labeldata: 'Date',
        erro: 'Error! There is still no data on the selected day.',
        txtdia: 'Daily'
    }
};

const slcLang = document.getElementById('lang');
slcLang.addEventListener('change', () => {changeInfos(getLang());});

const getLang = () => {
    return slcLang.value;
};
const changeInfos = () => {
    document.getElementById('labelconfirmeds').textContent = lang[getLang()].confirmado;
    document.getElementById('labeldeaths').textContent = lang[getLang()].mortes;
    document.getElementById('labelrecovereds').textContent = lang[getLang()].recuperados;
    document.getElementById('labelactives').textContent = lang[getLang()].ativos;
    document.getElementById('labelcountry').textContent = lang[getLang()].pais;
    document.getElementById('labeldata').textContent = lang[getLang()].labeldata;
    changeDailyInfo();
};

const changeDailyInfo = () => {
    let conf = document.getElementById('tconfirmed');
    conf.textContent = conf.textContent.replace(/Diário|Daily/g, lang[getLang()].txtdia);
    let mort = document.getElementById('tdeath');
    mort.textContent = mort.textContent.replace(/Diário|Daily/g, lang[getLang()].txtdia);
    let reco = document.getElementById('trecovered');
    reco.textContent = reco.textContent.replace(/Diário|Daily/g, lang[getLang()].txtdia);
};