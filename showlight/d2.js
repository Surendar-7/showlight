/* ==========================================
   SHOWLIGHTS WEBSITE
   script.js
========================================== */

/* ===============================
   STICKY HEADER
================================ */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.style.background = "rgba(15,23,42,.96)";
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.15)";

    }

    else{

        header.style.background = "rgba(15,23,42,.75)";
        header.style.boxShadow = "none";

    }

});


/* ===============================
   SMOOTH SCROLL
================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


/* ===============================
   ACTIVE NAVIGATION
================================ */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

const height=section.offsetHeight;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


/* ===============================
   SCROLL ANIMATION
================================ */

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

document.querySelectorAll(".section,.type-card,.gallery-item,.stat,.process-row").forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});


/* ===============================
   COUNTER ANIMATION
================================ */

const counters=document.querySelectorAll(".num");

const speed=120;

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter=entry.target;

const text=counter.innerText;

const value=parseInt(text.replace(/\D/g,""));

if(isNaN(value)) return;

let count=0;

const update=()=>{

const increment=Math.ceil(value/speed);

count+=increment;

if(count<value){

counter.innerText=count+"+";

requestAnimationFrame(update);

}

else{

counter.innerText=text;

}

};

update();

counterObserver.unobserve(counter);

}

});

});

counters.forEach(counter=>counterObserver.observe(counter));


/* ===============================
   CONTACT FORM
================================ */

const form=document.querySelector("form");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const inputs=form.querySelectorAll("input,textarea");

let valid=true;

inputs.forEach(input=>{

if(input.value.trim()===""){

input.style.border="1px solid red";

valid=false;

}

else{

input.style.border="1px solid #ddd";

}

});

if(valid){

alert("✅ Thank you!\n\nYour enquiry has been received.\nOur team will contact you shortly.");

form.reset();

}

});

}


/* ===============================
   BACK TO TOP BUTTON
================================ */

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.style.cssText=`

position:fixed;
right:30px;
bottom:30px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#F4B400;
color:#111;
font-size:22px;
cursor:pointer;
display:none;
z-index:999;
box-shadow:0 10px 20px rgba(0,0,0,.2);
transition:.3s;

`;

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


/* ===============================
   HERO FADE EFFECT
================================ */

window.addEventListener("scroll",()=>{

const hero=document.querySelector(".hero");

if(hero){

hero.style.backgroundPositionY=(window.pageYOffset*0.4)+"px";

}

});


/* ===============================
   CARD HOVER EFFECT
================================ */

document.querySelectorAll(".type-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});


/* ===============================
   GALLERY EFFECT
================================ */

document.querySelectorAll(".gallery-item").forEach(item=>{

item.addEventListener("mousemove",e=>{

const x=e.offsetX/item.offsetWidth*10;

const y=e.offsetY/item.offsetHeight*10;

item.style.transform=`rotateX(${5-y}deg) rotateY(${x-5}deg)`;

});

item.addEventListener("mouseleave",()=>{

item.style.transform="rotateX(0) rotateY(0)";

});

});


/* ===============================
   PAGE LOADER
================================ */

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});


/* ===============================
   TYPEWRITER EFFECT
================================ */

const title=document.querySelector(".hero h1");

if(title){

const text=title.innerHTML;

title.innerHTML="";

let i=0;

function typing(){

if(i<text.length){

title.innerHTML+=text.charAt(i);

i++;

setTimeout(typing,18);

}

}

typing();

}


/* ===============================
   CONSOLE MESSAGE
================================ */

console.log("%cShowlights Entertainment LLP","font-size:24px;color:#1E3A8A;font-weight:bold;");

console.log("%cWhere Brands Shine. Experiences Come Alive.","color:#F4B400;font-size:16px;");

/* ===============================
   CONTACT FORM
================================ */

const scriptURL = "YOUR_GOOGLE_SCRIPT_WEBAPP_URL",
      form = document.getElementById("bookingForm"),
      date = document.getElementById("date");

if (date) date.min = new Date().toISOString().split("T")[0];

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            date: document.getElementById("date").value,
            message: document.getElementById("message").value
        };

        try {
            await fetch(scriptURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            alert("✅ Thank you! Your booking request has been submitted.");
            form.reset();

        } catch (err) {
            alert("❌ Submission failed. Please try again.");
            console.error(err);
        }
    });
}