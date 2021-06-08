import Report from "./Report";

export default function Investment({descr, children: reports}) {

    function calcPercent(currentValue, afterValue){
        return ((currentValue - afterValue) * 100) / afterValue;
    }
    
    const ordenedReports = reports.sort((a, b) => {
        if(a.month > b.month) return 1;
        if(a.month < b.month) return -1;
        return 0;
    });

    const newOrdenedReports = ordenedReports.map((or, index) => {
        if(index === 0)
            return {...or, percent: 0}
        else{
            let afterValue = parseFloat(ordenedReports[index-1].value)
            let percent = calcPercent(parseFloat(or.value), afterValue);
            return {...or, percent: percent}   
        }
    });

    const firstReport = parseFloat(newOrdenedReports[0].value);
    const lastReport = parseFloat(newOrdenedReports[(newOrdenedReports.length)-1].value);
    const totalRent = (lastReport - firstReport).toFixed(2);
    const totalPercent = calcPercent(lastReport, firstReport).toFixed(2);
    const strTotalPercent = totalPercent > 0 ? ("+"+totalPercent) : (totalPercent);

    const totalRentBgColor = totalRent > 0 ? "text-green-500" : totalRent < 0 ? "text-red-500" : "";

    return (
        <div className="border border-gray-400 w-4/5 sm:w-4/5 md:w-4/5 lg:w-3/5 mx-auto my-3 p-2">
            <h1 className="text-lg font-semibold text-center">{descr}</h1>
            <p className="text-sm text-center mb-5 font-semibold">Rendimento Total: <span className={totalRentBgColor}>R$ {totalRent} ({strTotalPercent}%)</span></p>
            {newOrdenedReports.map(rep => {
                return <Report key={rep.id}>{rep}</Report>
            })}
        </div>
    )
}
