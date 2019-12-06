(this["webpackJsonpswitch-game"]=this["webpackJsonpswitch-game"]||[]).push([[0],{13:function(e,t,n){e.exports=n(20)},19:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(7),o=n.n(r),c=n(2),s=n(8),i=n(9),u=n(11),m=n(10),d=n(12),g=n(3),v=n(6),f=n(1);var p=function(e){return e.scan((function(e,t){if(f.is(Function,t))return t(e);throw Error("dispatched value must be a function, got ".concat(typeof t))}),null).skipDuplicates()},h={cells:[],level:1,levelComplete:!1,startingMessage:!0,gameIsLose:!1,gameIsPassed:!1,score:0,best:0},b=n(3);var w=function(){var e=b.pool(),t=e.plug.bind(e);return e.plug=function(e){e instanceof b.Property||e instanceof b.Stream||e instanceof b.Observable?t(e):t(b.constant(e))},e},E=n(4),x=n.n(E),I=function(e){return{width:"".concat(e,"px"),height:"".concat(e,"px"),fontSize:"".concat(Math.round(e/4),"px"),lineHeight:"".concat(Math.round(e/2.2),"px")}},M=function(e){var t=e.cell,n=e.size,a=e.onClick;return l.a.createElement("div",{className:"cell",onClick:a,style:I(n)},l.a.createElement("div",{className:x()(t.type,{inner:!0,WAIT:"WAIT"==t.label,TAP:"TAP"==t.label})},l.a.createElement("div",null,"off"==t.label?null:t.label),l.a.createElement("div",null,null==t.countdown?null:t.countdown)))},N=n(4),T=function(e){return{width:"".concat(Math.round(e/2),"px"),height:"".concat(Math.round(e/7),"px"),fontSize:"".concat(Math.round(e/20),"px")}},y=function(e){var t,n=e.state;return l.a.createElement("div",{className:N({"show-message":n.gameIsLose||n.levelComplete||n.startingMessage,"hide-message":!n.gameIsLose&&!n.levelComplete&&!n.startingMessage}),style:(t=e.size,{width:t,height:t,fontSize:"".concat(Math.round(t/8),"px")})},l.a.createElement("div",null,l.a.createElement("div",null,n.gameIsLose?"You lose":n.levelComplete?"Level ".concat(n.level," complete!"):n.startingMessage?"How to play?":null),l.a.createElement("div",null,n.gameIsLose?"Score: ".concat(n.score):n.levelComplete?"Get ready!":n.startingMessage?l.a.createElement("div",{className:"rules"},l.a.createElement("div",null,"Tap a tile when it turns green."),l.a.createElement("div",null,"You win when no more tile is available."),l.a.createElement("div",null,"Don't miss any or the game ends!")):null),l.a.createElement("button",{className:"button",onClick:n.gameIsLose||n.startingMessage?e.startNewGame:e.startNextLevel,style:T(e.size)},n.gameIsLose||n.startingMessage?"Start new game":"Start next level")))},L=function(){var e=window.innerHeight-200;return window.innerWidth>e?e-20:window.innerWidth-20},C=function(e){return Math.floor(L()/Math.sqrt(e))},O=function(){var e=L();return{width:e,height:e,margin:"0 auto",position:"relative"}},j=function(e){var t=e.state,n=e.onCellTap,a=e.startNewGame,r=e.startNextLevel,o=C(t.cells.length);return l.a.createElement("div",{className:"grid",style:O()},l.a.createElement(y,{size:L(),state:t,startNewGame:a,startNextLevel:r}),t.cells.map((function(e,t){return l.a.createElement(M,{className:"game-cell",cell:e,size:o,onClick:function(){return n(e)},key:t})})))},k=function(e,t){return e+Math.floor(Math.random()*t)},A=function(e){return e[k(0,e.length)]},W=function(e){return f.is(Object,e)?e.countdown>=2?Object(c.a)({},e,{countdown:e.countdown-1}):e:null},S=function(e){var t=e+1;return t*t};f.map2=f.addIndex(f.map);var z=n(3);n(19);o.a.render(l.a.createElement((function(){var e,t=w(),n=z.interval(1e3).map((function(t){return function(t){var n=t.score,a=t.best;return function(t){var n=!1;return t.cells.map((function(t){1==t.countdown&&"TAP"==t.label&&(n=!0,clearTimeout(e))})),n}(t)?f.merge(o(t),{gameIsLose:!0,best:n>a?n:a}):f.over2("cells",f.map(f.pipe(M,W)),t)}})),r=p(z.merge([z.constant((function(){return h})),t,n]));function o(e){var t=S(e.level),n=f.map2((function(e,t){return{label:"off",countdown:null,index:t}}),f.range(0,t));return Object(c.a)({},e,{cells:n})}function b(e){return Object(c.a)({},e,{startingMessage:!1,gameIsLose:!1,gameIsPassed:!1,score:0,level:1})}function E(e){return Object(c.a)({},e,{levelComplete:!1,level:f.inc(e.level)})}function x(e){t.plug((function(t){return null!=e.countdown&&"WAIT"!=e.label?Object(c.a)({},t,{score:t.score+1,cells:f.set2([e.index,"countdown"],5,f.set2([e.index,"label"],"WAIT",t.cells))}):t}))}function I(n){var a=n.cells,l=f.filter((function(e){return null==e.countdown}),a);if(l.length){var r=A(l);return a=f.set2([r.index,"countdown"],5,f.set2([r.index,"label"],"WAIT",n.cells)),e=setTimeout((function(){return t.plug(I)}),6e3),Object(c.a)({},n,{cells:a})}return clearTimeout(e),f.merge(o(n),{levelComplete:!0})}function M(e){return 1==e.countdown&&"WAIT"==e.label?{label:"TAP",countdown:4,index:e.index}:e}function N(){t.plug(E),t.plug(o),t.plug(I)}function T(){t.plug(b),t.plug(o),t.plug(I)}t.plug(o);var y,L,C=(y={state:r},L=function(e){var t=e.state;return l.a.createElement("div",{className:"game"},l.a.createElement("h2",null,"Level: ".concat(t.level," \u2014 Score: ").concat(t.score," \u2014 Best: ").concat(t.best)),l.a.createElement(j,{startNewGame:T,startNextLevel:N,state:t,onCellTap:x}))},function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={},n}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=g.combine(y).throttle(20,{leading:!1});this.sb=t.observe((function(t){e.setState(t)}))}},{key:"componentWillUnmount",value:function(){this.sb.unsubscribe()}},{key:"render",value:function(){return l.a.createElement(L,v.merge(this.props,this.state),this.props.children)}}]),t}(a.Component));return l.a.createElement(C,null)}),null),document.getElementById("app"))}},[[13,1,2]]]);
//# sourceMappingURL=main.de964e18.chunk.js.map