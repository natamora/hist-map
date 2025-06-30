# Historical Maps

**Historical Maps** is an application developed for the master's thesis *"A web application to display historical maps using GIS "*, completed at AGH University of Science and Technology in Kraków under the supervision of Dr Eng. Michał Lupa. The original version of the application was built using JavaScript and jQuery, OpenLayers, and ArcGIS Server (providing extents and rasters via WFS and WMS).

As part of further learning, I started rewriting the application in React.

The main goal of the application is to search and display historical maps using GIS technologies. The system enables the presentation of scanned georeferenced maps as well as sketches that are not aligned to a coordinate system.

## Technologies

- **JavaScript**
- **React**
- **OpenLayers**
- **MobX**
- **Semantic UI**

Test data for the updated application is served locally using WMS and WFS services in GeoServer, due to lack of an ArcGIS Server license.

## Sketch sharing

Sketches are rasters not aligned to a coordinate system. However, they contain metadata with vector extents indicating their coverage area on the map. These extents with metadata were published as WFS. The application allows searching for sketches by attributes (e.g. date, sketch title), performs a WFS query, and displays the sketch extents on the map.

![Sketch shape](/../../../natamora/blob/main/images/hist-maps/szkic.png)

By clicking on the selected shape, a preview of the sketch and the option to download the original file are available.

![Sketch view](/../../../natamora/blob/main/images/hist-maps/szkic-tif.png)

## Sharing georeferenced files

Georeferenced maps are served in two steps. Map extents with metadata are available via WFS. The user can search for specific sheets using a form, and the application performs a WFS query and displays the vector extents on the map. A result panel appears at the bottom of the window, allowing users to select desired sheets, load them onto the map (via a WMS request), or download the originals.

![Raster Search](/../../../natamora/blob/main/images/hist-maps/raster_search.png)

## To do

- Add a geocoder to enable address-based search
- Introduce search functionality by drawing an area on the map
- Add a slider to adjust raster transparency in the preview

##

All rights reserved.  
Copyright &copy; Katarzyna Morawska 2024
