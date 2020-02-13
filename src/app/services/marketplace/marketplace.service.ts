import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, delay } from 'rxjs/operators';
import { VerificationProduct } from '../../utils/interfaces/marketplace/verification.product';
import { NewReactionInterface } from '../../utils/interfaces/marketplace/reaction.new.interface';
import { NewCommentInterface } from '../../utils/interfaces/marketplace/comment.new.interface';
import { NewProductInterface } from '../../utils/interfaces/marketplace/product.new.interface';

@Injectable({
  providedIn: 'root',
})
export class MarketplaceService {
  constructor(private readonly httpClient: HttpClient) {}

  public getProducts(order: number, market: number) {
    return this.httpClient
      .get(`${environment.api}/market/get/products/${order}/${market}`)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
      );
  }

  public getProduct(productId: string) {
    return this.httpClient
      .get(`${environment.api}/market/get/product/${productId}`)
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
      );
  }

  public newProduct(productNew: NewProductInterface) {
    return this.httpClient
      .put(`${environment.api}/market/add/product`, productNew)
      .pipe(delay(10000));
  }

  public verifyReactions(verificationMarket: VerificationProduct) {
    return this.httpClient.post(
      `${environment.api}/market/verify/reaction`,
      verificationMarket,
    );
  }

  public verifyPurchase(verificationMarket: VerificationProduct) {
    return this.httpClient.post(
      `${environment.api}/market/verify/purchase`,
      verificationMarket,
    );
  }

  public verifyComment(verificationMarket: VerificationProduct) {
    return this.httpClient.post(
      `${environment.api}/market/verify/comment`,
      verificationMarket,
    );
  }

  public newComment(commentNewMarket: NewCommentInterface) {
    return this.httpClient.put(
      `${environment.api}/market/add/comment`,
      commentNewMarket,
    );
  }
  public newReaction(reactionNewMarket: NewReactionInterface) {
    return this.httpClient.put(
      `${environment.api}/market/add/reaction`,
      reactionNewMarket,
    );
  }
}
