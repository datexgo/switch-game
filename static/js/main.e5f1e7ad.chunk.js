(this["webpackJsonpswitch-game"]=this["webpackJsonpswitch-game"]||[]).push([[0],{111:function(e,t,n){},113:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(13),c=n.n(r),i=n(14),o=n(2);var s=function(e){return e.scan((function(e,t){if(o.is(Function,t))return t(e);throw Error("dispatched value must be a function, got ".concat(typeof t))}),null).skipDuplicates()},u=n(23),m=n.n(u),p=function(e){return{width:"".concat(e,"px"),height:"".concat(e,"px"),fontSize:"".concat(Math.round(e/4),"px"),lineHeight:"".concat(Math.round(e/2.2),"px")}},d=function(e){var t=e.cell,n=e.size,a=e.onClick;return l.a.createElement("div",{className:"cell",onClick:a,style:p(n)},l.a.createElement("div",{className:m()(t.type,{inner:!0,WAIT:"WAIT"===t.label,TAP:"TAP"===t.label})},l.a.createElement("div",null,"off"===t.label?null:t.label),l.a.createElement("div",null,null==t.countdown?null:t.countdown)))},v=n(23),f=function(e){return{width:e,height:e,fontSize:"".concat(Math.round(e/8),"px")}},h=function(e){var t=e.state,n=e.size;return l.a.createElement("div",{className:v({"show-message":t.gameIsLose||t.levelComplete||t.startingMessage,"hide-message":!t.gameIsLose&&!t.levelComplete&&!t.startingMessage}),style:f(n)},l.a.createElement("div",null,l.a.createElement("div",null,t.gameIsLose?"You lose":t.levelComplete?"Level ".concat(t.level," complete!"):t.startingMessage?"How to play?":null),l.a.createElement("div",null,t.gameIsLose?"Score: ".concat(t.score):t.levelComplete?"Get ready!":t.startingMessage?l.a.createElement("div",{className:"rules"},l.a.createElement("div",null,"Tap a tile when it turns green."),l.a.createElement("div",null,"You win when no more tile is available."),l.a.createElement("div",null,"Don't miss any or the game ends!")):null),l.a.createElement("div",null,t.gameIsLose||t.startingMessage?"Swipe to start new game":"Swipe to start next level")))},g=[{width:"60px",height:"60px",opacity:"0"},{width:"90px",height:"90px",opacity:"1",offset:.3},{width:"120px",height:"120px",opacity:"0"}],b={duration:600,iterations:1},w=function(){var e=window.innerHeight-100;return window.innerWidth>e?e-20:window.innerWidth-20},E=function(e){return Math.floor(w()/Math.sqrt(e))},y=function(){var e=w();return{width:e,height:e}},x=function(e){var t=e.state,n=e.onCellTap,a=E(t.cells.length);return l.a.createElement("div",{className:"grid",style:y()},l.a.createElement(h,{size:w(),state:t}),t.cells.map((function(e,t){return l.a.createElement(d,{className:"game-cell",cell:e,size:a,onClick:function(){return n(e)},key:t})})))},T=n(15),I=n(16),k=n(19),O=n(17),j=n(20),C=function(e){function t(e){var n;return Object(T.a)(this,t),(n=Object(k.a)(this,Object(O.a)(t).call(this,e))).animation=null,n.circle=l.a.createRef(),n}return Object(j.a)(t,e),Object(I.a)(t,[{key:"animate",value:function(){this.animation=this.circle.current.animate(g,b)}},{key:"componentDidUpdate",value:function(e){this.props.value!==e.value&&this.animate()}},{key:"render",value:function(){var e=this.props,t=e.label,n=e.value;return l.a.createElement("div",{className:"progress-bar"},l.a.createElement("div",null,t),l.a.createElement("div",null,n),l.a.createElement("div",{ref:this.circle,className:"animation-circle"}))}}]),t}(a.Component),M=n(21),S=n(6),A=n.n(S),W={cells:[],level:1,levelComplete:!1,startingMessage:!0,gameIsLose:!1,gameIsPassed:!1,score:0,best:0},N=o.compose(o.all(o.equals(o.F())),o.values,o.pick(["gameIsLose","levelComplete","gameIsPassed","startingMessage"])),L=o.propEq("levelComplete",o.T()),P=o.pipe(o.prop("keys"),o.find(o.propEq("key","switchBest")),o.prop("value"),Number,o.defaultTo(0)),z=n(5),B=function(e,t){return e+Math.floor(Math.random()*t)},q=function(e){return e[B(0,e.length)]},V=function(e){return o.is(Object,e)?e.countdown>=2?Object(i.a)({},e,{countdown:e.countdown-1}):e:null},D=function(e){var t=e+1;return t*t};o.map2=o.addIndex(o.map);n(110),n(111);A.a.send("VKWebAppInit",{}),c.a.render(l.a.createElement((function(){var e=null,t=function(){var e=z.c.pool(),t=e.plug.bind(e);return e.plug=function(e){e instanceof z.c.Property||e instanceof z.c.Stream||e instanceof z.c.Observable?t(e):t(z.c.constant(e))},e}();z.e(A.a.sendPromise("VKWebAppStorageGet",{keys:["switchBest"]})).onValue((function(e){t.plug((function(t){return o.set2("best",P(e),t)}))}));var n=z.d(document.body,"touchmove").throttle(100).map((function(e){return function(e){return o.cond([[L,p],[o.complement(N),u],[o.T,o.always(e)]])(e)}})),r=z.f(1e3).map((function(e){return function(e){return o.ifElse(w,m,d)(e)}})),c=s(z.g([z.b((function(){return W})),t,r,n])),u=function(e){return o.pipe(f,v,b)(e)},m=function(e){var t=e.score,n=e.best,a=o.max(t,n);return A.a.send("VKWebAppStorageSet",{key:"switchBest",value:String(a)}),o.pipe(v,o.assoc("gameIsLose",o.T),o.assoc("best",a))(e)},p=function(e){return o.pipe(h,v,b)(e)},d=function(e){return o.over2("cells",o.map(o.pipe(E,V)))(e)};function v(e){var t=D(e.level),n=o.map2((function(e,t){return{label:"off",countdown:null,index:t}}),o.range(0,t));return Object(i.a)({},e,{cells:n})}function f(e){return Object(i.a)({},e,{startingMessage:!1,gameIsLose:!1,gameIsPassed:!1,score:0,level:1})}function h(e){return Object(i.a)({},e,{levelComplete:!1,level:o.inc(e.level)})}function g(e){t.plug((function(t){return null!=e.countdown&&"WAIT"!==e.label?Object(i.a)({},t,{score:t.score+1,cells:o.set2([e.index,"countdown"],5,o.set2([e.index,"label"],"WAIT",t.cells))}):t}))}function b(n){var a=n.cells,l=o.filter((function(e){return null==e.countdown}),a);if(l.length){var r=q(l);return a=o.pipe(o.set2([r.index,"countdown"],5),o.set2([r.index,"label"],"WAIT"))(n.cells),clearTimeout(e),e=setTimeout((function(){t.plug(b)}),6e3),o.set2("cells",a,n)}return clearTimeout(e),o.pipe(v,o.assoc("levelComplete",o.T()))(n)}function w(t){var n=!1;return t.cells.map((function(t){1===t.countdown&&"TAP"===t.label&&(n=!0,clearTimeout(e))})),n}function E(e){return 1===e.countdown&&"WAIT"===e.label?{label:"TAP",countdown:4,index:e.index}:e}t.plug(v);var y,S,B=(y={state:c},S=function(e){var t=e.state;return l.a.createElement(M.c,{activePanel:"main"},l.a.createElement(M.a,{id:"main",theme:"white"},l.a.createElement(M.b,{theme:"alternate",noShadow:!0},"Switch"),l.a.createElement("div",{className:"game"},l.a.createElement("div",{className:"game-progress"},l.a.createElement(C,{label:"Level",value:t.level}),l.a.createElement(C,{label:"Score",value:t.score}),l.a.createElement(C,{label:"Best",value:t.best})),l.a.createElement(x,{state:t,onCellTap:g}))))},function(e){function t(e){var n;return Object(T.a)(this,t),(n=Object(k.a)(this,Object(O.a)(t).call(this,e))).state={},n}return Object(j.a)(t,e),Object(I.a)(t,[{key:"UNSAFE_componentWillMount",value:function(){var e=this,t=z.a(y).throttle(20,{leading:!1});this.sb=t.observe((function(t){e.setState(t)}))}},{key:"componentWillUnmount",value:function(){this.sb.unsubscribe()}},{key:"render",value:function(){return l.a.createElement(S,o.merge(this.props,this.state),this.props.children)}}]),t}(a.Component));return l.a.createElement(B,null)}),null),document.getElementById("app"))},97:function(e,t,n){e.exports=n(113)}},[[97,1,2]]]);
//# sourceMappingURL=main.e5f1e7ad.chunk.js.map