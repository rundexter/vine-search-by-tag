var _    = require( 'lodash' );
var rest = require( 'restler' );

module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var tag  = step.input( 'tag' ).first();
        var url = 'https://api.vineapp.com/timelines/tags/' + tag;

        var self = this;
        rest.get( url ).on( 'complete', function( res ) {
            if ( res instanceof Error ) {
                return self.fail( res.message );
            }

            self.complete( { vines: res.data.records } );
        } );

    }
};
