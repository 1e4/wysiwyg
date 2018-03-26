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

        // Set element as editable
        let editor = element.children[0];

        this.instances.push(editor);

        editor.setAttribute('contenteditable', true);

        console.log(this.config);

        if(this.config.single === true && this.instances.length === 1 || this.config.single === false) {

            //Create a new div to hold the toolbar
            element.prepend(this.addToolbar(editor));
        }
    }

    addToolbar(editor) {
        let editorTemplate = document.createElement('div');

        // Add a class so we can style it pretty
        editorTemplate.classList.add('wysiwyg-toolbar');

        // Make sure the toolbar isn't editable
        editorTemplate.setAttribute('contenteditable', false);

        // Loop through the config and insert appropriate controls
        for (let item in this.config.toolbar) {

            let item = this.config.toolbar[item];

            switch (item.type) {
                case 'select':
                    editorTemplate.appendChild(this.addSelect(item, editor));
                    break;
                case 'button':
                    editorTemplate.appendChild(this.addButton(item));
                    break;
                case 'colorpicker':
                    editorTemplate.append(this.addColorPicker(item));
                    break;
                default:
                    console.error('Invalid item type ' + item.type);
            }
        }

        return editorTemplate;
    }

    addSelect(item) {
        let template = document.createElement('select');

        let defaultOption = document.createElement('option');
        defaultOption.innerHTML = item.name;

        template.appendChild(defaultOption);

        for(let tag in item.options) {
            let display = item.options[tag];

            let optionHtml = document.createElement('option');
            optionHtml.value = tag;
            optionHtml.innerHTML = display;

            template.appendChild(optionHtml);
        }

        template.addEventListener('change', function()
        {
            document.execCommand(item.exec, false, this.value);
            this.selectedIndex = 0;
        });

        return template;
    }

    addButton(item) {
        let template = document.createElement('button');

        template.innerHTML = `<i class="${item.icon}"></i> ${item.name}`;

        template.addEventListener('click', function()
        {
            document.execCommand(item.exec, false, this.value);
        });

        return template;
    }

    addColorPicker(item) {
        // Create the container
        let template = document.createElement('div'),
            templateId = this.generateId();

        template.setAttribute("id", templateId);
        template.classList.add("colorpicker-preview");

        let inputTemplate = document.createElement("input");

        inputTemplate.setAttribute("type", "color");
        inputTemplate.setAttribute("data-preview", templateId);
        inputTemplate.setAttribute("value", "#000000");

        // Bind color choose event
        inputTemplate.addEventListener("input", function(el) {
            console.log(template);
            template.style["background-color"] = this.value;
            document.execCommand(item.exec, false, this.value);
        });

        template.appendChild(inputTemplate);

        return template;
    }

    generateId() {
        return "_" + Math.random().toString(36).substr(2, 9);
    }

    getInstance() {
        return this.instances;
    }
};
window.Wysiwyg = Wysiwyg;