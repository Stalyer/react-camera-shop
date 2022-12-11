import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {CartProduct} from '../../types/product';

export const getCartProducts = (state: State): CartProduct[] => state[NameSpace.Cart].products;
