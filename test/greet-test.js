let assert = require("assert");
const Greeter = require("../registration.js");
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/greet_test';

const pool = new Pool({
  connectionString
});

describe(' countNames', function () {
  beforeEach(async () => {
    await pool.query('delete from users');
  })
  it('should count just a single person', async function () {


    var greeter = Greeter(pool);
    await greeter.greet('LILO', 'English');
    assert.equal(1, await greeter.countNames());
  });

  it('should count two people that have been greeted', async function () {


    var greeter = Greeter(pool);
    await greeter.greet('LILO', 'English');
    await greeter.greet('LIHLE', 'English');
    assert.equal(2, await greeter.countNames());
  });

  it('should check if three people that have been greeted', async function () {


    var greeter = Greeter(pool);
    await greeter.greet('LILO', 'English');
    await greeter.greet('LIHLE', 'Afrikaans');
    await greeter.greet('Ziyanda', 'Isixhosa');
    assert.equal(3, await greeter.countNames());
  });


});


describe(' Get the greeted', function () {
  beforeEach(async () => {
    await pool.query('delete from users');
  })
  it('should greet people in their languages', async function () {


    var greeter = Greeter(pool);
    await greeter.greet('LILO', 'English');
    await greeter.greet('LIHLE', 'IsiXhosa');
    let greetedUsers = await greeter.getGreetedNames()

    for (let user of greetedUsers) {
      delete user.id;
    }

    assert.deepEqual(greetedUsers, [
      { user_name: 'LILO', count: 1},
      { user_name: 'LIHLE', count: 1 }
    ]);
  });

  it('should greet people in their languages', async function () {


    var greeter = Greeter(pool);
    await greeter.greet('LILO', 'English');
   
    let result = await greeter.getNameDetails("LILO")
    delete result.id;
    assert.deepEqual(result, { user_name: 'LILO', count: 1 });
  });
  
  
  describe(' resetBtn', function() {
    beforeEach(async () => {
      await pool.query('delete from users');
    })
    it('should delete everyone that was greeted on the data base',  async function() {
      var greeter = Greeter(pool);


      await greeter.resetDataBase()
      var names = await greeter.getGreetedNames();

      assert.deepEqual(names, []);
    });


  });

  after(async function() {
    await pool.end();
  });
});