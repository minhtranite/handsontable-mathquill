# Handsontable mathquill

A `mathquill` cell type for Handsontable.

## Installation

```bash
bower install --save handsontable-mathquill
```

Download Mathquill from [here](https://github.com/mathquill/mathquill/releases/latest)

## Usage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Handsontable Mathquill</title>
    <link rel="stylesheet"
      media="screen"
      href="bower_components/handsontable/dist/handsontable.full.css">
    <link rel="stylesheet" media="screen" href="mathquill/mathquill.css">
    <style>
      .mq-math-mode {
        font-size: 100%;
      }
    </style>

    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/handsontable/dist/handsontable.full.js"></script>
    <script src="mathquill/mathquill.js"></script>
    <script src="handsontable-mathquill.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <button id="button" onclick="getData()">Get data</button>
    <script>
      var data = [
        ['Key', 'Value'],
        ['one', 'x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}'],
        ['two', '\\sqrt{4}'],
        ['three', '']
      ];

      var columns = [
        {},
        {
          type: 'mathquill'
        }
      ];

      var container = document.getElementById('example');
      var hot = new Handsontable(container, {
        data: data,
        columns: columns
      });

      var getData = function () {
        console.log(hot.getData());
      }
    </script>
  </body>
</html>
```