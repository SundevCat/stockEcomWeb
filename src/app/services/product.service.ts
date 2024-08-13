import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  public getAllProducts() {
    return this.http.get<product>(`${environment.apiUrl}Product/GetAllProducts`)
  }
  public getProductBySku(sku: string) {
    return this.http.get<product>(`${environment.apiUrl}Product/GetProductBySku${sku}`)
  }
  public AddProduct(product: product) {
    return this.http.post<product>(`${environment.apiUrl}Product/AddProduct`, product)
  }
  public UpdateProduct(sku: string, product: product) {
    return this.http.put<product>(`${environment.apiUrl}Product/UpdateProduct/${sku}`, product)
  }
  public DeleteProduct(sku: string) {
    return this.http.delete<product>(`${environment.apiUrl}Product/DeleteProduct/${sku}`)
  }
  public AddQuantitySingleProduct(product: product, updateby: string) {
    return this.http.patch<product>(`${environment.apiUrl}Product/AddQuantitySingleProduct/${updateby}`, product)
  }
  public CutQuantitySingleProduct(product: product, updateby: string) {
    return this.http.patch<product>(`${environment.apiUrl}Product/CutQuantitySingleProduct/${updateby}`, product)
  }
  public AddQuantityMultiProduct(product: product, updateby: string) {
    return this.http.patch<product>(`${environment.apiUrl}Product/AddQuantityMultiProduct/${updateby}`, product)
  }
  public CutQuantityMultiProduct(product: product, updateby: string) {
    return this.http.patch<product>(`${environment.apiUrl}Product/CutQuantityMultiProduct/${updateby}`, product)
  }
}
