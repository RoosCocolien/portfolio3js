import{S as t,P as e,W as n,T as o,M as i,B as s,a,b as d,c,A as l,R as y,C as r,d as u,O as p,G as w,e as m,f as x,g as h,h as b,i as g,V as I}from"./vendor.a5ea365b.js";const f=new t,k=new e(75,window.innerWidth/window.innerHeight,.1,600),B=new n({canvas:document.querySelector("#background")});B.setPixelRatio(window.devicePixelRatio),B.setSize(window.innerWidth,window.innerHeight);const E=new g,j=new I;document.body.appendChild(B.domElement);k.position.set(0,0,0),k.rotation.set(0,0,0);let M=!1,P=!1,z=!0,v=!1,T=[],C=(new o).load("textures/skybox/valley_ft.jpg"),_=(new o).load("textures/skybox/valley_bk.jpg"),H=(new o).load("textures/skybox/valley_up.jpg"),S=(new o).load("textures/skybox/valley_dn.jpg"),R=(new o).load("textures/skybox/valley_rt.jpg"),W=(new o).load("textures/skybox/valley_lf.jpg");T.push(new i({map:C})),T.push(new i({map:_})),T.push(new i({map:H})),T.push(new i({map:S})),T.push(new i({map:R})),T.push(new i({map:W}));for(let Et=0;Et<6;Et++)T[Et].side=s;let G=new a(300,300,300),O=new d(G,T);f.add(O);const F=new c(16777215);F.position.set(30,30,30);const L=new l(16777215);f.add(F,L);const q=(new o).load("textures/GrassGreenTexture0006.jpg",(function(t){t.wrapS=t.wrapT=y,t.repeat.set(3,3)})),A=new d(new r(90,30),new i({map:q}));function D(t,e,n,i,s,a){let c=new d;const l=(new o).load(t),y=new u({map:l});return(new p).load(e,(function(t){t.traverse((function(t){t.isMesh&&(t.material=y,t.scale.set(n,n,n),t.position.set(i,s,a),t.rotation.y=Math.PI/180*130)})),c=t,f.add(c)}),(function(t){console.log("Object "+t.loaded/t.total*100+"% loaded")}),(function(t){console.log("Error occurred: "+t)})),c}let J,V,X,Y;function K(t){return new d(new m(.7,1,1.5,6,1),new u({map:t}))}A.rotation.x=Math.PI/180*270,A.position.y=-10,f.add(A),setTimeout((function(){document.getElementById("loader").style.display="none",document.getElementById("loaderWrapper").style.display="none",it()}),1e3);const N=function(){const t=new w,e=(new o).load("textures/submarine.jpeg"),n=K(e);n.position.y=3.75;const i=K(e);i.rotation.z=Math.PI/180*45,i.position.y=2.75,i.position.x=-2.75;const s=K(e);s.rotation.z=Math.PI/180*90,s.position.y=0,s.position.x=-3.75;const a=K(e);a.rotation.z=Math.PI/180*135,a.position.y=-2.75,a.position.x=-2.75;const c=K(e);c.rotation.z=Math.PI/180*180,c.position.y=-3.75,c.position.x=0;const l=K(e);l.rotation.z=Math.PI/180*225,l.position.y=-2.75,l.position.x=2.75;const y=K(e);y.rotation.z=Math.PI/180*270,y.position.y=0,y.position.x=3.75;const r=K(e);r.rotation.z=Math.PI/180*315,r.position.y=2.75,r.position.x=2.75;const p=new d(new b(3,1,4,8,6.3),new u({map:e}));return t.add(n,i,s,a,c,l,y,r,p),t}();function Q(t,e,n,o,s,c){const l=new d(new a(o,s,c),new i({color:16777215,wireframe:!0}));return l.position.set(t,e,n),l.visible=!1,l}N.position.set(17,-2,-5),N.rotation.y=Math.PI/180*288,D("models/rock/textures/Rock_6_d.jpg","models/rock/Rock_6.OBJ",5,-19,-5,-6.18),D("models/bicycle2/textures/bicycle2_BaseColor.png","models/bicycle2/bicycle2_002.obj",.2,12,-7,12);let U=function(){const t=new w,e=new u({color:4937313}),n=new u({color:15615}),o=new u({color:39983}),i=new u({color:9505792}),s=new u({color:5935504}),c=new d(new a(5,.5,3),e);c.position.y=-5;const l=new a(1,1,1),y=new d(l,n);J=y.uuid,y.position.y=-4.7,y.position.x=-1.5;const r=new d(l,o);V=r.uuid,r.position.y=-4.7;const p=new d(l,i);X=p.uuid,p.position.y=-4.7,p.position.x=1.5;const x=new d(new m(1.7,1.7,.5,21,1),e);x.position.z=-5,x.position.y=-5;const h=new d(new m(.5,.5,1.5,21,1),e);h.position.z=-5,h.position.y=-4;const b=new d(new a(9,5,2),e);b.position.z=-5,b.position.y=-1;const g=new d(new a(8,4.5,.5),s);return Y=g,g.position.z=-3.9,g.position.y=4.1-5,t.add(c,y,r,p,x,h,b,g),t}(),Z=function(){const t=new w,e=(new o).load("textures/stones.jpeg",(function(t){t.wrapS=t.wrapT=y,t.repeat.set(2,2)})),n=(new o).load("textures/roof_tiles.jpeg",(function(t){t.wrapS=t.wrapT=y,t.repeat.set(2,2)})),s=new d(new a(10,5,5),new i({map:e}));s.position.x=0,s.position.z=-20,s.position.y=-5;const c=new d(new a(5,3.8,3.8),new i({map:n}));c.position.x=2.4,c.position.z=-20,c.position.y=-2.6,c.rotation.x=Math.PI/180*45;const l=new d(new a(5,7,5),new i({map:e}));l.position.x=-2.5,l.position.z=-20,l.position.y=1;const r=new d(new x(4,4,4),new h({map:n}));return r.position.x=-2.5,r.position.z=-20,r.position.y=6.5,r.rotation.y=Math.PI/180*45,t.add(s,c,l,r),t.position.x=0,t.rotation.y=Math.PI/180*5,t}();U.position.set(-10,-1,10),U.rotation.y=Math.PI/180*130,f.add(U),f.add(Z),f.add(N);const $=Q(0,-2,-20,10,10,10),tt=Q(19,-3,-6.18,10,10,10),et=Q(15,-2,13,10,10,10),nt=Q(-12,-1.5,12,5,5,9);nt.rotation.y=Math.PI/180*45;const ot=Q(-15,-2,-5,10,10,10);function it(){document.body.scrollTop=0,document.documentElement.scrollTop=0}function st(){setTimeout((function(){z=!1,M=!0,document.getElementById("instructions").style.display="block"}),1e3)}function at(){z=!0,M=!1,it(),document.getElementById("instructions").style.display="none"}f.add($,tt,et,nt,ot);const dt=document.getElementById("textWelcome"),ct=document.getElementById("textMenu"),lt=document.getElementById("yesButton"),yt=document.getElementById("startButton");lt.onclick=function(){"none"!==dt.style.display?(dt.style.display="none",ct.style.display="block",it()):dt.style.display="block"},yt.onclick=function(){"none"!==ct.style.display?(ct.style.display="none",it(),st()):dt.style.display="block"};const rt=document.getElementById("textChurch"),ut=document.getElementById("textGear"),pt=document.getElementById("textRock"),wt=document.getElementById("otherHobbies"),mt=document.getElementById("textPromoTech"),xt=document.getElementById("textTechStack"),ht=document.getElementById("textFavoProjects"),bt=document.getElementById("exitButtonChurch"),gt=document.getElementById("exitButtonGear"),It=document.getElementById("exitButtonRock"),ft=document.getElementById("exitButtonHobbies"),kt=document.getElementById("exitButtonComputer");function Bt(t){t.position.y-=.3,setTimeout((function(){t.position.y+=.3,v=!1}),1e3)}bt.onclick=function(){"none"!==rt.style.display&&(rt.style.display="none",st())},gt.onclick=function(){"none"!==ut.style.display&&(ut.style.display="none",st())},It.onclick=function(){"none"!==pt.style.display&&(pt.style.display="none",st())},ft.onclick=function(){"none"!==wt.style.display&&(wt.style.display="none",st())},kt.onclick=function(){"none"!==mt.style.display&&(mt.style.display="none",xt.style.display="none",ht.style.display="none",st())},window.addEventListener("click",(function(t){if(!z){t.preventDefault(),j.x=t.clientX/window.innerWidth*2-1,j.y=-t.clientY/window.innerHeight*2+1,E.setFromCamera(j,k);const e=E.intersectObjects(f.children);!function(t){const e=t.intersectObjects(U.children);if(0==v)for(let n=0;n<e.length;n++)e[n].object.uuid==J&&(v=!0,Bt(e[n].object),Y.material.color.setHex(16711680*Math.random())),e[n].object.uuid==V&&(v=!0,Bt(e[n].object),Y.material.color.setHex(65280*Math.random())),e[n].object.uuid==X&&(v=!0,Bt(e[n].object),Y.material.color.setHex(255*Math.random()))}(E);for(let t=0;t<e.length;t++)e[t].object.uuid==$.uuid?(at(),document.getElementById("textChurch").style.display="block"):e[t].object.uuid==tt.uuid?(at(),document.getElementById("textGear").style.display="block"):e[t].object.uuid==et.uuid?(at(),document.getElementById("otherHobbies").style.display="block"):e[t].object.uuid==nt.uuid?(at(),document.getElementById("textPromoTech").style.display="block",document.getElementById("textTechStack").style.display="block",document.getElementById("textFavoProjects").style.display="block"):e[t].object.uuid==ot.uuid&&(at(),document.getElementById("textRock").style.display="block")}}),!1),window.addEventListener("resize",(function(){k.aspect=window.innerWidth/window.innerHeight,k.updateProjectionMatrix(),B.setSize(window.innerWidth,window.innerHeight)}),!1),window.addEventListener("keypress",(function(t){M&&!z&&(100==t.keyCode&&(k.rotation.y<=0&&(k.rotation.y=Math.PI/180*360),k.rotation.y-=.01),97==t.keyCode&&(k.rotation.y>=Math.PI/180*360&&(k.rotation.y=0),k.rotation.y+=.01),114==t.keyCode&&(M=!1,P=!0),109==t.keyCode&&(at(),document.getElementById("textMenu").style.display="block"))}),!1),function t(){requestAnimationFrame(t),1==P&&(k.rotation.y>3.14?(k.rotation.y+=.1,k.rotation.y>=Math.PI/180*360&&(k.rotation.y=0)):k.rotation.y<=3.14&&(k.rotation.y-=.1),k.rotation.y>=-.1&&k.rotation.y<=.1&&(k.rotation.y=0,M=!0,P=!1)),N.rotation.z+=.01,B.render(f,k)}();