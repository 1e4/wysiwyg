let defaultConfig = {
        single: true,
        container: 'body',
        hideName: true,
        toolbar: [
            {
                type: "select",
                name: "Header Formatting <span class='arrow-right'><i class='far fa-chevron-down'></i></span>",
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
            },
            {
                type: "select",
                name: "Font Size <span class='arrow-right'><i class='far fa-chevron-down'></i></span>",
                exec: 'fontsize',
                options: {
                    1: 'Very Small',
                    2: 'Small',
                    3: 'Medium',
                    4: 'Large',
                }
            },
            {
                type: "button",
                name: 'Bold',
                icon: '<i class="far fa-bold"></i>',
                exec: 'bold'
            },
            {
                type: "button",
                name: 'Italic',
                icon: '<i class="far fa-italic"></i>',
                exec: 'italic'
            },
            {
                type: "button",
                name: 'Underline',
                icon: '<i class="far fa-underline"></i>',
                exec: 'underline'
            },
            {
                type: "colorpicker",
                name: 'Font Color',
                icon: '<i class="far fa-font"></i>',
                exec: 'forecolor'
            },
            {
                type: "button",
                name: 'SubScript',
                icon: '<i class="far fa-subscript"></i>',
                exec: 'subscript'
            },
            {
                type: "button",
                name: 'Superscript',
                icon: '<i class="far fa-superscript"></i>',
                exec: 'superscript'
            },
        ]
    }
;

export {defaultConfig};