// integrating quill editor
var quill = new Quill('#editor-container', {
        
    modules: {
      toolbar: [ 
        ['bold', 'italic'],
        ['link', 'blockquote', 'code-block', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],          
        [{ 'font': [] }],
        [{ 'align': [] }],
      ]
    },
    
    placeholder: 'Describe the place...',
    theme: 'snow'

  });
    
  var form = document.querySelector('form');
  form.onsubmit = function() {
    // Populate hidden form on submit
    var about = document.querySelector('input[name=about]');
    about.value = JSON.stringify(quill.getContents());
    
    console.log("Submitted", $(form).serialize(), $(form).serializeArray());
    
    // No back end to actually submit to!
    alert('Open the console to see the submit data!')
    return false;
  };