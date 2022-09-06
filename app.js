// current time 

const clock=document.getElementById('clock')
function currentTime() {
  let date=new Date()
  let hour=date.getHours()
  let minutes=date.getMinutes()
  let sec=date.getSeconds()
  hour=(hour<10) ? "0"+hour : hour
  minutes=(minutes<10) ? "0"+minutes : minutes 
  let time=(sec%2==0) ? hour+" "+minutes : hour+":"+minutes
  clock.innerHTML=time
  setTimeout(() => {
  currentTime()
}, 1000);
}
currentTime()

// change light  & dark style
const body=document.getElementsByTagName('body')
const lightButton=document.getElementById('lightButton')
const darkButton=document.getElementById('darkButton')
const operations=document.querySelectorAll('.operation')
const activOperation=document.getElementById('activOperation')
const keyboardSvgs=document.querySelectorAll('.keyboardSvg')
const calcKeyboard=document.getElementById('calcKeyboard').children

lightButton.addEventListener("click", () => {
  if (body[0].classList.contains('darkbackground')) {
    changeStyle()
  }
})
darkButton.addEventListener("click", ()=> {
  if (!body[0].classList.contains('darkbackground')) {
    changeStyle()
  }
})
function changeStyle() {
  body[0].classList.toggle('darkbackground')
  clock.classList.toggle('darkColor')
  darkButton.classList.toggle('light')
  darkButton.classList.toggle('darkActiveSvg')
  lightButton.classList.toggle('darkPassiveSvg')
  operations.forEach((val,index) => {
    operations[index].classList.toggle(('light'))
    operations[index].classList.toggle(('darkColor'))
  })
  activOperation.classList.toggle('light')
  activOperation.classList.toggle('darkColor')
  keyboardSvgs.forEach((val,ind) => {
    keyboardSvgs[ind].classList.toggle(('darkActiveSvg'))
  })
  for (let i = 0; i < calcKeyboard.length; i++) {
    calcKeyboard[i].classList.toggle('light')
    calcKeyboard[i].classList.toggle('darkColor')
    
  }
}
// mathematical operations

// if numbers click
const numbers=Array.from(document.querySelectorAll('span.button')) 

numbers.map( button => {
  button.addEventListener('click', (e)=> {
    if (operations[0].innerHTML.length<42) {
      switch (e.target.innerText) {
        case 'C':
         operations[0].innerHTML="0"
         activOperation.innerHTML="0"
          break;
       case  'Back':
         if (operations[0].innerHTML.length>1) {
           operations[0].innerHTML=operations[0].innerHTML.slice(0, -1)
           if (activOperation.innerHTML=="🤔") {
            activOperation.innerHTML="0"
          }
         } 
         else  operations[0].innerHTML="0"
         break;
       default:
         if (operations[0].innerHTML=="0") {
           operations[0].innerHTML=""
           operations[0].innerHTML+=e.target.innerText
         } else {
           operations[0].innerHTML+=e.target.innerText
         }
        
         break;
     }
     switch (e.target.id || e.target.childNodes[0].id ) {
         case 'division':
           operations[0].innerHTML+="/"
           break;
         case 'multiplication':
             operations[0].innerHTML+="*"
           break;
         case 'addicion':
           operations[0].innerHTML+="+"
           break;
         case 'subtraction':
             operations[0].innerHTML+="-"
           break;
         case 'equals':
           try {
             let c=eval(operations[0].innerHTML)
             if (isNaN(c)) {
              activOperation.innerHTML="🤔"
              break;
             }
             if (Number.isInteger(c)) {
              if (c<9999999999) {
                activOperation.innerHTML=eval(operations[0].innerHTML)
              }
               else {activOperation.innerHTML="🤔"}
             } else {
               activOperation.innerHTML=parseFloat(eval(operations[0].innerHTML)).toFixed(8)
             }
            } catch {
             activOperation.innerHTML="🤔"
           }
             
       default:
         break;
     }
      
    } else {
      activOperation.innerHTML="🤔"
      switch (e.target.innerHTML) {
        case 'C':
          operations[0].innerHTML="0"
          activOperation.innerHTML="0"
          break;
        case  'Back':
          if (operations[0].innerHTML.length>1) {
            operations[0].innerHTML=operations[0].innerHTML.slice(0, -1)
            if (activOperation.innerHTML=="🤔") {
              activOperation.innerHTML="0"
            }
          } 
          else  operations[0].innerHTML="0"
          break;
        default:
          break;
      }
    }
   })
})