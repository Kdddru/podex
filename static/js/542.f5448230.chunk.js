"use strict";(self.webpackChunkpodex=self.webpackChunkpodex||[]).push([[542],{542:(e,a,t)=>{t.r(a),t.d(a,{default:()=>u});var s=t(43),n=t(765),o=t(547),l=t(579);function c(){return(0,l.jsx)("div",{className:o.A.navbar,children:(0,l.jsx)("div",{className:o.A.circle})})}var i=t(216);const m=s.lazy((()=>t.e(47).then(t.bind(t,47))));function p(){const[e,a]=(0,s.useState)(21),[t,o]=(0,s.useState)(),[c,p]=(0,s.useState)(),[u,r]=(0,s.useState)(),d=(0,s.useCallback)((async e=>{const a=[];for(let n=0;n<e;n++){let e="https://pokeapi.co/api/v2/pokemon-species/".concat(n+1);a.push(e)}const t=a.map((e=>fetch(e))),s=await Promise.all(t).then((e=>Promise.all(e.map((e=>e.json()))))).then((e=>e.map((e=>e.names[2].name))));p(s)}),[e]),h=(0,s.useCallback)((async e=>{const a=[];for(let l=0;l<e;l++){let e="https://pokeapi.co/api/v2/pokemon-form/".concat(l+1);a.push(e)}const t=a.map((e=>fetch(e))),s=(await Promise.all(t).then((e=>Promise.all(e.map((e=>e.json()))))).then((e=>e.map((e=>null===e||void 0===e?void 0:e.types))))).map((e=>e.map((e=>e.type.url)))),n=s.map((async e=>{const a=null===e||void 0===e?void 0:e.map((e=>fetch(e)));return Promise.all(a).then((e=>Promise.all(e.map((e=>e.json()))))).then((e=>e.map((e=>e.names[1].name))))})),o=await Promise.all(n);r(o)}),[e]);return(0,s.useEffect)((()=>{d(e),h(e)}),[e]),(0,s.useEffect)((()=>{if(c&&u){const e=c.map(((e,a)=>({id:a+1,name:e,type:null===u||void 0===u?void 0:u[a]})));o(e)}}),[c,u]),(0,l.jsxs)("div",{className:n.A.main,children:[c&&u&&(0,l.jsx)(m,{pokemons:t,setNum:a}),(0,l.jsx)(i.sv,{context:t})]})}function u(){return(0,l.jsxs)("div",{className:n.A.layout,children:[(0,l.jsx)(c,{}),(0,l.jsx)(p,{})]})}},765:(e,a,t)=>{t.d(a,{A:()=>s});const s={layout:"layoutstyle_layout__9Jwod",main:"layoutstyle_main__QMZPM",card:"layoutstyle_card__UZa28",type:"layoutstyle_type__hJFQw"}}}]);
//# sourceMappingURL=542.f5448230.chunk.js.map