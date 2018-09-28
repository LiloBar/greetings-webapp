function carsRegistered(carReg) {

  var carsRegistered = carReg || {};
  var car = "";
  var counts = 0;

  var allFromTown = function(carReg, StartString){
    var regList = carReg.split(',');
    var List = [];

    for(var i = 0; i < regList.length; i++){
      var trimmedList = regList[i];
      if(trimmedList.startsWith(StartString)) {
        List.push(trimmedList);
      }
    }
  }

  function getregCarcar() {
    return carsRegistered;
  }

  function countcar() {
    return Object.keys(carsRegistered).length;
  }

  function clearBtn() {
    return carsRegistered = {};
  }



  return {
    getcar: getregCarcar,
    reg: carNum,
    cleared: clearBtn,
    //displaying,
    counts: countcar,
    sa :List
  }
}
