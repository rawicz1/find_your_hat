
const prompt = require('prompt-sync')({sigint: true});
module.exports =  class Hole {
    constructor(){       
        this.character = 'O'
        this.healthString = ''
        this.gemstone = 0
        }
    
    options(){
        console.clear()
        const randomNumber = Math.random()
        if (randomNumber < 0.2){
            

            this.healthString = 'fellInHole'
            const answer = prompt('You fell in the hole, press E to continue ').toUpperCase();
            switch(answer){
                case 'E':                   
                    break;
                default:     
                    break;
            }
            return
        }
        console.log('1 - search for health potion')
        console.log('2 - search for gemstones')
        const answer = prompt('What is your choice: ').toUpperCase();
       
        switch(answer){
            case '1':                                      
                this.health()
                break;
            case '2':                         
                this.gemstones()           
                break;           
            default:                                
                this.options()
        }
    }
    health(){
        const randomNumber = Math.random()
        if (randomNumber < 0.5){
            console.log('You found healt potion')
            this.healthString = 'healthUp'
        }else{
            console.log('nothing found')
            this.healthString = ''
        }
        const answer = prompt('Press E to continue ').toUpperCase();
        switch(answer){
            case 'E':                   
                break;
            default:     
                break;
        }
        // return 'hi hi'
       
    }
    gemstones(){
        const randomNumber = Math.random()
        if (randomNumber < 0.5){
            console.log('You found a gemstone')
            this.gemstone = 1
        }else{
            console.log('Nothing found')
            this.gemstone = 0
            
        }
        const answer = prompt('Press E to continue ').toUpperCase();
        switch(answer){
            case 'E':                   
                break;
            default:     
                break;
        }
        
    }

}