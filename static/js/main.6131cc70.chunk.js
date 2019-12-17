(this["webpackJsonpswitch-game"]=this["webpackJsonpswitch-game"]||[]).push([[0],{111:function(e,t,n){},113:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(13),c=n.n(r),i=n(14),o=n(3);var s=function(e){return e.scan((function(e,t){if(o.is(Function,t))return t(e);throw Error("dispatched value must be a function, got ".concat(typeof t))}),null).skipDuplicates()},u=n(23),m=n.n(u),p=function(e){return{width:"".concat(e,"px"),height:"".concat(e,"px"),fontSize:"".concat(Math.round(e/4),"px"),lineHeight:"".concat(Math.round(e/2.2),"px")}},d=function(e){var t=e.cell,n=e.size,a=e.onClick;return l.a.createElement("div",{className:"cell",onClick:a,style:p(n)},l.a.createElement("div",{className:m()(t.type,{inner:!0,WAIT:"WAIT"===t.label,TAP:"TAP"===t.label})},l.a.createElement("div",null,"off"===t.label?null:t.label),l.a.createElement("div",null,null==t.countdown?null:t.countdown)))},v=n(23),f=function(e){return{width:e,height:e,fontSize:"".concat(Math.round(e/8),"px")}},h=function(e){var t=e.state,n=e.size;return l.a.createElement("div",{className:v({"show-message":t.gameIsLose||t.levelComplete||t.startingMessage,"hide-message":!t.gameIsLose&&!t.levelComplete&&!t.startingMessage}),style:f(n)},l.a.createElement("div",null,l.a.createElement("div",null,t.gameIsLose?"You lose":t.levelComplete?"Level ".concat(t.level," complete!"):t.startingMessage?"How to play?":null),l.a.createElement("div",null,t.gameIsLose?"Score: ".concat(t.score):t.levelComplete?"Get ready!":t.startingMessage?l.a.createElement("div",{className:"rules"},l.a.createElement("div",null,"Tap a tile when it turns green."),l.a.createElement("div",null,"You win when no more tile is available."),l.a.createElement("div",null,"Don't miss any or the game ends!")):null),l.a.createElement("div",null,t.gameIsLose||t.startingMessage?"Swipe to start new game":"Swipe to start next level")))},g=[{width:"60px",height:"60px",opacity:"1"},{width:"120px",height:"120px",opacity:"0"}],b={duration:600,iterations:1},w=function(){var e=window.innerHeight-100;return window.innerWidth>e?e-20:window.innerWidth-20},E=function(e){return Math.floor(w()/Math.sqrt(e))},y=function(){var e=w();return{width:e,height:e}},I=function(e){var t=e.state,n=e.onCellTap,a=E(t.cells.length);return l.a.createElement("div",{className:"grid",style:y()},l.a.createElement(h,{size:w(),state:t}),t.cells.map((function(e,t){return l.a.createElement(d,{className:"game-cell",cell:e,size:a,onClick:function(){return n(e)},key:t})})))},T=n(15),S=n(16),k=n(19),x=n(17),O=n(20),j=function(e){function t(e){var n;return Object(T.a)(this,t),(n=Object(k.a)(this,Object(x.a)(t).call(this,e))).animation=null,n.circle=l.a.createRef(),n}return Object(O.a)(t,e),Object(S.a)(t,[{key:"animate",value:function(){this.animation=this.circle.current.animate(g,b)}},{key:"componentDidUpdate",value:function(e){this.props.value!==e.value&&this.animate()}},{key:"render",value:function(){var e=this.props,t=e.label,n=e.value;return l.a.createElement("div",{className:"progress-bar"},l.a.createElement("div",null,t),l.a.createElement("div",null,n),l.a.createElement("div",{ref:this.circle,className:"animation-circle"}))}}]),t}(a.Component),A=n(21),C={cells:[],level:1,levelComplete:!1,startingMessage:!0,gameIsLose:!1,gameIsPassed:!1,score:0,best:0},M=o.compose(o.all(o.equals(o.F())),o.values,o.pick(["gameIsLose","levelComplete","gameIsPassed","startingMessage"])),W=o.propEq("levelComplete",o.T()),L=n(5),N=n.n(L),P=n(6),z=function(e,t){return e+Math.floor(Math.random()*t)},B=function(e){return e[z(0,e.length)]},K=function(e){return o.is(Object,e)?e.countdown>=2?Object(i.a)({},e,{countdown:e.countdown-1}):e:null},V=function(e){var t=e+1;return t*t};o.map2=o.addIndex(o.map);n(110),n(111);N.a.send("VKWebAppInit"),c.a.render(l.a.createElement((function(){var e=null,t=function(){var e=P.c.pool(),t=e.plug.bind(e);return e.plug=function(e){e instanceof P.c.Property||e instanceof P.c.Stream||e instanceof P.c.Observable?t(e):t(P.c.constant(e))},e}(),n=P.d(document.body,"touchmove").throttle(100).map((function(e){return function(e){return o.cond([[W,p],[o.complement(M),u],[o.T,o.always(e)]])(e)}})),r=P.e(1e3).map((function(e){return function(e){return o.ifElse(w,m,d)(e)}})),c=s(P.f([P.b((function(){return C})),t,r,n])),u=function(e){return o.pipe(f,v,b)(e)},m=function(e){var t=e.score,n=e.best;return N.a.send("VKWebAppStorageSet",{key:"switchBestScore",value:String(n)}),o.pipe(v,o.assoc("gameIsLose",o.T),o.assoc("best",t>n?t:n))(e)},p=function(e){return o.pipe(h,v,b)(e)},d=function(e){return o.over2("cells",o.map(o.pipe(E,K)))(e)};function v(e){var t=V(e.level),n=o.map2((function(e,t){return{label:"off",countdown:null,index:t}}),o.range(0,t));return Object(i.a)({},e,{cells:n})}function f(e){return Object(i.a)({},e,{startingMessage:!1,gameIsLose:!1,gameIsPassed:!1,score:0,level:1})}function h(e){return Object(i.a)({},e,{levelComplete:!1,level:o.inc(e.level)})}function g(e){t.plug((function(t){return null!=e.countdown&&"WAIT"!==e.label?Object(i.a)({},t,{score:t.score+1,cells:o.set2([e.index,"countdown"],5,o.set2([e.index,"label"],"WAIT",t.cells))}):t}))}function b(n){var a=n.cells,l=o.filter((function(e){return null==e.countdown}),a);if(l.length){var r=B(l);return a=o.pipe(o.set2([r.index,"countdown"],5),o.set2([r.index,"label"],"WAIT"))(n.cells),clearTimeout(e),e=setTimeout((function(){t.plug(b)}),6e3),o.set2("cells",a,n)}return clearTimeout(e),o.pipe(v,o.assoc("levelComplete",o.T()))(n)}function w(t){var n=!1;return t.cells.map((function(t){1===t.countdown&&"TAP"===t.label&&(n=!0,clearTimeout(e))})),n}function E(e){return 1===e.countdown&&"WAIT"===e.label?{label:"TAP",countdown:4,index:e.index}:e}t.plug(v);var y,L,z=(y={state:c},L=function(e){var t=e.state;return l.a.createElement(A.c,{activePanel:"main"},l.a.createElement(A.a,{id:"main",theme:"white"},l.a.createElement(A.b,{theme:"alternate",noShadow:!0},"Switch"),l.a.createElement("div",{className:"game"},l.a.createElement("div",{className:"game-progress"},l.a.createElement(j,{label:"Level",value:t.level}),l.a.createElement(j,{label:"Score",value:t.score}),l.a.createElement(j,{label:"Best",value:t.best})),l.a.createElement(I,{state:t,onCellTap:g}))))},function(e){function t(e){var n;return Object(T.a)(this,t),(n=Object(k.a)(this,Object(x.a)(t).call(this,e))).state={},n}return Object(O.a)(t,e),Object(S.a)(t,[{key:"UNSAFE_componentWillMount",value:function(){var e=this,t=P.a(y).throttle(20,{leading:!1});this.sb=t.observe((function(t){e.setState(t)})),N.a.subscribe((function(t){if(t.detail){var n=t.detail,a=n.type,l=n.data;if("VKWebAppStorageGetResult"===a){console.log(l);var r=l.keys.find((function(e){return"switchBest"===e.key}));r&&r.value&&e.setState(o.set2("best",r.value,e.state))}}})),N.a.send("VKWebAppStorageSet",{key:"switchBest",value:"322"}),N.a.send("VKWebAppStorageGet",{keys:["switchBest"]})}},{key:"componentWillUnmount",value:function(){this.sb.unsubscribe(),N.a.unsubscribe()}},{key:"render",value:function(){return l.a.createElement(L,o.merge(this.props,this.state),this.props.children)}}]),t}(a.Component));return l.a.createElement(z,null)}),null),document.getElementById("app"))},97:function(e,t,n){e.exports=n(113)}},[[97,1,2]]]);
//# sourceMappingURL=main.6131cc70.chunk.js.map