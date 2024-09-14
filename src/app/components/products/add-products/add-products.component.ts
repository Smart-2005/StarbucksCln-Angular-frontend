import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {

  // Ensure proper initialization of the file
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null | undefined;

  constructor(private productService: ProductService, private router: Router,private toastr:ToastrService) {}

  // Define the form with proper controls and validators
  addProductForm = new FormGroup({
    productImage: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    productDescription: new FormControl('', [Validators.required, Validators.maxLength(65)]),
    productPrice: new FormControl('', Validators.required),
    productQuantity: new FormControl('', Validators.required),
  });

  // Handle file selection and set the selected file
  selectFile(event: any) {
    const file = event.target.files[0]; // Grab the first file from the event
    if (file) {
      this.selectedFile = file;
    }
  }

  // Add product with FormData handling and error checks
  addProduct() {
    if (!this.selectedFile) {
      console.error('No file selected'); // Ensure file is selected
      return;
    }

    const formData = new FormData();
    formData.append('productImage', this.selectedFile);

    // Adding other form controls with checks for undefined/null values
    const productName = this.addProductForm.get('productName')?.value;
    const productDescription = this.addProductForm.get('productDescription')?.value;
    const productPrice = this.addProductForm.get('productPrice')?.value;
    const productQuantity = this.addProductForm.get('productQuantity')?.value;

    // Ensure none of these fields are undefined or null
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productQuantity
    ) {
      this.toastr.error("Input Your Product Details!","Product Management",{timeOut:2000})
      console.error('One or more required fields are missing');
      return; // Exit if any required field is missing
    }

    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('productPrice', productPrice.toString());
    formData.append('productQuantity', productQuantity.toString());

    // Call the service to save the product
    this.productService.saveProduct(formData).subscribe(
      (response) => {
        console.log('Product saved:', response);
        this.toastr.success("Product Added Successfully","Product Management",{timeOut:2000})
        setTimeout(() => {
          this.router.navigate(['/home/products']); // Navigate after success
        }, 2000);
      },
      (error) => {
        this.toastr.error("Something Went Wrong!","Product Management",{timeOut:2000})
        console.error('Error saving product:', error); // Log errors
      }
    );
  }

  ngOnInit() {
    // Initialize any necessary data
  }
}
