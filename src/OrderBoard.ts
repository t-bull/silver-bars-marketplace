export interface IOrderBoard {
    orders: IOrder[];
}

export interface IOrder {
    userId: string;
    type: string;
    quantity: number;
    price: number;
}
