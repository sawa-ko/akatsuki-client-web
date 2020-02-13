import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {
  public bestSellersMarket = [];

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userService.getBestSellers().subscribe({
      next: (response: Array<any>) => {
        response.forEach(element => {
          this.bestSellersMarket.push(element);
        });
      },
    });
  }
}
