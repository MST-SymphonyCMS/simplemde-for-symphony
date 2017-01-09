/*
	Simple MDE for Symphony CMS
	@author Frédérick Hamon (fhamon)
*/

(function($, Simplemde, undefined) {
	'use strict';

	var toggleExpertMode = function () {
		$('.CodeMirror-wrap').toggleClass('is-advanced-mode');
	};
	
	$.fn.initSimplemde = function (options) {
	
		return this.each(function (index, element) {
		
			// Editor Configuration
			// https://github.com/NextStepWebs/simplemde-markdown-editor/

			var ctn = $(element).closest('.field');
			var focusActive = false;

			var activateSyntax = function () {
				var cm = simplemde.codemirror;

				var A1 = cm.getCursor().line;
				var A2 = cm.getCursor().ch;

				var B1 = cm.findWordAt({line: A1, ch: A2}).anchor.ch;
				var B2 = cm.findWordAt({line: A1, ch: A2}).head.ch;

				var renderedLine = cm.display.renderedView[cm.getCursor().line].measure.map;

				$('.is-word-focused').removeClass('is-word-focused');

				for (var i in renderedLine) {
					if (typeof(renderedLine[i]) === 'object') {
						$(renderedLine[i]).parent().addClass('is-word-focused');
					}
				}
			};

			var toggleSyntaxFocusMode = function (e) {
				if (!!focusActive) {
					$(e.toolbarElements.focusMode).removeClass('is-option-active');
					$('.is-word-focused').removeClass('is-word-focused');
					simplemde.codemirror.off('cursorActivity', activateSyntax);
					simplemde.codemirror.off('inputRead', activateSyntax);
					focusActive = false;
				} else {
					$(e.toolbarElements.focusMode).addClass('is-option-active');
					simplemde.codemirror.on('cursorActivity', activateSyntax);
					simplemde.codemirror.on('inputRead', activateSyntax);
					focusActive = true;
				}
			};
			
			var configuration = $.extend({
				element: element,
				spellChecker: false,
				status: false,
				forceSync: true,
				indentWithTabs: false,
				toolbar: [
					"heading",
					"bold",
					"italic",
					"|",
					"quote",
					"unordered-list",
					"link",
					"|",
					"side-by-side",
					"fullscreen",
					{
						name: 'focusMode',
						action: toggleSyntaxFocusMode,
						className: 'fa fa-hashtag',
						title: 'Show syntax on focus'
					},
					{
						name: 'advancedMode',
						action: toggleExpertMode,
						className: 'fa fa-code',
						title: 'Advanced Mode'
					}
				]
			}, options );
			
			var simplemde = new SimpleMDE(configuration);

			simplemde.codemirror.on('beforeChange', function(cm, data) {
				if (data.origin === '+input') {
					if (/[#*_-]/.test(data.text[0]) && !$('.CodeMirror-wrap').hasClass('is-advanced-mode')) {
						data.text[0] = '\\' + data.text[0];
					}
				}
			});

			simplemde.codemirror.on('focus', function () {
				$('body').addClass('editor-focused');
			});

			simplemde.codemirror.on('blur', function () {
				$('body').removeClass('editor-focused');
			});


			ctn.addClass('field-simplemde');
			
			// Calculate min height based on the number of rows
			var rows = $(element).attr('rows');
			var minHeight;
			
			if (rows <= 1) {
				minHeight = '2.6';
			} else if (rows <= 4) {
				minHeight = '8.9';
			} else if (rows <= 7) {
				minHeight = '15';
			} else if (rows <= 10) {
				minHeight = '21.3';
			} else if (rows <= 13) {
				minHeight = '27.6';
			} else if (rows <= 16) {
				minHeight = '33.9';
			} else {
				minHeight = (rows === '0') ? false : ((( Math.round (rows * 206.666666 - 1) ) / 100));
			}
			
			// Append height to editor
			$(element).siblings('.CodeMirror').css(
				'min-height', minHeight+'rem'
			).find('.CodeMirror-scroll').css(
				'min-height', minHeight+'rem'
			);
		});
	};
	
}(this.jQuery, this.Simplemde));


(function($, undefined) {
	'use strict';

	var currentScroll = $(window).scrollTop();
	var isDock = false;
	var win = $(window);

	var onScroll = function () {
		$('textarea[class*="markdown"], textarea[class*="commonmark"]').each(function () {

			var mde = $(this).closest('.tab-panel').find('.editor-toolbar');

			currentScroll = win.scrollTop();

			if (mde.data('initialOffset') === undefined || mde.data('initialOffset') === 0) {
				mde.data('initialOffset', mde.offset().top);
			}

			if (mde.data('initialOffset') <= win.scrollTop() && mde.data('canDock') != true) {
				mde.data('canDock', true);
			} else if (mde.data('initialOffset') >= win.scrollTop()) {
				mde.data('canDock', false);
			}

		});
	};

	var onPostScroll = function () {
		$('textarea[class*="markdown"], textarea[class*="commonmark"]').each(function () {
			var mde = $(this).closest('.tab-panel').find('.editor-toolbar');

			if (mde.data('canDock') === true) {
				mde.addClass('is-docked');
			} else {
				mde.removeClass('is-docked');
			}
		});
	};

	var scrollHandler = function () {
		onScroll();
		onPostScroll();
	};

	$(function() {
		var txtAreas = $('textarea[class*="markdown"], textarea[class*="commonmark"]');
		txtAreas.initSimplemde();

		if (txtAreas.length) {
			$(window).scroll(scrollHandler);
		}
	});
}(this.jQuery));
