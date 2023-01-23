import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/core/model/product';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideIndex = 0;
  products: Product[];

  constructor(private productService: ProductService, private auth: AuthService) { 
  }

  ngOnInit(): void {
    this.slideShow();

    this.productService.findRecommendedProducts().subscribe(data => { //validation
      this.products = data;
    });

    this.auth.getUserDetails();
  }

  slideShow() {
    var i;
    var x = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    this.slideIndex++;
    if (this.slideIndex > x.length) {this.slideIndex = 1}
    x[this.slideIndex-1].style.display = "block";
    setTimeout(()=>this.slideShow(), 3500);
  }

}
