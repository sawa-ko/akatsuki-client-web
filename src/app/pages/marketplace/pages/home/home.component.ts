import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../../../../services/marketplace/marketplace.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeMarketComponent implements OnInit {
  public productsMarketAccounts = [];
  public productsMarketMethods = [];
  public productsMarketBins = [];
  public productsMarketGuides = [];
  public productsMarketSql = [];
  public productsMarketOther = [];

  constructor(private readonly marketplaceService: MarketplaceService) {}

  ngOnInit(): void {
    this.marketplaceService.getProducts(1, 1).subscribe({
      next: (response: Array<any>) => {
        response.forEach(element => {
          this.productsMarketAccounts.push(element);
        });
      },
    });

    this.marketplaceService.getProducts(1, 2).subscribe({
      next: (response: Array<any>) => {
        response.forEach(element => {
          this.productsMarketMethods.push(element);
        });
      },
    });

    this.marketplaceService.getProducts(1, 3).subscribe({
      next: (response: Array<any>) => {
        response.forEach(element => {
          this.productsMarketBins.push(element);
        });
      },
    });

    this.marketplaceService.getProducts(1, 4).subscribe({
      next: (response: Array<any>) => {
        response.forEach(element => {
          this.productsMarketGuides.push(element);
        });
      },
    });

    this.marketplaceService.getProducts(1, 5).subscribe({
      next: (response: Array<any>) => {
        response.forEach(element => {
          this.productsMarketSql.push(element);
        });
      },
    });

    this.marketplaceService.getProducts(1, 6).subscribe({
      next: (response: Array<any>) => {
        response.forEach(element => {
          this.productsMarketOther.push(element);
        });
      },
    });
  }
}
