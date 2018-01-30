/*! jquery.selectBoxIt - v3.8.1 - 2013-10-17
 * http://www.selectboxit.com
 * Copyright (c) 2013 Greg Franko; Licensed MIT*/

// Immediately-Invoked Function Expression (IIFE) [Ben Alman Blog Post](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) that calls another IIFE that contains all of the plugin logic.  I used this pattern so that anyone viewing this code would not have to scroll to the bottom of the page to view the local parameters that were passed to the main IIFE.
//是要引入就绑定
$(window).on('load', function() {
	$(".selectBoxIt").filter(".instant").selectBoxIt();
	$('.selectpicker').selectpicker({
		'selectedText' : 'cat'
	});
});

;
(function(selectBoxIt) {

	// ECMAScript 5 Strict Mode: [John Resig Blog
	// Post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
	"use strict";

	// Calls the second IIFE and locally passes in the global jQuery, window,
	// and document objects
	selectBoxIt(window.jQuery, window, document);

}

		// Locally passes in `jQuery`, the `window` object, the `document`
		// object, and an `undefined` variable. The `jQuery`, `window` and
		// `document` objects are passed in locally, to improve performance,
		// since javascript first searches for a variable match within the local
		// variables set before searching the global variables set. All of the
		// global variables are also passed in locally to be minifier friendly.
		// `undefined` can be passed in locally, because it is not a reserved
		// word in JavaScript.

		(function($, window, document, undefined) {

			// ECMAScript 5 Strict Mode: [John Resig Blog
			// Post](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
			"use strict";

			// Calling the jQueryUI Widget Factory Method
			$
					.widget(
							"selectBox.selectBoxIt",
							{

								// Plugin version
								VERSION : "3.8.1",

								// These options will be used as defaults
								options : {

									// **showEffect**: Accepts String: "none",
									// "fadeIn", "show", "slideDown", or any of
									// the jQueryUI show effects (i.e. "bounce")
									"showEffect" : "none",

									// **showEffectOptions**: Accepts an object
									// literal. All of the available properties
									// are based on the jqueryUI effect options
									"showEffectOptions" : {},

									// **showEffectSpeed**: Accepts Number
									// (milliseconds) or String: "slow",
									// "medium", or "fast"
									"showEffectSpeed" : "medium",

									// **hideEffect**: Accepts String: "none",
									// "fadeOut", "hide", "slideUp", or any of
									// the jQueryUI hide effects (i.e.
									// "explode")
									"hideEffect" : "none",

									// **hideEffectOptions**: Accepts an object
									// literal. All of the available properties
									// are based on the jqueryUI effect options
									"hideEffectOptions" : {},

									// **hideEffectSpeed**: Accepts Number
									// (milliseconds) or String: "slow",
									// "medium", or "fast"
									"hideEffectSpeed" : "medium",

									// **showFirstOption**: Shows the first
									// dropdown list option within the dropdown
									// list options list
									"showFirstOption" : true,

									// **defaultText**: Overrides the text used
									// by the dropdown list selected option to
									// allow a user to specify custom text.
									// Accepts a String.
									"defaultText" : "",

									// **defaultIcon**: Overrides the icon used
									// by the dropdown list selected option to
									// allow a user to specify a custom icon.
									// Accepts a String (CSS class name(s)).
									"defaultIcon" : "",

									// **downArrowIcon**: Overrides the default
									// down arrow used by the dropdown list to
									// allow a user to specify a custom image.
									// Accepts a String (CSS class name(s)).
									"downArrowIcon" : "",

									// **theme**: Provides theming support for
									// Twitter Bootstrap and jQueryUI
									"theme" : "default",

									// **keydownOpen**: Opens the dropdown if
									// the up or down key is pressed when the
									// dropdown is focused
									"keydownOpen" : true,

									// **isMobile**: Function to determine if a
									// user's browser is a mobile browser
									"isMobile" : function() {

										// Adapted from
										// http://www.detectmobilebrowsers.com
										var ua = navigator.userAgent
												|| navigator.vendor
												|| window.opera;

										// Checks for iOs, Android, Blackberry,
										// Opera Mini, and Windows mobile
										// devices
										return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/)
												.test(ua);

									},

									// **native**: Triggers the native select
									// box when a user interacts with the drop
									// down
									"native" : false,

									// **aggressiveChange**: Will select a drop
									// down item (and trigger a change event)
									// when a user navigates to the item via the
									// keyboard (up and down arrow or search),
									// before a user selects an option with a
									// click or the enter key
									"aggressiveChange" : false,

									// **selectWhenHidden: Will allow a user to
									// select an option using the keyboard when
									// the drop down list is hidden and focused
									"selectWhenHidden" : true,

									// **viewport**: Allows for a custom domnode
									// used for the viewport. Accepts a
									// selector. Default is $(window).
									"viewport" : $(window),

									// **similarSearch**: Optimizes the search
									// for lists with many similar values (i.e.
									// State lists) by making it easier to
									// navigate through
									"similarSearch" : false,

									// **copyAttributes**: HTML attributes that
									// will be copied over to the new drop down
									"copyAttributes" : [

									"title",

									"rel"

									],

									// **copyClasses**: HTML classes that will
									// be copied over to the new drop down. The
									// value indicates where the classes should
									// be copied. The default value is 'button',
									// but you can also use 'container'
									// (recommended) or 'none'.
									"copyClasses" : "button",

									// **nativeMousedown**: Mimics native
									// firefox drop down behavior by opening the
									// drop down on mousedown and selecting the
									// currently hovered drop down option on
									// mouseup
									"nativeMousedown" : false,

									// **customShowHideEvent**: Prevents the
									// drop down from opening on click or
									// mousedown, which allows a user to
									// open/close the drop down with a custom
									// event handler.
									"customShowHideEvent" : false,

									// **autoWidth**: Makes sure the width of
									// the drop down is wide enough to fit all
									// of the drop down options
									"autoWidth" : false,

									// **html**: Determines whether or not
									// option text is rendered as html or as
									// text
									"html" : true,

									// **populate**: Convenience option that
									// accepts JSON data, an array, a single
									// object, or valid HTML string to add
									// options to the drop down list
									"populate" : "",

									// **dynamicPositioning**: Determines
									// whether or not the drop down list should
									// fit inside it's viewport
									"dynamicPositioning" : true,

									// **hideCurrent**: Determines whether or
									// not the currently selected drop down
									// option is hidden in the list
									"hideCurrent" : false

								},

								// Get Themes
								// ----------
								// Retrieves the active drop down theme and
								// returns the theme object
								"getThemes" : function() {

									var self = this, theme = $(self.element)
											.attr("data-theme")
											|| "c";

									return {

										// Twitter Bootstrap Theme
										"bootstrap" : {

											"focus" : "active",

											"hover" : "",

											"enabled" : "enabled",

											"disabled" : "disabled",

											"arrow" : "caret",

											"button" : "btn",

											"list" : "dropdown-menu",

											"container" : "bootstrap",

											"open" : "open"

										},

										// jQueryUI Theme
										"jqueryui" : {

											"focus" : "ui-state-focus",

											"hover" : "ui-state-hover",

											"enabled" : "ui-state-enabled",

											"disabled" : "ui-state-disabled",

											"arrow" : "ui-icon ui-icon-triangle-1-s",

											"button" : "ui-widget ui-state-default",

											"list" : "ui-widget ui-widget-content",

											"container" : "jqueryui",

											"open" : "selectboxit-open"

										},

										// jQuery Mobile Theme
										"jquerymobile" : {

											"focus" : "ui-btn-down-" + theme,

											"hover" : "ui-btn-hover-" + theme,

											"enabled" : "ui-enabled",

											"disabled" : "ui-disabled",

											"arrow" : "ui-icon ui-icon-arrow-d ui-icon-shadow",

											"button" : "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-"
													+ theme,

											"list" : "ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-"
													+ theme,

											"container" : "jquerymobile",

											"open" : "selectboxit-open"

										},

										"default" : {

											"focus" : "selectboxit-focus",

											"hover" : "selectboxit-hover",

											"enabled" : "selectboxit-enabled",

											"disabled" : "selectboxit-disabled",

											"arrow" : "selectboxit-default-arrow",

											"button" : "selectboxit-btn",

											"list" : "selectboxit-list",

											"container" : "selectboxit-container",

											"open" : "selectboxit-open"

										}

									};

								},

								// isDeferred
								// ----------
								// Checks if parameter is a defered object
								isDeferred : function(def) {
									return $.isPlainObject(def) && def.promise
											&& def.done;
								},

								// _Create
								// -------
								// Sets the Plugin Instance variables and
								// constructs the plugin. Only called once.
								_create : function(internal) {

									var self = this, populateOption = self.options["populate"], userTheme = self.options["theme"];

									// If the element calling SelectBoxIt is not
									// a select box or is not visible
									if (!self.element.is("select")) {

										// Exits the plugin
										return;

									}

									// Stores a reference to the parent Widget
									// class
									self.widgetProto = $.Widget.prototype;

									// The original select box DOM element
									self.originalElem = self.element[0];

									// The original select box DOM element
									// wrapped in a jQuery object
									self.selectBox = self.element;

									if (self.options["populate"] && self.add
											&& !internal) {

										self.add(populateOption);

									}

									// All of the original select box options
									self.selectItems = self.element
											.find("option");

									// The first option in the original select
									// box
									self.firstSelectItem = self.selectItems
											.slice(0, 1);

									// The html document height
									self.documentHeight = $(document).height();

									self.theme = $.isPlainObject(userTheme) ? $
											.extend(
													{},
													self.getThemes()["default"],
													userTheme)
											: self.getThemes()[userTheme] ? self
													.getThemes()[userTheme]
													: self.getThemes()["default"];

									// The index of the currently selected
									// dropdown list option
									self.currentFocus = 0;

									// Keeps track of which blur events will
									// hide the dropdown list options
									self.blur = true;

									// Array holding all of the original select
									// box options text
									self.textArray = [];

									// Maintains search order in the `search`
									// method
									self.currentIndex = 0;

									// Maintains the current search text in the
									// `search` method
									self.currentText = "";

									// Whether or not the dropdown list opens up
									// or down (depending on how much room is on
									// the page)
									self.flipped = false;

									// If the create method is not called
									// internally by the plugin
									if (!internal) {

										// Saves the original select box `style`
										// attribute within the
										// `selectBoxStyles` plugin instance
										// property
										self.selectBoxStyles = self.selectBox
												.attr("style");

									}

									// Creates the dropdown elements that will
									// become the dropdown
									// Creates the ul element that will become
									// the dropdown options list
									// Add's all attributes (excluding id, class
									// names, and unselectable properties) to
									// the drop down and drop down items list
									// Hides the original select box and adds
									// the new plugin DOM elements to the page
									// Adds event handlers to the new dropdown
									// list
									self._createDropdownButton()
											._createUnorderedList()
											._copyAttributes()
											._replaceSelectBox()._addClasses(
													self.theme)
											._eventHandlers();

									if (self.originalElem.disabled
											&& self.disable) {

										// Disables the dropdown list if the
										// original dropdown list had the
										// `disabled` attribute
										self.disable();

									}

									// If the Aria Accessibility Module has been
									// included
									if (self._ariaAccessibility) {

										// Adds ARIA accessibillity tags to the
										// dropdown list
										self._ariaAccessibility();

									}

									self.isMobile = self.options["isMobile"]();

									if (self._mobile) {

										// Adds mobile support
										self._mobile();

									}

									// If the native option is set to true
									if (self.options["native"]) {

										// Triggers the native select box when a
										// user is interacting with the drop
										// down
										this._applyNativeSelect();

									}

									// Triggers a custom `create` event on the
									// original dropdown list
									self.triggerEvent("create");

									// Maintains chainability
									return self;

								},

								// _Create dropdown button
								// -----------------------
								// Creates new dropdown and dropdown elements to
								// replace
								// the original select box with a dropdown list
								_createDropdownButton : function() {

									var self = this, originalElemId = self.originalElemId = self.originalElem.id
											|| "", originalElemValue = self.originalElemValue = self.originalElem.value
											|| "", originalElemName = self.originalElemName = self.originalElem.name
											|| "", copyClasses = self.options["copyClasses"], selectboxClasses = self.selectBox
											.attr("class")
											|| "";

									// Creates a dropdown element that contains
									// the dropdown list text value
									self.dropdownText = $(
											"<span/>",
											{

												// Dynamically sets the dropdown
												// `id` attribute
												"id" : originalElemId
														&& originalElemId
														+ "SelectBoxItText",

												"class" : "selectboxit-text",

												// IE specific attribute to not
												// allow the element to be
												// selected
												"unselectable" : "on",

												// Sets the dropdown `text` to
												// equal the original select box
												// default value
												"text" : self.firstSelectItem
														.text()

											}).

									// Sets the HTML5 data attribute on the
									// dropdownText `dropdown` element
									attr("data-val", originalElemValue);

									self.dropdownImageContainer = $(
											"<span/>",
											{

												"class" : "selectboxit-option-icon-container"

											});

									// Creates a dropdown element that contains
									// the dropdown list text value
									self.dropdownImage = $("<i/>", {

										// Dynamically sets the dropdown `id`
										// attribute
										"id" : originalElemId && originalElemId
												+ "SelectBoxItDefaultIcon",

										"class" : "selectboxit-default-icon",

										// IE specific attribute to not allow
										// the element to be selected
										"unselectable" : "on"

									});

									// Creates a dropdown to act as the new
									// dropdown list
									self.dropdown = $(
											"<span/>",
											{

												// Dynamically sets the dropdown
												// `id` attribute
												"id" : originalElemId
														&& originalElemId
														+ "SelectBoxIt",

												"class" : "selectboxit "
														+ (copyClasses === "button" ? selectboxClasses
																: "")
														+ " "
														+ (self.selectBox
																.prop("disabled") ? self.theme["disabled"]
																: self.theme["enabled"]),

												// Sets the dropdown `name`
												// attribute to be the same name
												// as the original select box
												"name" : originalElemName,

												// Sets the dropdown `tabindex`
												// attribute to 0 to allow the
												// dropdown to be focusable
												"tabindex" : self.selectBox
														.attr("tabindex")
														|| "0",

												// IE specific attribute to not
												// allow the element to be
												// selected
												"unselectable" : "on"

											})
											.

											// Appends the default text to the
											// inner dropdown list dropdown
											// element
											append(
													self.dropdownImageContainer
															.append(self.dropdownImage))
											.append(self.dropdownText);

									// Create the dropdown container that will
									// hold all of the dropdown list dom
									// elements
									self.dropdownContainer = $(
											"<span/>",
											{

												"id" : originalElemId
														&& originalElemId
														+ "SelectBoxItContainer",

												"class" : 'selectboxit-container '
														+ self.theme.container
														+ ' '
														+ (copyClasses === "container" ? selectboxClasses
																: "")

											}).

									// Appends the inner dropdown list dropdown
									// element to the dropdown list container
									// dropdown element
									append(self.dropdown);

									// Maintains chainability
									return self;

								},

								// _Create Unordered List
								// ----------------------
								// Creates an unordered list element to hold the
								// new dropdown list options that directly match
								// the values of the original select box options
								_createUnorderedList : function() {

									// Storing the context of the widget
									var self = this,

									dataDisabled,

									optgroupClass,

									optgroupElement,

									iconClass,

									iconUrl,

									iconUrlClass,

									iconUrlStyle,

									// Declaring the variable that will hold all
									// of the dropdown list option elements
									currentItem = "",

									originalElemId = self.originalElemId || "",

									// Creates an unordered list element
									createdList = $("<ul/>", {

										// Sets the unordered list `id`
										// attribute
										"id" : originalElemId && originalElemId
												+ "SelectBoxItOptions",

										"class" : "selectboxit-options",

										// Sets the unordered list `tabindex`
										// attribute to -1 to prevent the
										// unordered list from being focusable
										"tabindex" : -1

									}),

									currentDataSelectedText,

									currentDataText,

									currentDataSearch,

									currentText,

									currentOption,

									parent;

									// Checks the `showFirstOption` plugin
									// option to determine if the first dropdown
									// list option should be shown in the
									// options list.
									if (!self.options["showFirstOption"]) {

										// Disables the first select box option
										self.selectItems.first().attr(
												"disabled", "disabled");

										// Excludes the first dropdown list
										// option from the options list
										self.selectItems = self.selectBox.find(
												"option").slice(1);

									}

									// Loops through the original select box
									// options list and copies the text of each
									// into new list item elements of the new
									// dropdown list
									self.selectItems
											.each(function(index) {

												currentOption = $(this);

												optgroupClass = "";

												optgroupElement = "";

												dataDisabled = currentOption
														.prop("disabled");

												iconClass = currentOption
														.attr("data-icon")
														|| "";

												iconUrl = currentOption
														.attr("data-iconurl")
														|| "";

												iconUrlClass = iconUrl ? "selectboxit-option-icon-url"
														: "";

												iconUrlStyle = iconUrl ? 'style="background-image:url(\''
														+ iconUrl + '\');"'
														: "";

												currentDataSelectedText = currentOption
														.attr("data-selectedtext");

												currentDataText = currentOption
														.attr("data-text");

												currentText = currentDataText ? currentDataText
														: currentOption.text();

												parent = currentOption.parent();

												// If the current option being
												// traversed is within an
												// optgroup

												if (parent.is("optgroup")) {

													optgroupClass = "selectboxit-optgroup-option";

													if (currentOption.index() === 0) {

														optgroupElement = '<span class="selectboxit-optgroup-header '
																+ parent
																		.first()
																		.attr(
																				"class")
																+ '"data-disabled="true">'
																+ parent
																		.first()
																		.attr(
																				"label")
																+ '</span>';

													}

												}

												currentOption.attr("value",
														this.value);

												// Uses string concatenation for
												// speed (applies HTML attribute
												// encoding)
												currentItem += optgroupElement
														+ '<li data-id="'
														+ index
														+ '" data-val="'
														+ this.value
														+ '" data-disabled="'
														+ dataDisabled
														+ '" class="'
														+ optgroupClass
														+ " selectboxit-option "
														+ ($(this)
																.attr("class") || "")
														+ '"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon '
														+ iconClass
														+ ' '
														+ (iconUrlClass || self.theme["container"])
														+ '"'
														+ iconUrlStyle
														+ '></i></span>'
														+ (self.options["html"] ? currentText
																: self
																		.htmlEscape(currentText))
														+ '</a></li>';

												currentDataSearch = currentOption
														.attr("data-search");

												// Stores all of the original
												// select box options text
												// inside of an array
												// (Used later in the
												// `searchAlgorithm` method)
												self.textArray[index] = dataDisabled ? ""
														: currentDataSearch ? currentDataSearch
																: currentText;

												// Checks the original select
												// box option for the `selected`
												// attribute
												if (this.selected) {

													// Replaces the default text
													// with the selected option
													// text
													self
															._setText(
																	self.dropdownText,
																	currentDataSelectedText
																			|| currentText);

													// Set the currently
													// selected option
													self.currentFocus = index;

												}

											});

									// If the `defaultText` option is being used
									if ((self.options["defaultText"] || self.selectBox
											.attr("data-text"))) {

										var defaultedText = self.options["defaultText"]
												|| self.selectBox
														.attr("data-text");

										// Overrides the current dropdown
										// default text with the value the user
										// specifies in the `defaultText` option
										self._setText(self.dropdownText,
												defaultedText);

										self.options["defaultText"] = defaultedText;

									}

									// Append the list item to the unordered
									// list
									createdList.append(currentItem);

									// Stores the dropdown list options list
									// inside of the `list` instance variable
									self.list = createdList;

									// Append the dropdown list options list to
									// the dropdown container element
									self.dropdownContainer.append(self.list);

									// Stores the individual dropdown list
									// options inside of the `listItems`
									// instance variable
									self.listItems = self.list.children("li");

									self.listAnchors = self.list.find("a");

									// Sets the 'selectboxit-option-first' class
									// name on the first drop down option
									self.listItems.first().addClass(
											"selectboxit-option-first");

									// Sets the 'selectboxit-option-last' class
									// name on the last drop down option
									self.listItems.last().addClass(
											"selectboxit-option-last");

									// Set the disabled CSS class for select box
									// options
									self.list.find("li[data-disabled='true']")
											.not(".optgroupHeader").addClass(
													self.theme["disabled"]);

									self.dropdownImage.addClass(self.selectBox
											.attr("data-icon")
											|| self.options["defaultIcon"]
											|| self.listItems.eq(
													self.currentFocus)
													.find("i").attr("class"));

									self.dropdownImage.attr("style",
											self.listItems
													.eq(self.currentFocus)
													.find("i").attr("style"));

									// Maintains chainability
									return self;

								},

								// _Replace Select Box
								// -------------------
								// Hides the original dropdown list and inserts
								// the new DOM elements
								_replaceSelectBox : function() {

									var self = this, height, width, originalElemId = self.originalElem.id
											|| "", size = self.selectBox
											.attr("data-size"), listSize = self.listSize = size === undefined ? "auto"
											: size === "0" || "size" === "auto" ? "auto"
													: +size, downArrowContainerWidth, dropdownImageWidth;

									// alert(size);

									// Hides the original select box
									self.selectBox.css("display", "none").

									// Adds the new dropdown list to the page
									// directly after the hidden original select
									// box element
									after(self.dropdownContainer);

									self.dropdownContainer.appendTo('body').

									addClass('selectboxit-rendering');

									// The height of the dropdown list
									height = self.dropdown.height();

									width = self.selectBox.width();

									// The down arrow element of the dropdown
									// list
									self.downArrow = $("<i/>", {

										// Dynamically sets the dropdown `id`
										// attribute of the dropdown list down
										// arrow
										"id" : originalElemId && originalElemId
												+ "SelectBoxItArrow",

										"class" : "selectboxit-arrow",

										// IE specific attribute to not allow
										// the dropdown list text to be selected
										"unselectable" : "on"

									});

									// The down arrow container element of the
									// dropdown list
									self.downArrowContainer = $(
											"<span/>",
											{

												// Dynamically sets the dropdown
												// `id` attribute for the down
												// arrow container element
												"id" : originalElemId
														&& originalElemId
														+ "SelectBoxItArrowContainer",

												"class" : "selectboxit-arrow-container",

												// IE specific attribute to not
												// allow the dropdown list text
												// to be selected
												"unselectable" : "on"

											}).

									// Inserts the down arrow element inside of
									// the down arrow container element
									append(self.downArrow);

									// Appends the down arrow element to the
									// dropdown list
									self.dropdown
											.append(self.downArrowContainer);

									// Adds the `selectboxit-selected` class
									// name to the currently selected drop down
									// option
									self.listItems.removeClass(
											"selectboxit-selected").eq(
											self.currentFocus).addClass(
											"selectboxit-selected");

									// The full outer width of the down arrow
									// container
									downArrowContainerWidth = self.downArrowContainer
											.outerWidth(true);

									// The full outer width of the dropdown
									// image
									dropdownImageWidth = self.dropdownImage
											.outerWidth(true);

									// If the `autoWidth` option is true
									if (self.options["autoWidth"]) {

										// Sets the auto width of the drop down
										self.dropdown
												.css({
													"width" : "auto"
												})
												.css(
														{

															"width" : self.list
																	.outerWidth(true)
																	+ downArrowContainerWidth
																	+ dropdownImageWidth

														});

										self.list.css({

											"min-width" : self.dropdown.width()

										});

									}
									// alert(self.dropdownContainer.width());

									// Dynamically adds the `max-width` and
									// `line-height` CSS styles of the dropdown
									// list text element
									// self.dropdownText.css({
									//
									// "max-width":
									// self.dropdownContainer.outerWidth(true) -
									// (downArrowContainerWidth +
									// dropdownImageWidth)
									//
									// });

									// Adds the new dropdown list to the page
									// directly after the hidden original select
									// box element
									self.selectBox
											.after(self.dropdownContainer);

									self.dropdownContainer
											.removeClass('selectboxit-rendering');

									if ($.type(listSize) === "number") {

										// Stores the new `max-height` for later
										self.maxHeight = self.listAnchors
												.outerHeight(true)
												* listSize;

									}

									// Maintains chainability
									return self;

								},

								// _Scroll-To-View
								// ---------------
								// Updates the dropdown list scrollTop value
								_scrollToView : function(type) {

									var self = this,

									currentOption = self.listItems
											.eq(self.currentFocus),

									// The current scroll positioning of the
									// dropdown list options list
									listScrollTop = self.list.scrollTop(),

									// The height of the currently selected
									// dropdown list option
									currentItemHeight = currentOption.height(),

									// The relative distance from the currently
									// selected dropdown list option to the the
									// top of the dropdown list options list
									currentTopPosition = currentOption
											.position().top,

									absCurrentTopPosition = Math
											.abs(currentTopPosition),

									// The height of the dropdown list option
									// list
									listHeight = self.list.height(),

									currentText;

									// Scrolling logic for a text search
									if (type === "search") {

										// Increases the dropdown list options
										// `scrollTop` if a user is searching
										// for an option
										// below the currently selected option
										// that is not visible
										if (listHeight - currentTopPosition < currentItemHeight) {

											// The selected option will be shown
											// at the very bottom of the visible
											// options list
											self.list
													.scrollTop(listScrollTop
															+ (currentTopPosition - (listHeight - currentItemHeight)));

										}

										// Decreases the dropdown list options
										// `scrollTop` if a user is searching
										// for an option above the currently
										// selected option that is not visible
										else if (currentTopPosition < -1) {

											self.list
													.scrollTop(currentTopPosition
															- currentItemHeight);

										}
									}

									// Scrolling logic for the `up` keyboard
									// navigation
									else if (type === "up") {

										// Decreases the dropdown list option
										// list `scrollTop` if a user is
										// navigating to an element that is not
										// visible
										if (currentTopPosition < -1) {

											self.list.scrollTop(listScrollTop
													- absCurrentTopPosition);

										}
									}

									// Scrolling logic for the `down` keyboard
									// navigation
									else if (type === "down") {

										// Increases the dropdown list options
										// `scrollTop` if a user is navigating
										// to an element that is not fully
										// visible
										if (listHeight - currentTopPosition < currentItemHeight) {

											// Increases the dropdown list
											// options `scrollTop` by the height
											// of the current option item.
											self.list
													.scrollTop((listScrollTop + (absCurrentTopPosition
															- listHeight + currentItemHeight)));

										}
									}

									// Maintains chainability
									return self;

								},

								// _Callback
								// ---------
								// Call the function passed into the method
								_callbackSupport : function(callback) {

									var self = this;

									// Checks to make sure the parameter passed
									// in is a function
									if ($.isFunction(callback)) {

										// Calls the method passed in as a
										// parameter and sets the current
										// `SelectBoxIt` object that is stored
										// in the jQuery data method as the
										// context(allows for `this` to
										// reference the SelectBoxIt API Methods
										// in the callback function. The
										// `dropdown` DOM element that acts as
										// the new dropdown list is also passed
										// as the only parameter to the callback
										callback.call(self, self.dropdown);

									}

									// Maintains chainability
									return self;

								},

								// _setText
								// --------
								// Set's the text or html for the drop down
								_setText : function(elem, currentText) {

									var self = this;

									if (self.options["html"]) {

										elem.html(currentText);

									}

									else {

										elem.text(currentText);

									}

									return self;

								},

								// Open
								// ----
								// Opens the dropdown list options list
								open : function(callback) {

									var self = this, showEffect = self.options["showEffect"], showEffectSpeed = self.options["showEffectSpeed"], showEffectOptions = self.options["showEffectOptions"], isNative = self.options["native"], isMobile = self.isMobile;

									// If there are no select box options, do
									// not try to open the select box
									if (!self.listItems.length
											|| self.dropdown
													.hasClass(self.theme["disabled"])) {

										return self;

									}

									// If the new drop down is being used and is
									// not visible
									if ((!isNative && !isMobile)
											&& !this.list.is(":visible")) {

										// Triggers a custom "open" event on the
										// original select box
										self.triggerEvent("open");

										if (self._dynamicPositioning
												&& self.options["dynamicPositioning"]) {

											// Dynamically positions the
											// dropdown list options list
											self._dynamicPositioning();

										}

										// Uses `no effect`
										if (showEffect === "none") {

											// Does not require a callback
											// function because this animation
											// will complete before the call to
											// `scrollToView`
											self.list.show();

										}

										// Uses the jQuery `show` special effect
										else if (showEffect === "show"
												|| showEffect === "slideDown"
												|| showEffect === "fadeIn") {

											// Requires a callback function to
											// determine when the `show`
											// animation is complete
											self.list[showEffect]
													(showEffectSpeed);

										}

										// If none of the above options were
										// passed, then a `jqueryUI show effect`
										// is expected
										else {

											// Allows for custom show effects
											// via the [jQueryUI core
											// effects](http://http://jqueryui.com/demos/show/)
											self.list.show(showEffect,
													showEffectOptions,
													showEffectSpeed);

										}

										self.list.promise().done(function() {

											// Updates the list `scrollTop`
											// attribute
											self._scrollToView("search");

											// Triggers a custom "opened" event
											// when the drop down list is done
											// animating
											self.triggerEvent("opened");

										});

									}

									// Provide callback function support
									self._callbackSupport(callback);

									// Maintains chainability
									return self;

								},

								// Close
								// -----
								// Closes the dropdown list options list
								close : function(callback) {

									var self = this, hideEffect = self.options["hideEffect"], hideEffectSpeed = self.options["hideEffectSpeed"], hideEffectOptions = self.options["hideEffectOptions"], isNative = self.options["native"], isMobile = self.isMobile;

									// If the drop down is being used and is
									// visible
									if ((!isNative && !isMobile)
											&& self.list.is(":visible")) {

										// Triggers a custom "close" event on
										// the original select box
										self.triggerEvent("close");

										// Uses `no effect`
										if (hideEffect === "none") {

											// Does not require a callback
											// function because this animation
											// will complete before the call to
											// `scrollToView`
											self.list.hide();

										}

										// Uses the jQuery `hide` special effect
										else if (hideEffect === "hide"
												|| hideEffect === "slideUp"
												|| hideEffect === "fadeOut") {

											self.list[hideEffect]
													(hideEffectSpeed);

										}

										// If none of the above options were
										// passed, then a `jqueryUI hide effect`
										// is expected
										else {

											// Allows for custom hide effects
											// via the [jQueryUI core
											// effects](http://http://jqueryui.com/demos/hide/)
											self.list.hide(hideEffect,
													hideEffectOptions,
													hideEffectSpeed);

										}

										// After the drop down list is done
										// animating
										self.list.promise().done(function() {

											// Triggers a custom "closed" event
											// when the drop down list is done
											// animating
											self.triggerEvent("closed");

										});

									}

									// Provide callback function support
									self._callbackSupport(callback);

									// Maintains chainability
									return self;

								},

								toggle : function() {

									var self = this, listIsVisible = self.list
											.is(":visible");

									if (listIsVisible) {

										self.close();

									}

									else if (!listIsVisible) {

										self.open();

									}

								},

								// _Key Mappings
								// -------------
								// Object literal holding the string
								// representation of each key code
								_keyMappings : {

									"38" : "up",

									"40" : "down",

									"13" : "enter",

									"8" : "backspace",

									"9" : "tab",

									"32" : "space",

									"27" : "esc"

								},

								// _Key Down Methods
								// -----------------
								// Methods to use when the keydown event is
								// triggered
								_keydownMethods : function() {

									var self = this, moveToOption = self.list
											.is(":visible")
											|| !self.options["keydownOpen"];

									return {

										"down" : function() {

											// If the plugin options allow
											// keyboard navigation
											if (self.moveDown && moveToOption) {

												self.moveDown();

											}

										},

										"up" : function() {

											// If the plugin options allow
											// keyboard navigation
											if (self.moveUp && moveToOption) {

												self.moveUp();

											}

										},

										"enter" : function() {

											var activeElem = self.listItems
													.eq(self.currentFocus);

											// Updates the dropdown list value
											self._update(activeElem);

											if (activeElem
													.attr("data-preventclose") !== "true") {

												// Closes the drop down list
												// options list
												self.close();

											}

											// Triggers the `enter` events on
											// the original select box
											self.triggerEvent("enter");

										},

										"tab" : function() {

											// Triggers the custom `tab-blur`
											// event on the original select box
											self.triggerEvent("tab-blur");

											// Closes the drop down list
											self.close();

										},

										"backspace" : function() {

											// Triggers the custom `backspace`
											// event on the original select box
											self.triggerEvent("backspace");

										},

										"esc" : function() {

											// Closes the dropdown options list
											self.close();

										}

									};

								},

								// _Event Handlers
								// ---------------
								// Adds event handlers to the new dropdown and
								// the original select box
								_eventHandlers : function() {

									// LOCAL VARIABLES
									var self = this, nativeMousedown = self.options["nativeMousedown"], customShowHideEvent = self.options["customShowHideEvent"], currentDataText, currentText, focusClass = self.focusClass, hoverClass = self.hoverClass, openClass = self.openClass;

									// Select Box events
									this.dropdown
											.on({

												// `click` event with the
												// `selectBoxIt` namespace
												"click.selectBoxIt" : function() {

													// Used to make sure the
													// dropdown becomes focused
													// (fixes IE issue)
													self.dropdown.trigger(
															"focus", true);

													// The `click` handler logic
													// will only be applied if
													// the dropdown list is
													// enabled
													if (!self.originalElem.disabled) {

														// Triggers the `click`
														// event on the original
														// select box
														self
																.triggerEvent("click");

														if (!nativeMousedown
																&& !customShowHideEvent) {

															self.toggle();

														}

													}

												},

												// `mousedown` event with the
												// `selectBoxIt` namespace
												"mousedown.selectBoxIt" : function() {

													// Stores data in the jQuery
													// `data` method to help
													// determine if the dropdown
													// list gains focus from a
													// click or tabstop. The
													// mousedown event fires
													// before the focus event.
													$(this).data("mdown", true);

													self
															.triggerEvent("mousedown");

													if (nativeMousedown
															&& !customShowHideEvent) {

														self.toggle();

													}

												},

												// `mouseup` event with the
												// `selectBoxIt` namespace
												"mouseup.selectBoxIt" : function() {

													self
															.triggerEvent("mouseup");

												},

												// `blur` event with the
												// `selectBoxIt` namespace. Uses
												// special blur logic to make
												// sure the dropdown list closes
												// correctly
												"blur.selectBoxIt" : function() {

													// If `self.blur` property
													// is true
													if (self.blur) {

														// Triggers both the
														// `blur` and `focusout`
														// events on the
														// original select box.
														// The `focusout` event
														// is also triggered
														// because the event
														// bubbles
														// This event has to be
														// used when using event
														// delegation (such as
														// the jQuery `delegate`
														// or `on` methods)
														// Popular open source
														// projects such as
														// Backbone.js utilize
														// event delegation to
														// bind events, so if
														// you are using
														// Backbone.js, use the
														// `focusout` event
														// instead of the `blur`
														// event
														self
																.triggerEvent("blur");

														// Closes the dropdown
														// list options list
														self.close();

														$(this).removeClass(
																focusClass);

													}

												},

												"focus.selectBoxIt" : function(
														event, internal) {

													// Stores the data
													// associated with the
													// mousedown event inside of
													// a local variable
													var mdown = $(this).data(
															"mdown");

													// Removes the jQuery data
													// associated with the
													// mousedown event
													$(this).removeData("mdown");

													// If a mousedown event did
													// not occur and no data was
													// passed to the focus event
													// (this correctly triggers
													// the focus event), then
													// the dropdown list gained
													// focus from a tabstop
													if (!mdown && !internal) {

														setTimeout(
																function() {

																	// Triggers
																	// the
																	// `tabFocus`
																	// custom
																	// event on
																	// the
																	// original
																	// select
																	// box
																	self
																			.triggerEvent("tab-focus");

																}, 0);

													}

													// Only trigger the `focus`
													// event on the original
													// select box if the
													// dropdown list is hidden
													// (this verifies that only
													// the correct `focus`
													// events are used to
													// trigger the event on the
													// original select box
													if (!internal) {

														if (!$(this)
																.hasClass(
																		self.theme["disabled"])) {

															$(this).addClass(
																	focusClass);

														}

														// Triggers the `focus`
														// default event on the
														// original select box
														self
																.triggerEvent("focus");

													}

												},

												// `keydown` event with the
												// `selectBoxIt` namespace.
												// Catches all user keyboard
												// navigations
												"keydown.selectBoxIt" : function(
														e) {

													// Stores the `keycode`
													// value in a local variable
													var currentKey = self._keyMappings[e.keyCode],

													keydownMethod = self
															._keydownMethods()[currentKey];

													if (keydownMethod) {

														keydownMethod();

														if (self.options["keydownOpen"]
																&& (currentKey === "up" || currentKey === "down")) {

															self.open();

														}

													}

													if (keydownMethod
															&& currentKey !== "tab") {

														e.preventDefault();

													}

												},

												// `keypress` event with the
												// `selectBoxIt` namespace.
												// Catches all user keyboard
												// text searches since you can
												// only reliably get character
												// codes using the `keypress`
												// event
												"keypress.selectBoxIt" : function(
														e) {

													// Sets the current key to
													// the `keyCode` value if
													// `charCode` does not
													// exist. Used for cross
													// browser support since IE
													// uses `keyCode` instead of
													// `charCode`.
													var currentKey = e.charCode
															|| e.keyCode,

													key = self._keyMappings[e.charCode
															|| e.keyCode],

													// Converts unicode values
													// to characters
													alphaNumericKey = String
															.fromCharCode(currentKey);

													// If the plugin options
													// allow text searches
													if (self.search
															&& (!key || (key && key === "space"))) {

														// Calls `search` and
														// passes the character
														// value of the user's
														// text search
														self
																.search(
																		alphaNumericKey,
																		true,
																		true);

													}

													if (key === "space") {

														e.preventDefault();

													}

												},

												// `mousenter` event with the
												// `selectBoxIt` namespace .The
												// mouseenter JavaScript event
												// is proprietary to Internet
												// Explorer. Because of the
												// event's general utility,
												// jQuery simulates this event
												// so that it can be used
												// regardless of browser.
												"mouseenter.selectBoxIt" : function() {

													// Trigger the `mouseenter`
													// event on the original
													// select box
													self
															.triggerEvent("mouseenter");

												},

												// `mouseleave` event with the
												// `selectBoxIt` namespace. The
												// mouseleave JavaScript event
												// is proprietary to Internet
												// Explorer. Because of the
												// event's general utility,
												// jQuery simulates this event
												// so that it can be used
												// regardless of browser.
												"mouseleave.selectBoxIt" : function() {

													// Trigger the `mouseleave`
													// event on the original
													// select box
													self
															.triggerEvent("mouseleave");

												}

											});

									// Select box options events that set the
									// dropdown list blur logic (decides when
									// the dropdown list gets
									// closed)
									self.list.on({

										// `mouseover` event with the
										// `selectBoxIt` namespace
										"mouseover.selectBoxIt" : function() {

											// Prevents the dropdown list
											// options list from closing
											self.blur = false;

										},

										// `mouseout` event with the
										// `selectBoxIt` namespace
										"mouseout.selectBoxIt" : function() {

											// Allows the dropdown list options
											// list to close
											self.blur = true;

										},

										// `focusin` event with the
										// `selectBoxIt` namespace
										"focusin.selectBoxIt" : function() {

											// Prevents the default browser
											// outline border to flicker, which
											// results because of the `blur`
											// event
											self.dropdown
													.trigger("focus", true);

										}

									});

									// Select box individual options events
									// bound with the jQuery `delegate` method.
									// `Delegate` was used because binding
									// indropdownidual events to each list item
									// (since we don't know how many there will
									// be) would decrease performance. Instead,
									// we bind each event to the unordered list,
									// provide the list item context, and allow
									// the list item events to bubble up (`event
									// bubbling`). This greatly increases page
									// performance because we only have to bind
									// an event to one element instead of x
									// number of elements. Delegates the `click`
									// event with the `selectBoxIt` namespace to
									// the list items
									self.list
											.on(
													{

														"mousedown.selectBoxIt" : function() {

															self
																	._update($(this));

															self
																	.triggerEvent("option-click");

															// If the current
															// drop down option
															// is not disabled
															if ($(this)
																	.attr(
																			"data-disabled") === "false"
																	&& $(this)
																			.attr(
																					"data-preventclose") !== "true") {

																// Closes the
																// drop down
																// list
																self.close();

															}

															setTimeout(
																	function() {

																		self.dropdown
																				.trigger(
																						'focus',
																						true);

																	}, 0);

														},

														// Delegates the
														// `focusin` event with
														// the `selectBoxIt`
														// namespace to the list
														// items
														"focusin.selectBoxIt" : function() {

															// Removes the hover
															// class from the
															// previous drop
															// down option
															self.listItems
																	.not(
																			$(this))
																	.removeAttr(
																			"data-active");

															$(this)
																	.attr(
																			"data-active",
																			"");

															var listIsHidden = self.list
																	.is(":hidden");

															if ((self.options["searchWhenHidden"] && listIsHidden)
																	|| self.options["aggressiveChange"]
																	|| (listIsHidden && self.options["selectWhenHidden"])) {

																self
																		._update($(this));

															}

															// Adds the focus
															// CSS class to the
															// currently focused
															// dropdown list
															// option
															$(this).addClass(
																	focusClass);

														},

														// Delegates the `focus`
														// event with the
														// `selectBoxIt`
														// namespace to the list
														// items
														"mouseup.selectBoxIt" : function() {

															if (nativeMousedown
																	&& !customShowHideEvent) {

																self
																		._update($(this));

																self
																		.triggerEvent("option-mouseup");

																// If the
																// current drop
																// down option
																// is not
																// disabled
																if ($(this)
																		.attr(
																				"data-disabled") === "false"
																		&& $(
																				this)
																				.attr(
																						"data-preventclose") !== "true") {

																	// Closes
																	// the drop
																	// down list
																	self
																			.close();

																}

															}

														},

														// Delegates the
														// `mouseenter` event
														// with the
														// `selectBoxIt`
														// namespace to the list
														// items
														"mouseenter.selectBoxIt" : function() {

															// If the currently
															// moused over drop
															// down option is
															// not disabled
															if ($(this)
																	.attr(
																			"data-disabled") === "false") {

																self.listItems
																		.removeAttr("data-active");

																$(this)
																		.addClass(
																				focusClass)
																		.attr(
																				"data-active",
																				"");

																// Sets the
																// dropdown list
																// indropdownidual
																// options back
																// to the
																// default state
																// and sets the
																// focus CSS
																// class on the
																// currently
																// hovered
																// option
																self.listItems
																		.not(
																				$(this))
																		.removeClass(
																				focusClass);

																$(this)
																		.addClass(
																				focusClass);

																self.currentFocus = +$(
																		this)
																		.attr(
																				"data-id");

															}

														},

														// Delegates the
														// `mouseleave` event
														// with the
														// `selectBoxIt`
														// namespace to the list
														// items
														"mouseleave.selectBoxIt" : function() {

															// If the currently
															// moused over drop
															// down option is
															// not disabled
															if ($(this)
																	.attr(
																			"data-disabled") === "false") {

																// Removes the
																// focus class
																// from the
																// previous drop
																// down option
																self.listItems
																		.not(
																				$(this))
																		.removeClass(
																				focusClass)
																		.removeAttr(
																				"data-active");

																$(this)
																		.addClass(
																				focusClass);

																self.currentFocus = +$(
																		this)
																		.attr(
																				"data-id");

															}

														},

														// Delegates the `blur`
														// event with the
														// `selectBoxIt`
														// namespace to the list
														// items
														"blur.selectBoxIt" : function() {

															// Removes the focus
															// CSS class from
															// the previously
															// focused dropdown
															// list option
															$(this)
																	.removeClass(
																			focusClass);

														}

													}, ".selectboxit-option");

									// Select box individual option anchor
									// events bound with the jQuery `delegate`
									// method. `Delegate` was used because
									// binding indropdownidual events to each
									// list item (since we don't know how many
									// there will be) would decrease
									// performance. Instead, we bind each event
									// to the unordered list, provide the list
									// item context, and allow the list item
									// events to bubble up (`event bubbling`).
									// This greatly increases page performance
									// because we only have to bind an event to
									// one element instead of x number of
									// elements. Delegates the `click` event
									// with the `selectBoxIt` namespace to the
									// list items
									self.list.on({

										"click.selectBoxIt" : function(ev) {

											// Prevents the internal anchor tag
											// from doing anything funny
											ev.preventDefault();

										}

									}, "a");

									// Original dropdown list events
									self.selectBox
											.on({

												// `change` event handler with
												// the `selectBoxIt` namespace
												"change.selectBoxIt, internal-change.selectBoxIt" : function(
														event, internal) {

													var currentOption, currentDataSelectedText;

													// If the user called the
													// change method
													if (!internal) {

														currentOption = self.list
																.find('li[data-val="'
																		+ self.originalElem.value
																		+ '"]');

														// If there is a
														// dropdown option with
														// the same value as the
														// original select box
														// element
														if (currentOption.length) {

															self.listItems
																	.eq(
																			self.currentFocus)
																	.removeClass(
																			self.focusClass);

															self.currentFocus = +currentOption
																	.attr("data-id");

														}

													}

													currentOption = self.listItems
															.eq(self.currentFocus);

													currentDataSelectedText = currentOption
															.attr("data-selectedtext");

													currentDataText = currentOption
															.attr("data-text");

													currentText = currentDataText ? currentDataText
															: currentOption
																	.find("a")
																	.text();

													// Sets the new dropdown
													// list text to the value of
													// the current option
													self
															._setText(
																	self.dropdownText,
																	currentDataSelectedText
																			|| currentText);

													self.dropdownText
															.attr(
																	"data-val",
																	self.originalElem.value);

													if (currentOption.find("i")
															.attr("class")) {

														self.dropdownImage
																.attr(
																		"class",
																		currentOption
																				.find(
																						"i")
																				.attr(
																						"class"))
																.addClass(
																		"selectboxit-default-icon");

														self.dropdownImage
																.attr(
																		"style",
																		currentOption
																				.find(
																						"i")
																				.attr(
																						"style"));
													}

													// Triggers a custom changed
													// event on the original
													// select box
													self
															.triggerEvent("changed");

												},

												// `disable` event with the
												// `selectBoxIt` namespace
												"disable.selectBoxIt" : function() {

													// Adds the `disabled` CSS
													// class to the new dropdown
													// list to visually show
													// that it is disabled
													self.dropdown
															.addClass(self.theme["disabled"]);

												},

												// `enable` event with the
												// `selectBoxIt` namespace
												"enable.selectBoxIt" : function() {

													// Removes the `disabled`
													// CSS class from the new
													// dropdown list to visually
													// show that it is enabled
													self.dropdown
															.removeClass(self.theme["disabled"]);

												},

												// `open` event with the
												// `selectBoxIt` namespace
												"open.selectBoxIt" : function() {

													var currentElem = self.list
															.find("li[data-val='"
																	+ self.dropdownText
																			.attr("data-val")
																	+ "']"), activeElem;

													// If no current element can
													// be found, then select the
													// first drop down option
													if (!currentElem.length) {

														// Sets the default
														// value of the dropdown
														// list to the first
														// option that is not
														// disabled
														currentElem = self.listItems
																.not(
																		"[data-disabled=true]")
																.first();

													}

													self.currentFocus = +currentElem
															.attr("data-id");

													activeElem = self.listItems
															.eq(self.currentFocus);

													self.dropdown.addClass(
															openClass).

													// Removes the focus class
													// from the dropdown list
													// and adds the library
													// focus class for both the
													// dropdown list and the
													// currently selected
													// dropdown list option
													removeClass(hoverClass)
															.addClass(
																	focusClass);

													self.listItems
															.removeClass(
																	self.selectedClass)
															.

															removeAttr(
																	"data-active")
															.not(activeElem)
															.removeClass(
																	focusClass);

													activeElem.addClass(
															self.selectedClass)
															.addClass(
																	focusClass);

													if (self.options.hideCurrent) {

														self.listItems.show();

														activeElem.hide();

													}

												},

												"close.selectBoxIt" : function() {

													// Removes the open class
													// from the dropdown
													// container
													self.dropdown
															.removeClass(openClass);

												},

												"blur.selectBoxIt" : function() {

													self.dropdown
															.removeClass(focusClass);

												},

												// `mousenter` event with the
												// `selectBoxIt` namespace
												"mouseenter.selectBoxIt" : function() {

													if (!$(this)
															.hasClass(
																	self.theme["disabled"])) {
														self.dropdown
																.addClass(hoverClass);
													}

												},

												// `mouseleave` event with the
												// `selectBoxIt` namespace
												"mouseleave.selectBoxIt" : function() {

													// Removes the hover CSS
													// class on the previously
													// hovered dropdown list
													// option
													self.dropdown
															.removeClass(hoverClass);

												},

												// `destroy` event
												"destroy" : function(ev) {

													// Prevents the default
													// action from happening
													ev.preventDefault();

													// Prevents the destroy
													// event from propagating
													ev.stopPropagation();

												}

											});

									// Maintains chainability
									return self;

								},

								// _update
								// -------
								// Updates the drop down and select box with the
								// current value
								_update : function(elem) {

									var self = this, currentDataSelectedText, currentDataText, currentText, defaultText = self.options["defaultText"]
											|| self.selectBox.attr("data-text"), currentElem = self.listItems
											.eq(self.currentFocus);

									if (elem.attr("data-disabled") === "false") {

										currentDataSelectedText = self.listItems
												.eq(self.currentFocus).attr(
														"data-selectedtext");

										currentDataText = currentElem
												.attr("data-text");

										currentText = currentDataText ? currentDataText
												: currentElem.text();

										// If the default text option is set and
										// the current drop down option is not
										// disabled
										if ((defaultText
												&& self.options["html"] ? self.dropdownText
												.html() === defaultText
												: self.dropdownText.text() === defaultText)
												&& self.selectBox.val() === elem
														.attr("data-val")) {

											self.triggerEvent("change");

										}

										else {

											// Sets the original dropdown list
											// value and triggers the `change`
											// event on the original select box
											self.selectBox.val(elem
													.attr("data-val"));

											// Sets `currentFocus` to the
											// currently focused dropdown list
											// option.
											// The unary `+` operator casts the
											// string to a number
											// [James Padolsey Blog
											// Post](http://james.padolsey.com/javascript/terse-javascript-101-part-2/)
											self.currentFocus = +elem
													.attr("data-id");

											// Triggers the dropdown list
											// `change` event if a value change
											// occurs
											if (self.originalElem.value !== self.dropdownText
													.attr("data-val")) {

												self.triggerEvent("change");

											}

										}

									}

								},

								// _addClasses
								// -----------
								// Adds SelectBoxIt CSS classes
								_addClasses : function(obj) {

									var self = this,

									focusClass = self.focusClass = obj.focus,

									hoverClass = self.hoverClass = obj.hover,

									buttonClass = obj.button,

									listClass = obj.list,

									arrowClass = obj.arrow,

									containerClass = obj.container,

									openClass = self.openClass = obj.open;

									self.selectedClass = "selectboxit-selected";

									self.downArrow.addClass(self.selectBox
											.attr("data-downarrow")
											|| self.options["downArrowIcon"]
											|| arrowClass);

									// Adds the correct container class to the
									// dropdown list
									self.dropdownContainer
											.addClass(containerClass);

									// Adds the correct class to the dropdown
									// list
									self.dropdown.addClass(buttonClass);

									// Adds the default class to the dropdown
									// list options
									self.list.addClass(listClass);

									// Maintains chainability
									return self;

								},

								// Refresh
								// -------
								// The dropdown will rebuild itself. Useful for
								// dynamic content.
								refresh : function(callback, internal) {

									var self = this;

									// Destroys the plugin and then recreates
									// the plugin
									self._destroySelectBoxIt()._create(true);

									if (!internal) {
										self.triggerEvent("refresh");
									}

									self._callbackSupport(callback);

									// Maintains chainability
									return self;

								},

								// HTML Escape
								// -----------
								// HTML encodes a string
								htmlEscape : function(str) {

									return String(str).replace(/&/g, "&amp;")
											.replace(/"/g, "&quot;").replace(
													/'/g, "&#39;").replace(
													/</g, "&lt;").replace(/>/g,
													"&gt;");

								},

								// triggerEvent
								// ------------
								// Trigger's an external event on the original
								// select box element
								triggerEvent : function(eventName) {

									var self = this,
									// Finds the currently option index
									currentIndex = self.options["showFirstOption"] ? self.currentFocus
											: ((self.currentFocus - 1) >= 0 ? self.currentFocus
													: 0);

									// Triggers the custom option-click event on
									// the original select box and passes the
									// select box option
									self.selectBox.trigger(eventName, {
										"selectbox" : self.selectBox,
										"selectboxOption" : self.selectItems
												.eq(currentIndex),
										"dropdown" : self.dropdown,
										"dropdownOption" : self.listItems
												.eq(self.currentFocus)
									});

									// Maintains chainability
									return self;

								},

								// _copyAttributes
								// ---------------
								// Copies HTML attributes from the original
								// select box to the new drop down
								_copyAttributes : function() {

									var self = this;

									if (self._addSelectBoxAttributes) {

										self._addSelectBoxAttributes();

									}

									return self;

								},

								// _realOuterWidth
								// ---------------
								// Retrieves the true outerWidth dimensions of a
								// hidden DOM element
								_realOuterWidth : function(elem) {

									if (elem.is(":visible")) {

										return elem.outerWidth(true);

									}

									var self = this, clonedElem = elem.clone(), outerWidth;

									clonedElem.css({

										"visibility" : "hidden",

										"display" : "block",

										"position" : "absolute"

									}).appendTo("body");

									outerWidth = clonedElem.outerWidth(true);

									clonedElem.remove();

									return outerWidth;
								}

							});

			// Stores the plugin prototype object in a local variable
			var selectBoxIt = $.selectBox.selectBoxIt.prototype;

			// Add Options Module
			// ==================

			// add
			// ---
			// Adds drop down options
			// using JSON data, an array,
			// a single object, or valid HTML string

			selectBoxIt.add = function(data, callback) {

				this
						._populate(
								data,
								function(data) {

									var self = this, dataType = $.type(data), value, x = 0, dataLength, elems = [], isJSON = self
											._isJSON(data), parsedJSON = isJSON
											&& self._parseJSON(data);

									// If the passed data is a local or JSON
									// array
									if (data
											&& (dataType === "array" || (isJSON
													&& parsedJSON.data && $
													.type(parsedJSON.data) === "array"))
											|| (dataType === "object"
													&& data.data && $
													.type(data.data) === "array")) {

										// If the data is JSON
										if (self._isJSON(data)) {

											// Parses the JSON and stores it in
											// the data local variable
											data = parsedJSON;

										}

										// If there is an inner `data` property
										// stored in the first level of the JSON
										// array
										if (data.data) {

											// Set's the data to the inner
											// `data` property
											data = data.data;

										}

										// Loops through the array
										for (dataLength = data.length; x <= dataLength - 1; x += 1) {

											// Stores the currently traversed
											// array item in the local `value`
											// variable
											value = data[x];

											// If the currently traversed array
											// item is an object literal
											if ($.isPlainObject(value)) {

												// Adds an option to the elems
												// array
												elems
														.push($("<option/>",
																value));

											}

											// If the currently traversed array
											// item is a string
											else if ($.type(value) === "string") {

												// Adds an option to the elems
												// array
												elems.push($("<option/>", {
													text : value,
													value : value
												}));

											}

										}

										// Appends all options to the drop down
										// (with the correct object
										// configurations)
										self.selectBox.append(elems);

									}

									// if the passed data is an html string and
									// not a JSON string
									else if (data && dataType === "string"
											&& !self._isJSON(data)) {

										// Appends the html string options to
										// the original select box
										self.selectBox.append(data);

									}

									else if (data && dataType === "object") {

										// Appends an option to the original
										// select box (with the object
										// configurations)
										self.selectBox.append($("<option/>",
												data));

									}

									else if (data
											&& self._isJSON(data)
											&& $.isPlainObject(self
													._parseJSON(data))) {

										// Appends an option to the original
										// select box (with the object
										// configurations)
										self.selectBox.append($("<option/>",
												self._parseJSON(data)));

									}

									// If the dropdown property exists
									if (self.dropdown) {

										// Rebuilds the dropdown
										self.refresh(function() {

											// Provide callback function support
											self._callbackSupport(callback);

										}, true);

									} else {

										// Provide callback function support
										self._callbackSupport(callback);

									}

									// Maintains chainability
									return self;

								});

			};

			// parseJSON
			// ---------
			// Detects JSON support and parses JSON data
			selectBoxIt._parseJSON = function(data) {

				return (JSON && JSON.parse && JSON.parse(data))
						|| $.parseJSON(data);

			};

			// isjSON
			// ------
			// Determines if a string is valid JSON

			selectBoxIt._isJSON = function(data) {

				var self = this, json;

				try {

					json = self._parseJSON(data);

					// Valid JSON
					return true;

				} catch (e) {

					// Invalid JSON
					return false;

				}

			};

			// _populate
			// --------
			// Handles asynchronous and synchronous data
			// to populate the select box

			selectBoxIt._populate = function(data, callback) {

				var self = this;

				data = $.isFunction(data) ? data.call() : data;

				if (self.isDeferred(data)) {

					data.done(function(returnedData) {

						callback.call(self, returnedData);

					});

				}

				else {

					callback.call(self, data);

				}

				// Maintains chainability
				return self;

			};

			// Accessibility Module
			// ====================

			// _ARIA Accessibility
			// ------------------
			// Adds ARIA (Accessible Rich Internet Applications)
			// Accessibility Tags to the Select Box

			selectBoxIt._ariaAccessibility = function() {

				var self = this, dropdownLabel = $("label[for='"
						+ self.originalElem.id + "']");

				// Adds `ARIA attributes` to the dropdown list
				self.dropdownContainer.attr({

					// W3C `combobox` description: A presentation of a select;
					// usually similar to a textbox where users can type ahead
					// to select an option.
					"role" : "combobox",

					// W3C `aria-autocomplete` description: Indicates whether
					// user input completion suggestions are provided.
					"aria-autocomplete" : "list",

					"aria-haspopup" : "true",

					// W3C `aria-expanded` description: Indicates whether the
					// element, or another grouping element it controls, is
					// currently expanded or collapsed.
					"aria-expanded" : "false",

					// W3C `aria-owns` description: The value of the aria-owns
					// attribute is a space-separated list of IDREFS that
					// reference one or more elements in the document by ID. The
					// reason for adding aria-owns is to expose a parent/child
					// contextual relationship to assistive technologies that is
					// otherwise impossible to infer from the DOM.
					"aria-owns" : self.list[0].id

				});

				self.dropdownText.attr({

					"aria-live" : "polite"

				});

				// Dynamically adds `ARIA attributes` if the new dropdown list
				// is enabled or disabled
				self.dropdown.on({

					// Select box custom `disable` event with the `selectBoxIt`
					// namespace
					"disable.selectBoxIt" : function() {

						// W3C `aria-disabled` description: Indicates that the
						// element is perceivable but disabled, so it is not
						// editable or otherwise operable.
						self.dropdownContainer.attr("aria-disabled", "true");

					},

					// Select box custom `enable` event with the `selectBoxIt`
					// namespace
					"enable.selectBoxIt" : function() {

						// W3C `aria-disabled` description: Indicates that the
						// element is perceivable but disabled, so it is not
						// editable or otherwise operable.
						self.dropdownContainer.attr("aria-disabled", "false");

					}

				});

				if (dropdownLabel.length) {

					// MDN `aria-labelledby` description: Indicates the IDs of
					// the elements that are the labels for the object.
					self.dropdownContainer.attr("aria-labelledby",
							dropdownLabel[0].id);

				}

				// Adds ARIA attributes to the dropdown list options list
				self.list.attr({

					// W3C `listbox` description: A widget that allows the user
					// to select one or more items from a list of choices.
					"role" : "listbox",

					// Indicates that the dropdown list options list is
					// currently hidden
					"aria-hidden" : "true"

				});

				// Adds `ARIA attributes` to the dropdown list options
				self.listItems.attr({

					// This must be set for each element when the container
					// element role is set to `listbox`
					"role" : "option"

				});

				// Dynamically updates the new dropdown list `aria-label`
				// attribute after the original dropdown list value changes
				self.selectBox.on({

					// Custom `open` event with the `selectBoxIt` namespace
					"open.selectBoxIt" : function() {

						// Indicates that the dropdown list options list is
						// currently visible
						self.list.attr("aria-hidden", "false");

						// Indicates that the dropdown list is currently
						// expanded
						self.dropdownContainer.attr("aria-expanded", "true");

					},

					// Custom `close` event with the `selectBoxIt` namespace
					"close.selectBoxIt" : function() {

						// Indicates that the dropdown list options list is
						// currently hidden
						self.list.attr("aria-hidden", "true");

						// Indicates that the dropdown list is currently
						// collapsed
						self.dropdownContainer.attr("aria-expanded", "false");

					}

				});

				// Maintains chainability
				return self;

			};

			// Copy Attributes Module
			// ======================

			// addSelectBoxAttributes
			// ----------------------
			// Add's all attributes (excluding id, class names, and the style
			// attribute) from the default select box to the new drop down

			selectBoxIt._addSelectBoxAttributes = function() {

				// Stores the plugin context inside of the self variable
				var self = this;

				// Add's all attributes to the currently traversed drop down
				// option
				self._addAttributes(self.selectBox.prop("attributes"),
						self.dropdown);

				// Add's all attributes to the drop down items list
				self.selectItems.each(function(iterator) {

					// Add's all attributes to the currently traversed drop down
					// option
					self._addAttributes($(this).prop("attributes"),
							self.listItems.eq(iterator));

				});

				// Maintains chainability
				return self;

			};

			// addAttributes
			// -------------
			// Add's attributes to a DOM element
			selectBoxIt._addAttributes = function(arr, elem) {

				// Stores the plugin context inside of the self variable
				var self = this, whitelist = self.options["copyAttributes"];

				// If there are array properties
				if (arr.length) {

					// Iterates over all of array properties
					$
							.each(
									arr,
									function(iterator, property) {

										// Get's the property name and property
										// value of each property
										var propName = (property.name)
												.toLowerCase(), propValue = property.value;

										// If the currently traversed property
										// value is not "null", is on the
										// whitelist, or is an HTML 5 data
										// attribute
										if (propValue !== "null"
												&& ($.inArray(propName,
														whitelist) !== -1 || propName
														.indexOf("data") !== -1)) {

											// Set's the currently traversed
											// property on element
											elem.attr(propName, propValue);

										}

									});

				}

				// Maintains chainability
				return self;

			};
			// Destroy Module
			// ==============

			// Destroy
			// -------
			// Removes the plugin from the page

			selectBoxIt.destroy = function(callback) {

				// Stores the plugin context inside of the self variable
				var self = this;

				self._destroySelectBoxIt();

				// Calls the jQueryUI Widget Factory destroy method
				self.widgetProto.destroy.call(self);

				// Provides callback function support
				self._callbackSupport(callback);

				// Maintains chainability
				return self;

			};

			// Internal Destroy Method
			// -----------------------
			// Removes the plugin from the page

			selectBoxIt._destroySelectBoxIt = function() {

				// Stores the plugin context inside of the self variable
				var self = this;

				// Unbinds all of the dropdown list event handlers with the
				// `selectBoxIt` namespace
				self.dropdown.off(".selectBoxIt");

				// If the original select box has been placed inside of the new
				// drop down container
				if ($.contains(self.dropdownContainer[0], self.originalElem)) {

					// Moves the original select box before the drop down
					// container
					self.dropdownContainer.before(self.selectBox);

				}

				// Remove all of the `selectBoxIt` DOM elements from the page
				self.dropdownContainer.remove();

				// Resets the style attributes for the original select box
				self.selectBox.removeAttr("style").attr("style",
						self.selectBoxStyles);

				// Triggers the custom `destroy` event on the original select
				// box
				self.triggerEvent("destroy");

				// Maintains chainability
				return self;

			};

			// Disable Module
			// ==============

			// Disable
			// -------
			// Disables the new dropdown list

			selectBoxIt.disable = function(callback) {

				var self = this;

				if (!self.options["disabled"]) {

					// Makes sure the dropdown list is closed
					self.close();

					// Sets the `disabled` attribute on the original select box
					self.selectBox.attr("disabled", "disabled");

					// Makes the dropdown list not focusable by removing the
					// `tabindex` attribute
					self.dropdown.removeAttr("tabindex").

					// Disables styling for enabled state
					removeClass(self.theme["enabled"]).

					// Enabled styling for disabled state
					addClass(self.theme["disabled"]);

					self.setOption("disabled", true);

					// Triggers a `disable` custom event on the original select
					// box
					self.triggerEvent("disable");

				}

				// Provides callback function support
				self._callbackSupport(callback);

				// Maintains chainability
				return self;

			};

			// Disable Option
			// --------------
			// Disables a single drop down option

			selectBoxIt.disableOption = function(index, callback) {

				var self = this, currentSelectBoxOption, hasNextEnabled, hasPreviousEnabled, type = $
						.type(index);

				// If an index is passed to target an indropdownidual drop down
				// option
				if (type === "number") {

					// Makes sure the dropdown list is closed
					self.close();

					// The select box option being targeted
					currentSelectBoxOption = self.selectBox.find("option").eq(
							index);

					// Triggers a `disable-option` custom event on the original
					// select box and passes the disabled option
					self.triggerEvent("disable-option");

					// Disables the targeted select box option
					currentSelectBoxOption.attr("disabled", "disabled");

					// Disables the drop down option
					self.listItems.eq(index).attr("data-disabled", "true").

					// Applies disabled styling for the drop down option
					addClass(self.theme["disabled"]);

					// If the currently selected drop down option is the item
					// being disabled
					if (self.currentFocus === index) {

						hasNextEnabled = self.listItems.eq(self.currentFocus)
								.nextAll("li").not("[data-disabled='true']")
								.first().length;

						hasPreviousEnabled = self.listItems.eq(
								self.currentFocus).prevAll("li").not(
								"[data-disabled='true']").first().length;

						// If there is a currently enabled option beneath the
						// currently selected option
						if (hasNextEnabled) {

							// Selects the option beneath the currently selected
							// option
							self.moveDown();

						}

						// If there is a currently enabled option above the
						// currently selected option
						else if (hasPreviousEnabled) {

							// Selects the option above the currently selected
							// option
							self.moveUp();

						}

						// If there is not a currently enabled option
						else {

							// Disables the entire drop down list
							self.disable();

						}

					}

				}

				// Provides callback function support
				self._callbackSupport(callback);

				// Maintains chainability
				return self;

			};

			// _Is Disabled
			// -----------
			// Checks the original select box for the
			// disabled attribute

			selectBoxIt._isDisabled = function(callback) {

				var self = this;

				// If the original select box is disabled
				if (self.originalElem.disabled) {

					// Disables the dropdown list
					self.disable();

				}

				// Maintains chainability
				return self;

			};

			// Dynamic Positioning Module
			// ==========================

			// _Dynamic positioning
			// --------------------
			// Dynamically positions the dropdown list options list

			selectBoxIt._dynamicPositioning = function() {

				var self = this;

				// If the `size` option is a number
				if ($.type(self.listSize) === "number") {

					// Set's the max-height of the drop down list
					self.list.css("max-height", self.maxHeight || "none");

				}

				// If the `size` option is not a number
				else {

					// Returns the x and y coordinates of the dropdown list
					// options list relative to the document
					var listOffsetTop = self.dropdown.offset().top,

					// The height of the dropdown list options list
					listHeight = self.list.data("max-height")
							|| self.list.outerHeight(),

					// The height of the dropdown list DOM element
					selectBoxHeight = self.dropdown.outerHeight(),

					viewport = self.options["viewport"],

					viewportHeight = viewport.height(),

					viewportScrollTop = $.isWindow(viewport.get(0)) ? viewport
							.scrollTop() : viewport.offset().top,

					topToBottom = (listOffsetTop + selectBoxHeight + listHeight <= viewportHeight
							+ viewportScrollTop),

					bottomReached = !topToBottom;

					if (!self.list.data("max-height")) {

						self.list.data("max-height", self.list.outerHeight());

					}

					// If there is room on the bottom of the viewport to display
					// the drop down options
					if (!bottomReached) {

						self.list.css("max-height", listHeight);

						// Sets custom CSS properties to place the dropdown list
						// options directly below the dropdown list
						self.list.css("top", "auto");

					}

					// If there is room on the top of the viewport
					else if ((self.dropdown.offset().top - viewportScrollTop) >= listHeight) {

						self.list.css("max-height", listHeight);

						// Sets custom CSS properties to place the dropdown list
						// options directly above the dropdown list
						self.list.css("top",
								(self.dropdown.position().top - self.list
										.outerHeight()));

					}

					// If there is not enough room on the top or the bottom
					else {

						var outsideBottomViewport = Math.abs((listOffsetTop
								+ selectBoxHeight + listHeight)
								- (viewportHeight + viewportScrollTop)),

						outsideTopViewport = Math
								.abs((self.dropdown.offset().top - viewportScrollTop)
										- listHeight);

						// If there is more room on the bottom
						if (outsideBottomViewport < outsideTopViewport) {

							self.list.css("max-height", listHeight
									- outsideBottomViewport
									- (selectBoxHeight / 2));

							self.list.css("top", "auto");

						}

						// If there is more room on the top
						else {

							self.list.css("max-height", listHeight
									- outsideTopViewport
									- (selectBoxHeight / 2));

							// Sets custom CSS properties to place the dropdown
							// list options directly above the dropdown list
							self.list.css("top",
									(self.dropdown.position().top - self.list
											.outerHeight()));

						}

					}

				}

				// Maintains chainability
				return self;

			};

			// Enable Module
			// =============

			// Enable
			// ------
			// Enables the new dropdown list

			selectBoxIt.enable = function(callback) {

				var self = this;

				if (self.options["disabled"]) {

					// Triggers a `enable` custom event on the original select
					// box
					self.triggerEvent("enable");

					// Removes the `disabled` attribute from the original
					// dropdown list
					self.selectBox.removeAttr("disabled");

					// Make the dropdown list focusable
					self.dropdown.attr("tabindex", 0).

					// Disable styling for disabled state
					removeClass(self.theme["disabled"]).

					// Enables styling for enabled state
					addClass(self.theme["enabled"]);

					self.setOption("disabled", false);

					// Provide callback function support
					self._callbackSupport(callback);

				}

				// Maintains chainability
				return self;

			};

			// Enable Option
			// -------------
			// Disables a single drop down option

			selectBoxIt.enableOption = function(index, callback) {

				var self = this, currentSelectBoxOption, currentIndex = 0, hasNextEnabled, hasPreviousEnabled, type = $
						.type(index);

				// If an index is passed to target an indropdownidual drop down
				// option
				if (type === "number") {

					// The select box option being targeted
					currentSelectBoxOption = self.selectBox.find("option").eq(
							index);

					// Triggers a `enable-option` custom event on the original
					// select box and passes the enabled option
					self.triggerEvent("enable-option");

					// Disables the targeted select box option
					currentSelectBoxOption.removeAttr("disabled");

					// Disables the drop down option
					self.listItems.eq(index).attr("data-disabled", "false").

					// Applies disabled styling for the drop down option
					removeClass(self.theme["disabled"]);

				}

				// Provides callback function support
				self._callbackSupport(callback);

				// Maintains chainability
				return self;

			};

			// Keyboard Navigation Module
			// ==========================

			// Move Down
			// ---------
			// Handles the down keyboard navigation logic

			selectBoxIt.moveDown = function(callback) {

				var self = this;

				// Increments `currentFocus`, which represents the currently
				// focused list item `id` attribute.
				self.currentFocus += 1;

				// Determines whether the dropdown option the user is trying to
				// go to is currently disabled
				var disabled = self.listItems.eq(self.currentFocus).attr(
						"data-disabled") === "true" ? true : false,

				hasNextEnabled = self.listItems.eq(self.currentFocus).nextAll(
						"li").not("[data-disabled='true']").first().length;

				// If the user has reached the top of the list
				if (self.currentFocus === self.listItems.length) {

					// Does not allow the user to continue to go up the list
					self.currentFocus -= 1;

				}

				// If the option the user is trying to go to is disabled, but
				// there is another enabled option
				else if (disabled && hasNextEnabled) {

					// Blur the previously selected option
					self.listItems.eq(self.currentFocus - 1).blur();

					// Call the `moveDown` method again
					self.moveDown();

					// Exit the method
					return;

				}

				// If the option the user is trying to go to is disabled, but
				// there is not another enabled option
				else if (disabled && !hasNextEnabled) {

					self.currentFocus -= 1;

				}

				// If the user has not reached the bottom of the unordered list
				else {

					// Blurs the previously focused list item
					// The jQuery `end()` method allows you to continue chaining
					// while also using a different selector
					self.listItems.eq(self.currentFocus - 1).blur().end().

					// Focuses the currently focused list item
					eq(self.currentFocus).focusin();

					// Calls `scrollToView` to make sure the `scrollTop` is
					// correctly updated. The `down` user action
					self._scrollToView("down");

					// Triggers the custom `moveDown` event on the original
					// select box
					self.triggerEvent("moveDown");

				}

				// Provide callback function support
				self._callbackSupport(callback);

				// Maintains chainability
				return self;

			};

			// Move Up
			// ------
			// Handles the up keyboard navigation logic
			selectBoxIt.moveUp = function(callback) {

				var self = this;

				// Increments `currentFocus`, which represents the currently
				// focused list item `id` attribute.
				self.currentFocus -= 1;

				// Determines whether the dropdown option the user is trying to
				// go to is currently disabled
				var disabled = self.listItems.eq(self.currentFocus).attr(
						"data-disabled") === "true" ? true : false,

				hasPreviousEnabled = self.listItems.eq(self.currentFocus)
						.prevAll("li").not("[data-disabled='true']").first().length;

				// If the user has reached the top of the list
				if (self.currentFocus === -1) {

					// Does not allow the user to continue to go up the list
					self.currentFocus += 1;

				}

				// If the option the user is trying to go to is disabled and the
				// user is not trying to go up after the user has reached the
				// top of the list
				else if (disabled && hasPreviousEnabled) {

					// Blur the previously selected option
					self.listItems.eq(self.currentFocus + 1).blur();

					// Call the `moveUp` method again
					self.moveUp();

					// Exits the method
					return;

				}

				else if (disabled && !hasPreviousEnabled) {

					self.currentFocus += 1;

				}

				// If the user has not reached the top of the unordered list
				else {

					// Blurs the previously focused list item
					// The jQuery `end()` method allows you to continue chaining
					// while also using a different selector
					self.listItems.eq(this.currentFocus + 1).blur().end().

					// Focuses the currently focused list item
					eq(self.currentFocus).focusin();

					// Calls `scrollToView` to make sure the `scrollTop` is
					// correctly updated. The `down` user action
					self._scrollToView("up");

					// Triggers the custom `moveDown` event on the original
					// select box
					self.triggerEvent("moveUp");

				}

				// Provide callback function support
				self._callbackSupport(callback);

				// Maintains chainability
				return self;

			};

			// Keyboard Search Module
			// ======================

			// _Set Current Search Option
			// -------------------------
			// Sets the currently selected dropdown list search option

			selectBoxIt._setCurrentSearchOption = function(currentOption) {

				var self = this;

				// Does not change the current option if `showFirstOption` is
				// false and the matched search item is the hidden first option.
				// Otherwise, the current option value is updated
				if ((self.options["aggressiveChange"]
						|| self.options["selectWhenHidden"] || self.listItems
						.eq(currentOption).is(":visible"))
						&& self.listItems.eq(currentOption).data("disabled") !== true) {

					// Calls the `blur` event of the currently selected dropdown
					// list option
					self.listItems.eq(self.currentFocus).blur();

					// Sets `currentIndex` to the currently selected dropdown
					// list option
					self.currentIndex = currentOption;

					// Sets `currentFocus` to the currently selected dropdown
					// list option
					self.currentFocus = currentOption;

					// Focuses the currently selected dropdown list option
					self.listItems.eq(self.currentFocus).focusin();

					// Updates the scrollTop so that the currently selected
					// dropdown list option is visible to the user
					self._scrollToView("search");

					// Triggers the custom `search` event on the original select
					// box
					self.triggerEvent("search");

				}

				// Maintains chainability
				return self;

			};

			// _Search Algorithm
			// -----------------
			// Uses regular expressions to find text matches
			selectBoxIt._searchAlgorithm = function(currentIndex, alphaNumeric) {

				var self = this,

				// Boolean to determine if a pattern match exists
				matchExists = false,

				// Iteration variable used in the outermost for loop
				x,

				// Iteration variable used in the nested for loop
				y,

				// Variable used to cache the length of the text array (Small
				// enhancement to speed up traversing)
				arrayLength,

				// Variable storing the current search
				currentSearch,

				// Variable storing the textArray property
				textArray = self.textArray,

				// Variable storing the current text property
				currentText = self.currentText;

				// Loops through the text array to find a pattern match
				for (x = currentIndex, arrayLength = textArray.length; x < arrayLength; x += 1) {

					currentSearch = textArray[x];

					// Nested for loop to help search for a pattern match with
					// the currently traversed array item
					for (y = 0; y < arrayLength; y += 1) {

						// Searches for a match
						if (textArray[y].search(alphaNumeric) !== -1) {

							// `matchExists` is set to true if there is a match
							matchExists = true;

							// Exits the nested for loop
							y = arrayLength;

						}

					} // End nested for loop

					// If a match does not exist
					if (!matchExists) {

						// Sets the current text to the last entered character
						self.currentText = self.currentText.charAt(
								self.currentText.length - 1).

						// Escapes the regular expression to make sure special
						// characters are seen as literal characters instead of
						// special commands
						replace(/[|()\[{.+*?$\\]/g, "\\$0");

						currentText = self.currentText;

					}

					// Resets the regular expression with the new value of
					// `self.currentText`
					alphaNumeric = new RegExp(currentText, "gi");

					// Searches based on the first letter of the dropdown list
					// options text if the currentText < 3 characters
					if (currentText.length < 3) {

						alphaNumeric = new RegExp(currentText.charAt(0), "gi");

						// If there is a match based on the first character
						if ((currentSearch.charAt(0).search(alphaNumeric) !== -1)) {

							// Sets properties of that dropdown list option to
							// make it the currently selected option
							self._setCurrentSearchOption(x);

							if ((currentSearch.substring(0, currentText.length)
									.toLowerCase() !== currentText
									.toLowerCase())
									|| self.options["similarSearch"]) {

								// Increments the current index by one
								self.currentIndex += 1;

							}

							// Exits the search
							return false;

						}

					}

					// If `self.currentText` > 1 character
					else {

						// If there is a match based on the entire string
						if ((currentSearch.search(alphaNumeric) !== -1)) {

							// Sets properties of that dropdown list option to
							// make it the currently selected option
							self._setCurrentSearchOption(x);

							// Exits the search
							return false;

						}

					}

					// If the current text search is an exact match
					if (currentSearch.toLowerCase() === self.currentText
							.toLowerCase()) {

						// Sets properties of that dropdown list option to make
						// it the currently selected option
						self._setCurrentSearchOption(x);

						// Resets the current text search to a blank string to
						// start fresh again
						self.currentText = "";

						// Exits the search
						return false;

					}

				}

				// Returns true if there is not a match at all
				return true;

			};

			// Search
			// ------
			// Calls searchAlgorithm()
			selectBoxIt.search = function(alphaNumericKey, callback,
					rememberPreviousSearch) {

				var self = this;

				// If the search method is being called internally by the
				// plugin, and not externally as a method by a user
				if (rememberPreviousSearch) {

					// Continued search with history from past searches.
					// Properly escapes the regular expression
					self.currentText += alphaNumericKey.replace(
							/[|()\[{.+*?$\\]/g, "\\$0");

				}

				else {

					// Brand new search. Properly escapes the regular expression
					self.currentText = alphaNumericKey.replace(
							/[|()\[{.+*?$\\]/g, "\\$0");

				}

				// Searches globally
				var searchResults = self._searchAlgorithm(self.currentIndex,
						new RegExp(self.currentText, "gi"));

				// Searches the list again if a match is not found. This is
				// needed, because the first search started at the array indece
				// of the currently selected dropdown list option, and does not
				// search the options before the current array indece.
				// If there are many similar dropdown list options, starting the
				// search at the indece of the currently selected dropdown list
				// option is needed to properly traverse the text array.
				if (searchResults) {

					// Searches the dropdown list values starting from the
					// beginning of the text array
					self._searchAlgorithm(0, self.currentText);

				}

				// Provide callback function support
				self._callbackSupport(callback);

				// Maintains chainability
				return self;

			};

			// Mobile Module
			// =============

			// Set Mobile Text
			// ---------------
			// Updates the text of the drop down
			selectBoxIt._updateMobileText = function() {

				var self = this, currentOption, currentDataText, currentText;

				currentOption = self.selectBox.find("option").filter(
						":selected");

				currentDataText = currentOption.attr("data-text");

				currentText = currentDataText ? currentDataText : currentOption
						.text();

				// Sets the new dropdown list text to the value of the original
				// dropdown list
				self._setText(self.dropdownText, currentText);

				if (self.list
						.find('li[data-val="' + currentOption.val() + '"]')
						.find("i").attr("class")) {

					self.dropdownImage.attr(
							"class",
							self.list.find(
									'li[data-val="' + currentOption.val()
											+ '"]').find("i").attr("class"))
							.addClass("selectboxit-default-icon");

				}

			};

			// Apply Native Select
			// -------------------
			// Applies the original select box directly over the new drop down

			selectBoxIt._applyNativeSelect = function() {

				// Stores the plugin context inside of the self variable
				var self = this;

				// Appends the native select box to the drop down (allows for
				// relative positioning using the position() method)
				self.dropdownContainer.append(self.selectBox);

				self.dropdown.attr("tabindex", "-1");

				// Positions the original select box directly over top the new
				// dropdown list using position absolute and "hides" the
				// original select box using an opacity of 0. This allows the
				// mobile browser "wheel" interface for better usability.
				self.selectBox.css({

					"display" : "block",

					"visibility" : "visible",

					"width" : self._realOuterWidth(self.dropdown),

					"height" : self.dropdown.outerHeight(),

					"opacity" : "0",

					"position" : "absolute",

					"top" : "0",

					"left" : "0",

					"cursor" : "pointer",

					"z-index" : "999999",

					"margin" : self.dropdown.css("margin"),

					"padding" : "0",

					"-webkit-appearance" : "menulist-button"

				});

				if (self.originalElem.disabled) {

					self.triggerEvent("disable");

				}

				return this;

			};

			// Mobile Events
			// -------------
			// Listens to mobile-specific events
			selectBoxIt._mobileEvents = function() {

				var self = this;

				self.selectBox.on({

					"changed.selectBoxIt" : function() {

						self.hasChanged = true;

						self._updateMobileText();

						// Triggers the `option-click` event on mobile
						self.triggerEvent("option-click");

					},

					"mousedown.selectBoxIt" : function() {

						// If the select box has not been changed, the
						// defaultText option is being used
						if (!self.hasChanged && self.options.defaultText
								&& !self.originalElem.disabled) {

							self._updateMobileText();

							self.triggerEvent("option-click");

						}

					},

					"enable.selectBoxIt" : function() {

						// Moves SelectBoxIt onto the page
						self.selectBox.removeClass('selectboxit-rendering');

					},

					"disable.selectBoxIt" : function() {

						// Moves SelectBoxIt off the page
						self.selectBox.addClass('selectboxit-rendering');

					}

				});

			};

			// Mobile
			// ------
			// Applies the native "wheel" interface when a mobile user is
			// interacting with the dropdown

			selectBoxIt._mobile = function(callback) {

				// Stores the plugin context inside of the self variable
				var self = this;

				if (self.isMobile) {

					self._applyNativeSelect();

					self._mobileEvents();

				}

				// Maintains chainability
				return this;

			};

			// Remove Options Module
			// =====================

			// remove
			// ------
			// Removes drop down list options
			// using an index

			selectBoxIt.remove = function(indexes, callback) {

				var self = this, dataType = $.type(indexes), value, x = 0, dataLength, elems = "";

				// If an array is passed in
				if (dataType === "array") {

					// Loops through the array
					for (dataLength = indexes.length; x <= dataLength - 1; x += 1) {

						// Stores the currently traversed array item in the
						// local `value` variable
						value = indexes[x];

						// If the currently traversed array item is an object
						// literal
						if ($.type(value) === "number") {

							if (elems.length) {

								// Adds an element to the removal string
								elems += ", option:eq(" + value + ")";

							}

							else {

								// Adds an element to the removal string
								elems += "option:eq(" + value + ")";

							}

						}

					}

					// Removes all of the appropriate options from the select
					// box
					self.selectBox.find(elems).remove();

				}

				// If a number is passed in
				else if (dataType === "number") {

					self.selectBox.find("option").eq(indexes).remove();

				}

				// If anything besides a number or array is passed in
				else {

					// Removes all of the options from the original select box
					self.selectBox.find("option").remove();

				}

				// If the dropdown property exists
				if (self.dropdown) {

					// Rebuilds the dropdown
					self.refresh(function() {

						// Provide callback function support
						self._callbackSupport(callback);

					}, true);

				} else {

					// Provide callback function support
					self._callbackSupport(callback);

				}

				// Maintains chainability
				return self;

			};

			// Select Option Module
			// ====================

			// Select Option
			// -------------
			// Programatically selects a drop down option by either index or
			// value

			selectBoxIt.selectOption = function(val, callback) {

				// Stores the plugin context inside of the self variable
				var self = this, type = $.type(val);

				// Makes sure the passed in position is a number
				if (type === "number") {

					// Set's the original select box value and triggers the
					// change event (which SelectBoxIt listens for)
					self.selectBox.val(self.selectItems.eq(val).val()).change();

				}

				else if (type === "string") {

					// Set's the original select box value and triggers the
					// change event (which SelectBoxIt listens for)
					self.selectBox.val(val).change();

				}

				// Calls the callback function
				self._callbackSupport(callback);

				// Maintains chainability
				return self;

			};

			// Set Option Module
			// =================

			// Set Option
			// ----------
			// Accepts an string key, a value, and a callback function to
			// replace a single
			// property of the plugin options object

			selectBoxIt.setOption = function(key, value, callback) {

				var self = this;

				// Makes sure a string is passed in
				if ($.type(key) === "string") {

					// Sets the plugin option to the new value provided by the
					// user
					self.options[key] = value;

				}

				// Rebuilds the dropdown
				self.refresh(function() {

					// Provide callback function support
					self._callbackSupport(callback);

				}, true);

				// Maintains chainability
				return self;

			};

			// Set Options Module
			// ==================

			// Set Options
			// ----------
			// Accepts an object to replace plugin options
			// properties of the plugin options object

			selectBoxIt.setOptions = function(newOptions, callback) {

				var self = this;

				// If the passed in parameter is an object literal
				if ($.isPlainObject(newOptions)) {

					self.options = $.extend({}, self.options, newOptions);

				}

				// Rebuilds the dropdown
				self.refresh(function() {

					// Provide callback function support
					self._callbackSupport(callback);

				}, true);

				// Maintains chainability
				return self;

			};

			// Wait Module
			// ===========

			// Wait
			// ----
			// Delays execution by the amount of time
			// specified by the parameter

			selectBoxIt.wait = function(time, callback) {

				var self = this;

				self.widgetProto._delay.call(self, callback, time);

				// Maintains chainability
				return self;

			};
		})); // End of all modules

/*
 * ! bootstrap-select v1.4.3 http://silviomoreto.github.io/bootstrap-select/
 * modify by lijian
 * 
 * Copyright 2013 bootstrap-select Licensed under the MIT license
 */

!function($) {

	'use strict';

	$.expr[':'].icontains = function(obj, index, meta) {
		return $(obj).text().toUpperCase().indexOf(meta[3].toUpperCase()) >= 0;
	};

	var Selectpicker = function(element, options, e) {
		if (e) {
			e.stopPropagation();
			e.preventDefault();
		}
		this.$element = $(element);
		this.$newElement = null;
		this.$button = null;
		this.$menu = null;
		this.$lis = null;
		this.$name = null;
		this.$label = "";
		this.$valid = true;

		// Merge defaults, options and data-attributes to make our options
		this.options = $.extend({}, $.fn.selectpicker.defaults, this.$element
				.data(), typeof options == 'object' && options);

		// If we have no title yet, check the attribute 'title' (this is missed
		// by jq as its not a data-attribute
		if (this.options.title === null) {
			this.options.title = this.$element.attr('title');
		}

		// Expose public methods
		this.val = Selectpicker.prototype.val;
		this.render = Selectpicker.prototype.render;
		this.refresh = Selectpicker.prototype.refresh;
		this.setStyle = Selectpicker.prototype.setStyle;
		this.selectAll = Selectpicker.prototype.selectAll;
		this.deselectAll = Selectpicker.prototype.deselectAll;
		this.init();
	};

	Selectpicker.prototype = {

		constructor : Selectpicker,

		init : function() {
			var that = this, id = this.$element.attr('id');
			this.id = id;
			this.$element.hide();
			this.multiple = this.$element.prop('multiple');
			this.autofocus = this.$element.prop('autofocus');
			this.name = this.$element.data('name');
			this.valid = this.$element.attr('cwap-valid');
			this.label = this.$element.attr('cwap-label');
			this.$newElement = this.createView();
			this.$element.after(this.$newElement);
			this.$menu = this.$newElement.find('> .dropdown-menu');
			this.$button = this.$newElement.find('> button');
			this.$searchbox = this.$newElement.find('input');
			if (id !== undefined) {
				this.$button.attr('data-id', id);
				$('label[for="' + id + '"]').click(function(e) {
					e.preventDefault();
					that.$button.focus();
				});
			}
			this.checkDisabled();
			this.clickListener();
			if (this.options.liveSearch)
				this.liveSearchListener();
			this.render();
			this.liHeight();
			this.setStyle();
			this.setWidth();
			if (this.options.container)
				this.selectPosition();
			this.$menu.data('this', this);
			this.$newElement.data('this', this);
		},

		createDropdown : function() {
			// alert(this.name);
			// If we are multiple, then add the show-tick class by default
			var multiple = this.multiple ? ' show-tick' : '';
			var autofocus = this.autofocus ? ' autofocus' : '';
			var header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'
					+ this.options.header + '</div>'
					: '';
			var searchbox = this.options.liveSearch ? '<div class="bootstrap-select-searchbox"><input type="text" class="input-block-level form-control" /></div>'
					: '';
			var validitems = ' ';
			if (this.valid == 'true') {
				validitems = 'cwap-valid="true" cwap-label="' + this.label
						+ '" cwap-required="true" cwap-for="note_name_'
						+ this.id + '" ';
			}
			var drop = '<div class="btn-group bootstrap-select'
					+ multiple
					+ '">'
					+ '<input type="hidden" value="2" name="'
					+ this.name
					+ '"'
					+ validitems
					+ '/>'
					+ '<button type="button" class="btn dropdown-toggle selectpicker" data-toggle="dropdown"'
					+ autofocus
					+ ' style="border-bottom-left-radius: 4px !important;border-top-left-radius: 4px !important;">'
					+ '<span class="filter-option pull-left"></span>&nbsp;'
					+ '<span class="caret"></span>'
					+ '</button>'
					+ '<div class="dropdown-menu open">'
					+ header
					+ searchbox
					+ '<ul class="dropdown-menu inner selectpicker" role="menu">'
					+ '</ul>' + '</div>' + '</div>';

			return $(drop);
		},

		createView : function() {
			var $drop = this.createDropdown();
			var $li = this.createLi();
			$drop.find('ul').append($li);
			return $drop;
		},

		reloadLi : function() {
			// Remove all children.
			this.destroyLi();
			// Re build
			var $li = this.createLi();
			this.$menu.find('ul').append($li);
		},

		destroyLi : function() {
			this.$menu.find('li').remove();
		},

		createLi : function() {
			var that = this, _liA = [], _liHtml = '';

			this.$element
					.find('option')
					.each(
							function() {
								var $this = $(this);

								// Get the class and text for the option
								var optionClass = $this.attr('class') || '';
								var inline = $this.attr('style') || '';
								var text = $this.data('content') ? $this
										.data('content') : $this.html();
								var subtext = $this.data('subtext') !== undefined ? '<small class="muted text-muted">'
										+ $this.data('subtext') + '</small>'
										: '';
								var icon = $this.data('icon') !== undefined ? '<i class="'
										+ that.options.iconBase
										+ ' '
										+ $this.data('icon') + '"></i> '
										: '';
								if (icon !== ''
										&& ($this.is(':disabled') || $this
												.parent().is(':disabled'))) {
									icon = '<span>' + icon + '</span>';
								}

								if (!$this.data('content')) {
									// Prepend any icon and append any subtext
									// to the main text.
									text = icon + '<span class="text">' + text
											+ subtext + '</span>';
								}

								if (that.options.hideDisabled
										&& ($this.is(':disabled') || $this
												.parent().is(':disabled'))) {
									_liA
											.push('<a style="min-height: 0; padding: 0"></a>');
								} else if ($this.parent().is('optgroup')
										&& $this.data('divider') !== true) {
									if ($this.index() === 0) {
										// Get the opt group label
										var label = $this.parent()
												.attr('label');
										var labelSubtext = $this.parent().data(
												'subtext') !== undefined ? '<small class="muted text-muted">'
												+ $this.parent()
														.data('subtext')
												+ '</small>'
												: '';
										var labelIcon = $this.parent().data(
												'icon') ? '<i class="'
												+ $this.parent().data('icon')
												+ '"></i> ' : '';
										label = labelIcon
												+ '<span class="text">' + label
												+ labelSubtext + '</span>';

										if ($this[0].index !== 0) {
											_liA
													.push('<div class="div-contain"><div class="divider"></div></div>'
															+ '<dt>'
															+ label
															+ '</dt>'
															+ that
																	.createA(
																			text,
																			'opt '
																					+ optionClass,
																			inline));
										} else {
											_liA.push('<dt>'
													+ label
													+ '</dt>'
													+ that.createA(text, 'opt '
															+ optionClass,
															inline));
										}
									} else {
										_liA.push(that.createA(text, 'opt '
												+ optionClass, inline));
									}
								} else if ($this.data('divider') === true) {
									_liA
											.push('<div class="div-contain"><div class="divider"></div></div>');
								} else if ($(this).data('hidden') === true) {
									_liA.push('');
								} else {
									_liA.push(that.createA(text, optionClass,
											inline));
								}
							});

			$.each(_liA, function(i, item) {
				_liHtml += '<li rel=' + i + '>' + item + '</li>';
			});

			// If we are not multiple, and we dont have a selected item, and we
			// dont have a title, select the first element so something is set
			// in the button
			if (!this.multiple
					&& this.$element.find('option:selected').length === 0
					&& !this.options.title) {
				this.$element.find('option').eq(0).prop('selected', true).attr(
						'selected', 'selected');
			}

			return $(_liHtml);
		},

		createA : function(text, classes, inline) {
			return '<a tabindex="0" class="' + classes + '" style="' + inline
					+ '">' + text + '<i class="' + this.options.iconBase + ' '
					+ this.options.tickIcon + ' icon-ok check-mark"></i>'
					+ '</a>';
		},

		render : function(updateLi) {
			var that = this;

			// Update the LI to match the SELECT
			if (updateLi !== false) {
				this.$element.find('option').each(
						function(index) {
							that.setDisabled(index, $(this).is(':disabled')
									|| $(this).parent().is(':disabled'));
							that.setSelected(index, $(this).is(':selected'));
						});
			}

			this.tabIndex();

			var selectedItems = this.$element
					.find('option:selected')
					.map(
							function() {
								var $this = $(this);
								var icon = $this.data('icon')
										&& that.options.showIcon ? '<i class="'
										+ that.options.iconBase + ' '
										+ $this.data('icon') + '"></i> ' : '';
								var subtext;
								if (that.options.showSubtext
										&& $this.attr('data-subtext')
										&& !that.multiple) {
									subtext = ' <small class="muted text-muted">'
											+ $this.data('subtext')
											+ '</small>';
								} else {
									subtext = '';
								}
								if ($this.data('content')
										&& that.options.showContent) {
									// alert($this.data('content'));
									return $this.data('content');
								} else if ($this.attr('title') !== undefined) {
									return $this.attr('title');
								} else {
									return icon + $this.html() + subtext;
								}
							}).toArray();

			var selectedValues = this.$element.find('option:selected').map(
					function() {
						var $this = $(this);
						var val = $this.val();
						// alert(val);
						return val;
					}).toArray();

			// Fixes issue in IE10 occurring when no default option is selected
			// and at least one option is disabled
			// Convert all the values into a comma delimited string
			// alert(selectedValues[0]);
			var title = !this.multiple ? selectedItems[0] : selectedItems
					.join(this.options.multipleSeparator);

			var val = !this.multiple ? selectedValues[0] : selectedValues
					.join(this.options.multipleSeparator);

			// If this is multi select, and the selectText type is count, the
			// show 1 of 2 selected etc..
			if (this.multiple
					&& this.options.selectedTextFormat.indexOf('count') > -1) {
				var max = this.options.selectedTextFormat.split('>');
				var notDisabled = this.options.hideDisabled ? ':not([disabled])'
						: '';
				if ((max.length > 1 && selectedItems.length > max[1])
						|| (max.length == 1 && selectedItems.length >= 2)) {
					title = this.options.countSelectedText
							.replace('{0}', selectedItems.length)
							.replace(
									'{1}',
									this.$element
											.find('option:not([data-divider="true"]):not([data-hidden="true"])'
													+ notDisabled).length);
				}
			}
			// alert(val);

			// If we dont have a title, then use the default, or if nothing is
			// set at all, use the not selected text
			if (!title) {
				title = this.options.title !== undefined ? this.options.title
						: this.options.noneSelectedText;
			}

			this.$button.attr('title', $.trim(title));
			this.$newElement.find('.filter-option').html(title);
			// alert(this.name);
			// alert(this.$newElement.html());
			var o = "input[name=" + this.name + "]";
			// alert(o);
			// alert(this.$newElement.find(o).val())
			// alert(this.$newElement.find().val(o));
			this.$newElement.find(o).val(val);
		},

		setStyle : function(style, status) {
			if (this.$element.attr('class')) {
				this.$newElement.addClass(this.$element.attr('class').replace(
						/selectpicker|mobile-device/gi, ''));
			}

			var buttonClass = style ? style : this.options.style;

			if (status == 'add') {
				this.$button.addClass(buttonClass);
			} else if (status == 'remove') {
				this.$button.removeClass(buttonClass);
			} else {
				this.$button.removeClass(this.options.style);
				this.$button.addClass(buttonClass);
			}
		},

		liHeight : function() {
			var $selectClone = this.$menu.parent().clone().find(
					'> .dropdown-toggle').prop('autofocus', false).end()
					.appendTo('body'), $menuClone = $selectClone.addClass(
					'open').find('> .dropdown-menu'), liHeight = $menuClone
					.find('li > a').outerHeight(), headerHeight = this.options.header ? $menuClone
					.find('.popover-title').outerHeight()
					: 0, searchHeight = this.options.liveSearch ? $menuClone
					.find('.bootstrap-select-searchbox').outerHeight() : 0;

			$selectClone.remove();

			this.$newElement.data('liHeight', liHeight).data('headerHeight',
					headerHeight).data('searchHeight', searchHeight);
		},

		setSize : function() {
			var that = this, menu = this.$menu, menuInner = menu.find('.inner'), selectHeight = this.$newElement
					.outerHeight(), liHeight = this.$newElement
					.data('liHeight'), headerHeight = this.$newElement
					.data('headerHeight'), searchHeight = this.$newElement
					.data('searchHeight'), divHeight = menu.find('li .divider')
					.outerHeight(true), menuPadding = parseInt(menu
					.css('padding-top'))
					+ parseInt(menu.css('padding-bottom'))
					+ parseInt(menu.css('border-top-width'))
					+ parseInt(menu.css('border-bottom-width')), notDisabled = this.options.hideDisabled ? ':not(.disabled)'
					: '', $window = $(window), menuExtras = menuPadding
					+ parseInt(menu.css('margin-top'))
					+ parseInt(menu.css('margin-bottom')) + 2, menuHeight, selectOffsetTop, selectOffsetBot, posVert = function() {
				selectOffsetTop = that.$newElement.offset().top
						- $window.scrollTop();
				selectOffsetBot = $window.height() - selectOffsetTop
						- selectHeight;
			};
			posVert();
			if (this.options.header)
				menu.css('padding-top', 0);

			if (this.options.size == 'auto') {
				var getSize = function() {
					var minHeight;
					posVert();
					menuHeight = selectOffsetBot - menuExtras;
					if (that.options.dropupAuto) {
						that.$newElement.toggleClass('dropup',
								(selectOffsetTop > selectOffsetBot)
										&& ((menuHeight - menuExtras) < menu
												.height()));
					}
					if (that.$newElement.hasClass('dropup')) {
						menuHeight = selectOffsetTop - menuExtras;
					}
					if ((menu.find('li').length + menu.find('dt').length) > 3) {
						minHeight = liHeight * 3 + menuExtras - 2;
					} else {
						minHeight = 0;
					}
					menu.css({
						'max-height' : menuHeight + 'px',
						'overflow' : 'hidden',
						'min-height' : minHeight + 'px'
					});
					menuInner.css({
						'max-height' : menuHeight - headerHeight - searchHeight
								- menuPadding + 'px',
						'overflow-y' : 'auto',
						'min-height' : minHeight - menuPadding + 'px'
					});
				};
				getSize();
				$(window).resize(getSize);
				$(window).scroll(getSize);
			} else if (this.options.size && this.options.size != 'auto'
					&& menu.find('li' + notDisabled).length > this.options.size) {
				var optIndex = menu.find('li' + notDisabled + ' > *').filter(
						':not(.div-contain)').slice(0, this.options.size)
						.last().parent().index();
				var divLength = menu.find('li').slice(0, optIndex + 1).find(
						'.div-contain').length;
				menuHeight = liHeight * this.options.size + divLength
						* divHeight + menuPadding;
				if (that.options.dropupAuto) {
					this.$newElement.toggleClass('dropup',
							(selectOffsetTop > selectOffsetBot)
									&& (menuHeight < menu.height()));
				}
				menu.css({
					'max-height' : menuHeight + headerHeight + searchHeight
							+ 'px',
					'overflow' : 'hidden'
				});
				menuInner.css({
					'max-height' : menuHeight - menuPadding + 'px',
					'overflow-y' : 'auto'
				});
			}
		},

		setWidth : function() {
			if (this.options.width == 'auto') {
				this.$menu.css('min-width', '0');

				// Get correct width if element hidden
				var selectClone = this.$newElement.clone().appendTo('body');
				var ulWidth = selectClone.find('> .dropdown-menu').css('width');
				selectClone.remove();

				this.$newElement.css('width', ulWidth);
			} else if (this.options.width == 'fit') {
				// Remove inline min-width so width can be changed from 'auto'
				this.$menu.css('min-width', '');
				this.$newElement.css('width', '').addClass('fit-width');
			} else if (this.options.width) {
				// Remove inline min-width so width can be changed from 'auto'
				this.$menu.css('min-width', '');
				this.$newElement.css('width', this.options.width);
			} else {
				// Remove inline min-width/width so width can be changed
				this.$menu.css('min-width', '');
				this.$newElement.css('width', '');
			}
			// Remove fit-width class if width is changed programmatically
			if (this.$newElement.hasClass('fit-width')
					&& this.options.width !== 'fit') {
				this.$newElement.removeClass('fit-width');
			}
		},

		selectPosition : function() {
			var that = this, drop = '<div />', $drop = $(drop), pos, actualHeight, getPlacement = function(
					$element) {
				$drop.addClass($element.attr('class')).toggleClass('dropup',
						$element.hasClass('dropup'));
				pos = $element.offset();
				actualHeight = $element.hasClass('dropup') ? 0
						: $element[0].offsetHeight;
				$drop.css({
					'top' : pos.top + actualHeight,
					'left' : pos.left,
					'width' : $element[0].offsetWidth,
					'position' : 'absolute'
				});
			};
			this.$newElement.on('click', function() {
				getPlacement($(this));
				$drop.appendTo(that.options.container);
				$drop.toggleClass('open', !$(this).hasClass('open'));
				$drop.append(that.$menu);
			});
			$(window).resize(function() {
				getPlacement(that.$newElement);
			});
			$(window).on('scroll', function() {
				getPlacement(that.$newElement);
			});
			$('html').on('click', function(e) {
				if ($(e.target).closest(that.$newElement).length < 1) {
					$drop.removeClass('open');
				}
			});
		},

		mobile : function() {
			this.$element.addClass('mobile-device').appendTo(this.$newElement);
			if (this.options.container)
				this.$menu.hide();
		},

		refresh : function() {
			this.$lis = null;
			this.reloadLi();
			this.render();
			this.setWidth();
			this.setStyle();
			this.checkDisabled();
			this.liHeight();
		},

		update : function() {
			this.reloadLi();
			this.setWidth();
			this.setStyle();
			this.checkDisabled();
			this.liHeight();
		},

		setSelected : function(index, selected) {
			if (this.$lis == null)
				this.$lis = this.$menu.find('li');
			$(this.$lis[index]).toggleClass('selected', selected);
		},

		setDisabled : function(index, disabled) {
			if (this.$lis == null)
				this.$lis = this.$menu.find('li');
			if (disabled) {
				$(this.$lis[index]).addClass('disabled').find('a').attr('href',
						'#').attr('tabindex', -1);
			} else {
				$(this.$lis[index]).removeClass('disabled').find('a')
						.removeAttr('href').attr('tabindex', 0);
			}
		},

		isDisabled : function() {
			return this.$element.is(':disabled');
		},

		checkDisabled : function() {
			var that = this;

			if (this.isDisabled()) {
				this.$button.addClass('disabled').attr('tabindex', -1);
			} else {
				if (this.$button.hasClass('disabled')) {
					this.$button.removeClass('disabled');
				}

				if (this.$button.attr('tabindex') == -1) {
					if (!this.$element.data('tabindex'))
						this.$button.removeAttr('tabindex');
				}
			}

			this.$button.click(function() {
				return !that.isDisabled();
			});
		},

		tabIndex : function() {
			if (this.$element.is('[tabindex]')) {
				this.$element.data('tabindex', this.$element.attr('tabindex'));
				this.$button.attr('tabindex', this.$element.data('tabindex'));
			}
		},

		clickListener : function() {
			var that = this;

			$('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
				e.stopPropagation();
			});

			this.$newElement.on('click', function() {
				that.setSize();
				if (!that.options.liveSearch && !that.multiple) {
					setTimeout(function() {
						that.$menu.find('.selected a').focus();
					}, 10);
				}
			});

			this.$menu
					.on(
							'click',
							'li a',
							function(e) {
								var clickedIndex = $(this).parent().index(), prevValue = that.$element
										.val(), prevIndex = that.$element
										.prop('selectedIndex');

								// Dont close on multi choice menu
								if (that.multiple) {
									e.stopPropagation();
								}

								e.preventDefault();

								// Dont run if we have been disabled
								if (!that.isDisabled()
										&& !$(this).parent().hasClass(
												'disabled')) {
									var $options = that.$element.find('option'), $option = $options
											.eq(clickedIndex), state = $option
											.prop('selected');

									// Deselect all others if not multi select
									// box
									if (!that.multiple) {
										$options.prop('selected', false);
										$option.prop('selected', true);
										that.$menu.find('.selected')
												.removeClass('selected');
										that.setSelected(clickedIndex, true);
									}
									// Else toggle the one we have chosen if we
									// are multi
									// select.
									else {
										$option.prop('selected', !state);
										that.setSelected(clickedIndex, !state);
									}

									if (!that.multiple) {
										that.$button.focus();
									} else if (that.options.liveSearch) {
										that.$searchbox.focus();
									}

									// Trigger select 'change'
									if ((prevValue != that.$element.val() && that.multiple)
											|| (prevIndex != that.$element
													.prop('selectedIndex') && !that.multiple)) {
										that.$element.change();
									}
								}
							});

			this.$menu
					.on(
							'click',
							'li.disabled a, li dt, li .div-contain, .popover-title, .popover-title :not(.close)',
							function(e) {
								if (e.target == this) {
									e.preventDefault();
									e.stopPropagation();
									if (!that.options.liveSearch) {
										that.$button.focus();
									} else {
										that.$searchbox.focus();
									}
								}
							});

			this.$menu.on('click', '.popover-title .close', function() {
				that.$button.focus();
			});

			this.$searchbox.on('click', function(e) {
				e.stopPropagation();
			});

			this.$element.change(function() {
				that.render(false);
			});
		},

		liveSearchListener : function() {
			var that = this, no_results = $('<li class="no-results"></li>');

			this.$newElement.on('click.dropdown.data-api', function() {
				that.$menu.find('.active').removeClass('active');
				if (!!that.$searchbox.val()) {
					that.$searchbox.val('');
					that.$menu.find('li').show();
					if (!!no_results.parent().length)
						no_results.remove();
				}
				if (!that.multiple)
					that.$menu.find('.selected').addClass('active');
				setTimeout(function() {
					that.$searchbox.focus();
				}, 10);
			});

			this.$searchbox.on('input propertychange',
					function() {
						if (that.$searchbox.val()) {
							that.$menu.find('li').show()
									.not(
											':icontains('
													+ that.$searchbox.val()
													+ ')').hide();

							if (!that.$menu.find('li').filter(
									':visible:not(.no-results)').length) {
								if (!!no_results.parent().length)
									no_results.remove();
								no_results.html(
										that.options.noneResultsText + ' "'
												+ that.$searchbox.val() + '"')
										.show();
								that.$menu.find('li').last().after(no_results);
							} else if (!!no_results.parent().length) {
								no_results.remove();
							}

						} else {
							that.$menu.find('li').show();
							if (!!no_results.parent().length)
								no_results.remove();
						}

						that.$menu.find('li.active').removeClass('active');
						that.$menu.find('li').filter(':visible:not(.divider)')
								.eq(0).addClass('active').find('a').focus();
						$(this).focus();
					});

			this.$menu.on('mouseenter', 'a',
					function(e) {
						that.$menu.find('.active').removeClass('active');
						$(e.currentTarget).parent().not('.disabled').addClass(
								'active');
					});

			this.$menu.on('mouseleave', 'a', function() {
				that.$menu.find('.active').removeClass('active');
			});
		},

		val : function(value) {

			if (value !== undefined) {
				this.$element.val(value);

				this.$element.change();
				return this.$element;
			} else {
				return this.$element.val();
			}
		},

		selectAll : function() {
			this.$element.find('option').prop('selected', true).attr(
					'selected', 'selected');
			this.render();
		},

		deselectAll : function() {
			this.$element.find('option').prop('selected', false).removeAttr(
					'selected');
			this.render();
		},

		keydown : function(e) {
			var $this, $items, $parent, index, next, first, last, prev, nextPrev, that, prevIndex, isActive, keyCodeMap = {
				32 : ' ',
				48 : '0',
				49 : '1',
				50 : '2',
				51 : '3',
				52 : '4',
				53 : '5',
				54 : '6',
				55 : '7',
				56 : '8',
				57 : '9',
				59 : ';',
				65 : 'a',
				66 : 'b',
				67 : 'c',
				68 : 'd',
				69 : 'e',
				70 : 'f',
				71 : 'g',
				72 : 'h',
				73 : 'i',
				74 : 'j',
				75 : 'k',
				76 : 'l',
				77 : 'm',
				78 : 'n',
				79 : 'o',
				80 : 'p',
				81 : 'q',
				82 : 'r',
				83 : 's',
				84 : 't',
				85 : 'u',
				86 : 'v',
				87 : 'w',
				88 : 'x',
				89 : 'y',
				90 : 'z',
				96 : '0',
				97 : '1',
				98 : '2',
				99 : '3',
				100 : '4',
				101 : '5',
				102 : '6',
				103 : '7',
				104 : '8',
				105 : '9'
			};

			$this = $(this);

			$parent = $this.parent();

			if ($this.is('input'))
				$parent = $this.parent().parent();

			that = $parent.data('this');

			if (that.options.liveSearch)
				$parent = $this.parent().parent();

			if (that.options.container)
				$parent = that.$menu;

			$items = $('[role=menu] li:not(.divider) a', $parent);

			isActive = that.$menu.parent().hasClass('open');

			if (!isActive
					&& /([0-9]|[A-z])/.test(String.fromCharCode(e.keyCode))) {
				that.setSize();
				that.$menu.parent().addClass('open');
				isActive = that.$menu.parent().hasClass('open');
				that.$searchbox.focus();
			}

			if (that.options.liveSearch) {
				if (/(^9$|27)/.test(e.keyCode) && isActive
						&& that.$menu.find('.active').length === 0) {
					e.preventDefault();
					that.$menu.parent().removeClass('open');
					that.$button.focus();
				}
				$items = $('[role=menu] li:not(.divider):visible', $parent);
				if (!$this.val() && !/(38|40)/.test(e.keyCode)) {
					if ($items.filter('.active').length === 0) {
						$items = that.$newElement.find('li').filter(
								':icontains(' + keyCodeMap[e.keyCode] + ')');
					}
				}
			}

			if (!$items.length)
				return;

			if (/(38|40)/.test(e.keyCode)) {

				index = $items.index($items.filter(':focus'));
				first = $items.parent(':not(.disabled):visible').first()
						.index();
				last = $items.parent(':not(.disabled):visible').last().index();
				next = $items.eq(index).parent().nextAll(
						':not(.disabled):visible').eq(0).index();
				prev = $items.eq(index).parent().prevAll(
						':not(.disabled):visible').eq(0).index();
				nextPrev = $items.eq(next).parent().prevAll(
						':not(.disabled):visible').eq(0).index();

				if (that.options.liveSearch) {
					$items.each(function(i) {
						if ($(this).is(':not(.disabled)')) {
							$(this).data('index', i);
						}
					});
					index = $items.index($items.filter('.active'));
					first = $items.filter(':not(.disabled):visible').first()
							.data('index');
					last = $items.filter(':not(.disabled):visible').last()
							.data('index');
					next = $items.eq(index).nextAll(':not(.disabled):visible')
							.eq(0).data('index');
					prev = $items.eq(index).prevAll(':not(.disabled):visible')
							.eq(0).data('index');
					nextPrev = $items.eq(next).prevAll(
							':not(.disabled):visible').eq(0).data('index');
				}

				prevIndex = $this.data('prevIndex');

				if (e.keyCode == 38) {
					if (that.options.liveSearch)
						index -= 1;
					if (index != nextPrev && index > prev)
						index = prev;
					if (index < first)
						index = first;
					if (index == prevIndex)
						index = last;
				}

				if (e.keyCode == 40) {
					if (that.options.liveSearch)
						index += 1;
					if (index == -1)
						index = 0;
					if (index != nextPrev && index < next)
						index = next;
					if (index > last)
						index = last;
					if (index == prevIndex)
						index = first;
				}

				$this.data('prevIndex', index);

				if (!that.options.liveSearch) {
					$items.eq(index).focus();
				} else {
					e.preventDefault();
					if (!$this.is('.dropdown-toggle')) {
						$items.removeClass('active');
						$items.eq(index).addClass('active').find('a').focus();
						$this.focus();
					}
				}

			} else if (!$this.is('input')) {

				var keyIndex = [], count, prevKey;

				$items.each(function() {
					if ($(this).parent().is(':not(.disabled)')) {
						if ($.trim($(this).text().toLowerCase())
								.substring(0, 1) == keyCodeMap[e.keyCode]) {
							keyIndex.push($(this).parent().index());
						}
					}
				});

				count = $(document).data('keycount');
				count++;
				$(document).data('keycount', count);

				prevKey = $.trim($(':focus').text().toLowerCase()).substring(0,
						1);

				if (prevKey != keyCodeMap[e.keyCode]) {
					count = 1;
					$(document).data('keycount', count);
				} else if (count >= keyIndex.length) {
					$(document).data('keycount', 0);
					if (count > keyIndex.length)
						count = 1;
				}

				$items.eq(keyIndex[count - 1]).focus();
			}

			// Select focused option if "Enter", "Spacebar", "Tab" are pressed
			// inside the menu.
			if (/(13|32|^9$)/.test(e.keyCode) && isActive) {
				if (!/(32)/.test(e.keyCode))
					e.preventDefault();
				if (!that.options.liveSearch) {
					$(':focus').click();
				} else if (!/(32)/.test(e.keyCode)) {
					that.$menu.find('.active a').click();
					$this.focus();
				}
				$(document).data('keycount', 0);
			}

			if ((/(^9$|27)/.test(e.keyCode) && isActive && (that.multiple || that.options.liveSearch))
					|| (/(27)/.test(e.keyCode) && !isActive)) {
				that.$menu.parent().removeClass('open');
				that.$button.focus();
			}

		},

		hide : function() {
			this.$newElement.hide();
		},

		show : function() {
			this.$newElement.show();
		},

		destroy : function() {
			this.$newElement.remove();
			this.$element.remove();
		}
	};

	$.fn.selectpicker = function(option, event) {
		// get the args of the outer function..
		var args = arguments;
		var value;
		var chain = this
				.each(function() {
					if ($(this).is('select')) {
						var $this = $(this), data = $this.data('selectpicker'), options = typeof option == 'object'
								&& option;

						if (!data) {
							$this.data('selectpicker',
									(data = new Selectpicker(this, options,
											event)));
						} else if (options) {
							for ( var i in options) {
								data.options[i] = options[i];
							}
						}

						if (typeof option == 'string') {
							// Copy the value of option, as once we shift the
							// arguments
							// it also shifts the value of option.
							var property = option;
							if (data[property] instanceof Function) {
								[].shift.apply(args);
								value = data[property].apply(data, args);
							} else {
								value = data.options[property];
							}
						}
					}
				});

		if (value !== undefined) {
			return value;
		} else {
			return chain;
		}
	};

	$.fn.selectpicker.defaults = {
		style : 'btn-default',
		size : 'auto',
		title : null,
		selectedTextFormat : 'values',
		noneSelectedText : '--请选择--',
		noneResultsText : '--没有匹配结果--',
		countSelectedText : '{0} of {1} selected',
		width : false,
		container : false,
		hideDisabled : false,
		showSubtext : false,
		showIcon : true,
		showContent : true,
		dropupAuto : true,
		header : false,
		liveSearch : false,
		multipleSeparator : ', ',
		iconBase : 'glyphicon',
		tickIcon : 'glyphicon-ok',
		name : '',
		label : '',
		valid : true

	};

	$(document)
			.data('keycount', 0)
			.on(
					'keydown',
					'.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input',
					Selectpicker.prototype.keydown)
			.on(
					'focusin.modal',
					'.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bootstrap-select-searchbox input',
					function(e) {
						e.stopPropagation();
					});

}(window.jQuery);