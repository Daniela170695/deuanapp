import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

import { Order } from '../interfaces/order';
import { Courier } from '../interfaces/courier';
import { Coord } from '../interfaces/utils';

import { OrderService } from '../services/order/order.service';
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

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;

  constructor(
    private route: ActivatedRoute,
    private nativeGeocoder: NativeGeocoder,
    private orderService: OrderService,
    private courierService: CourierService,
    private cityService: CityService
  ) {

    const routeParams = this.route.snapshot.paramMap;
    this.orderId = routeParams.get('id');
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.orderService.getOneOrder(this.orderId).subscribe(async(data)=>{
      this.order = data;

      // Obtenemos direccion del lugar de recibida y entrega
      const addressReceive = await this.getAddressComplete(this.order.city_received, this.order.address_received);
      const addressDelivery = await this.getAddressComplete(this.order.city_delivered, this.order.address_delivered);

      // Obtenemos coordenadas del lugar de recibida y entrega
      // let options: NativeGeocoderOptions = {
      //   useLocale: true,
      //   maxResults: 1
      // };
      // const coordsReceive:NativeGeocoderResult[] = await this.nativeGeocoder.forwardGeocode(addressReceive, options)
      // const coordsDelivery:NativeGeocoderResult[] = await this.nativeGeocoder.forwardGeocode(addressDelivery, options)

      // Creacion del mapa
      // await this.createMap(coordsReceive[0]);
      if(this.order.accepted == false){
        await this.createMap({latitude:10, longitude:1});

        // Añadimos marcadores
        // this.markerReceive = await this.addMarker(coordsReceive[0]);
        // this.markerDelivery = await this.addMarker(coordsDelivery[0]);
        this.markerReceive = await this.addMarker({latitude:10, longitude:1});
        this.markerDelivery = await this.addMarker({latitude:10, longitude:2});  
      }

      if(this.order.accepted == true){
        this.courierService.getCourier(this.order.courier).subscribe(async(data)=>{
          if(data){
            this.courier = data;
            if(this.markerCourier){
              await this.removeMarker(this.markerCourier);
            }
            this.markerCourier = await this.addMarker(this.courier.coords);
          }
        })
      }
    })
  }

  async createMap(coords:Coord) {
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      element:this.mapRef.nativeElement,
      apiKey: environment.GoogleMapsApiKey,
      config: {
        center: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
        zoom: 8,
      },
    });
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

  async removeMarker(marker:string){
    await this.newMap.removeMarker(marker);
  }

  async getAddressComplete(city:string, address:string){
    const location = await this.cityService.getOneCity(city);
    return address+", "+location[0].municipio+", "+location[0].departamento;
  }

}
