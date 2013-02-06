# jquery.fixedinside.js

jquery.fixedinside.jsは指定した要素を、親要素内で固定表示することが出来ます。実際の動きはデモをご覧ください。
You can fix the element in the parent element. Please see the demo.

## demos

[demo1 : fixedinside]()
[demo2 : offset]()

## requirement

jQuery 1.8またはそれ以上  
jQuery 1.8 or later

## installation

jquery.jsの後にjquery.fixedinside.jsを読み込みます。  
Load jquery.fixedinside.js after loading jquery.js.

    <script src="/path/to/jquery.js"></script>
    <script src="/path/to/jquery.fixedinside.js"></script>


## usage

### HTML

    <div id="container">
        <p id="fixed-element"></p>
    </div>


### CSS

コンテナにposition relativeまたはabsoluteを適用します。  
Set position "relative" or "absolute" to the container.

    #container { position: relative; }


固定する要素はposition absoluteまたはfixedを指定します。  
Set position "absolute" or "fixed" to the inner element you want to fixed.

    #fixed-element {
        position: absolute;
    }


### JavaScript

固定する要素にfixedinsideメソッドを実行します。  
Run fixedinside method to the element you want to fixed.

    $(function () {
        $('#fixed-element')
            .fixedinside();
    });


## options

引数に数値を入力することでオフセット値を指定できます。固定ヘッダーなどにかぶらなくすることが出来ます。
You can input number to the argument to set offset.

    $('#fixed-element')
        .fixedinside(100);


## limitation

現バージョンでは、対応している固定位置はtopのみです。
At this version, you can fix-inside the element to top of the container.

## Copyrigth & LICENSE

Copyright 2013 Satoru Kawahara
[Licensed under MIT.](http://www.opensource.org/licenses/MIT)