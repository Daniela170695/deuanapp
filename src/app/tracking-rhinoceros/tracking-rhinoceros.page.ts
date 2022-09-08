import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

import { take } from 'rxjs/operators';

import { Order } from '../interfaces/order';
import { OrderTracking } from '../interfaces/order-tracking';
import { Courier } from '../interfaces/courier';
import { Coord } from '../interfaces/utils';

import { OrderService } from '../services/order/order.service';
import { OrderTrackingService } from '../services/order-tracking/order-tracking.service';
import { CourierService } from '../services/courier/courier.service';
import { CityService } from '../services/city/city.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tracking-rhinoceros',
  templateUrl: './tracking-rhinoceros.page.html',
  styleUrls: ['./tracking-rhinoceros.page.scss'],
})
export class TrackingRhinocerosPage implements OnInit {

  order: Order;
  courier: Courier;
  newMap: GoogleMap;
  markerReceive: string;
  markerDelivery: string;
  markerCourier: string;
  orderId: string;
  orderTracking:OrderTracking;

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;

  constructor(
    private route: ActivatedRoute,
    private nativeGeocoder: NativeGeocoder,
    private orderService: OrderService,
    private orderTrackingService: OrderTrackingService,
    private courierService: CourierService,
    private cityService: CityService
  ) {

    const routeParams = this.route.snapshot.paramMap;
    this.orderId = routeParams.get('id');
    this.orderTrackingService.getByOrder(this.orderId).subscribe(data=>{
      this.orderTracking = data[0];
    })

  }

  ngOnInit() {

  }

  ionViewDidEnter() {

    this.createMap();

    this.orderService.getOneOrder(this.orderId).subscribe((data)=>{
        this.courierService.getCourier(this.order.courier).subscribe(async(data)=>{
          if(data){
            this.courier = data;
            if(this.markerCourier){
              this.newMap.removeMarker(this.markerCourier);
            }
            this.markerCourier = await this.addMarker(this.courier.coords);
          }
        })
    })
  }

  async createMap() {

    this.orderService.getOneOrder(this.orderId).pipe(take(1)).subscribe(async(order)=>{
      // Obtenemos direccion del lugar de recibida y entrega
      const addressReceive = await this.getAddressComplete(order.city_received, order.address_received);
      const addressDelivery = await this.getAddressComplete(order.city_delivered, order.address_delivered);

      // Obtenemos coordenadas del lugar de recibida y entrega
      // let options: NativeGeocoderOptions = {
      //   useLocale: true,
      //   maxResults: 1
      // };
      // const coordsReceive:NativeGeocoderResult[] = await this.nativeGeocoder.forwardGeocode(addressReceive, options)
      // const coordsDelivery:NativeGeocoderResult[] = await this.nativeGeocoder.forwardGeocode(addressDelivery, options)

      // Creacion del mapa
      // await this.createMap(coordsReceive[0]);
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
      // Añadimos marcadores
      // this.markerReceive = await this.addMarker(coordsReceive[0]);
      // this.markerDelivery = await this.addMarker(coordsDelivery[0]);
      this.markerReceive = await this.addMarker({latitude:10, longitude:1});
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

  async getAddressComplete(city:string, address:string){
    const location = await this.cityService.getOneCity(city);
    return address+", "+location[0].municipio+", "+location[0].departamento;
  }

}
