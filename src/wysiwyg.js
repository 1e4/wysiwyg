import {defaultConfig} from './config/config';

class Wysiwyg {
    constructor(el, config) {

        // Merge our and their config
        this.config = Object.assign(defaultConfig, config);

        // Get all the elements attached to this instance
        this.elements = document.getElementsByClassName(el);

        this.instances = [];

        this.initElements();
    }

    initElements() {

        let elements = this.elements;

        if (elements.length === 0) {
            return;
        }

        for (let item of elements) {
            this.constructEditor(item);
        }


    }

    constructEditor(element) {

        let editor = element.children[0];

        this.instances.push(editor);

        // Set element as editable
        editor.setAttribute('contenteditable', true);

        if (this.config.single === true && this.instances.length === 1 || this.config.single === false) {
            if (this.config.single === true && this.config.container !== undefined) {
                let container = document.getElementById(this.config.container);

                container
                    .classList
                    .add('wysiwyg-single');

                container.prepend(this.addToolbar(editor));
            }
            else {
                element.prepend(this.addToolbar(editor));
            }
        }
    }

    addToolbar(editor) {
        let editorTemplate = document.createElement('div');

        // Add a class so we can style it pretty
        editorTemplate.classList.add('wysiwyg-toolbar');

        // Make sure the toolbar isn't editable
        editorTemplate.setAttribute('contenteditable', false);

        let ul = document.createElement('ul');

        editorTemplate.appendChild(ul);

        // Loop through the config and insert appropriate controls
        for (let item in this.config.toolbar) {

            let currentItem = this.config.toolbar[item],
                listElement = document.createElement('li');

            // Check if a group
            if (Array.isArray(currentItem)) {
                // Create a new group element
                let groupTemplate = document.createElement('ul'),
                    listTemplate = document.createElement('li');

                groupTemplate.classList.add('wysiwyg-control-group');


                for (let aItem in currentItem) {
                    let nestedItem = currentItem[aItem],
                        controls = this.createControl(nestedItem);

                    for (let key in controls) {
                        listElement.appendChild(controls[key]);
                    }

                    controls.forEach(function (e) {
                        listTemplate.appendChild(e);
                    });

                }

                groupTemplate.append(listTemplate);

                listElement.appendChild(groupTemplate);
            }
            else {

                if (currentItem.type === 'select') {
                    listElement.innerHTML = currentItem.name;
                    listElement.classList.add('has-drop-down');
                }

                let controls = this.createControl(currentItem);

                console.log('controls', controls);

                if (Array.isArray(controls)) {
                    for (let key in controls) {
                        listElement.appendChild(controls[key]);
                    }
                }
                else
                    listElement.appendChild(controls);

                //
                // controls.forEach(function(e)
                // {
                //     listElement.appendChild(e);
                // });

            }


            ul.append(listElement);
        }

        return editorTemplate;
    }

    createControl(item) {
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

    addSelect(item) {
        let template = document.createElement('ul');
        this.setAttrs(template, {
            'class': 'drop-down'
        });

        let defaultOption = document.createElement('li');
        defaultOption.innerHTML = item.name;

        for (let tag in item.options) {
            let display = item.options[tag];

            let optionHtml = document.createElement('li'),
                button = document.createElement('a');

            button.setAttribute('href', 'javascript:void(0)');

            this.setAttrs(button, {
                href: 'javascript:void(0)',
            });

            button.innerHTML = display;
            button.classList.add('btn');


            button.addEventListener('click', function (e) {
                document.execCommand(item.exec, false, tag);
                this.selectedIndex = 0;
            });

            optionHtml.append(button);

            template.appendChild(optionHtml);
        }


        return template;
    }

    addButton(item, events = true) {
        let template = document.createElement('a');
        template.classList.add('btn');
        template.setAttribute('href', 'javascript:void(0)');

        template.innerHTML = `${item.icon}`;

        if (this.config.hideName !== true)
            template.innerHTML += ` ${item.name}`;

        if (events) {
            template.addEventListener('click', function (e) {
                e.preventDefault();
                document.execCommand(item.exec, false, this.value);
                console.log('clicked');
            });
        }

        return template;
    }

    addColorPicker(item) {
        // Create the container
        let template = document.createElement('a'),
            templateId = this.generateId(),
            buttonTemplate = this.addButton(item, false);

        this.setAttrs(template, {
            id: templateId,
            href: 'javascript:void(0)'
        });

        template.classList.add("colorpicker-preview");

        let inputTemplate = document.createElement("input");

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

    generateId() {
        return "_" + Math.random().toString(36).substr(2, 9);
    }

    setAttrs(el, attr) {
        for (let key in attr) {
            el.setAttribute(key, attr[key]);
        }
    }

    getInstance() {
        return this.instances;
    }
};
window.Wysiwyg = Wysiwyg;