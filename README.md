# HTML Template Engine

Include other HTML files into your website by typing:
```html
<span require-file="./parts/footer.html"></span>
```
[Here is the live demo](https://alesanchezr.github.io/html-template-engine/demo/)

## Instalation
- Using NPM
```sh
$ npm install html-template-engine --save
```
- Or using a **simple script tag** before your body closing tag and use the **autoload** feature to avoid using any Javascript whatsoever.
```html
<script type="text/javascript" src="html-template-engine.min.js?autoload"></script>
```
Important! Please notice the **?autoload** at the end of the script url, [here is the library code](../../tree/master/dist)

## Usage (Remember to install the library first)

On your HTML paste the following code whenever you want to include another html file
```html
<span require-file="./parts/footer.html"></span>
```

Only for NPM installations:
```js
import TemplateManager from 'html-template-engine';

//if you want to load the templates when the website finishes loading
window.onload = function(){ TemplateManager.start(); }
```

### Additional Available Params

1. Log on the console all the pieces being loaded into the html
```html
    <body log-template-requests="true">
```

2. Set a base template path for all your url's
```html
    <body base-template-path="./parts/">
    ...
        <span require-file="footer.html"></span>
    </body>
```

## Author

Alejandro Sanchez: @alesanchezr, alesanchezr.com
