'use strict';

import {IOrderBoard, IOrder} from './OrderBoard';

export class Marketplace {
    private board: IOrderBoard;

    constructor() {
        this.board = {
            orders: []
        };
    }

    public getBoard() {
        return this.board;
    }

    public registerOrder(order: IOrder) {
        this.board.orders.push(order);

        return this.board;
    }
}
