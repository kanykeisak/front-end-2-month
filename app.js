const database = {
    stateKey: "number-state",
    saveState: function (state) {
        const stateJson = JSON.stringify(state);
        localStorage.setItem(this.stateKey, stateJson);
    },
    getState: function () {
        const stateJson = localStorage.getItem(this.stateKey);
        return JSON.parse(stateJson);
    }
};

const state = {
    number: 0,
    
    updateNumber: function () {
        const numberElement = document.getElementById('number');
        numberElement.textContent = this.number;
    },

    decreaseNumber: function () {
        this.number--;
        this.updateNumber();
        this.setColor('red');
        this.saveToDatabase();
    },

    resetNumber: function () {
        this.number = 0;
        this.updateNumber();
        this.setColor('default');
        this.saveToDatabase();
    },

    increaseNumber: function () {
        this.number++;
        this.updateNumber();
        this.setColor('green');
        this.saveToDatabase();
    },

    setColor: function (color) {
        const numberElement = document.getElementById('number');
        numberElement.className = `number ${color}`;
    },

    saveToDatabase: function () {
        database.saveState(this);
    },

    restoreFromDatabase: function () {
        const state = database.getState();
        this.number = state?.number ?? 0;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    state.restoreFromDatabase();
    state.updateNumber();
    
    document.querySelector('.decrease').addEventListener('click', function() {
        state.decreaseNumber();
    });

    document.querySelector('.reset').addEventListener('click', function() {
        state.resetNumber();
    });

    document.querySelector('.increase').addEventListener('click', function() {
        state.increaseNumber();
    });
});
