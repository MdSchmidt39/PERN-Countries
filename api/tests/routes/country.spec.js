/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);

const country = {
  id: "COL",
  name: 'Colombia',
  flag: 'https://restcountries.eu/data/col.svg',
  capital: 'Bogotá',
  continent: 'Americas'
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('GET /countries/all', () => {
    it('should get 200', () =>
      agent.get('/countries/all').expect(200)
    );
  });
})