console.log("Hello world from game");
const que=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
const result = document.getElementById("score")
const container = document.getElementsByClassName("container")
console.log("resutl variable" ,result)
let currentQue={};
let acceptingans= true;
let score=0;
let quecounter=0;
let availableQue=[];
let questions=[
    {
        question:"Inside which HTML element javascript can be written??",
        choice1: "<script>",
        choice2:"<js>",
        choice3:"<javascript>",
        choice4:"scripting",
        answer:1
    },  
    {
        question:"How can we declare variable in js??",
        choice1: "Const",
        choice2:"Var",
        choice3:"Let",
        choice4:"All Of Above",
        answer:4
    },
    {
        question:"What does DOM stands for?",
        choice1: "Documentory Oblique Model",
        choice2:"Data Oriented Model",
        choice3:"Document Object Model",
        choice4:"Data Object Model",
        answer:3
    }
];

const bonus=10;
const max_que=3;

startGame=()=>{
    quecounter=0;
    // score=0;
    availableQue=[...questions];
    console.log(availableQue);
    getNewQue();
};
getNewQue=()=>{
    if (availableQue.length == 0 || quecounter >= max_que) {
        const finalScore = score * bonus;
        window.location.href = `end.html?score=${finalScore}`;
        return;
    }
    quecounter++;
    const queIndex=Math.floor(Math.random()*availableQue.length);
     currentQue=availableQue[queIndex];
    que.innerText=currentQue.question;
    choices.forEach(choice=>{
        const number=choice.dataset['number'];
        choice.innerText=currentQue['choice'+number];
    });
    availableQue.splice(queIndex,1);
    acceptingans=true;
};

choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
      if(!acceptingans) return;

      acceptingans=false;
      const selectedchoice=e.target;
      console.log(selectedchoice)
      const selectedans=selectedchoice.dataset["number"];
     console.log("selected ans:" ,selectedans)
     console.log("ans of current que", currentQue.answer);
     let myans = ""
     if(selectedans == currentQue.answer){
          myans = "correct" ;
          score++;
          console.log("current score:" ,score)
     }
     if(selectedans != currentQue.answer){
         myans = "incorrect"
     }
      console.log("my ans" ,myans)
    
       console.log("selected parent" ,selectedchoice.parentElement)

      selectedchoice.parentElement.classList.add(myans);
      setTimeout(()=>{
        selectedchoice.parentElement.classList.remove(myans);
        console.log("score to set:",score)
        getNewQue();
      },500);
     
      
    });
});


startGame();