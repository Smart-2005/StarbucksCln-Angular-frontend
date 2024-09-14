import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  isLoggedIn: boolean = false;
  public userRole: string | null = null;
  products:any[]=[]
  productData:any[]=[]
  constructor(private productService:ProductService,private router:Router,private authService:AuthService,private toastr:ToastrService){}
  ngOnInit(): void {

    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.authService.roles$.subscribe((role) => {
      this.userRole = role; // Update the component's role
    });
    // Check initial status
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.authService.checkAuthStatus();
    }

    //===============================

      this.productService.allProducts().subscribe((response:any)=>{
        this.products = response.data || response ;
        console.log(response);
      })
  }

  deleteProduct(id:any){
    if(confirm("Are you sure?")){
      this.productService.deleteProduct(id).subscribe((response)=>{
        this.toastr.info("Your Product Deleted Successfully!","Products",{timeOut:1500})
        console.log(response);
      })
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    }else{
      alert("Try Again Later!")
    }

  }


}
