export enum AppRoute {
  Cart = '/cart',
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
  Products = 'Products',
  Cart = 'Cart'
}

export enum QueryParam {
  Start = '_start',
  End = '_end',
  Limit = '_limit',
  NameLike = 'name_like',
  Sort = '_sort',
  Order = '_order',
  PriceMin = 'price_gte',
  PriceMax = 'price_lte',
  Type = 'type',
  Category = 'category',
  Level = 'level'
}

export enum SortType {
  Price = 'price',
  Rating = 'rating'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export const FILTER_PARAM: string[] = [
  QueryParam.PriceMin,
  QueryParam.PriceMax,
  QueryParam.Category,
  QueryParam.Type,
  QueryParam.Level
];

export const DEFAULT_ID_PAGE = 1;

export const PRODUCTS_PER_PAGE = 9;

export const SLIDE_PER_SHOW = 3;

export const REVIEW_PER_SHOW = 3;

export const SEARCH_LIMIT = 10;

export const RATING_MAX = 5;

export const CHANGE_DELAY = 1000;

export const enum TabType {
  Characteristics = '#characteristics',
  Description = '#description',
}

export const CART_SINGLE_PRODUCT_MAX = 99;

export const CART_SINGLE_PRODUCT_MIN = 1;

export const VALID_COUPONS = [
  'camera-333',
  'camera-444',
  'camera-555'
];
