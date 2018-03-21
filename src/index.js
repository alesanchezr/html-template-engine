const TM = (function(){
    
    var theObject = {};
    let settings = {
        basePath: '',
        logRequests: false,
        loadProperty: function(property,fromObject){
            let value = null;
            if(typeof(fromObject) !== 'undefined'){
                value = fromObject[property];
            } 
            else value = property;
            
            if(value === "false") value = false;
            if(typeof(value)!==undefined && value) this[property] = value;
        }
    };
    
    
    function loadSettings(newSettings){
        settings.loadProperty('basePath',newSettings);
        settings.loadProperty('logRequests',newSettings);
    }
    
    theObject.loadPieces = function(pieces, newSettings){
        
        loadSettings(newSettings);
        
        if(settings.logRequests && pieces.length === 0) console.warn("No template parts were found or loaded, make sure you are using <span> tags with the 'require-file' attribute");
        
        pieces.forEach((piece)=>{
            getTemplate(piece.filePath, function(fileContent){
                if(typeof(piece.elementId) !== 'undefined') document.querySelector(piece.elementId).innerHTML = fileContent; 
                else if(typeof(piece.element) !== 'undefined') piece.element.innerHTML = fileContent;
                else console.error('Error loading the template part: ', piece);
            });
        });
    }
    
    
    function getTemplate(path, successCallback)
    {
        path = settings.basePath+path;
        var ajax = new XMLHttpRequest();
        ajax.open("GET", path, true);
        ajax.addEventListener('load',(response) => {
            if (ajax.readyState == 4 && ajax.status == 200) {
                if(settings.logRequests) console.log('The following path was successfully loaded: '+path);
                successCallback(ajax.responseText);
            }
            else if(ajax.status == 404) console.error('The following template path was not found: '+path);
            else if(ajax.status != 200) console.warn('There was an issue loading the following template path: '+path);
        });
        ajax.addEventListener('error',() => {
             console.error('The following template path was imposible to load: '+path);
        });
        ajax.send();
    }
    
    return theObject;
})();

window.onload = function(){
    
    let pieces = document.querySelectorAll('span[require-file]');
    let newPieces = [];
    pieces.forEach(function(elm){
       newPieces.push({ element: elm, filePath: elm.getAttribute('require-file')});
    });
    
    const body = document.querySelector('body');
    const settings = {
        basePath: body.getAttribute('base-template-path'),
        logRequests: body.getAttribute('log-template-requests')
    }
    
    TM.loadPieces(newPieces, settings);
}