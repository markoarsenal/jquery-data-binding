class Module {
	constructor ($element, data = {}) {
		this.$element = $element;
		this.$elements = this.$element.find('[data-bind]');

		this.data = {};
		this.setData(data);
		this.bindFromDOM();
	}

	setData (data) {
		for (let i in data) {
			let value = data[i];

			if (['string', 'number', 'boolean'].indexOf(typeof value) !== -1 && value !== this.data[i]) {
				let $elements = this.$elements.filter('[data-bind^=' + i + ']');
				
				$elements.each((index, el) => {
					let $el = $(el),
						bindArr = $el.data('bind').split(':'),
						key = bindArr[0],
						value = data[key];

					if (bindArr[1] === 'attr') {
						$el.attr(bindArr[2], value);
					} else {
						if ($el.is(':input')) {
							$el.val(value);
						} else {
							$el.html(value);
						}
					}
				});
			}
		}

		this.data = data;
	}

	bindFromDOM () {
		let that = this;

		this.$elements.filter(':input:not(button)').on('input change click compositionstart compositionend', function (e) {
			let $this = $(this),
				value = $this.val(),
				bindArr = $this.data('bind').split(':'),
				key = bindArr[0];

			let data = Object.create(that.data);

			data[key] = value;
			that.setData(data);
		});
	}
}