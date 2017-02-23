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

    private orderSellByPrice(orders: IOrder[]): IOrder[] {
        const sellOrders = orders.filter(order => order.type === 'SELL');
        const buyOrders = orders.filter(order => order.type !== 'SELL');
     
        let sortedOrders = sellOrders.sort((a, b) => a.price - b.price);

        return buyOrders.concat(sortedOrders);
    }

    private combineCommonOrders(): IOrderBoard {
        if (this.board.orders.length <= 1) {
            return this.board;
        }

        const combinedOrders: IOrder[] = [];
        const priceMap: Map<string, IOrder> = new Map();

        this.board.orders.forEach(order => {

            let mapping = priceMap.get(order.price + order.type);
            
            if (mapping) {
                mapping.quantity += order.quantity;
                priceMap.set(mapping.price + mapping.type, mapping);
            } else {
                let clone = Object.assign({}, order);
                priceMap.set(clone.price + clone.type, clone);
            }
        });

        priceMap.forEach((value, key, map) => combinedOrders.push(value));

        return { orders: combinedOrders };
    }
    
    public getBoard(): IOrderBoard {
        let board = this.combineCommonOrders();
        board.orders = this.orderSellByPrice(board.orders);
        return board;
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
