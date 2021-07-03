const input = document.querySelector(".ip");
const arrow = document.querySelector(".arrow");
const ip = document.querySelector("#ip");
const locate = document.querySelector("#location");
const time = document.querySelector("#time");
const isp = document.querySelector("#isp");

var mymap = "";
arrow.addEventListener("click", function () {
  document.querySelector("#mapid").innerHTML = "";
  var ip__address = input.value;
  var url = `https://geo.ipify.org/api/v1?apiKey=at_aiLh4hOmS8e2qdY9ZpD6MheRrZRcH&ipAddress=${ip__address}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      map(data.location.lat, data.location.lng);
      fillData(data);
      console.log(data);
    });
});
document.addEventListener("keypress", function (e) {
  if (e.charCode == 13) {
    document.querySelector("#mapid").innerHTML = "";
    var ip__address = input.value;
    var url = `https://geo.ipify.org/api/v1?apiKey=at_aiLh4hOmS8e2qdY9ZpD6MheRrZRcH&ipAddress=${ip__address}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        map(data.location.lat, data.location.lng);
        fillData(data);
        console.log(data);
      });
  }
});

var icon = L.icon({
  iconUrl: "./images/icon-location.svg",

  iconSize: [45, 50], // size of the icon
  iconAnchor: [44, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
function map(lat, long) {
  if (mymap == "") {
    mymap = L.map("mapid").setView([lat, long], 13);
    L.tileLayer(
      "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=9ysXtOXI5yp1w15GD1u8",
      {
        attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`,
        maxZoom: 55,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
      }
    ).addTo(mymap);
    var marker = L.marker([lat, long], {
      icon: icon,
    }).addTo(mymap);
  } else {
    mymap.remove();
    mymap = L.map("mapid").setView([lat, long], 13);
    L.tileLayer(
      "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=9ysXtOXI5yp1w15GD1u8",
      {
        attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`,
        maxZoom: 55,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "your.mapbox.access.token",
      }
    ).addTo(mymap);
    var marker = L.marker([lat, long], {
      icon: icon,
    }).addTo(mymap);
  }
}
function fillData(data) {
  ip.innerText = data.ip;
  locate.innerText = `${data.location.region}, ${data.location.country} ${data.location.postalCode}`;
  time.innerText = data.location.timezone;
  isp.innerText = data.isp;
}
map(24.2679, 88.12615);
fillData();
