let defaultConfig = {
        single: true,
        container: 'body',
        hideName: false,
        toolbar: [
            {
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
            },
            {
                type: "select",
                name: "Font Size",
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
                icon: '',
                exec: 'bold',
                keybind: '17 66'
            },
            {
                type: "button",
                name: 'Italic',
                icon: '',
                exec: 'italic',
                keybind: '17 73'
            },
            {
                type: "button",
                name: 'Underline',
                icon: '',
                exec: 'underline',
                keybind: '17 85'
            },
            {
                type: "colorpicker",
                name: 'Font Color',
                icon: '',
                exec: 'forecolor'
            },
            {
                type: "button",
                name: 'SubScript',
                icon: '',
                exec: 'subscript'
            },
            {
                type: "button",
                name: 'Superscript',
                icon: '',
                exec: 'superscript'
            },
        ]
    }
;

export {defaultConfig};