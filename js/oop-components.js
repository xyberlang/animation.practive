'use strict';
/**
 * 继承父类方法
 * @param child
 * @param parent
 */
function extend(child,parent){
    for(let i in parent){
        child[i] = parent[i];
    }
}

/**
 * 图片放大功能对像的构造函数
 * @constructor
 */
function Enlarge() {
    this.settings = {
        smallImg: 'small-img',
        Span: 'span',
        bigImg: 'big-img',
        Img: 'img'
    };
}
Enlarge.prototype.Enter = function(){
    this.Span.style.display = 'block';
    this.bigImg.style.display = 'block';
};
Enlarge.prototype.Move = function(ev){
    ev = ev || window.event;
    let Left = ev.clientX - this.smallImg.offsetLeft - this.Span.offsetWidth/2;
    let Top = ev.clientY - this.smallImg.offsetTop - this.Span.offsetHeight/2;
    let defS = this.smallImg.offsetWidth- this.Span.offsetWidth;
    Left > 0 ? Left : (Left = 0);
    Left < defS ? Left : (Left = defS);
    Top > 0 ? Top : (Top = 0);
    Top < defS ? Top : (Top = defS);
    this.Span.style.left = Left + 'px';
    this.Span.style.top = Top + 'px';
    let defB = this.Img.offsetWidth - this.bigImg.offsetWidth;
    this.Img.style.left = -Left*defB/defS + 'px';
    this.Img.style.top = -Top*defB/defS + 'px';
};
Enlarge.prototype.Leave = function(){
    this.Span.style.display = 'none';
    this.bigImg.style.display = 'none';
};
Enlarge.prototype.init = function(options){
    extend(this.settings,options);
    this.smallImg = document.getElementsByClassName(this.settings.smallImg)[0];
    this.Span = this.smallImg.getElementsByTagName(this.settings.Span)[0];
    this.bigImg = document.getElementsByClassName(this.settings.bigImg)[0];
    this.Img = this.bigImg.getElementsByTagName(this.settings.Img)[0];
    let that = this;
    this.smallImg.onmouseenter = function () {
        that.Enter();
    };
    this.smallImg.onmousemove = function (ev) {
        that.Move(ev);
    };
    this.smallImg.onmouseleave = function () {
        that.Leave();
    };
};