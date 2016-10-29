document.addEventListener('DOMContentLoaded', function(event) {
    var status = 'STOP';

    var startEl = document.getElementById('start');
    var stopEl = document.getElementById('stop');
    var timerSecondsEl = document.getElementById('timerSeconds');
    var timerMinutesEl = document.getElementById('timerMinutes');
    var formEl = document.getElementById('timerForm');
    var submitEl = document.getElementById('setTimer');

    localStorage.setItem('AG-timer-seconds', 120);
    localStorage.setItem('AG-timer-status', 'STOP');


    startEl.addEventListener('click', function(e) {
        localStorage.setItem('AG-timer-status', 'RUN');
        status = 'RUN';
        timerSecondsEl.disabled = true;
        timerMinutesEl.disabled = true;
        formEl.disabled = true;
        submitEl.disabled = true;
        stopEl.disabled = false;
        startEl.disabled = true;
    });

    stopEl.addEventListener('click', function(e) {
        localStorage.setItem('AG-timer-status', 'STOP');
        status = 'STOP';
        timerSecondsEl.disabled = false;
        timerMinutesEl.disabled = false;
        formEl.disabled = false;
        submitEl.disabled = false;
        stopEl.disabled = true;
        startEl.disabled = false;
    });

    formEl.addEventListener('submit', function(e) {
        e.preventDefault();

        var time = parseInt(timerSecondsEl.value ? timerSecondsEl.value : 0)
         + parseInt(timerMinutesEl.value ? timerMinutesEl.value : 0)*60;

        localStorage.setItem('AG-timer-seconds', time);
        localStorage.setItem('AG-timer-status', 'RESET');
        status = 'STOP';
    });

    window.addEventListener('storage', function(e) {
        if (e.storageArea === localStorage) {
            if (e.key === 'AG-timer-currentSeconds') {
                timerSecondsEl.value = e.newValue % 60;
                timerMinutesEl.value = ~~(e.newValue / 60);
            }
        }
    });
});