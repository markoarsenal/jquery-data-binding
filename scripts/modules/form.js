/**
 * Global namespace
 */
var APP = APP || {};


APP.form = (function () {
	var self = {
		defaults: {},
		instance: null
	}

	/**
	 * Constructor function
	 * @param { Jquery } 	$element 	Curent element
	 * @param { Object } 	options  	Passed options
	 * @param { Object } 	data  	    Passed data
	 * @return { void }
	 */
	class Form extends Module {
        constructor ($element, options, data) {
            super($element, data);
        }
	}

	/**
	 * Init module
	 * @param  { String } 	selector 	Class or id
	 * @param { Object } 	options  	Passed options
	 * @return { Array } 				Array of istances
	 */
	self.init = function (selector, options, data) {
		var $elements = $(selector),
			results = [];

		// Add modul methods to every element
		$elements.each(function () {
			var $this = $(this),
				form = $this.data('form');

			if (!form) {
				form = new Form($this, options, data);
				$this.data('form', form);
			}
			
			results.push(form);
		});

		return results;
	}


	return self;
}());