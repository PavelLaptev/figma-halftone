!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}({11:function(e,t){figma.showUI(__html__,{width:260,height:600});let n=()=>Math.floor(65536*(1+Math.random())).toString(16).substring(1);figma.ui.onmessage=async e=>{if("fold"===e.type&&(e.toggle?figma.ui.resize(100,30):figma.ui.resize(260,600)),"SVG-data"===e.type){const t=figma.createNodeFromSvg(e.data);if("radial"===e.name&&(t.children[0].rotation=45,t.children[0].x=-28,t.children[0].y=110),"linear"===e.name&&(t.children[0].rotation=-90,t.children[0].x=208,t.children[0].y=13),e.flatten){const i=figma.flatten([t]);i.name=`${e.name} ${n()}`,i.x=Math.round(figma.viewport.bounds.width/2+figma.viewport.bounds.x-i.width/2),i.y=Math.round(figma.viewport.bounds.height/2+figma.viewport.bounds.y-i.height/2),i.fills=[{blendMode:"NORMAL",color:{r:0,g:0,b:0},opacity:1,type:"SOLID",visible:!0}],figma.currentPage.appendChild(i),figma.currentPage.selection=[i],figma.viewport.scrollAndZoomIntoView([i])}else t.name=`${e.name} ${n()}`,t.x=Math.round(figma.viewport.bounds.width/2+figma.viewport.bounds.x-t.width/2),t.y=Math.round(figma.viewport.bounds.height/2+figma.viewport.bounds.y-t.height/2),figma.currentPage.selection=[t],figma.viewport.scrollAndZoomIntoView([t])}}}});