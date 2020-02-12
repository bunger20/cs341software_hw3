//Sarah Bunger

var noItems = {};
var singleItem = {0: {topping: "cherry", quantity: 2}};
var multiItem = {0: {topping: "cherry", quantity: 2}, 1: {topping: "plain", quantity: 6}, 2: {topping: "chocolate", quantity: 3}};

const helper = require('../routes/ordersHelperFunctions.js');
    test('verifies conversion to array', () => {
        expect(helper(noItems)).toEqual([{}]);
        expect(helper(singleItem)).toEqual([{0: {topping: "cherry", quantity: 2}}]);
        expect(helper(multiItem)).toEqual([{0: {topping: "cherry", quantity: 2}, 1: {topping: "plain", quantity: 6}, 2: {topping: "chocolate", quantity: 3}}]);
});

