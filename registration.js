module.exports = function NamesGreeted(pool) {



  var names = "";
  var counts = 0;
  var languages = "";

  function nameSet(values) {
    names = values;
  }

  function langSet() {
    languages = button;
  }

  //when the greet button is pressed check if this user was already greeted befo  //by looking if the userName exists in namesGreeted if not increment this counter and update the screen
  async function greet(names, language) {
    if (names === "") {
      return 
    }
    if (language === undefined) {
      return 
    }
    if (names === '' && lang === undefined) {
      return 'Please enter a name & select language ';
  }
    
    


    let getName = await pool.query('select * from users where user_name=$1', [names.toUpperCase()])

    if (getName.rowCount == 0 ) {
   
      await pool.query('insert into users(user_name,count) values($1, 0)', [names.toUpperCase()]);
      // await pool.query('update users set count=count+1 where user_name = $1', [names]);

    }

    await pool.query('update users set count=count+1 where user_name=$1', [names.toUpperCase()]);

    if (language === 'IsiXhosa') {

      return 'Molo, ' + names

    }

    if (language === 'English') {
      return 'Hello, ' + names
    }

    if (language === 'Afrikaans')
      return 'Goeie dag, ' + names

  }


  async function getGreetedNames() {
    let result = await pool.query('select * from users');
    return result.rows;
  }

  async function countNames() {

    let result = await pool.query('select * from users')

    return result.rowCount;
  }

  // async function clearBtn() {
  //   await pool.query('delete from users')
  // }

  function returname() {
    return names
  }

  function returnlanguage() {
    return languages
  }

  async function resetDataBase() {
     await pool.query('delete from users')
    //return results.rows
  }

  async function getNameDetails(name) {
    name = name;
    let result = await pool.query('select * from users where user_name = $1', [name])
    return result.rows[0];
  }



  return {
    getGreetedNames,
    greet,
    resetDataBase,
    countNames,
    getNameDetails

  }



};
