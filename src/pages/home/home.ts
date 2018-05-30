import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as WC from "woocommerce-api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];

  constructor(public navCtrl: NavController) {

    this.WooCommerce = WC({
      url: 'http://localhost/wordpress/',
      consumerKey: 'ck_0f7155bdb854741430eff802b40b56d136296d50',
      consumerSecret: 'cs_88f06652d642be294c90b2d2aaaa5cfd3ceddc27',
      wpAPI: true,
      version: 'wc/v2'
    });

    // this.WooCommerce.getAsync("products").then( (data) => {
    //   // console.log(JSON.parse(data.body));
    //   this.products = JSON.parse(data.body);
    //   console.log(this.products)
    // }, (err) => {
    //   console.log(err)
    // })

    this.WooCommerce.getAsync("products").then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body);
    }, (err) => {
      console.log(err)
    })

  }

}
