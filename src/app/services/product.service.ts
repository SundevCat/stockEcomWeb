import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService  {

  constructor(private http: HttpClient) { }
  public getAllProducts() {
    return this.http.get<product>(`${environment.apiUrl}Product/GetAllProducts`)
  }
  public GetAllProductsActives() {
    return this.http.get<product>(`${environment.apiUrl}Product/GetAllProductsActives`)
  }
  public getProductBySku(sku: string) {
    return this.http.get<product>(`${environment.apiUrl}Product/GetProductBySku/${sku}`)
  }
  public AddProduct(product: product) {
    return this.http.post<product>(`${environment.apiUrl}Product/AddProduct`, product)
  }
  public AddMultiProducts(product: product[]) {
    return this.http.post<product>(`${environment.apiUrl}Product/AddMultiProduct`, product)
  }
  public ValidateAddMultiProducts(product: product[]) {
    return this.http.post<product>(`${environment.apiUrl}Product/ValidateAddMultiProduct`, product)
  }
  public UpdateProduct(product: product, sku: string) {
    return this.http.put<product>(`${environment.apiUrl}Product/UpdateProduct/${sku}`, product)
  }
  public DeleteProduct(sku: string) {
    return this.http.delete<product>(`${environment.apiUrl}Product/DeleteProduct/${sku}`)
  }
  public AddQuantitySingleProduct(product: product, updateby: string, note: string) {
    return this.http.patch<product>(`${environment.apiUrl}Product/AddQuantitySingleProduct/${updateby}/${note}`, product)
  }
  public CutQuantitySingleProduct(product: product, updateby: string, note: string) {
    return this.http.patch<product>(`${environment.apiUrl}Product/CutQuantitySingleProduct/${updateby}/${note}`, product)
  }
  public AddQuantityMultiProduct(product: any[], updateby: string, note: string) {
    return this.http.patch<product>(`${environment.apiUrl}Product/AddQuantityMultiProduct/${updateby}/${note}`, product)
  }
  public CutQuantityMultiProduct(product: any[], updateby: string, note: string) {
    return this.http.patch<product>(`${environment.apiUrl}Product/CutQuantityMultiProduct/${updateby}/${note}`, product)
  }
}
