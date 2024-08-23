# Mapy historyczne (WIP)

**Mapy historyczne** to aplikacja powstała na potrzeby pracy magisterskiej „Aplikacja internetowa do wyświetlania map historycznych przy pomocy technologii GIS”, zrealizowanej na Akademii Górniczo-Hutniczej w Krakowie pod opieką dr inż. Michała Lupy. Oryginalna wersja aplikacji została stworzona z użyciem JavaScript i jQuery, OpenLayers, oraz ArcGIS Server (udostępnienie extentów i rastrów przez WFS i WMS).

Obecnie aplikacja jest przepisywana (WIP) w ramach nauki, z wykorzystaniem biblioteki React.

Głównym celem aplikacji jest wyszukiwanie i wyświetlanie map historycznych przy pomocy technologii GIS. System umożliwia prezentację skanów map z georeferencją oraz szkiców, które nie są zorientowane w układzie współrzędnych.

## Technologie

- **JavaScript**
- **React**
- **OpenLayers**
- **MobX**
- **Semantic UI**

Dane testowe do odświeżonej aplikacji są udostępniane lokalnie za pomocą usług WMS i WFS w GeoServer, ze względu na brak licencji do ArcGIS Server.

## Udostępnianie szkiców

Szkice to rastry niezorientowane w układzie współrzędnych. Posiadają jednak metadane z wektorowymi extentami obrazującymi zasięgi na mapie. Te extenty z metadanymi zostały publikowane jako WFS. Aplikacja umożliwia wyszukiwanie szkiców po atrybutach (np. data, tytuł szkicu), wykonuje zapytanie do serwera WFS i wyświetla zasięgi szkiców na mapie.

![Sketch shape](/../../../natamora/blob/main/images/hist-maps/szkic.png)

Po kliknięciu na wybrany kształt możliwy jest podgląd szkicu i pobranie oryginału.

![Sketch view](/../../../natamora/blob/main/images/hist-maps/szkic-tif.png)

## Udostępnianie plików z georeferencją

Mapy z georeferencją są udostępniane dwuetapowo. Extenty map wraz z metadanymi są dostępne przez WFS. Użytkownik może wyszukiwać interesujące go arkusze map poprzez formularz, a aplikacja wykonuje zapytanie do serwera WFS i wyświetla wektorowe extenty na mapie. Na dole okna pojawia się panel z wynikami wyszukiwania, z którego użytkownik może wybrać interesujące go arkusze, załadować je na mapę (przy pomocy zapytania do serwera WMS)  lub pobrać oryginały.

![Raster Search](/../../../natamora/blob/main/images/hist-maps/raster_search.png)

## To do

- Dodanie geokodera w celu umożliwienia wyszukiwania na podstawie adresów
- Wprowadzenie funkcji wyszukiwania poprzez zaznaczenie obszaru na mapie
- Dodanie slidera do regulacji przejrzystości rastrów na podglądzie

##

All rights reserved.  
Copyright &copy; Katarzyna Morawska 2024
