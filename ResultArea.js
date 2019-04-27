var ResultArea = new function __ResultArea() {

    this.displayResultArea = function () {
        let html = `
        <h2>The answer is :</h2>
        <div id="result-item">


        </div>
        <div>
            <button class="result-button remove-button">Remove</button>
            <button class="result-button ok-button" >OK</button>
        </div>
        `

        $("#result").html(html);
    }

    this.handleButtonClick = function () {
        $("#body #result .ok-button").click(() => {
            clearTheResult();
        })

        $("#body #result .remove-button").click(() => {
            clearTheResult();
            if (Wheel.name.length > 2) {
                Wheel.deleteOption();
            }
        })
    }

    // clearTheResult before printing the new one
    function clearTheResult () {
        $("#result").hide();
        $("#result-item").empty();
    }
}