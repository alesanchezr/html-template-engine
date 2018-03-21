let TM = (function(){
    
    var theObject = {};
    theObject.settings = {
        basePath: '',
        logRequests: false,
        windowExport: false,
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
        theObject.settings.loadProperty('basePath',newSettings);
        theObject.settings.loadProperty('logRequests',newSettings);
        theObject.settings.loadProperty('windowExport',newSettings);
    }
    
    theObject.loadPieces = function(pieces, newSettings){
        
        loadSettings(newSettings);
        
        if(theObject.settings.logRequests && pieces.length === 0) console.warn("No template parts were found or loaded, make sure you are using <span> tags with the 'require-file' attribute");
        
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
        path = theObject.settings.basePath+path;
        var ajax = new XMLHttpRequest();
        ajax.open("GET", path, true);
        ajax.addEventListener('load',(response) => {
            if (ajax.readyState == 4 && ajax.status == 200) {
                if(theObject.settings.logRequests) console.log('The following path was successfully loaded: '+path);
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
    
    theObject.start = function(){
            
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
        
        theObject.loadPieces(newPieces, settings);
    }
    return theObject;
})();

var needsAutoload = function() {
    var scripts = document.querySelectorAll('script');
    var autoload = false;
    scripts.forEach(function(elm){
        if(elm.src.indexOf('html-template-engine') !== -1 && elm.src.indexOf('?autoload') !== -1) autoload = true;
    });
    return autoload;
};
if(needsAutoload()) window.onload = TM.start;
module.exports = TM;