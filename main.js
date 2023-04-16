const hole1 = require('./hole')
const enemy = require('./enemy')
const trap = new hole1()
const fightData = require('./fightRPS')
const fightIns = new fightData()
const prompt = require('prompt-sync')({sigint: true})
const hat = '^'
const fieldCharacter = '░'
const pathCharacter = '@'
const warrior = new enemy()


class Field {
  constructor(field = []){
    this.field = field,
    this.playerX = 1,
    this.level = 1,
    this.playerY = 1,
    this.field[1][1] = pathCharacter
    this.lives = 3
    this.wins = 0
    this.enemy = warrior    
    this.gems = 0
    this.hole = trap
    this.fightRPS = fightIns
  }

  game(){
    let isPlaying = true
    
    while (isPlaying){
        if (this.wins === 5){
          console.clear()
          console.log('You win!!!')
          break
        }
        if (this.lives === 0){
          console.clear()
          console.log('Game over!')
          break
        }
        this.print();
        this.getUserInput();
        if (this.playerOnField()){
          this.appendMoreField()
        }
        else if (this.field[this.playerX][this.playerY] === hat){
          console.log('You win!')
          break
        }
        else if (this.field[this.playerX][this.playerY] === this.hole.character){
         this.hole.options()
        if (this.hole.healthString == 'fellInHole'){
          this.lives -=1
          this.hole.healthString = ''
        }else if (this.hole.healthString == 'healthUp'){
          this.lives +=1
          this.hole.healthString = ''
        }else if (this.hole.gemstone != 0){
          this.gems += 1
        }
          
        }
      
        else if (this.field[this.playerX][this.playerY] === this.enemy.character){
          if (this.gems < this.enemy.strength) {
            const answer = prompt(`You need ${this.enemy.strength} gems to Fight! Press E to continue `).toUpperCase()
            
            switch(answer){
                case 'E': 
                    this.playerX = 1;
                    this.playerY = 1;             
                    break;                
                default:     
                    this.playerX = 1;
                    this.playerY = 1;
                    break;
                  }           
              }else{
                this.fight();
              }
          
          
        }
        this.field[this.playerX][this.playerY] = pathCharacter
    }  
  }
 
  print(){
    
  console.clear()
    console.log(`Lives: ${this.lives} | Gemstones: ${this.gems} | Wins: ${this.wins}`)
    console.log(`Level ${this.level}`)
    const displayString = this.field.map(row => {
     return row.join('');
    }).join('\n');
  console.log(displayString);
  }
  inventory(){
    console.clear()
    console.log(`Invetory: sword, helmet`)
    const answer = prompt('Press E to return to game.').toUpperCase();
    switch(answer){
      case 'E':
          this.print()         
          break;
      default:             
        this.inventory()
        break}
  }

  fight() {
    console.clear()
    if (this.gems < this.enemy.strength){
      
      const answer = prompt(`You need ${this.enemy.strength} gems to fight! Press E to continue `).toUpperCase();
        switch(answer){
            case 'E': 
            this.field[this.playerX][this.playerY] = this.enemy.character                  
                break;
            default:     
                break;
        }
    }
    else  {
      this.fightRPS.getResults()
      let result = this.fightRPS.result
      switch(result){
          case 'win':    
            console.log('You won!')
            this.wins += 1;   
            const answer = prompt(`You won! Press E to continue `).toUpperCase();  
            switch(answer){
              case 'E':
                  break
              default:     
                  break
          }    
            break
          case 'loose':    
            
            this.lives -= 1
            // this.fightRPS.getResults()   
            this.playerX = 1
            this.playerY = 1
            const ans = prompt(`You lost! Press E to continue `).toUpperCase()
            switch(ans){
              case 'E':
                  break
              default:     
                  break
          }     
            break
         
          default:   
            this.fight()
            console.log('breaking form default')  
              break;
      }    
    }
 }

  getUserInput(){
    this.field[this.playerX][this.playerY] = '*'
    const answer = prompt('Which way? W S A D : ').toUpperCase()
    
    for (let i = 0; i < answer.length; i++) {
      
      switch(answer[i]){
        case 'D':
            this.playerY += 1            
            break
        case 'A':
            this.playerY -= 1            
            break
        case 'W':
            this.playerX -= 1          
            break
        case 'S':
            this.playerX += 1            
            break;
        case 'E':
        this.inventory()          
        break;
        default:
            console.log('Enter W, S, A or D.');
            this.getUserInput();
            break;
      }
    }
  }
  appendMoreField(){
   
    if (this.level === this.wins){
       const newField = this.generateFieldMethod(10, 10)   
   
    for (let i=0; i< this.field.length; i++){
      for (let j=0; j< newField[i].length; j++){
        this.field[i].push(newField[i][j])
      }
    }
    }
    else {
      this.playerX = 1
      this.playerY = 1
    }
   
    console.log(this.field[0].length) 

  }
  playerOnField(){
    if (
      this.playerY > this.field[0].length -2      
      ){ 
        return true
    }
    else if (this.playerX > this.field.length - 2 )
      { 
        this.playerX = this.field.length - 2      
      }
    else if (this.playerY < 1){
      this.playerY = 1
    }
    else if (this.playerX < 1){
      this.playerX = 1
    }
  }
  generateFieldMethod(height, width){
    
    const field = new Array(height).fill(0).map(arr => new Array(width))
    
    for (let i=0; i<field.length; i++){      
        for (let j=0; j<field[i].length; j++){ 
          const randomHole = Math.random()

          if (i===0){
            field[i][j] = '-'
          }
         
          else if (i===field.length-1){
            field[i][j] = '-'
          }

            else if (randomHole < 0.2){
              field[i][j] = this.hole.character
            }
            else  {
              field[i][j] = fieldCharacter 
            }                   
        }
    }
    this.level += 1
    this.enemy.strength += 3
    const enemyLocation = {      
      x: Math.floor(Math.random() * width ),
      y: Math.floor(Math.random() * height)
    }
    
      while (enemyLocation.x ===0 && enemyLocation.y === 0 || enemyLocation.x ===0 || enemyLocation.y === 0 || enemyLocation.x > 8){
        enemyLocation.x = Math.floor(Math.random() * width - 1)
        enemyLocation.y = Math.floor(Math.random() * height - 1)
      }
    field[enemyLocation.x][enemyLocation.y] = this.enemy.character
    return field
  }

  static generateField(height, width){
   
    const field = new Array(height).fill(0).map(arr => new Array(width))
    
    for (let i=0; i<field.length; i++){ 
      
        for (let j=0; j<field[i].length; j++){ 
          const randomHole = Math.random()
          if (i===0){
            field[i][j] = '-'
          }
          else if (j===0){
            field[i][j] = '|'
          }
          else if (i===field.length-1){
            field[i][j] = '-'
          }
          else {
            if (randomHole < 0.2){
              field[i][j] = trap.character             
            }          
            else{
              field[i][j] = fieldCharacter 
            }      
          }                         
        }
    }
 
    
    const enemyLocation = {      
      x: Math.floor(Math.random() * width ),
      y: Math.floor(Math.random() * height )
    }
    
      while (enemyLocation.x ===0 && enemyLocation.y === 0 || enemyLocation.x ===0 || enemyLocation.y === 0 || enemyLocation.x > 8){
        enemyLocation.x = Math.floor(Math.random() * width );
        enemyLocation.y = Math.floor(Math.random() * height );
      }
    field[enemyLocation.x][enemyLocation.y] = warrior.character
      
    
    return field;
  }
  
}
const field = new Field(
    Field.generateField(10, 10)
)

field.game()


