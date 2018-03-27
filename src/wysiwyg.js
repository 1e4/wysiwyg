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

        if(this.config.single === true && this.instances.length === 1 || this.config.single === false) {
            element.prepend(this.addToolbar(editor));
        }
    }

    addToolbar(editor) {
        let editorTemplate = document.createElement('ul');

        // Add a class so we can style it pretty
        editorTemplate.classList.add('wysiwyg-toolbar');

        // Make sure the toolbar isn't editable
        editorTemplate.setAttribute('contenteditable', false);

        // Loop through the config and insert appropriate controls
        for (let item in this.config.toolbar) {

            let currentItem = this.config.toolbar[item];

            let listElement = document.createElement('li');


            // Check if a group
            if(Array.isArray(currentItem))
            {
                // Create a new group element
                let groupTemplate = document.createElement('ul');
                groupTemplate.classList.add('wysiwyg-control-group');

                for(let aItem in currentItem)
                {
                    let nestedItem = currentItem[aItem];
                    groupTemplate.appendChild(this.createControl(nestedItem));
                }

                listElement.appendChild(groupTemplate);
            }
            else
            {
                listElement.appendChild(this.createControl(currentItem));
            }


            editorTemplate.prepend(listElement);
        }

        return editorTemplate;
    }

    createControl(item) {

        let controlTemplate = document.createElement('li');

        switch (item.type) {
            case 'select':
                controlTemplate.appendChild(this.addSelect(item));
                break;
            case 'button':
                controlTemplate.appendChild(this.addButton(item));
                break;
            case 'colorpicker':
                controlTemplate.appendChild(this.addColorPicker(item));
                break;
            default:
                console.error('Invalid item ' + item);
        }

        return controlTemplate;
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

        template.innerHTML = `${item.icon}`;

        if(this.config.hideName !== true)
            template.innerHTML += ` ${item.name}`;

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
        template.style["backgroundColor"] = '#000';

        let inputTemplate = document.createElement("input");

        inputTemplate.setAttribute("type", "color");
        inputTemplate.setAttribute("data-preview", templateId);
        inputTemplate.setAttribute("value", "#f00f00");

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