(() => {
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduce) document.documentElement.classList.add("reduced-motion");

const loader = document.querySelector("#loader");
document.body.classList.add("loading");
let p=0;
const tick=setInterval(()=>{p=Math.min(100,p+Math.random()*14+4);document.querySelector(".loader-track span").style.width=p+"%";document.querySelector(".loader-percent").textContent=Math.round(p).toString().padStart(2,"0")+"%";if(p>=100){clearInterval(tick);setTimeout(()=>{loader.style.opacity="0";loader.style.pointerEvents="none";document.body.classList.remove("loading");setTimeout(()=>loader.remove(),700)},250)}},80);

const wa = msg => `https://wa.me/27743899657?text=${encodeURIComponent("Hi Zapify Designs, I'd like to enquire about " + msg + ".")}`;
document.querySelectorAll("[data-wa]").forEach(b=>b.addEventListener("click",()=>window.open(wa(b.dataset.wa),"_blank","noopener")));

const buttons=[...document.querySelectorAll(".builder-options button")], nodes=document.querySelector("#builder-nodes"), title=document.querySelector("#builder-title"), copy=document.querySelector("#builder-copy");
const labels={website:"WEBSITE",seo:"SEO",social:"SOCIAL",analytics:"ANALYTICS",software:"SOFTWARE",automation:"AUTOMATION",hosting:"HOSTING",maintenance:"MAINTENANCE"};
const selected=new Set();
function renderBuilder(){
 nodes.innerHTML="";
 [...selected].forEach((key,i)=>{const n=document.createElement("span");n.className="builder-node";n.textContent=labels[key];const a=(i/Math.max(1,selected.size))*Math.PI*2-.8;n.style.left=(50+Math.cos(a)*36)+"%";n.style.top=(50+Math.sin(a)*36)+"%";nodes.appendChild(n)});
 if(selected.size===0){title.textContent="SELECT COMPONENTS";copy.textContent="Your system will assemble here.";return}
 const has=(a)=>selected.has(a);
 let t="DIGITAL PRESENCE", c="A connected online foundation.";
 if(has("website")&&has("software")&&has("automation")){t="DIGITAL SYSTEM";c="Website + software + automation working as one system."}
 else if(has("website")&&has("seo")&&has("social")&&has("analytics")){t="DIGITAL PRESENCE";c="Website + SEO + social + analytics connected around visibility."}
 else if(has("automation")&&has("software")){t="BUSINESS AUTOMATION";c="Software and workflows connected to reduce repetitive work."}
 title.textContent=t;copy.textContent=c;
}
buttons.forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.key;if(selected.has(k)){selected.delete(k);b.classList.remove("active")}else{selected.add(k);b.classList.add("active")}renderBuilder()}));

if(!reduce && window.gsap){
 gsap.registerPlugin(ScrollTrigger);
 gsap.utils.toArray(".hero h1 span").forEach((el,i)=>gsap.fromTo(el,{y:100,opacity:0},{y:0,opacity:1,duration:1.1,delay:.15+i*.08,ease:"power4.out"}));
 gsap.to(".core-wrap",{y:-180,rotation:18,scale:1.08,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
 gsap.to(".hero h1",{x:-80,scale:.92,ease:"none",scrollTrigger:{trigger:".hero",start:"20% top",end:"bottom top",scrub:1}});
 gsap.fromTo(".statement-word",{y:130,opacity:.15},{y:-60,opacity:1,ease:"none",scrollTrigger:{trigger:".statement",start:"top 80%",end:"bottom 20%",scrub:1}});
 gsap.to(".stage-core",{scale:1.35,rotation:180,scrollTrigger:{trigger:".core-story",start:"top bottom",end:"bottom top",scrub:1}});
 gsap.utils.toArray(".stage-node").forEach((el,i)=>gsap.fromTo(el,{scale:.5,opacity:.1},{scale:1,opacity:1,scrollTrigger:{trigger:".core-story",start:"top 60%",end:"center 35%",scrub:1}}));
 gsap.utils.toArray(".service-item").forEach(el=>gsap.fromTo(el,{x:i%2?100:-100,opacity:.1},{x:0,opacity:1,scrollTrigger:{trigger:el,start:"top 85%",end:"top 45%",scrub:1}}));
 gsap.to(".browser-demo",{x:-80,y:100,rotation:2,scrollTrigger:{trigger:".demo-section",start:"top bottom",end:"bottom top",scrub:1}});
 gsap.utils.toArray(".flow-block").forEach(el=>gsap.fromTo(el,{y:100},{y:-50,scrollTrigger:{trigger:".tech-flow",start:"top bottom",end:"bottom top",scrub:1}}));
 gsap.fromTo(".dash-ui",{scale:.9,opacity:.3},{scale:1,opacity:1,scrollTrigger:{trigger:".dashboard",start:"top 75%",end:"top 25%",scrub:1}});
 gsap.utils.toArray(".reveal-lines span,.reveal-lines strong").forEach((el,i)=>gsap.fromTo(el,{x:i%2?-120:120,opacity:.15},{x:0,opacity:1,scrollTrigger:{trigger:".final-reveal",start:"top 75%",end:"center 35%",scrub:1}}));
}
const dot=document.querySelector(".cursor-dot"),ring=document.querySelector(".cursor-ring");
if(dot&&!reduce){let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px"});const loop=()=>{rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+"px";ring.style.top=ry+"px";requestAnimationFrame(loop)};loop();document.querySelectorAll("a,button").forEach(el=>el.addEventListener("mouseenter",()=>{ring.style.width="48px";ring.style.height="48px"}));document.querySelectorAll("a,button").forEach(el=>el.addEventListener("mouseleave",()=>{ring.style.width="28px";ring.style.height="28px"}))}
document.querySelectorAll(".magnetic").forEach(el=>el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.15}px)`}));document.querySelectorAll(".magnetic").forEach(el=>el.addEventListener("pointerleave",()=>el.style.transform=""));
})();