var ResultArea = new function __ResultArea() {

    this.isActive = false;

    this.display = function (canvas) {
        let html = `
        <h2>The answer is :</h2>
        <div class="result-item">


        </div>
        <div>
            <button class="result-button remove-button">Remove</button>
            <button class="result-button ok-button" >OK</button>
        </div>
        `

        $(canvas).html(html);
    }

    this.handleButtonClick = function () {
        $("#result .ok-button").click(() => {
            this.clearTheResult();
            this.isActive = false;
        })

        $("#result .remove-button").click(() => {
            this.clearTheResult();
            this.isActive = false;
            if (Wheel.name.length > 2) {
                Wheel.deleteOption();
            }
        })
    }

    // clearTheResult before printing the new one
    this.clearTheResult = () => {
        $("#result").hide();
        $("#result .result-item").empty();
    }
}