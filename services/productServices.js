const faker = require('faker');

class ProductServices {
  constructor(){
    this.products = [];
    this.id = 0;
    this.generateProducts();
  }

  generateProducts(){
    for(let i = 0; i < 100; i++){
      this.products.push({
        id: this.id,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.image(),
        description: faker.lorem.paragraph()
      });
      this.id++;
    }
  }

  async create (data) {
    const newProduct = {
      id: this.id, ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find (){
    return this.products;
  }

  async findOne(id){
    return this.products.find(product => product.id === id);
  }

  async update(id, changes) {
    const index = this.products.findIndex(product => product.id === parseInt(id));
    if ( index === -1 ) {
      return new Error('Product not found');
    }
    this.products[index] = {
      ...this.products[index],
      ...changes
    }

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id);
    if ( index === -1 ) {
      return new Error('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductServices;
