/* Command Pattern */
var FormManager = {
 
                createForm : function( test , t) {
                                console.log( arguments );
                                console.log()
                                console.log("createForm : " + test + ' ' + t);
                },
 
                createFormTablet : function ( test ) {
                                console.log("mobile create form : " + test );
                },
 
                createForm3 : function( test ) {
                                console.log("IPAD : " + test);
                }
}
 
FormManager.execute = function( name ) {
                console.log([].slice.call(arguments,1));

                return FormManager[name] && FormManager[name].apply( this, [].slice.call(arguments,1) );
}
 
 
FormManager.execute("createForm", "Rizwan","jay thakkar");
