import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }
  
  saveProduct(productDetails:any):Observable<any>{
    return this.httpClient.post("http://localhost:8087/api/v1/products/save",productDetails);
  }
  allProducts(){
    return this.httpClient.get("http://localhost:8087/api/v1/products/all-products",);
  }
  deleteProduct(id:any){
    return this.httpClient.delete("http://localhost:8087/api/v1/products/delete/"+id);
  }
  getProductData(id:any){
    return this.httpClient.get("http://localhost:8087/api/v1/products/"+id)
  }
  updateProduct(id:any,formData:any){
    return this.httpClient.put("http://localhost:8087/api/v1/products/update/"+id,formData);
  }
}
