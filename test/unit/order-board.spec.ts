'use strict';

import {Marketplace} from '../../src/Marketplace';
import {IOrder, IOrderBoard} from '../../src/OrderBoard';

import * as Chai from 'chai';
import {equal} from 'lodash';

describe('Live Order Board', () => {
    let marketplace;

    beforeEach(function () {
        marketplace = new Marketplace();
    });

    describe('Given I have an order board', () => {
        it('Then I can view the live state of the order board', () => {
            const orderBoard: IOrderBoard = marketplace.getBoard();
            Chai.should().exist(orderBoard);
            Chai.assert.equal(orderBoard.orders.length, 0);
        });
    });

    describe('Given I am a trader', () => {
        it('Then I should be able to register an order', () => {
            const order: IOrder = {
                userId: 'testId',
                type: 'BUY',
                quantity: 3.5,
                price: 303
            }
            const orderBoard = marketplace.registerOrder(order);

            Chai.should().exist(orderBoard);
            Chai.assert.equal(orderBoard.orders.length, 1);
            Chai.assert.isTrue(equal(order, orderBoard.orders[0]));
        });
    });
});