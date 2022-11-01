import {internet, datatype, lorem, image, date} from 'faker';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {NameSpace} from '../const';
import {Product} from '../types/product';
import {PromoProduct} from '../types/promo-product';
import {Review} from '../types/review';

const store = configureMockStore();

export const makeFakeStore = store({
  [NameSpace.Products]: {
    products: [],
    isProductsLoaded: false,
    productsTotalCount: 0,
    promo: null,
  },
  [NameSpace.Product]: {
    product: null,
    isProductLoaded: false,
    similar: [],
    reviews: [],
    isFormReviewSubmitted: false
  }
});

export const makeFakeProducts = (): Product[] => ([{
  id: datatype.number(100),
  name: lorem.word(7),
  vendorCode: lorem.word(4),
  type: lorem.word(5),
  category: lorem.word(5),
  description: lorem.words(15),
  level: lorem.word(5),
  rating: datatype.number(5),
  price: datatype.number(1000),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number(10),
}] as Product[]);

export const makeFakeProduct = (): Product => ({
  id: datatype.number(100),
  name: lorem.word(7),
  vendorCode: lorem.word(4),
  type: lorem.word(5),
  category: lorem.word(5),
  description: lorem.words(15),
  level: lorem.word(5),
  rating: datatype.number(5),
  price: datatype.number(1000),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number(10),
} as Product);

export const makeFakePromoProduct = (): PromoProduct => ({
  id: datatype.number(100),
  name: lorem.word(7),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
} as PromoProduct);

export const makeFakeReview = (): Review => ({
  id: datatype.number(100),
  userName: internet.userName(),
  advantage: lorem.words(5),
  disadvantage: lorem.words(5),
  review: lorem.words(20),
  rating: datatype.number(5),
  createAt: date.recent(),
  cameraId: datatype.number(100)
} as Review);

export const makeFakeReviews = (): Review[] => ([{
  id: datatype.number(100),
  userName: internet.userName(),
  advantage: lorem.words(5),
  disadvantage: lorem.words(5),
  review: lorem.words(20),
  rating: datatype.number(5),
  createAt: date.recent(),
  cameraId: datatype.number(100)
}] as Review[]);
