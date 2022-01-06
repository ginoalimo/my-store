const boom = require('@hapi/boom');
const pool = require('../libs/postgresPool');

class CategoryService {

  constructor(){
    this.pool = pool;
    this.pool.on('error', err => console.error('Unexpected error on idle client', err));
  }

  // Todas las categorias
  async getAll() {
    const query = 'select * from categories';
    const categories = await this.pool.query(query);
    return categories.rows;
  }

  // Categoria por ID
  async getCategoryById(id) {
    const query = 'select * from categories where id = $1';
    const category = await this.pool.query(query, [id]);
    return category.rows;
  }

  // Crea una categoria
  async createCategory(category) {
    const query = 'insert into categories (name) values ($1) returning *';
    const result = await this.pool.query(query, [category.name]);
    return result.rows[0];
  }


  async create(data) {
    return data;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
