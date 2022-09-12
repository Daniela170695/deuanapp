import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { City } from '../interfaces/city';
import { Request } from '../interfaces/request';
import { TrackingRequest } from '../interfaces/tracking-request';
import { CategoryProduct } from '../interfaces/category-product';
import { Product } from '../interfaces/product';
import { Purchase } from '../interfaces/purchase';

import { CityService } from '../services/city/city.service';
import { RequestService } from '../services/request/request.service';
import { TrackingRequestService } from '../services/tracking-request/tracking-request.service';
import { TypeRequestService } from '../services/type-request/type-request.service';
import { AuthService } from '../services/auth/auth.service';
import { CategoryProductService } from '../services/category-product/category-product.service';
import { ProductService } from '../services/product/product.service';
import { PurchaseService } from '../services/purchase/purchase.service';

export interface ProductPurchase{
  id:string,
  name:string,
  quantity:number
}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {
  requestForm: FormGroup;
  cities: City[];
  categoriesProducts: CategoryProduct[];
  products: Product[];
  productsPurchase: ProductPurchase[] = [];
  nameProduct: string;
  displayError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cityService: CityService,
    private requestService: RequestService,
    private trackingRequestService: TrackingRequestService,
    private typeRequestService: TypeRequestService,
    private authService: AuthService,
    private categoryProductService: CategoryProductService,
    private productService: ProductService,
    private purchaseService: PurchaseService) {
    this.cityService.getAllCities().then(data=>{
      this.cities = data;
    })
    this.categoryProductService.getAll().then(data=>{
      this.categoriesProducts = data;
    })

  }

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      cityDelivered: ['', [Validators.required]],
      addressDelivered: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9#\-_ ]+$')]],
      cellphoneDelivered: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description:['', [Validators.required]],
      purchase: this.formBuilder.group({
        categoryProduct: [''],
        product:[''],
        quantity: [1, [Validators.pattern('^[1-9]$')]]
      })
    });
  }

  validateProducts(){
    // console.log(this.productsPurchase.length);
    return this.productsPurchase.length === 0;
  }

  get cityDelivered(){
    return this.requestForm.get('cityDelivered');
  }

  get addressDelivered(){
    return this.requestForm.get('addressDelivered');
  }

  get cellphoneDelivered(){
    return this.requestForm.get('cellphoneDelivered');
  }

  get description(){
    return this.requestForm.get('description');
  }

  get categoryProduct(){
    return this.requestForm.get('purchase').get('categoryProduct');
  }

  get product(){
    return this.requestForm.get('purchase').get('product');
  }

  get quantity(){
    return this.requestForm.get('purchase').get('quantity');
  }

  handleChangeCategory(e) {
    this.categoryProduct.setValue(e.detail.value);
    this.productService.getOneByCategory(this.categoryProduct.value).then(data=>{
      this.products = data;
    })
  }

  handleChangeProduct(e) {
    this.product.setValue(e.detail.value.id);
    this.nameProduct = e.detail.value.name;
  }

  addProduct(){
    const product = this.product.value;
    const quantity = this.quantity.value;
    if(product && quantity){
      const productPurchase:ProductPurchase = {
        id: product,
        name: this.nameProduct,
        quantity: quantity
      }
      this.productsPurchase.push(productPurchase);
    }
  }

  async register(){
    if(this.productsPurchase.length===0){
      this.displayError = true;
    }
    else{
      if(this.requestForm.valid){
        try{
          const idTypeRequest = "jgavhKqRjwRkPcCJzAAm";
          const typeRequest = await this.typeRequestService.getTypeRequest(idTypeRequest);
          const currentUser = await this.authService.getCurrentUser();
          const now = new Date();
          const request:Request = {
            uid: currentUser.uid,
            courier: null,
            type_request: idTypeRequest,
            price: typeRequest.price,
            city_delivered: this.cityDelivered.value,
            address_delivered: this.addressDelivered.value,
            cellphone_delivered: this.cellphoneDelivered.value,
            description: this.description.value,
            created_datetime: now
          };
          const doc = await this.requestService.add(request);
          const requestId = doc.id;
          const trackingRequest:TrackingRequest = {
            request: requestId,
            cancelled: false,
            accepted: false,
            received: false,
            bought: false,
            delivered: false,
            cancelled_datetime: null,
            accepted_datetime: null,
            received_datetime: null,
            bought_datetime: null,
            delivered_datetime: null
          };
          this.trackingRequestService.add(trackingRequest);
          this.productsPurchase.forEach(product => {
            const purchase:Purchase = {
              request: requestId,
              product: product.id,
              quantity: product.quantity
            };
            this.purchaseService.add(purchase);
          });
          console.log("OK (:");
          // this.router.navigate(['tabs/principal/rhinoceros/tracking-rhinoceros', requestId])
        }
        catch(e){
          console.log(e);
        }
      }
    }

  }

  deleteProduct(i){
    this.productsPurchase.splice(i, 1);
  }

}
