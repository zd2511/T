import * as THREE from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/index.js';
import {ScrollTrigger} from 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

const canvas=document.querySelector('#world');
const scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x050505,.045);
const camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,100);
camera.position.set(0,0,7);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.7)); renderer.setSize(innerWidth,innerHeight); renderer.outputColorSpace=THREE.SRGBColorSpace;
const composer=new EffectComposer(renderer); composer.addPass(new RenderPass(scene,camera));
const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),1.25,.7,.15); composer.addPass(bloom);
scene.add(new THREE.AmbientLight(0xffffff,.7));
const pink=new THREE.PointLight(0xff1f8f,18,20); pink.position.set(2,1,3); scene.add(pink);
const white=new THREE.PointLight(0xffffff,7,15); white.position.set(-3,2,4); scene.add(white);
const group=new THREE.Group(); scene.add(group);
const core=new THREE.Mesh(new THREE.IcosahedronGeometry(1.18,4),new THREE.MeshPhysicalMaterial({color:0x171717,emissive:0xff1f8f,emissiveIntensity:.35,metalness:.65,roughness:.16,clearcoat:1,clearcoatRoughness:.08})); group.add(core);
const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(1.28,2),new THREE.MeshBasicMaterial({color:0xff1f8f,wireframe:true,transparent:true,opacity:.28})); group.add(wire);
const ringMat=new THREE.MeshBasicMaterial({color:0xff1f8f,transparent:true,opacity:.5});
for(let i=0;i<3;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(1.8+i*.55,.008,8,160),ringMat);r.rotation.set(Math.random()*2,Math.random()*2,Math.random()*2);group.add(r)}
const points=[];for(let i=0;i<500;i++){const p=new THREE.Vector3((Math.random()-.5)*15,(Math.random()-.5)*10,(Math.random()-.5)*10);points.push(p)}
const geo=new THREE.BufferGeometry().setFromPoints(points);const stars=new THREE.Points(geo,new THREE.PointsMaterial({color:0xffffff,size:.012,transparent:true,opacity:.35}));scene.add(stars);
let targetX=0,targetY=0;addEventListener('pointermove',e=>{targetX=(e.clientX/innerWidth-.5)*.7;targetY=(e.clientY/innerHeight-.5)*.35});
function render(){requestAnimationFrame(render);group.rotation.y+=.002;group.rotation.x+=.001;group.rotation.y+= (targetX-group.rotation.y)*.002;camera.position.x+=(targetX-camera.position.x)*.025;camera.position.y+=(-targetY-camera.position.y)*.025;stars.rotation.y+=.00025;composer.render()}render();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);composer.setSize(innerWidth,innerHeight)});
const coreScene=document.querySelector('.core-scene'); gsap.to(group.rotation,{x:Math.PI*.7,y:Math.PI*2.2,scrollTrigger:{trigger:coreScene,start:'top bottom',end:'bottom top',scrub:1.5}}); gsap.to(camera.position,{z:4.5,scrollTrigger:{trigger:'.statement',start:'top bottom',end:'bottom top',scrub:1.5}}); gsap.to(camera.position,{z:7,scrollTrigger:{trigger:'.core-scene',start:'top top',end:'bottom top',scrub:1.5}});
const revealTargets=document.querySelectorAll('.statement h2,.core-copy h2,.feature-copy h2,.services-list h2,.builder-copy h2,.package-intro h2,.product-copy h2,.final-copy h2'); revealTargets.forEach(el=>gsap.fromTo(el,{y:100,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none reverse'}}));
const nodes=document.querySelectorAll('.node');const tooltip=document.querySelector('#serviceTooltip');nodes.forEach(n=>n.addEventListener('mouseenter',()=>{nodes.forEach(x=>x.classList.remove('active'));n.classList.add('active');tooltip.textContent=n.dataset.service}));
const builderButtons=document.querySelectorAll('.builder-options button');const builderNodes=document.querySelector('#builderNodes');const builderTitle=document.querySelector('#builderTitle');const builderText=document.querySelector('#builderText');const selected=new Set();const labels={website:'WEBSITE',seo:'SEO',social:'SOCIAL',analytics:'ANALYTICS',software:'SOFTWARE',automation:'AUTOMATION',hosting:'HOSTING',maintenance:'MAINTENANCE'};function updateBuilder(){builderNodes.innerHTML='';const arr=[...selected];arr.forEach((key,i)=>{const d=document.createElement('div');d.className='builder-node';d.textContent=labels[key];const a=i*(360/Math.max(arr.length,1))*Math.PI/180;d.style.left=`calc(50% + ${Math.cos(a)*34}%)`;d.style.top=`calc(50% + ${Math.sin(a)*34}%)`;builderNodes.appendChild(d)});if(!arr.length){builderTitle.textContent='START WITH ONE.';builderText.textContent='Pick a piece of your digital system.'}else if(arr.length>=4){builderTitle.textContent='DIGITAL SYSTEM.';builderText.textContent='A connected stack built around your business.'}else if(selected.has('website')&&selected.has('seo')){builderTitle.textContent='DIGITAL PRESENCE.';builderText.textContent='A website with discoverability built in.'}else if(selected.has('software')&&selected.has('automation')){builderTitle.textContent='BUSINESS ENGINE.';builderText.textContent='Systems and automation working together.'}else{builderTitle.textContent='YOUR NEXT PIECE.';builderText.textContent=arr.map(k=>labels[k]).join(' · ')}}builderButtons.forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.key;if(selected.has(k)){selected.delete(k);b.classList.remove('active')}else{selected.add(k);b.classList.add('active')}updateBuilder()}));
const packs={starter:['STARTER','R800','A practical starting point for getting your business online.'],basic:['BASIC','R1,250','A stronger website foundation for a business ready to present itself professionally.'],premium:['PREMIUM','R2,100','A more complete digital presence for businesses ready to do more online.'],professional:['PROFESSIONAL','R3,500','A larger build for businesses that need a more advanced digital presence.']};document.querySelectorAll('.pack').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.pack').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const p=packs[btn.dataset.pack];document.querySelector('#packLabel').textContent=p[0];document.querySelector('#packPrice').textContent=p[1];document.querySelector('#packCopy').textContent=p[2];document.querySelector('#packLink').href=`https://wa.me/27743899657?text=Hi%20Zapify%20Designs%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(p[0])}%20package%20at%20${encodeURIComponent(p[1])}.`}));
let pct=0;const loadInt=setInterval(()=>{pct=Math.min(100,pct+Math.random()*18);document.querySelector('#loadPct').textContent=Math.floor(pct)+'%';document.querySelector('.loader-line i').style.width=pct+'%';if(pct>=100){clearInterval(loadInt);document.body.classList.add('loaded')}},90);
