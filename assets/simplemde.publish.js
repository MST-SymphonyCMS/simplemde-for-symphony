(function($, Simplemde, undefined) {
	'use strict';

	var openEmojiSelector = function () {
		//
	};

	var toggleExpertMode = function () {
		$('.CodeMirror-wrap').toggleClass('is-advanced-mode');
	};
	
	$.fn.initSimplemde = function (options) {
	
		return this.each(function (index, element) {
		
			// Editor Configuration
			// https://github.com/NextStepWebs/simplemde-markdown-editor/

			/*
				{
					name: 'emoji',
					action: openEmojiSelector,
					className: 'fa fa-smile-o',
					title: 'Emoji'
				},
			*/
			
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
					"strikethrough",
					"|",
					"quote",
					"unordered-list",
					"link",
					"|",
					"side-by-side",
					"fullscreen",
					{
						name: 'advancedMode',
						action: toggleExpertMode,
						className: 'fa fa-code',
						title: 'Advanced Mode'
					},
					"|",
					"guide"
				],
			}, options );
			
			var simplemde = new SimpleMDE(configuration);
			
			$(element).closest('.field').addClass('field-simplemde');
			
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
	$(function() {
		$('textarea[class*="markdown"], textarea[class*="commonmark"]').initSimplemde();
	});
}(this.jQuery));
