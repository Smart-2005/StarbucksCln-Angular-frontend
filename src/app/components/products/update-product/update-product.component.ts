
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {
  addProductForm: any;

  constructor (
    private productService:ProductService,
    private route:ActivatedRoute,
    private router:Router,
    private http:HttpClient,
    private toastr:ToastrService
  ){}

  productId:any
  productData:any[]=[]
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null | undefined;

  updateProductForm:any = new FormGroup({
  productImage: new FormControl('',Validators.required),
  productName : new FormControl('',Validators.required),
  productDescription : new FormControl('',[Validators.required,Validators.maxLength(65)]),
  productPrice : new FormControl('',Validators.required),
  productQuantity : new FormControl('',Validators.required)
})


ngOnInit(): void {
  this.route.paramMap.subscribe((params)=>{
    this.productId = params.get('id');
    this.loadProduct(this.productId)
  })

}

loadProduct(id: any) {
  this.productService.getProductData(id).subscribe((product:any) => {

    this.updateProductForm.patchValue({
      productName:product.data.productName,
      productDescription:product.data.productDescription,
      productPrice:product.data.productPrice,
      productQuantity:product.data.productQuantity,

    })
    console.log(product);
  });
}

selectFile(event: any) {
  const file = event.target.files[0]; // Grab the first file from the event
  if (file) {
    this.selectedFile = file;
  }
}

updateProduct(){

  if (!this.selectedFile) {
    this.toastr.error("Select Product Image!","Product Management",{timeOut:2000})
    console.error('No file selected'); // Ensure file is selected
    return;
  }
  const formData = new FormData();
    formData.append('productImage', this.selectedFile);

    // Adding other form controls with checks for undefined/null values
    const productName = this.updateProductForm.get('productName')?.value;
    const productDescription = this.updateProductForm.get('productDescription')?.value;
    const productPrice = this.updateProductForm.get('productPrice')?.value;
    const productQuantity = this.updateProductForm.get('productQuantity')?.value;

    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('productPrice', productPrice.toString());
    formData.append('productQuantity', productQuantity.toString());


    this.productService.updateProduct(this.productId,formData).subscribe((response)=>{
      this.toastr.success("Product Updated Successfully!","Product Management",{timeOut:2000})
      console.log("Done");
    })
    setTimeout(() => {
      this.router.navigate(['/home/products'])
    }, 2000);

}

}
