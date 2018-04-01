/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_config__ = __webpack_require__(2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Wysiwyg = function () {
    function Wysiwyg(el, config) {
        _classCallCheck(this, Wysiwyg);

        // Merge our and their config
        this.config = Object.assign(__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* defaultConfig */], config);

        // Get all the elements attached to this instance
        this.elements = document.getElementsByClassName(el);

        this.instances = [];

        this.initElements();
    }

    _createClass(Wysiwyg, [{
        key: 'initElements',
        value: function initElements() {

            var elements = this.elements;

            if (elements.length === 0) {
                return;
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    this.constructEditor(item);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            console.log('instances', this.instances);
        }
    }, {
        key: 'constructEditor',
        value: function constructEditor(element) {

            var editor = element.children[0];

            this.instances.push(editor);

            // Set element as editable
            editor.setAttribute('contenteditable', true);

            if (this.config.single === true && this.instances.length === 1 || this.config.single === false) {
                if (this.config.single === true && this.config.container !== undefined) {
                    var container = document.getElementById(this.config.container);

                    container.classList.add('wysiwyg-single');

                    container.prepend(this.addToolbar(editor));
                } else {
                    element.prepend(this.addToolbar(editor));
                }
            }
        }
    }, {
        key: 'addToolbar',
        value: function addToolbar(editor) {
            var _this = this;

            var editorTemplate = document.createElement('div');

            // Add a class so we can style it pretty
            editorTemplate.classList.add('wysiwyg-toolbar');

            // Make sure the toolbar isn't editable
            editorTemplate.setAttribute('contenteditable', false);

            var ul = document.createElement('ul');

            editorTemplate.appendChild(ul);

            // Loop through the config and insert appropriate controls
            for (var item in this.config.toolbar) {

                var currentItem = this.config.toolbar[item],
                    listElement = document.createElement('li');

                // Check if a group
                if (Array.isArray(currentItem)) {
                    (function () {
                        // Create a new group element
                        var groupTemplate = document.createElement('ul'),
                            listTemplate = document.createElement('li');

                        groupTemplate.classList.add('wysiwyg-control-group');

                        for (var aItem in currentItem) {
                            var nestedItem = currentItem[aItem],
                                controls = _this.createControl(nestedItem);

                            for (var key in controls) {
                                listElement.appendChild(controls[key]);
                            }

                            controls.forEach(function (e) {
                                listTemplate.appendChild(e);
                            });
                        }

                        groupTemplate.append(listTemplate);

                        listElement.appendChild(groupTemplate);
                    })();
                } else {

                    if (currentItem.type === 'select') {
                        listElement.innerHTML = currentItem.name;
                        listElement.classList.add('has-drop-down');
                    }

                    var controls = this.createControl(currentItem);

                    if (Array.isArray(controls)) {
                        for (var key in controls) {
                            listElement.appendChild(controls[key]);
                        }
                    } else listElement.appendChild(controls);
                }

                ul.append(listElement);
            }

            return editorTemplate;
        }
    }, {
        key: 'createControl',
        value: function createControl(item) {
            switch (item.type) {
                case 'select':
                    return this.addSelect(item);
                case 'button':
                    return this.addButton(item);
                case 'colorpicker':
                    return this.addColorPicker(item);
                default:
                    console.error('Invalid item ' + item);
                    break;
            }
        }
    }, {
        key: 'addSelect',
        value: function addSelect(item) {
            var _this2 = this;

            var template = document.createElement('ul');
            this.setAttrs(template, {
                'class': 'drop-down'
            });

            var defaultOption = document.createElement('li');
            defaultOption.innerHTML = item.name;

            var _loop = function _loop(tag) {
                var display = item.options[tag];

                var optionHtml = document.createElement('li'),
                    button = document.createElement('a');

                button.setAttribute('href', 'javascript:void(0)');

                _this2.setAttrs(button, {
                    href: 'javascript:void(0)'
                });

                button.innerHTML = display;
                button.classList.add('btn');

                button.addEventListener('click', function (e) {
                    document.execCommand(item.exec, false, tag);
                    this.selectedIndex = 0;
                });

                optionHtml.append(button);

                template.appendChild(optionHtml);
            };

            for (var tag in item.options) {
                _loop(tag);
            }

            return template;
        }
    }, {
        key: 'addButton',
        value: function addButton(item) {
            var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var template = document.createElement('a');
            template.classList.add('btn');
            template.setAttribute('href', 'javascript:void(0)');

            template.innerHTML = '' + item.icon;

            if (this.config.hideName !== true) template.innerHTML += ' ' + item.name;

            if (events) {
                template.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.execCommand(item.exec, false, this.value);
                    console.log('clicked');
                });
            }

            return template;
        }
    }, {
        key: 'addColorPicker',
        value: function addColorPicker(item) {
            // Create the container
            var template = document.createElement('a'),
                templateId = this.generateId(),
                buttonTemplate = this.addButton(item, false);

            this.setAttrs(template, {
                id: templateId,
                href: 'javascript:void(0)'
            });

            template.classList.add("colorpicker-preview");

            var inputTemplate = document.createElement("input");

            this.setAttrs(inputTemplate, {
                type: 'color',
                "data-preview": templateId,
                value: "#f00f00"
            });

            // Bind color choose event
            inputTemplate.addEventListener("input", function (e) {
                buttonTemplate.children[0].style["color"] = this.value;
                document.execCommand(item.exec, false, this.value);
            });

            template.appendChild(inputTemplate);

            return [buttonTemplate, template];
        }
    }, {
        key: 'generateId',
        value: function generateId() {
            return "_" + Math.random().toString(36).substr(2, 9);
        }
    }, {
        key: 'setAttrs',
        value: function setAttrs(el, attr) {
            for (var key in attr) {
                el.setAttribute(key, attr[key]);
            }
        }
    }, {
        key: 'getInstance',
        value: function getInstance() {
            return this.instances;
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            return this.instances.length === 1 ? this.instances[0].innerHTML : this.instances.map(function (value) {

                var id = value.id,
                    obj = {};

                if (!id) return console.error('Invalid id');

                obj[id] = value.innerHTML;

                return obj;
            }, this);
        }
    }]);

    return Wysiwyg;
}();

;
window.Wysiwyg = Wysiwyg;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultConfig; });
var defaultConfig = {
    single: true,
    container: 'body',
    hideName: false,
    toolbar: [{
        type: "select",
        name: "Header Formatting",
        exec: 'formatblock',
        options: {
            h1: 'Heading 1',
            h2: 'Heading 2',
            h3: 'Heading 3',
            h4: 'Heading 4',
            h5: 'Heading 5',
            p: 'Paragraph',
            pre: 'Pre'
        }
    }, {
        type: "select",
        name: "Font Size",
        exec: 'fontsize',
        options: {
            1: 'Very Small',
            2: 'Small',
            3: 'Medium',
            4: 'Large'
        }
    }, {
        type: "button",
        name: 'Bold',
        icon: '',
        exec: 'bold'
    }, {
        type: "button",
        name: 'Italic',
        icon: '',
        exec: 'italic'
    }, {
        type: "button",
        name: 'Underline',
        icon: '',
        exec: 'underline'
    }, {
        type: "colorpicker",
        name: 'Font Color',
        icon: '',
        exec: 'forecolor'
    }, {
        type: "button",
        name: 'SubScript',
        icon: '',
        exec: 'subscript'
    }, {
        type: "button",
        name: 'Superscript',
        icon: '',
        exec: 'superscript'
    }]
};



/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);