/**
 * jQuery.fixedinside.js v 0.1.0
 * https://github.com/esukei/jquery-fixinside
 * Copyright 2013 Satoru Kawahara
 * Licensed under MIT(http://www.opensource.org/licenses/MIT)
 */
(function (window, $, undefined) {
	var
		$win = $(window),
		//target elements holder
		fixedElements = $(),
		//check elements position(scroll event handler)
		checkPosition = function (event) {
			//save window status
			var
				windowTop = $win.scrollTop(),
				windowHeight = $win.height();

			fixedElements
				.each(function (i) {
					var
						$this = $(this),
						thisHeight = $this.outerHeight(),
						options = $this.data('fixedinside'),
						containerOffset = options.$container.offset(),
						containerHeight = options.$container.height(),
						containerOuterHeight = options.$container.outerHeight();

					//when viewport size is not enough showing this element
					if(windowHeight - options.offsetTop - options.offsetBottom < thisHeight) {
						$this.css({
							position: 'absolute',
							top: options.minTop + 'px'
						});
						return true;
					}

					//when container top is under the window top (+offset)
					if(containerOffset.top >= windowTop + options.offsetTop) {
						$this.css({
							position: 'absolute',
							top: options.minTop + 'px'
						});
					} else {
						//element height <-> scrollTop AND container bottom
						if(containerOffset.top + containerOuterHeight - options.containerPaddingBottom - windowTop - options.offsetTop  > options.minTop + thisHeight) {
							$this.css({
								position: 'fixed',
								top: options.minTop + options.offsetTop + 'px'
							});
						} else {
							$this.css({
								position: 'absolute',
								top: options.maxTop + 'px'
							});
						}
					}
				});
		};

	//add fixed inside method
	$.fn.extend({
		fixedinside: function (options) {
			var _options = {
				offsetTop: 0
			};

			_options.extend(options);

			this
				.each(function(i) {
					var
						$this = $(this),
						thisOffset = $this.offset(),
						thisOriginalTop = $this.css('top'),
						thisOriginalPosition = $this.css('position');

					if(thisOriginalPosition === 'fixed') $this.css('position', 'absolute');

					var
						$container = $this.offsetParent(),
						containerOffset = $container.offset(),
						containerPaddingTop = parseFloat($container.css('padding-top')),
						containerPaddingBottom = parseFloat($container.css('padding-bottom')),
						minTop = thisOffset.top - containerOffset.top,
						maxTop = $container.height() - $this.outerHeight() + containerPaddingBottom;


					//save data to this element
					$this.data({
						fixedinside: {
							$container: $container,
							containerPaddingTop: containerPaddingTop,
							containerPaddingBottom: containerPaddingBottom,
							minTop: minTop,
							maxTop: maxTop,
							offsetTop: _options.offsetTop
						}
					});

				});

			fixedElements = fixedElements.add(this);

			$win.triggerHandler('scroll.fixedinside');

			return this;
		}
	});

	//on scroll event
	$win
		.on('scroll.fixedinside', checkPosition)

})(this, jQuery);