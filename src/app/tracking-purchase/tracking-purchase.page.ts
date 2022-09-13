import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

import { take } from 'rxjs/operators';

import { Request } from '../interfaces/request';
import { TrackingRequest } from '../interfaces/tracking-request';
import { Courier } from '../interfaces/courier';
import { Coord } from '../interfaces/utils';

import { RequestService } from '../services/request/request.service';
import { TrackingRequestService } from '../services/tracking-request/tracking-request.service';
import { CourierService } from '../services/courier/courier.service';
import { CityService } from '../services/city/city.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tracking-purchase',
  templateUrl: './tracking-purchase.page.html',
  styleUrls: ['./tracking-purchase.page.scss'],
})
export class TrackingPurchasePage implements OnInit {
  request: Request = null;
  courier: Courier;
  newMap: GoogleMap;
  markerDelivery: string;
  markerCourier: string;
  requestId: string;
  trackingRequest:TrackingRequest;

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;

  constructor(
    private route: ActivatedRoute,
    private nativeGeocoder: NativeGeocoder,
    private requestService: RequestService,
    private trackingRequestService: TrackingRequestService,
    private courierService: CourierService,
    private cityService: CityService) {

      const routeParams = this.route.snapshot.paramMap;
      this.requestId = routeParams.get('id');
      this.trackingRequestService.getByRequest(this.requestId).subscribe(data=>{
        this.trackingRequest = data[0];
      })
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.createMap();
    this.requestService.getOne(this.requestId).subscribe((request)=>{
      this.request = request;
      if(this.request.courier){
        this.courierService.getCourier(this.request.courier).subscribe(async(courier)=>{
          this.courier= courier;
          if(this.markerCourier){
            this.newMap.removeMarker(this.markerCourier);
          }
          this.markerCourier = await this.addMarker(this.courier.coords);
        })
      }
    })
  }

  createMap() {
    this.requestService.getOne(this.requestId).pipe(take(1)).subscribe(async(request)=>{
      // Obtenemos direccion del lugar de entrega
      const location = await this.cityService.getOneCity(request.city_delivered);
      const addressDelivery =  request.address_delivered+", "+location[0].municipio+", "+location[0].departamento;

      // Obtenemos coordenadas del lugar de entrega
      // let options: NativeGeocoderOptions = {
      //   useLocale: true,
      //   maxResults: 1
      // };
      // const coordsDelivery:NativeGeocoderResult[] = await this.nativeGeocoder.forwardGeocode(addressDelivery, options)

      // Creacion del mapa
      // await this.createMap(coordsDelivery[0]);
      this.newMap = await GoogleMap.create({
        id: 'my-map',
        element:this.mapRef.nativeElement,
        apiKey: environment.GoogleMapsApiKey,
        config: {
          center: {
            lat: 10,
            lng: 1,
          },
          zoom: 8,
        },
      });

      // Añadimos marcador del lugar de entrega
      // this.markerDelivery = await this.addMarker(coordsDelivery[0]);
      this.markerDelivery = await this.addMarker({latitude:10, longitude:2});
    })
  }

  async addMarker(coords:Coord){
    // Add a marker to the map
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: coords.latitude,
        lng: coords.longitude
      }
    });
    return markerId;
  }

}
