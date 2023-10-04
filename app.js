let soru=document.querySelector(".soru");
const button=document.getElementById("button");
const body=document.getElementById("body");
const header=document.getElementById("başlık");
let container=document.getElementById("container");
let row=document.getElementById("row");
let a=row.children[0];
let b=row.children[1];
let c=row.children[2];
let d=row.children[3];
let rN=Math.floor(Math.random()*13);
class soruHavuzu{
    static async soru(){
        const response= await fetch("soruhavuzu.json");
        const data=response.json();
        return data;
        //sorularımızı aldık
    }
    static getQuestion(data){
        
        soru.innerHTML=`
        <span id="span">${data.s}</span>
        `;
        a.textContent=`${data.a}`;
        b.textContent=`${data.b}`;
        c.textContent=`${data.c}`;
        d.textContent=`${data.d}`;     
    }
    static async colors(){
        const color=await fetch("renkler.json");
        const dataCol=color.json();
        return dataCol;
        
    }
    static changeColor(data){
        body.style.backgroundColor=`${data}`;
        header.style.color=`${data}`;
        header.style.borderColor=`${data}`
        button.style.borderColor=`${data}`
        body.style.transition="all 0.4s linear 0.01s";    
    }
    static checkAnswer(fdata,data){
        if(data.true==fdata.textContent){
            console.log("Dogru cevabb");
            fdata.style.backgroundColor="#c8e6c9"; 
            console.log(data.true);
            console.log(fdata.textContent);
            let audio=document.createElement("audio");
            audio.src="/jsprojects/quizapp/audio/correct.mp3";
            audio.autoplay="autoplay";
            container.appendChild(audio);
        }
        else{
            console.log(data.true);
            console.log(fdata.textContent);
            console.log("yanlış cevap");
            fdata.style.backgroundColor="#ffcdd2";
            console.log(fdata.textContent.parentElement); 
            let audio=document.createElement("audio");
            audio.src="/jsprojects/quizapp/audio/wrong.mp3";
            audio.autoplay="autoplay";
            container.appendChild(audio);
            
        }
    }
       
}

var i=0;
var j=0;
body.addEventListener("click",function(e){
    if(e.target.id=="button"){
        if(i<12){
            soruHavuzu.soru()
            .then(data=>soruHavuzu.getQuestion(data[i]))//response edilen bilgiyi yazdırdık data olarak
            .catch(err=>console.error(err));
              
            soruHavuzu.colors()
            .then(dataCol=>soruHavuzu.changeColor(dataCol[i].c))
            .catch(err=>console.error(err));
            a.style.backgroundColor="#fff"
            b.style.backgroundColor="#fff"
            c.style.backgroundColor="#fff"
            d.style.backgroundColor="#fff"
                   
        }
        else(
            alert("Tüm soruları cevapladınız")
        )
        i++; 
        j++;
    }
    else if(e.target.className=="col s12 card-panel A"){
        
        soruHavuzu.soru()
        .then(data=>soruHavuzu.checkAnswer(e.target,data[j]))
        .catch(err=>console.error(err));
        e.target.style.backgroundColor="#fff";  
      
    }
    else if(e.target.className=="col s12 card-panel B"){
        
        soruHavuzu.soru()
        .then(data=>soruHavuzu.checkAnswer(e.target,data[j]))
        .catch(err=>console.error(err)); 
        
    }
    else if(e.target.className=="col s12 card-panel C"){
        
        soruHavuzu.soru()
        .then(data=>soruHavuzu.checkAnswer(e.target,data[j]))
        .catch(err=>console.error(err));  
       
    }
    else if(e.target.className=="col s12 card-panel D"){
        
        soruHavuzu.soru()
        .then(data=>soruHavuzu.checkAnswer(e.target,data[j]))
        .catch(err=>console.error(err));   
    }    
    else{
        console.log("doru yere tıkla");
    }
    
   
})
