var ResultArea = new function __ResultArea() {

    this.display = function (canvas) {
        let html = `
        <h2>The answer is :</h2>
        <div id="result-item">


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
            clearTheResult();
        })

        $("#result .remove-button").click(() => {
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