createForm()
let form = document.querySelector('#name')
form.addEventListener('submit', e => {
  console.log('I was submitted')
  e.preventDefault()
  console.log(e.target.name.value)
  let monsterObj = { name: e.target.name.value ,
    age : e.target.age.value ,
    description : e.target.description.value
  }
  console.log(monsterObj)
  postMonster(monsterObj)
})

//grabs first 50 monsters to display on page
fetch('http://localhost:3000/monsters/')
  .then(res => res.json())
  .then(monsters => {
    const fiftyMonsters = monsters.filter(monster => monster.id < 51)
    fiftyMonsters.forEach(monster => printMonsters(monster))

  })

// adds new monster to database
function postMonster(monsterObj) {
    fetch('http://localhost:3000/monsters/', {
      method : "POST" ,
      headers : {
        "Content-Type": "application/json",
        Accept: "application/json"
      } ,
      body: JSON.stringify(monsterObj)
  })
}




//makes the monster input bar at top
function createForm() {
  let form = document.createElement('form')
  form.id = 'name'

  let nameInput = document.createElement('input')//.setAttribute('placeholder','name...')
  nameInput.id = "name"
  nameInput.setAttribute('placeholder','name...')

  let ageInput = document.createElement('input')//.setAttribute('placeholder','age...')
  ageInput.id = "age"
  ageInput.setAttribute('placeholder','age...')

  let bioInput = document.createElement('input')//.setAttribute('placeholder','description...')
  bioInput.id = "description"
  bioInput.setAttribute('placeholder','description...')

  let btn = document.createElement('button')
  btn.innerText = "Create"

  document.querySelector('#create-monster').appendChild(form)
  form.appendChild(nameInput)
  form.appendChild(ageInput)
  form.appendChild(bioInput)
  form.appendChild(btn)
 

}


 //makes monster HTML elements  
  function printMonsters(monster) {
    let div = document.createElement('div')
    let monsterList = document.querySelector('#monster-container')
    div.innerHTML = `
      <h2>${monster.name}</h2>
      <h4>Age: ${monster.age}</h4>
      <p><strong>Bio:</strong> ${monster.description}</p>
      <br>`
    monsterList.appendChild(div)  
  }



let buttons = document.querySelectorAll('button')

let cycle = buttons.forEach(button => buttonListener(button))
let n = 51
let i = 0 

//Cycles 50 monsters per click
function buttonListener(button) {
    button.addEventListener('click',e => {
      e.preventDefault()
      fetch('http://localhost:3000/monsters/')
        .then(res => res.json())
        .then(monsters => {
           if (button.id === "forward"){
            document.querySelector('#monster-container').innerHTML = ''
             n += 50;
             i += 50;
           } else if(button.id === "back" && i === 0) { 
           } else if(button.id === 'back'){ 
              document.querySelector('#monster-container').innerHTML = ''
              n = n - 50
              i = i - 50 }
          const fiftyMonsters = monsters.filter(monster => (i < monster.id && monster.id < n))
          fiftyMonsters.forEach(monster => printMonsters(monster))
            console.log(n)
            console.log(i)
        })

    })
}