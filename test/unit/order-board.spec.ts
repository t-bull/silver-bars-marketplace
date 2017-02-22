'use strict';

import {Marketplace, IMarketplace} from '../../src/Marketplace';
import {IOrder, IOrderBoard} from '../../src/OrderBoard';

import * as Chai from 'chai';

describe('Live Order Board', () => {
    let marketplace: IMarketplace;

    beforeEach(function () {
        marketplace = new Marketplace();
    });

     describe('Given I have an order board', () => {
        it('Then I can view the live state of the order board', () => {
            const orderBoard: IOrderBoard = marketplace.getBoard();
            Chai.should().exist(orderBoard);
            Chai.assert.equal(orderBoard.orders.length, 0);
        });

        it('And orders with the same price should be combined into the same order', () => {
            const firstOrder: IOrder = {
                userId: 'testTrader3',
                type: 'BUY',
                quantity: 5,
                price: 200
            };

            const secondOrder: IOrder = {
                userId: 'testTrader4',
                type: 'BUY',
                quantity: 10,
                price: 200
            };

            marketplace.registerOrder(firstOrder);
            marketplace.registerOrder(secondOrder);

            const board = marketplace.getBoard();

            Chai.should().exist(board);
            Chai.assert.equal(board.orders.length, 1);
            Chai.assert.equal(board.orders[0].quantity, 15);
        });
    });

    describe('Given I am a trader', () => {
        it('Then I should be able to register an order', () => {
            const order: IOrder = {
                userId: 'testTrader1',
                type: 'BUY',
                quantity: 3.5,
                price: 303
            };

            const orderBoard = marketplace.registerOrder(order);

            Chai.should().exist(orderBoard);
            Chai.assert.equal(orderBoard.orders.length, 1);
            Chai.assert.equal(orderBoard.orders[0].userId, order.userId);
            Chai.assert.equal(orderBoard.orders[0].type, order.type);
            Chai.assert.equal(orderBoard.orders[0].quantity, order.quantity);
            Chai.assert.equal(orderBoard.orders[0].price, order.price);
        });

        it('And I should be able to remove my order from the board', () => {
            const order: IOrder = {
                userId: 'testTrader2',
                type: 'BUY',
                quantity: 4,
                price: 300
            };

            let orderBoard = marketplace.registerOrder(order);
            
            Chai.assert.equal(orderBoard.orders.length, 1);

            orderBoard = marketplace.removeOrder(order);

            Chai.assert.equal(orderBoard.orders.length, 0);
        });
    });
});