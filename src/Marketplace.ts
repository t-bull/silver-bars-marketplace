'use strict';

import {IOrderBoard, IOrder} from './OrderBoard';

export interface IMarketplace {
    getBoard: Function,
    registerOrder: Function,
    removeOrder: Function
}

export class Marketplace implements IMarketplace {
    private board: IOrderBoard;

    constructor() {
        this.board = { orders: [] };
    }

    public getBoard() {
        return this.board;
    }

    public registerOrder(order: IOrder) {
        this.board.orders.push(order);

        return this.board;
    }

    public removeOrder(order: IOrder) {
        if (this.board.orders.indexOf(order) > -1) {
            this.board.orders.splice(this.board.orders.indexOf(order), 1);
        }

        return this.board;
    }
}
