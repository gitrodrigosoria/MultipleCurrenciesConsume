getExchange = function () {
    var euro, euro_iof, agk, spmundi;
    $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%3D%22EURBRL%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function (d) {
        euro = parseFloat(d.query.results.rate.Rate);
        euro_iof = eval(euro + eval(euro * 0.0038));
        $('#euro_value').html(
            "EURO: " + euro.toFixed(2) + " <span>(" + euro.toFixed(4) + ") :: (" + euro_iof.toFixed(4) + ")</span><br/><hr/>"
        );
        $.getJSON("http://www.rodrigosoria.com.br/mtc.ashx", function (d) {
            agk = d.cotacao[0].AGK[0][5].coin_value.substring(0, 4).replace(',', '.');
            spmundi = d.cotacao[1].SPMUNDI[0][6].coin_value.replace(',', '.');
            $('#agk_euro_value').html(
                "AGK: " + agk +
                " <span>(+" + eval(agk - euro).toFixed(4) + ") ::" +
                " (+" + eval(agk - euro_iof).toFixed(4) + ")</span><br/>"
            );
            $('#sp_euro_value').html(
                "SPMUNDI: " + spmundi +
                " <span>(+" + eval(spmundi - euro).toFixed(4) + ") ::" +
                " (+" + eval(spmundi - euro_iof).toFixed(4) + ")</span><br/>"
            );
        });
    });
};

getExchange();

setInterval(function () { getExchange(); }, 10000);