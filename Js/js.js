
function abreFecha(sel) {
    $(sel).slideToggle();
}

var forecast_button = document.querySelector("#forecast");
forecast_button.addEventListener('click', function() {
  var request_o = null;
  try {
    request_o = new XDomainRequest();
  } catch (ex) {
    request_o = new XMLHttpRequest();
  };
  request_o.onreadystatechange = function() {
    if (request_o.readyState == 4) {
      var forecast = JSON.parse(request_o.responseText)["query"]["results"]["channel"]["item"]["forecast"];
      var weatherDiv = document.querySelector("#weather");
      while (weatherDiv.firstChild) {
        weatherDiv.removeChild(weatherDiv.firstChild);
      };
      var tbl = document.createElement("table");
      tbl.border = 1;
      tbl.style.width = "50%";
      var row = document.createElement("tr");
      forecast.forEach(function(d) {
        var cell = document.createElement("td");
        cell.style.textAlign = "center";
        cell.innerHTML = d.date + "<br /><br /><b><img src='https://s.yimg.com/zz/combo?a/i/us/we/52/" + d.code + ".gif' /><br />" + d.text + "</b>" + "<br />High: " + d.high + "&deg;F<br />Low: " + d.low + "&deg;F";
        row.appendChild(cell);
      });
      tbl.appendChild(row);
      weatherDiv.appendChild(tbl);
    };
  };
  request_o.open("GET", "//query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select woeid%20from%20geo.places(1)%20where%20text%3D%22" + escape(document.querySelector("#city").value) + "%22)&format=json");
  request_o.send(null);
});
forecast_button.click();
