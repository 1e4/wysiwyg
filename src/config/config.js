let defaultConfig = {
    single: true,
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
            icon: 'far fa-bold',
            exec: 'bold'
        },
        {
            type: "button",
            name: 'Italic',
            icon: 'far fa-italic',
            exec: 'italic'
        },
        {
            type: "button",
            name: 'Underline',
            icon: 'far fa-underline',
            exec: 'underline'
        },
        {
            type: "colorpicker",
            name: 'Font Color',
            icon: '',
            exec: 'forecolor'
        }
    ]
};

export {defaultConfig};