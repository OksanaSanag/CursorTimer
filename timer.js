class Timer {
    constructor(options) {
        this.options = options;
        this.time = this.options.time;
        this.step = this.options.step;        

        this.timerBlock = document.createElement('div');
        this.h4 = document.createElement('h4');
            this.h4.innerText = this.options.time;
        this.button = document.createElement('button');
            this.button.innerText = 'start';
            this.button.addEventListener('click', this.start.bind(this));
        this.line = document.createElement('div');
            this.line.className = 'line';

        this.timerID = null;
        this.stopTimerId = null;

        this.t = this.time;
        this.lineSmall = 100;
    }

    create() {  
        const root = document.getElementById('root'); //точка входу в html
        root.append(this.timerBlock);
        this.timerBlock.append(this.h4);
        this.timerBlock.append(this.button);
        this.timerBlock.append(this.line);

        if (this.options.autoStart) {this.start()}
    } 

    start() {

        if (this.button.innerText == 'start') {

            this.button.innerText = 'stop';
            this.line.style.width = `${this.lineSmall}%`
            
            this.timerID = setInterval(() => {    
                //h4            
                this.time = this.time - this.step;
                this.h4.innerText = this.time;  
                
                //line
                if (this.t >= this.step) {
                    this.t = this.t - this.step; 
                    this.lineSmall = 100*this.t/this.options.time;
                    this.line.style.width = `${this.lineSmall}%`;
                }            
                
            }, this.step*1000);
                
            this.stopTimerId = setTimeout(() => {
                clearInterval(this.timerID);
            }, this.time*1000); 

        } else this.stop();
              
    }

    stop() {
        this.button.innerText = 'start';
        clearTimeout(this.timerID);
    }
}


const options = {
    time: 5,
    step: 1
}

const timer = new Timer(options);
timer.create(); 

const timer2 = new Timer({time: 50, step: 2, autoStart: true});
timer2.create();