import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//MapBox
declare var mapboxgl:any

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {

  lat:number;
  lng:number;

  constructor( private router:ActivatedRoute) { }

  ngAfterViewInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXNyYWVsMTk0NyIsImEiOiJjbDN3MGJiNG0ybG5oM2ZwbmY2ZTUxenNtIn0.Rr00uzgJjsPvf9XUN00EjA';
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.lng,this.lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });
    
    // The 'building' layer in the Mapbox Streets
    map.on('load', () => {
      map.resize();
      
      //add marker in the map
      new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(map);

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;

        // vector tileset contains building height data
      map.addLayer(
        {
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
        'fill-extrusion-color': '#aaa',
         
        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height']
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
        }
      },
      labelLayerId
      );
   });
  }

  ngOnInit() {
    let geo:any = this.router.snapshot.paramMap.get('geo');
    geo = geo.substring(4);
    geo = geo.split(',')
    this.lat = Number(geo[0]);
    this.lng = Number(geo[1]);
    console.log(this.lat,this.lng);
    

  }

}
