//Sarah Bunger

// var express = require('express');
// var router = express.Router();
// var createError = require('http-errors');

// const order = require('../routes/orders.js');
//     test('gets dictionary objects', () => {
//         expect(contents).toBe({0: {topping: "cherry", quantity: 2}});
// });

// const httpMocks = require('node-mocks-http');
// const { sendSomeStuff } = require('../routes/orders.js');

// describe('sendSomeStuff', () => {
//     test('should send some stuff', () => {
//         const request = httpMocks.createRequest({
//             method: 'GET',
//             url: '/orders/orderData?cat=0'
//         });

//         const response = httpMocks.createResponse();

//         sendSomeStuff(request, response, (err) => {
//             expect(err).toBeFalsy();
//         });

//         const { property } = JSON.parse(response._getData());

//         expect(property).toBe('{topping: "cherry", quantity: 2}');
//     });
// });

var noItems = {};
var singleItem = {0: {topping: "cherry", quantity: 2}};
var multiItem = {0: {topping: "cherry", quantity: 2}, 1: {topping: "plain", quantity: 6}, 2: {topping: "chocolate", quantity: 3}};

const helper = require('../routes/ordersHelperFunctions.js');
    test('verifies conversion to array', () => {
        expect(helper(noItems)).toEqual([{}]);
        expect(helper(singleItem)).toEqual([{0: {topping: "cherry", quantity: 2}}]);
        expect(helper(multiItem)).toEqual([{0: {topping: "cherry", quantity: 2}, 1: {topping: "plain", quantity: 6}, 2: {topping: "chocolate", quantity: 3}}]);
});

