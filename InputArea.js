var InputArea = new function __InputArea() {

    this.id = "name";

    // display
    this.displayInputArea = function (canvas) {
        let html = `
        <p>Enter your options</p>
        <div>
            <button class="button name-button">Name</button>
            <button class="button number-button">Number</button>
        </div>
        <div class="alert alert-danger input-alert" role="alert">
            Please input options !!!
        </div>
        <div class="alert alert-danger more-input-alert" role="alert">
            Please input more options !!!
        </div>
        <textarea class="input-name" cols="30" rows="5" placeholder="Enter your options here"></textarea>
        <div class="input-number-area">
            <div class="input-number">
                <p>From</p>
                <input type="number" class="number number-from"  value="0" min="0" max="100"
                    oninput="inputNumber(event)">
            </div>
            <div class="input-number">
                <p>To</p>
                <input type="number" class="number number-to"  value="100" min="1" max="100"
                    oninput="inputNumber(event)">
            </div>
        </div>
        <div class="buttons">
            <button class="button save-button">Save</button>
            <button class="button cancel-button">Cancel</button>
        </div>
        `

        $(canvas).html(html);
    }

    function inputNumber(event) {
        // check if event input is a number or not
        let regex = /-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?/;
        if (event.inputType == "insertText") {
            if (!regex.test(event.data)) {
                event.target.value = 0;
            }
        } else {
            if (!regex.test(event.target.value)) {
                event.target.value = 0;
            }
        }
        console.log(event, event.target.value);
    }

    this.enterOptions = function () {
        $("#body .enter-options").click(() => {
            $("#input-area").toggle();
            if ($("#myCanvas").css("opacity") == "0.5") {
                $("#myCanvas").css("opacity", "1");
            } else {
                $("#myCanvas").css("opacity", "0.5");
            }
        })
    }

    this.handleInputArea = function () {
        $("#body #input-area .name-button").click(() => {
            this.id = "name";
            $(".input-number-area").hide();
            $("#body #input-area .input-name").show();
        })

        $("#body #input-area .number-button").click(() => {
            this.id = "number";
            $("#body #input-area .input-name").hide();
            $(".input-number-area").show();
            $("#body #input-area .input-alert").hide();
            $("#body #input-area .more-input-alert").hide();
        })

        $("#body #input-area .cancel-button").click(() => {
            $("#input-area").hide();
            $("#myCanvas").css("opacity", "1");
        })

        $("#body #input-area .save-button").click(() => {
            if (this.id == "name" && $("#body #input-area .input-name").val().trim() == "") {
                $("#body #input-area .more-input-alert").hide();
                $("#body #input-area .input-alert").show();
            } else if (this.id == "name" && $("#body #input-area .input-name").val().trim().split("\n").length == 1) {
                $("#body #input-area .more-input-alert").show();
                $("#body #input-area .input-alert").hide();
            } else {
                $("#myCanvas").css("opacity", "1");
                $("#input-area").hide();
                $("#body #input-area .input-alert").hide();
                if (this.id == "name") {
                    let inputArray = $("#body #input-area .input-name").val().split("\n");
                    userInput = inputArray.filter((item) => {
                        // filter out space in a string
                        return /\S/.test(item);
                    });
                    Wheel.name = userInput.map((item) => {
                        if (item.trim().length > 9) {
                            let input = item.trim().slice(0, 9);
                            item = input + "...";
                        }
                        if (/^\d+$/.test(item)) {
                            return parseInt(item.trim());
                        } else {
                            return item.trim();
                        }
                    });
                    console.log(Wheel.name);
                }
                if (this.id == "number") {
                    let numberFrom = parseInt($("#body .input-number-area .number-from").val());
                    let numberTo = parseInt($("#body .input-number-area .number-to").val());
                    Wheel.name = [];
                    if (numberTo - numberFrom > 100) {
                        numberTo = numberFrom + 100;
                    }
                    if (numberFrom >= numberTo) {
                        numberTo = numberFrom + 3;
                    }
                    for (let i = numberFrom; i <= numberTo; i++) {
                        Wheel.name.push(i);
                    }
                    $("#body .input-number-area .number-to").val(numberTo);
                    $("#body .input-number-area .number-from").val(numberFrom);
                }
                Wheel.setProperty();
                Wheel.clearCanvas();
                Wheel.draw();
            }
        })
    }
}

