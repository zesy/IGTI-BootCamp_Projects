const colorPrimary = '#0275d8';
const colorSuccess = '#5cb85c';
const colorInfo = '#5bc0de';
const colorWarning = '#f0ad4e';
const colorDanger = '#d9534f';
const colorDark = '#292b2c';
const colorLight = '#f7f7f7';

function updateChartDatas(chart, infos = false, labels = false, datasetlabels = false, average = false){
    if(infos)
        chart.data.datasets.forEach((dataset) => {dataset.data = infos});
    
    if(labels)
        chart.data.labels = labels;

    if(datasetlabels)
        chart.data.datasets.forEach((dataset, index) => {dataset.label = datasetlabels[index]});

    if(average){
        chart.data.datasets[1].data = [];
        infos.forEach((info) => {chart.data.datasets[1].data.push(average)});
    }
    chart.update();
}

// ================ SUMMARY PIE CHART =====================================
const dailyPieData = {
    type: 'pie',
    data: {
        labels: ['Confirmado', 'Mortes', 'Recuperados'],
        datasets: [{
            data: [1, 1, 1],
            backgroundColor: [colorDanger, colorDark, colorInfo]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
};
// THIS IS THE PIE CHART \/
const dailyPie = new Chart(canvasPie, dailyPieData);
// ================ SUMMARY PIE CHART =====================================

// ================ TOP 10 BAR CHART =====================================
const deathsTop10BarData = {
    type: 'bar',
    data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
        datasets: [{
            label: '',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            backgroundColor: '#A5435C'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
};

// THIS IS THE BAR CHART \/
const deathsTop10Bar = new Chart(canvasBar, deathsTop10BarData);
// ================ TP 10 BAR CHART =====================================

// ================ DAILY CURVE LINE CHART =====================================
const dailyCurveData = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: '#A5435C',
                borderColor: '#a5435c'
            },
            {
                label: '',
                data: [],
                backgroundColor: colorPrimary,
                borderColor: colorPrimary
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
};

// THIS IS THE BAR CHART \/
const dailyCurve = new Chart(dailyCurveCanvas, dailyCurveData);
// ================ TP 10 BAR CHART =====================================