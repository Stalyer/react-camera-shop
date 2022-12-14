import {QueryParam} from '../const';

export type Product = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
};

export type FetchReturnProducts = {
  data: Product[];
  dataTotalCount: number;
}

export type FetchQueryProducts = {
  [QueryParam.Start]?: number;
  [QueryParam.End]?: number;
  [QueryParam.Limit]?: number;
  [QueryParam.NameLike]?: string;
  [QueryParam.Sort]?: string | null;
  [QueryParam.Order]?: string | null;
  [QueryParam.PriceMin]?: string | null;
  [QueryParam.PriceMax]?: string | null;
  [QueryParam.Category]?: string | string[] | null;
  [QueryParam.Type]?: string | string[] | null;
  [QueryParam.Level]?: string | string[] | null;
}

export type CartProduct = {
  product: Product;
  quantity: number;
}
