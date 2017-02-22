export interface IOrderBoard {
    orders: IOrder[];
}

export interface IOrder {
    type: string;
    quantity: number;
    price: number;
}
