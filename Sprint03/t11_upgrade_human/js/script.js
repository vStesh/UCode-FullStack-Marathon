'use strict'
let img = document.querySelector('#img');
let detail = document.querySelector('#detail');

let humanProperties = {
    firstName: 'Кларк',
    lastName: 'Кент',
    gender: 'male',
    age: 27,
    calories: 500,
}




class Human {
    #sleeptime = 10; //sec
    #feedtime = 10; //sec
    #timerLife; // timer of Life
    #timerFeed; // timer of Feed
    #isHero = false; //
    #isLive = true;

    foto = 'assets/images/human.jpg';
    constructor(prop) {
        this.firstName  = prop.firstName;
        this.lastName   = prop.lastName;
        this.gender     = prop.gender;
        this.age        = prop.age;
        this.calories   = prop.calories;
    }

    startLife() {
        this.#timerLife = setInterval(() => {
            this.calories -= 200 / (100 * 60); 
            document.querySelector('#calories').innerHTML = Math.floor(this.calories);
        }, 10);
    }

    stopLife(dead = false) {
        clearInterval(this.#timerLife);
        if(dead) {
            alert('Умер с голоду!');
            this.#isLive = false;
        }
    }
    isLive() {
        return this.#isLive;
    }
    sleepFor() {
        // let sec = this.#sleeptime;
        let sec = prompt('Сколько секунд мне поспать? В это время я не буду терять калории: ', this.#sleeptime);
        if(sec < 1 || sec > 20) {
            sec = this.#sleeptime;
            alert('Не наглей. Я буду спать 10 секунд');
        }
        this._timer(sec);
        this._startSleep();
        setTimeout(()=> {
            this._stopSleep();
        }, 1000 * sec);
    
    

    }

    feed() {
        if(this.calories > 500) {
            this.showMessage("I'm NOT HUNGRY!!");
            return;
        }
        
        let sec = this.#feedtime;
        this._timer(sec);
        this._startFeed();
        
        this.#timerFeed = setInterval(() => {   
            this.calories += 200 / (100 * 10); 
            document.querySelector('#calories').innerHTML = Math.floor(this.calories);
        }, 10);
        setTimeout(()=> {
            clearInterval(this.#timerFeed);
            this._stopFeed();
        }, 1000 * sec);
        //this._startFeed();
    }

    startHero() {
        this.#isHero = true;
    }

    stopHero() {
        this.#isHero = false;
        document.querySelector('#big-img').setAttribute('src', this.foto);
    }

    isHero() {
        return this.#isHero;
    }

    
    _message(mes, id) {
        document.querySelector(id).innerHTML = mes;
    }

    _hideButtons() {
        document.querySelector('#buttons').classList.toggle('hidden-buttons');
    }

    _timer(sec) {
        document.querySelector('#sleep-time').innerHTML = sec;
        let timerId = setInterval(() => {
            sec -= 1;
            document.querySelector('#sleep-time').innerHTML = sec;
        }, 1000);
        setTimeout(() => {
            this._hideButtons();
            clearInterval(timerId);
            document.querySelector('#f-title').classList.toggle('hidden-buttons');
            }, 1000 * sec);
        
    }
    
    _startSleep() {
        // clearInterval(this.#timerLife);
        this.stopLife();
        this._hideButtons();
        document.querySelectorAll('.sleep-title').forEach(element => {
            element.setAttribute('style', 'display: block;');
        });
        document.querySelector('#f-title').classList.toggle('hidden-buttons');
        this._message("I'm sleeping!", '#f-message-1');
        this._message("Awake after: ", '#f-message-2');
        
    }
    
    _stopSleep() {
        this.startLife();
        // this._hideButtons();
        document.querySelectorAll('.sleep-title').forEach(element => {
            element.setAttribute('style', 'display: none;');
        });
        // document.querySelector('#f-title').classList.toggle('hidden-buttons');
    
    }

    _startFeed() {
        // clearInterval(this.#timerLife);
        this.stopLife();
        this._hideButtons();
        document.querySelectorAll('.feed-title').forEach(element => {
            element.setAttribute('style', 'display: block;');
        });
        document.querySelector('#f-title').classList.toggle('hidden-buttons');
        this._message("Nom nom nom ..", '#f-message-1');
        this._message("End eating: ", '#f-message-2');
    }
    
    _stopFeed() {
        this.startLife();
        // this._hideButtons();
        document.querySelectorAll('.feed-title').forEach(element => {
            element.setAttribute('style', 'display: none;');
        });
        // document.querySelector('#f-title').classList.toggle('hidden-buttons');
        if(this.calories < 500) {
            this.showMessage("I'm still HUNGRY!!");
        }
    }

    showMessage(text) {
        let div = document.createElement('div');
        div.className = 'message_top';
        div.innerHTML =  text;
        document.querySelector('#img').prepend(div);
        setTimeout(() => {div.remove()}, 3000);
    }
}

class Superhero extends Human {

    foto = 'assets/images/superhero.jpg';
    #flyTime = 10; //sec
    #fightTime = 3; //sec

    constructor(hm) {
        super({
            firstName   : hm.firstName,
            lastName    : hm.lastName,
            gender      : hm.gender,
            age         : hm.age,
            calories    : hm.calories,
        });
        this.humanFoto = hm.foto;
        this._start();
    }

    fly() {
        this._hideButtons();
        this._timer(this.#flyTime);
        document.querySelector('#f-title').classList.toggle('hidden-buttons');
        this._message("I'm flying!", '#f-message-1');
        this._message("End fly: ", '#f-message-2');
    }
    fightWithEvil() {
        this._hideButtons();
        this._timer(this.#fightTime);
        document.querySelector('#f-title').classList.toggle('hidden-buttons');
        this._message("Khhhh-chh... Bang-g-g-g...", '#f-message-1');
        this._message(" Evil is defeated! ", '#f-message-2');
    }

    stop() {
        document.querySelector('#hero-btn').setAttribute('style', 'display: block;');
        document.querySelector('#hero-buttons').classList.toggle('hidden-buttons');
    }

    _start() {
        document.querySelector('#big-img').setAttribute('src', this.foto);
        document.querySelector('#hero-btn').setAttribute('style', 'display: none;');
        document.querySelector('#hero-buttons').classList.toggle('hidden-buttons');

    }

}

let human = new Human(humanProperties);
let hero;
showHumman();
human.startLife();

let validateId = setInterval(() => {   
    if(human.calories < 0 && human.isLive()) {
        human.stopLife(1);
        //clearInterval(timerLife);

    }
    if(human.calories < 483) {
        document.querySelector('#hungry-msg').setAttribute('style', 'display: block;');
    }
    if(human.calories > 500) {
        document.querySelector('#hungry-msg').setAttribute('style', 'display: none;');
    }
    if(human.calories < 500 && human.isHero()) {
        human.stopHero();
        hero.stop();
        hero = '';
    }
}, 10);

function showHumman() {
    img.innerHTML = `<img class="big-img" id="big-img" src="${human.foto}"><div class="hungry-msg" id="hungry-msg">I'm HUNGRY!!</div><div class="sleep-title" id="sleep-img"><img class="sleep-img" src="assets/images/sleep.gif"></div><div class="feed-title"><img class="sleep-img" src="assets/images/feed.gif"></div>`;
    let render = '';
    render += `<div class="first-name"><span class="first-name__label">Имя:</span><span class="first-name__value" id="firs-name">${human.firstName}</span></div>`;
    render += `<div class="last-name"><span class="last-name__label">Фамилия:</span><span class="last-name__value" id="last-name">${human.lastName}</span></div>`;
    render += `<div class="last-name"><span class="last-name__label">Пол:</span><span class="last-name__value" >${human.gender}</span></div>`;
    render += `<div class="last-name"><span class="last-name__label">Возраст:</span><span class="last-name__value" >${human.age}</span></div>`;
    render += `<div class="calories"><span class="calories__label">Калории:</span><span class="calories__value" id="calories">${human.calories}</span></div>`;
    render += `<div class="f-title hidden-buttons" id="f-title"><div class="sleep" id="f-message-1"></div>`;
    render += `<div class="sleep-info"><div class="sleep-up" id="f-message-2"></div><div class="sleep-time" id="sleep-time"></div></div></div>`;
    render += `<div id="buttons"><div class="sleep-for" onclick="human.sleepFor()" id="sleep-btn">Спать</div>`;
    render += `<div class="sleep-for" onclick="human.feed()" id="feed-btn">Кушать</div>`;
    render += `<div class="sleep-for" onclick="showHero()" id="hero-btn">Turn into Superhero</div>`;
    render += `<div class="hero-buttons hidden-buttons" id="hero-buttons"><div class="sleep-for" onclick="hero.fly()" id="fly-btn">Летать</div>`;
    render += `<div class="sleep-for" onclick="hero.fightWithEvil()" id="fight-btn">Драться</div></div>`;
    render += `</div>`;
    detail.insertAdjacentHTML('beforeend', render);
}

function showHero() {
    if(human.calories > 500) {
        hero = new Superhero(human);
        human.startHero();
    } else {
        human.showMessage('Мало калорий! Покушайте!');
    }
}
