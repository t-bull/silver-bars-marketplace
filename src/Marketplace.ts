'use strict';

import {IOrderBoard, IOrder} from './OrderBoard';

export interface IMarketplace {
    getBoard: Function;
    registerOrder: Function;
    removeOrder: Function;
}

export class Marketplace implements IMarketplace {
    private board: IOrderBoard;

    constructor() {
        this.board = { orders: [] };
    }

    private combineCommonOrders(): IOrderBoard {
        // clone the array. Array.prototype.slice wont work because the references to the objects will remain.
        const ordersCopy = JSON.parse(JSON.stringify(this.board.orders));
        const summaryOrders: IOrder[] = [];
       
        if (ordersCopy.length <= 1) {
            return this.board;
        }

        for (let i = 0; i < ordersCopy.length; i++) {
            let currentOrder: IOrder = ordersCopy.shift();

            for (let j = 0; j < ordersCopy.length; j++) {
                let comparableOrder: IOrder = ordersCopy[j];

                if (comparableOrder.price === currentOrder.price &&
                    comparableOrder.type === currentOrder.type) {

                    currentOrder.quantity += comparableOrder.quantity;
                    ordersCopy.splice(ordersCopy.indexOf(comparableOrder), 1);
                }
            }
            summaryOrders.push(currentOrder);
        }

        return { orders: summaryOrders };
    }

    public getBoard(): IOrderBoard {
        return this.combineCommonOrders();
    }

    public registerOrder(order: IOrder): IOrderBoard {
        this.board.orders.push(order);

        return this.getBoard();
    }

    public removeOrder(order: IOrder): IOrderBoard {
        if (this.board.orders.indexOf(order) > -1) {
            this.board.orders.splice(this.board.orders.indexOf(order), 1);
        }

        return this.getBoard();
    }
}
