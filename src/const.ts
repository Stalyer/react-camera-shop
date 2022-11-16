export enum AppRoute {
  Basket = '/basket',
  Product = '/product',
  Catalog = '/catalog',
  Root = '/'
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders'
}

export enum NameSpace {
  Product = 'Product',
  Products = 'Products'
}

export enum QueryParam {
  Start = '_start',
  End = '_end',
  Limit = '_limit',
  NameLike = 'name_like',
  Sort = '_sort',
  Order = '_order'
}

export enum SortType {
  Price = 'price',
  Rating = 'rating'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export const DEFAULT_ID_PAGE = 1;

export const PRODUCTS_PER_PAGE = 9;

export const SLIDE_PER_SHOW = 3;

export const REVIEW_PER_SHOW = 3;

export const SEARCH_LIMIT = 10;

export const RATING_MAX = 5;

export const enum TabType {
  Characteristics = '#characteristics',
  Description = '#description',
}
