export interface Discount {
    readonly percentage: number;

    readonly exp: Date;
}

export interface NewProductInterface {
    readonly name: string;

    readonly description: string;
  
    readonly content: string;
  
    readonly price: number;
  
    readonly available: boolean;
  
    readonly status: boolean;
  
    readonly market: number;
  
    readonly ip: string;
  
    readonly device: string | number;
  
    readonly discount: Discount;
  
    readonly author: string;
}