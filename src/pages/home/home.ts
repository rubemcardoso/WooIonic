import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import * as WC from "woocommerce-api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  page: number;
  moreProducts: any[];

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController) {

    this.page = 2;

    this.WooCommerce = WC({
      url: 'http://localhost/wordpress/',
      consumerKey: 'ck_0f7155bdb854741430eff802b40b56d136296d50',
      consumerSecret: 'cs_88f06652d642be294c90b2d2aaaa5cfd3ceddc27',
      wpAPI: true,
      version: 'wc/v2'
    });

    this.loadMoreProducts();

    this.WooCommerce.getAsync("products").then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body);
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    setInterval(() => {

      if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();
    }, 3000)
  }

  loadMoreProducts() {
    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = JSON.parse(data.body);
    }, (err) => {
      console.log(err)
    })
  }

}
