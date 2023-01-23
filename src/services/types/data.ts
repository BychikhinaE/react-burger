export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type?: string;
  readonly proteins?: number;
  readonly fat?: number;
  readonly carbohydrates?: number;
  readonly calories?: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile?: string;
  readonly image_large?: string;
  readonly __v?: number;
  quantity?: number;
  sysid?: string;
}

export interface IOrder {
  readonly createdAt: string;
  readonly ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
}

export interface IItemConstructorProps {
  item: IIngredient;
  isLocked: boolean;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}
export interface IUpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}
export interface IResetPassword {
  password: string;
  token: string;
}

//Блюда в меню
export interface IGetData {
  data: Array<IIngredient>;
  success: boolean;
}

export interface IPostOrder {
  order: IOrder;
  success: boolean;
}

export interface ICreateUser {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
}

export interface ILogoutRequest {
  success: boolean;
  message: string;
}

export interface IGetUserData {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}
export interface IPostForgotPassword {
  success: boolean;
  message: string;
}

export interface IPostResetPassword {
  success: boolean;
  message: string;
}

export interface IRefreshTokenRequest {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IWsMessage {
  success?: boolean;
  orders: Array<IOrder>;
  total: number;
  totalToday: number;
}
