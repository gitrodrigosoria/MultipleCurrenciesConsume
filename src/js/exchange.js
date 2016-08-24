getExchange = function () {

    var urlYql = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%3D%22EURBRL%22&"
            + "format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

    var urlApi = "http://www.rodrigosoria.com.br/Service.ashx"

    var euro, euro_iof, agk, spmundi;

    $.getJSON(urlYql, function (d) {

        euro = parseFloat(d.query.results.rate.Rate);
        euro_iof = eval(euro + eval(euro * 0.0038));

        $('#euro_value').html(
            "EURO: " + euro.toFixed(2) + " <span>(" + euro.toFixed(4) + ") :: (" + euro_iof.toFixed(4) + ")</span><br/><hr/>"
        );

        $.getJSON(urlApi, function (d) {

            agk = d.Cotacao[0].AGK[0][5].value.substring(0, 4).replace(',', '.');
            spmundi = d.Cotacao[1].SPMUNDI[0][6].value.replace(',', '.');

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