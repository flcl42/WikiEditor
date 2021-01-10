var enableFilter = true;

function whenElementAppear()
{
    const mainContainerSelector = '.we-text-preview-container'
    const mainContainerTransformedSelector = `${mainContainerSelector}.wysiwyg-transformed`
    const markdownBarSelector = '.wiki-markdown-toolbar'
    const markdownBarTransformedSelector = `${markdownBarSelector}.wysiwyg-transformed`

    if($(mainContainerTransformedSelector).length == 0){
        if($(mainContainerSelector).length != 0)
        {           
            $(mainContainerSelector).addClass('wysiwyg-transformed') 
            const textarea = $(".we-ta-container textarea")[0]
            var content = textarea.value;
            $(mainContainerTransformedSelector).children().css("display","none");
            $(mainContainerTransformedSelector).append("<div id='new-editor' class='markdown-renderer-async'></div>");
            var editor = new tui.Editor({
                el: document.querySelector('#new-editor'),
                initialEditType: 'wysiwyg',
                previewStyle: 'vertical',
                height: '100%',
                width: '100%',
                initialValue: content,
                events: {
                    change: contentChanged
                },
                exts: [
                    {
                        name: 'chart',
                        minWidth: 100,
                        maxWidth: 600,
                        minHeight: 100,
                        maxHeight: 300
                    },
                    'scrollSync',
                    'colorSyntax',
                    'uml',
                    'mark',
                    'table'
                    ]
            });

            function contentChanged()
            {
                $(".we-ta-container textarea").val(editor.getValue());
                $(".we-ta-container textarea")[0].dispatchEvent(new Event('input', { bubbles: true}));
            }
        }
    }


    if($(markdownBarTransformedSelector).length == 0){
        if($(markdownBarSelector).length != 0)
        {
            $(markdownBarSelector).addClass('wysiwyg-transformed') 
            $(markdownBarSelector).css('display', 'none')
        }
    }

    setTimeout(whenElementAppear, 300)
}
    

$(document).ready(function(){
    whenElementAppear();
});

