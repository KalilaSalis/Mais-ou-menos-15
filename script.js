
const intro = document.getElementById("intro");
const site = document.getElementById("site");
const ball = document.querySelector(".mirror-ball");

let opened = false;

ball.addEventListener("click", enterExperience);
ball.addEventListener("touchstart", enterExperience,{passive:true});

function enterExperience(){

if(opened) return;
opened = true;

ball.style.transition="transform 1.6s ease";
intro.style.transition="opacity 1.3s ease";

ball.style.transform="scale(18) rotate(540deg)";

setTimeout(()=>{
intro.style.opacity="0";
},700);

setTimeout(()=>{
intro.style.display="none";
site.style.display="block";

window.scrollTo({
top:0,
behavior:"instant"
});

fadeSections();

startCountdown();

},1600);

}

function fadeSections(){

const items=document.querySelectorAll(".hero,.placeholder,footer");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([
{opacity:0,transform:"translateY(60px)"},
{opacity:1,transform:"translateY(0)"}
],{
duration:900,
fill:"forwards",
easing:"ease-out"
});

observer.unobserve(entry.target);

}

});

},{threshold:.15});

items.forEach(i=>{
i.style.opacity=0;
observer.observe(i);
});

}

function startCountdown(){

const hero=document.querySelector(".hero");

const box=document.createElement("div");
box.style.marginTop="40px";
box.style.fontSize="1.4rem";
box.style.fontWeight="600";

hero.appendChild(box);

const target=new Date("2027-04-16T22:00:00");

function update(){

const now=new Date();

const diff=target-now;

if(diff<=0){

box.innerHTML="A festa começou!";

return;

}

const d=Math.floor(diff/1000/60/60/24);
const h=Math.floor(diff/1000/60/60)%24;
const m=Math.floor(diff/1000/60)%60;
const s=Math.floor(diff/1000)%60;

box.innerHTML=
`${d} dias • ${h}h ${m}min ${s}s`;

}

update();

setInterval(update,1000);

}

// pequeno efeito ao mover o celular ou mouse

window.addEventListener("mousemove",(e)=>{

if(opened) return;

const x=(e.clientX/window.innerWidth-.5)*12;
const y=(e.clientY/window.innerHeight-.5)*12;

ball.style.transform=
`rotateY(${x}deg) rotateX(${-y}deg)`;

});

window.addEventListener("deviceorientation",(e)=>{

if(opened) return;

const x=(e.gamma||0)/3;
const y=(e.beta||0)/6;

ball.style.transform=
`rotateY(${x}deg) rotateX(${y}deg)`;

});
