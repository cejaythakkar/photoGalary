/*
---------------------------------------------------------------------
  prototype pattern is one of the creational pattern.

  prototype pattern is one which crates objects based on templates.
  this pattern is based on prototypal inheritance where we create 
  objects that acts as prototypes(template) for other objects.

  there are three ways to achive prototype pattern.
---------------------------------------------------------------------
*/

/*
-----------------------------------------------
            first
-----------------------------------------------            
*/

var vehicle = {
  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model );
  }
};
 
var car = Object.create(vehicle, { // property Descriptor
 
  "id": {
    value: 1,
    // writable:false, configurable:false by default
    enumerable: true
  },
 
  "model": {
    value: "Ford",
    enumerable: true
  }
 
});

for(var i in car){
  console.log(car[i]);
};

/*
-----------------------------------------------
            second
-----------------------------------------------            
*/

var vehiclePrototype = {
 
  init: function ( carModel ) {
    this.model = carModel;
  },

  commonProperty : 'commonProperty',
  
  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model);
  }
};
 
 
function vehicle( model ) {
 
  function F() {};
  F.prototype = vehiclePrototype;
 
/*
-----------------------------------------------
            overriding a method defined in prototype
-----------------------------------------------            
*/

  F.prototype.getModel = function(){
  	console.log('function getModel modified to console this');
  }
 /*
-----------------------------------------------
            adding a method defined in prototype
-----------------------------------------------            
*/

F.prototype.foo = 'i m a foo'; // fields are not shared. each and every object will hav its own copy of the property 'foo'.

F.prototype.displayFoo = function(){ // methods are shared. all objects will refer to the same memory location where the function is stored in memory.
	console.log(this.foo);
}

  var f = new F();
 
  f.init( model );
  return f;
 
}
 
var car = vehicle( "Ford Escort" );
car.getModel();
car.displayFoo();
var car1 = vehicle('ford mustang');

/*
-----------------------------------------------
            third
-----------------------------------------------            
*/

var beget = (function () {
 
    function F() {}
 
    return function ( proto ) {
        F.prototype = proto;
        return new F();
    };
})();


/*
	do not use DELETE operator to remove properties from the prototype(delete operator is BAD)

	http://www.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/
/*