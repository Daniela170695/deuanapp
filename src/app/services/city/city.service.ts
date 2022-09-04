import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../../interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private api = "https://www.datos.gov.co/resource/xdk5-pm3f.json";

  constructor(private httpClient: HttpClient) { }

  getAllCities(){
    const path = `${this.api}`;
    return this.httpClient.get<City[]>(path).toPromise();
  }

  getOneCity(cod:string){
    const path = `${this.api}?c_digo_dane_del_municipio=${cod}`;
    return this.httpClient.get<City>(path).toPromise();
  }
}
