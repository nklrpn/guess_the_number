window.onload = function() {
    var el_start = document.getElementById("start");
    var el_num = document.getElementById("num");
    var el_output = document.getElementById("output");
    var el_attempts = document.getElementById("attempts");
    var el_list = document.getElementById("list");
    
    var min = 1;
    var max = 100;
    var rand;
    var attempts;
    
    var App = {
        init: function() {
            App.reset();
            this.bindActions();
        },
        reset: function() {
            rand = Calc.generate();
            Control.clear();
        },
        bindActions: function() {
            el_start.addEventListener("click", App.reset.bind(this));
            el_num.addEventListener("keyup", Control.edit.bind(this));
        },
    };
    
    var Control = {
        edit: function(e) {
            var val = e.target.value;
            
            if (e.which !== 13 || !val) {
                return;
            }
            
            result = Calc.compare(val);
            Control.show(result);
        },
        clear: function() {
            attempts = 0;
            el_attempts.innerHTML = 0;
            el_output.innerHTML = "";
            el_num.disabled = false;
            el_num.value = "";
            el_num.focus();
        },
        show: function(msg) {
            el_output.innerHTML = msg;
            el_attempts.innerHTML = attempts;
            el_num.setSelectionRange(0, el_num.value.length);
        },
        finalize: function() {
            el_num.disabled = true;
            el_start.focus();
            Control.store();
        },
        store: function() {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(
                "The number " + el_num.value + " was guessed in " + attempts + " attempts"
            ));
            list.appendChild(li);
        },
    };
    
    var Calc = {
        generate: function() {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        compare: function(v) {
            attempts++;
            
            if (v == rand) {
                Control.finalize();
                return "Congratulations! You got it!";
            }
            
            if (v < rand) {
                return "The required number is greater";
            } else {
                return "The required number is less";
            }
        },
    };
    
    App.init();
}