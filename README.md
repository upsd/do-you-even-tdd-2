# Do you even TDD 2?
Following on from the first tutorial about Test Driven Development.

## Scenario
You still work for the company "Tietanic"(:necktie:), and have recently moved into a new team as they loved your
previous work so much. Tietanic now have better insight into their loyalty program and now want to venture into the
world of APIs in an effort to make data more accessible across the business.

Similar to your previous project, there is a database team you will have to interface with. Unfortunately, they have not
disclosed any details of what that looks like.

## Requirements
There are a number of requirements for you and your team. Firstly, the API must offer the below endpoints:
* /products
* /products/:id

Nice and easy right? With the above endpoints they want to be able to:
* View all products
* Search products by certain keyword
* View product by ID

Let's take the above and translate that into some API endpoints with HTTP verbs:
* GET /products
* GET /products?q=someTerm
* GET /products/:id

Great, now we have some endpoints, we can look to write some tests, or can we? I know what you are thinking: "where is
the schema?". Fortunately, they have also provided that for an individual product:
```json
{
  "id": 1,
  "name": "Superman Necktie",
  "price": "£25.00"
}
```
Let's get cracking on writing some tests!

## GET /products
This should be a nice easy one to start with, which will just return all of the products to the calling client. Because
I am nice a lot of the set-up has been taken care of, leaving you to just focus on the exercises.

If you open up `test.js`, you should see some standard JS testing set-up. I want you to assert that we get a 200 status
code back from calling the `/products` endpoint.

To start you off, you might write something like:
```js
it('GET /products', (done) => {
    chai.request(app)
        .get('/products')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
});
```

Run `npm test` and see what happens. Your test should be failing, if it isn't then you have magic powers, 
congratulations.

Now we have a failing test, we can write something in our implementation to try and get it working. To start off, go
into `server.js` and add:
```js
app.get('/products', (req, res) => {
    res.end('Hello');
});
```
Now run `npm test` again and see what happens.

Whilst speaking to your boss about this you ask "what is the response meant to look like for the `/products` endpoint?".
He responds with "use your imagination". So you think about what would make sense to represent multiple products, and
you settle on the below:
```json
{
  "products": [{
    "id": 1,
    "name": "Superman Necktie",
    "price": "£25.00"
  }]
}
```

Based on that, you can check for the `products` property in the JSON response in your test:
```js
expect(res.body).to.have.property('products');
```
Re-run the tests and watch it fail.

To make it pass, amending the `server.js` to the following should work:
```js
res.json({
    products: []
});
```
Now your test should be green. In order to test the data we get back, we might want to be able to tell the server to use
a set of products we supply. Add the two lines to an appropriate place in the server:

```js
let products = [];
module.exports.setProducts = p => products = p;
```

You now have a mechanism for setting the products within your tests, but first we must add another assertion:
```js
expect(res.body.products).to.have.lengthOf(1);
```
If you run this (and you should) it will fail. You need to set-up some products in your test, add this before you make
http request in your test:
```js
app.setProducts([{
    id: 1,
    name: 'Clash of the Tietans',
    price: '£20.00'
}]);
```
When you re-run your tests it should go green.

That's it for this endpoint, feel free to add some more tests, such as when there are no products.

## Exercises
You should now have all the tools you need to write these tests.
 
### GET /products/?q=something
Here are some helpful requirements:
* The API should use the `q` to search for keywords in `name` property of product objects.
* When it finds matches, it should return these in a `products` array.
* When there are no matches, it should return an empty `products` array.

### GET /products/:id
To give you a hand I will provide some requirements:
* When there is a product for supplied ID, return it as a single object as stated in the [requirements](#requirements).
* Should return 404 for non-existent product for given ID

## Solution
If you are interested in one possible solution visit the [solution folder](./solution).