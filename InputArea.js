var InputArea = new function __InputArea() {

    this.id = "name";

    // display
    this.display = function (canvas) {
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
        <textarea class="input-name" rows="5" placeholder="Enter your options here"></textarea>
        <div class="input-number-area">
            <div class="input-number">
                <p>From</p>
                <input type="number" class="number number-from"  value="0" min="0" max="100"
                    oninput="InputArea.inputNumber(event)">
            </div>
            <div class="input-number">
                <p>To</p>
                <input type="number" class="number number-to"  value="100" min="1" max="100"
                    oninput="InputArea.inputNumber(event)">
            </div>
        </div>
        <div class="buttons">
            <button class="button save-button">Save</button>
            <button class="button cancel-button">Cancel</button>
        </div>
        `

        $(canvas).html(html);
    }

    this.inputNumber = function (event) {
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
            if (!Wheel.isActive && !ResultArea.isActive) {
                $("#input-area").toggle();
                if ($("#myCanvas").hasClass("blur")) {
                    $("#myCanvas").removeClass("blur");
                } else {
                    $("#myCanvas").addClass("blur");
                }
            }
        })
    }

    this.handleInputArea = function () {
        $("#input-area .name-button").click(() => {
            this.id = "name";
            $("#input-area .input-number-area").hide();
            $("#input-area .input-name").show();
        })

        $("#input-area .number-button").click(() => {
            this.id = "number";
            $("#input-area .input-name").hide();
            $("#input-area .input-number-area").show();
            $("#input-area .input-alert").hide();
            $("#input-area .more-input-alert").hide();
        })

        $("#input-area .cancel-button").click(() => {
            $("#input-area").hide();
            $("#myCanvas").removeClass("blur");
        })

        $("#input-area .save-button").click(() => {
            if (this.id == "name" && $("#input-area .input-name").val().trim() == "") {
                $("#input-area .more-input-alert").hide();
                $("#input-area .input-alert").show();
            } else if (this.id == "name" && $("#input-area .input-name").val().trim().split("\n").length == 1) {
                $("#input-area .more-input-alert").show();
                $("#input-area .input-alert").hide();
            } else {
                $("#myCanvas").removeClass("blur");
                $("#input-area").hide();
                $("#input-area .input-alert").hide();
                if (this.id == "name") {
                    let inputArray = $("#input-area .input-name").val().split("\n");
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
                    let numberFrom = parseInt($("#input-area .input-number-area .number-from").val());
                    let numberTo = parseInt($("#input-area .input-number-area .number-to").val());
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
                    $("#input-area .input-number-area .number-to").val(numberTo);
                    $("#input-area .input-number-area .number-from").val(numberFrom);
                }
                Wheel.setProperty();
                Wheel.clearCanvas();
                Wheel.draw();
            }
        })
    }
}

