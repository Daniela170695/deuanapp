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
  selector: 'app-tracking-procedures',
  templateUrl: './tracking-procedures.page.html',
  styleUrls: ['./tracking-procedures.page.scss'],
})
export class TrackingProceduresPage implements OnInit {

  request: Request;
  courier: Courier;
  newMap: GoogleMap;
  markerReceive: string;
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
          this.courier = courier;
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
      // Obtenemos direccion del lugar de recibida y entrega
      const addressReceive = await this.getAddressComplete(request.city_received, request.address_received);
      const addressDelivery = await this.getAddressComplete(request.city_delivered, request.address_delivered);

      // Obtenemos coordenadas del lugar de recibida y entrega
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 1
      };
      const coordsReceive:NativeGeocoderResult[] = await this.nativeGeocoder.forwardGeocode(addressReceive, options)
      const coordsDelivery:NativeGeocoderResult[] = await this.nativeGeocoder.forwardGeocode(addressDelivery, options)
      console.log(coordsDelivery[0]);
      // Creacion del mapa
      // await this.createMap(coordsReceive[0]);
      // this.newMap = await GoogleMap.create({
      //   id: 'my-map',
      //   element:this.mapRef.nativeElement,
      //   apiKey: environment.GoogleMapsApiKey,
      //   config: {
      //     center: {
      //       lat: coordsReceive[0].latitude,
      //       lng: coordsReceive[0].longitude,
      //     },
      //     zoom: 8,
      //   },
      // });
      // Añadimos marcadores
      // this.markerReceive = await this.addMarker(coordsReceive[0]);
      // this.markerDelivery = await this.addMarker(coordsDelivery[0]);

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

  async getAddressComplete(city:string, address:string){
    const location = await this.cityService.getOneCity(city);
    return address+", "+location[0].municipio+", "+location[0].departamento;
  }

}
