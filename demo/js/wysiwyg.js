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
            var editorTemplate = document.createElement('ul');

            // Add a class so we can style it pretty
            editorTemplate.classList.add('wysiwyg-toolbar');

            // Make sure the toolbar isn't editable
            editorTemplate.setAttribute('contenteditable', false);

            // Loop through the config and insert appropriate controls
            for (var item in this.config.toolbar) {

                var currentItem = this.config.toolbar[item];

                var listElement = document.createElement('li');

                // Check if a group
                if (Array.isArray(currentItem)) {
                    // Create a new group element
                    var groupTemplate = document.createElement('ul');
                    groupTemplate.classList.add('wysiwyg-control-group');

                    for (var aItem in currentItem) {
                        var nestedItem = currentItem[aItem];
                        groupTemplate.appendChild(this.createControl(nestedItem));
                    }

                    listElement.appendChild(groupTemplate);
                } else {

                    if (currentItem.type === 'select') {
                        listElement.innerHTML = currentItem.name;
                    }

                    listElement.appendChild(this.createControl(currentItem));
                }

                editorTemplate.prepend(listElement);
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
            var template = document.createElement('ul');
            this.setAttrs(template, {
                'class': 'drop-down'
            });

            var defaultOption = document.createElement('li');
            defaultOption.innerHTML = item.name;

            for (var tag in item.options) {
                var display = item.options[tag];

                var optionHtml = document.createElement('li');
                optionHtml.value = tag;
                optionHtml.innerHTML = display;

                template.appendChild(optionHtml);
            }

            template.addEventListener('click', function () {
                document.execCommand(item.exec, false, this.value);
                this.selectedIndex = 0;
            });

            return template;
        }
    }, {
        key: 'addButton',
        value: function addButton(item) {
            var template = document.createElement('button');

            template.innerHTML = '' + item.icon;

            if (this.config.hideName !== true) template.innerHTML += ' ' + item.name;

            template.addEventListener('click', function () {
                document.execCommand(item.exec, false, this.value);
            });

            return template;
        }
    }, {
        key: 'addColorPicker',
        value: function addColorPicker(item) {
            // Create the container
            var template = document.createElement('div'),
                templateId = this.generateId();

            template.setAttribute("id", templateId);
            template.classList.add("colorpicker-preview");
            template.style["backgroundColor"] = '#f00f00';

            var inputTemplate = document.createElement("input");

            this.setAttrs(inputTemplate, {
                type: 'color',
                "data-preview": templateId,
                value: "#f00f00"
            });

            // Bind color choose event
            inputTemplate.addEventListener("input", function (el) {
                console.log(template);
                template.style["background-color"] = this.value;
                document.execCommand(item.exec, false, this.value);
            });

            template.appendChild(inputTemplate);

            return template;
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
    hideName: true,
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
    }, [{
        type: "button",
        name: 'Bold',
        icon: 'far fa-bold',
        exec: 'bold'
    }, {
        type: "button",
        name: 'Italic',
        icon: 'far fa-italic',
        exec: 'italic'
    }, {
        type: "button",
        name: 'Underline',
        icon: 'far fa-underline',
        exec: 'underline'
    }], {
        type: "colorpicker",
        name: 'Font Color',
        icon: '',
        exec: 'forecolor'
    }]
};



/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);