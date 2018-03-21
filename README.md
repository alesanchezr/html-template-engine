# HTML Template Engine

Include other HTML files into your code using pure HTML tags, no need to know Javascript (or any other language), [here is the live demo](https://alesanchezr.github.io/html-template-engine/demo/)

## Instalation
Using NPM
```sh
$ npm install html-template-engine
```
or include the script before your body closing tag
```html
<script type="text/javascript" src="html-template-engine.min.js?autoload"></script>
```
Notice the **?autoload** at the end of the script url, [here is the library code](../../tree/master/dist)

## Usage (Remember to install the library first)

On your HTML paste the following code whenever you want to include another template
```html
<span require-file="./parts/footer.html"></span>
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