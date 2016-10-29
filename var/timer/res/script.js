document.addEventListener("DOMContentLoaded", function(event) {
    var types = {
        SECONDS: 0,
        MINUTES: 1,
        OVER: 2
    };

    function Countdown(sec) {
        //Attributes
        this.value = sec;
        this.valueRender = '';
        this.type = types.MINUTES;
        this.typeSwitchValue = 90;
        this.overMax = -10;
        this.interval = null;
        this.domVal = document.getElementById('countdown');
        this.overEl = document.getElementById('over');
        this.status = 'STOP';

        this.dotsEl = document.getElementById('dots');
        this.dot1El = document.getElementById('dot1');
        this.dot2El = document.getElementById('dot2');
        this.dot3El = document.getElementById('dot3');
        this.dot4El = document.getElementById('dot4');
        this.dot5El = document.getElementById('dot5');
        this.dot6El = document.getElementById('dot6');


        this.run = function() {
            this.interval = setInterval(this.tick.bind(this), 1000);
        };

        this.stop = function() {
            if (this.interval) {
                clearInterval(this.interval);
            }
        };

        /**
         * Run every second
         */
        this.tick = function() {
            this.value -= 1;

            this.render();

            localStorage.setItem('AG-timer-currentSeconds', this.value);
        };

        /**
         * Render the value
         */
        this.prepareRender = function() {
            if (this.type === types.MINUTES) {
                this.valueRender = ~~(this.value / 60);
            }
            else {
                this.valueRender = this.value;
            }
        };

        this.switchType = function() {
            if (this.value <= this.overMax) {
                this.type = types.OVER;
            }
            else if (this.value <= this.typeSwitchValue) {
                this.type = types.SECONDS;
            }
            else {
                this.type = types.MINUTES;
            }
        };

        this.fadeDots = function() {
            var sec = this.value % 60;

            if (sec === 59) {
                this.resetDots();
                return;
            }

            if (sec <= 10) {
                this.dot6El.className = "dot fade";
            }
            if (sec <= 20) {
                this.dot5El.className = "dot fade";
            }
            if (sec <= 30) {
                this.dot4El.className = "dot fade";
            }
            if (sec <= 40) {
                this.dot3El.className = "dot fade";
            }
            if (sec <= 50) {
                this.dot2El.className = "dot fade";
            }
            this.dot1El.className = "dot fade";
        };

        this.resetDots = function() {
            this.dot1El.className = "dot";
            this.dot2El.className = "dot";
            this.dot3El.className = "dot";
            this.dot4El.className = "dot";
            this.dot5El.className = "dot";
            this.dot6El.className = "dot";
        };

        this.render = function() {
            this.switchType();
            this.prepareRender();

            if (this.type === types.SECONDS) {
                if (this.value >= 0) {
                    this.domVal.className = "almost-end";
                    document.body.className = "";
                }
                else {
                    this.domVal.className = "end";
                    document.body.className = "end";
                }
                this.overEl.style.display = "none";
                this.dotsEl.style.display = "none";
            }
            else if (this.type === types.OVER) {
                document.body.className = "end";
                this.domVal.className = "end over";
                this.overEl.style.display = "block";
                this.dotsEl.style.display = "none";
            }
            else {
                if (this.status === 'RUN') {
                    this.fadeDots();
                }

                this.domVal.className = "";
                document.body.className = "";
                this.overEl.style.display = "none";
                this.dotsEl.style.display = "block";
            }
            this.domVal.innerHTML = Math.abs(this.valueRender);
        };

        //Init :
        this.render();
    };

    window.addEventListener('storage', function(e) {
        if (e.storageArea === localStorage) {
            switch (e.key) {
                case 'AG-timer-status':
                    if (e.newValue === 'RUN') {
                        countdown.status = 'RUN';
                        countdown.run();
                    }
                    else if (e.newValue === 'STOP') {
                        countdown.status = 'STOP';
                        countdown.stop();
                    }
                    else if (e.newValue === 'RESET') {
                        countdown.value = localStorage.getItem('AG-timer-seconds');
                        countdown.resetDots();
                        countdown.render();
                    }
                    break;
                case 'AG-timer-seconds':
                    if (countdown.status === 'STOP') {
                        countdown.value = e.newValue;
                        countdown.render();
                    }
                    break;
            }
        }
    });

    var countdown = new Countdown(300);
});