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
import { DepartmentService } from '../services/department/department.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tracking-request',
  templateUrl: './tracking-request.page.html',
  styleUrls: ['./tracking-request.page.scss'],
})
export class TrackingRequestPage implements OnInit {
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
   private cityService: CityService,
   private departmentService: DepartmentService) {

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
          this.markerCourier = await this.newMap.addMarker({
            coordinate: {
              lat: this.courier.coords.latitude,
              lng: this.courier.coords.longitude
            }
          });
        })
      }
    })
  }

  createMap() {
    this.requestService.getOne(this.requestId).pipe(take(1)).subscribe(async(request)=>{

      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 1
      };

      // Obtenemos direccion de entrega
      const addressDelivery = await this.getAddressComplete(request.city_delivered, request.address_delivered);
      const resultDelivery: NativeGeocoderResult[] = await this.nativeGeocoder.forwardGeocode(addressDelivery, options)

      // Creacion mapa
      this.newMap = await GoogleMap.create({
        id: 'my-map',
        element:this.mapRef.nativeElement,
        apiKey: environment.GoogleMapsApiKey,
        config: {
          center: {
            lat: Number(resultDelivery[0].latitude),
            lng: Number(resultDelivery[0].longitude)
          },
          zoom: 8,
        },
      });

      // Añadimos marcadores
      this.markerDelivery = await this.newMap.addMarker({
        coordinate: {
          lat: Number(resultDelivery[0].latitude),
          lng: Number(resultDelivery[0].longitude)
        }
      });

      if(this.request.type_request != 3){
        const addressReceive = await this.getAddressComplete(request.city_received, request.address_received);
        const resultReceive:NativeGeocoderResult[] = await this.nativeGeocoder.forwardGeocode(addressReceive, options)
        this.markerReceive = await this.newMap.addMarker({
          coordinate: {
            lat: Number(resultReceive[0].latitude),
            lng: Number(resultReceive[0].longitude)
          }
        });
      }

    })
  }

  async getAddressComplete(cityId:string, address:string){
    const city = await this.cityService.getOne(cityId);
    const department = await this.departmentService.getOne(city.department);
    return address+", "+city.name+", "+department.name;
  }

}
