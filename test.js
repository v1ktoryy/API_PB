var supertest = require("supertest");

var server = supertest.agent("https://api.privatbank.ua");

describe("SAMPLE unit test", function(){

it("should return home page", function(done){

    // calling home page api
    server
    .get("/p24api/pubinfo?json&exchange&coursid=5")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .expect(function(res) {
      if (res.body.length != 4) throw new Error('wrong currencies count');
      var allowedCurrencies = ['USD', 'EUR', 'RUR', 'BTC'];

      for (el in res.body) {
          if (allowedCurrencies.indexOf(res.body[el].ccy) == -1) {
            throw new Error('wrong currency in response');
          }
      }
    })
    .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

});