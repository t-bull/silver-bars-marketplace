'use strict';

import {Marketplace} from '../../src/Marketplace';
import * as Chai from 'chai';

describe('Live Order Board', () => {
    let marketplace;

    beforeEach(function () {
        marketplace = new Marketplace();
    });

    describe('Given I have an order board', () => {
        it('Then I can view the live state of the order board', () => {
            let orderBoard = marketplace.getBoard();
            Chai.should().exist(orderBoard);
            Chai.assert.equal(orderBoard.orders.length, 0);
        });
    })
});