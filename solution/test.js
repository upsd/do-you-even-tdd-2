const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Tietanic API tests', () => {

    beforeEach(() => app.setProducts([]));

    describe('GET /products', () => {
        it('products exist', (done) => {
            app.setProducts([{
                id: 1,
                name: 'Clash of the Tietans',
                price: '£20.00'
            }]);
            chai.request(app)
                .get('/products')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('products');
                    expect(res.body.products).to.have.lengthOf(1);
                    done();
                });
        });

        it('no products exist', (done) => {
            chai.request(app)
                .get('/products')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('products');
                    expect(res.body.products).to.have.lengthOf(0);
                    done();
                });
        });
    });

    describe('GET /products?q=???', () => {
        it('finds matching products', (done) => {
            app.setProducts([{
                id: 1,
                name: 'Clash of the Tietans',
                price: '£20.00'
            }, {
                id: 2,
                name: 'Tieland',
                price: '£12.50'
            }]);
            chai.request(app)
                .get('/products?q=clash')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('products');
                    expect(res.body.products).to.have.lengthOf(1);
                    done();
                });
        });
        it('finds no matching products', (done) => {
            app.setProducts([{
                id: 1,
                name: 'Clash of the Tietans',
                price: '£20.00'
            }, {
                id: 2,
                name: 'Tieland',
                price: '£12.50'
            }]);
            chai.request(app)
                .get('/products?q=trousers')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('products');
                    expect(res.body.products).to.have.lengthOf(0);
                    done();
                });
        });
    });

    describe('GET /products/:id', () => {
        it('can find matching product', (done) => {
            app.setProducts([{
                id: 1,
                name: 'Clash of the Tietans',
                price: '£20.00'
            }, {
                id: 2,
                name: 'Tieland',
                price: '£12.50'
            }]);
            chai.request(app)
                .get('/products/2')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.id).to.be.equal(2);
                    done();
                });
        });

        it('cannot find matching product', (done) => {
            app.setProducts([{
                id: 1,
                name: 'Clash of the Tietans',
                price: '£20.00'
            }, {
                id: 2,
                name: 'Tieland',
                price: '£12.50'
            }]);
            chai.request(app)
                .get('/products/3')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
});