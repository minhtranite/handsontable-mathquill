(function (Handsontable, MathQuill) {
  var MathquillEditor = Handsontable.editors.BaseEditor.prototype.extend();

  MathquillEditor.prototype.init = function () {
    this.mathFieldEl = document.createElement('SPAN');
    Handsontable.Dom.addClass(this.mathFieldEl, 'mathquillEditor');
    this.mathFieldEl.style.display = 'none';
    this.instance.rootElement.appendChild(this.mathFieldEl);
  };

  MathquillEditor.prototype.prepare = function () {
    Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);
    var self = this;
    this.MQ = MathQuill.getInterface(2);
    this.mathField = this.MQ.MathField(this.mathFieldEl, {
      spaceBehavesLikeTab: true,
      handlers: {
        enter: function () {
          self.finishEditing();
        }
      }
    });
    this.mathField.reflow();
  };

  MathquillEditor.prototype.getValue = function () {
    return this.mathField.latex();
  };

  MathquillEditor.prototype.setValue = function (value) {
    this.mathField.latex(value || '');
  };

  MathquillEditor.prototype.open = function () {
    var width = Handsontable.Dom.outerWidth(this.TD);
    var height = Handsontable.Dom.outerHeight(this.TD);
    var rootOffset = Handsontable.Dom.offset(this.instance.rootElement);
    var tdOffset = Handsontable.Dom.offset(this.TD);

    this.mathFieldEl.style.minHeight = height + 'px';
    this.mathFieldEl.style.minWidth = width + 'px';
    this.mathFieldEl.style.background = 'white';

    this.mathFieldEl.style.position = 'absolute';
    this.mathFieldEl.style.top = tdOffset.top - rootOffset.top + 'px';
    this.mathFieldEl.style.left = tdOffset.left - rootOffset.left + 'px';
    this.mathFieldEl.style.margin = '0px';

    this.mathFieldEl.style.display = '';

    this.mathField.reflow();
  };

  MathquillEditor.prototype.close = function () {
    this.mathFieldEl.style.display = 'none';
  };

  MathquillEditor.prototype.focus = function () {
    this.mathField.focus();
  };

  var MathquillRenderer = function (instance, td, row, col, prop, value, cellProperties) {
    var mathFieldEl = document.createElement('SPAN');
    Handsontable.Dom.addClass(mathFieldEl, 'mathquillRenderer');
    mathFieldEl.textContent = value;

    var MQ = MathQuill.getInterface(2);
    var mathField = MQ.StaticMath(mathFieldEl);

    Handsontable.Dom.empty(td);
    td.appendChild(mathFieldEl);
    mathField.reflow();
    return td;
  };

  Handsontable.editors.MathquillEditor = MathquillEditor;
  Handsontable.editors.registerEditor('mathquill', MathquillEditor);
  Handsontable.renderers.MathquillRenderer = MathquillRenderer;
  Handsontable.renderers.registerRenderer('mathquill', MathquillRenderer);

  Handsontable.cellTypes.mathquill = {
    editor: Handsontable.editors.MathquillEditor,
    renderer: Handsontable.renderers.MathquillRenderer
  };
})(Handsontable, MathQuill);