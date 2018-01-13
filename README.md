# tram-traffic
Authors: Paweł Wamej, Adam Niepokój, Ewa Brzeziecka

![](https://github.com/pwamej/tram-traffic/blob/master/tram-traffic.gif)

## Description
This is simulation of Krakow tram network traffic utilizing data obtained from ZIKiT Krakow. In order to work, application requires CORS to be enabled. After selecting day and daytime, dots representing trams leave terminuses and follow their route. Number of passengers in tram is visualized via color of dot (blue -> green -> yellow -> red).

## Used technologies and data sources
- [Passenger traffic data](http://kmkrakow.pl/aktualnosci/wiadomosci-komunikacyjne/204-wyniki-pomiarow-w-pojazdach-komunikacji-miejskiej-w-krakowie.html) from ZIKiT
- Tram timetable obtained from MPK Krakow
- Tram routes obtained from [OpenStreetMap](https://wiki.openstreetmap.org/wiki/WikiProject_Poland/Krak%C3%B3w)
- [OpenLayers](https://openlayers.org/) library for map visualization
