const prompt = require('prompt-sync')({sigint: true});

module.exports = class Fight {
    constructor(){
        this.choices = ['rock', 'paper', 'scissors']
        this.result = ''
        }
    
 

generateComputerChoice = () => {
    const computerChoice = this.choices[Math.floor(Math.random() * this.choices.length)]
    return computerChoice
  }
getUserChoice = () => {
    let userChoice;
    const answer = prompt('Your weapon of choice? (R)ock (P)aper (S)cissors ? ').toUpperCase();
  switch(answer){
      case 'R': 
      return userChoice = 'rock'                  
      case 'P': 
      return userChoice = 'paper'
      case 'S': 
      return userChoice = 'scissors'
      default:     
        this.getUserChoice();
        break;
  }
}

getResults = (userChoice, computerChoice) => {
    this.result = ''
    userChoice = this.getUserChoice()
    computerChoice = this.generateComputerChoice()   
  switch (userChoice + computerChoice) {
    case 'scissorspaper':
    case 'rockscissors':
    case 'paperrock':
      this.result = 'win';
      break;
    case 'paperscissors':
    case 'scissorsrock':
    case 'rockpaper':
        this.result = 'loose';
        break;
    case 'scissorsscissors':
    case 'rockrock':
    case 'paperpaper':
        this.result = 'draw';
        console.log("It's a draw, keep trying!")
        this.getResults()
        break;
  }
}

}
