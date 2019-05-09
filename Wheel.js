var Wheel = new function __Wheel() {

    this.name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.color = [];
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.radius = this.canvas.width / 2 - 10;
    this.pinNumber = 0;
    let self = this;
    this.counter = Math.floor(Math.random() * 100);
    this.startAngle = 0;
    this.endAngle = 0;
    this.i = 0;
    this.isActive = false;


    // set properties for the wheel when user inputs are adjusted
    this.setProperty = function () {
        console.log(this);
        this.numSegments = this.name.length;
        this.degreeEach = 2 * Math.PI / this.numSegments;
        for (let i = 0; i < this.numSegments; i++) {
            this.color.push(getRandomColor());
        }
    }

    // Clear the canvas before drawing a new one
    this.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Draw the Wheel
    this.draw = function () {
        let colorId = 0;
        for (let i = 0; i < this.numSegments; i++) {
            this.drawSegment(colorId);
            this.ctx.translate(this.centerX, this.centerY);
            if (this.numSegments < 15) {
                this.ctx.rotate(this.degreeEach / 2);
            } else {
                this.ctx.rotate(this.degreeEach / 3 * 2);
            }
            this.ctx.translate(-this.centerX, -this.centerY);
            if (this.numSegments < 15) {
                this.ctx.font = `30px Arial`;
            } else if (this.numSegments < 40) {
                this.ctx.font = `${this.degreeEach / Math.PI * 180 / 0.8}px Arial`
            }
            else {
                this.ctx.font = `${this.degreeEach / Math.PI * 180 / 0.4}px Arial`
            }
            this.ctx.fillStyle = "black";
            this.ctx.fillText(this.name[i], this.centerX + this.radius - 30, this.centerY, 160);
            this.ctx.textAlign = "right";
            this.ctx.translate(this.centerX, this.centerY);
            if (this.numSegments < 15) {
                this.ctx.rotate(this.degreeEach / 2);
            } else {
                this.ctx.rotate(this.degreeEach / 3);
            }
            this.ctx.translate(-this.centerX, -this.centerY);
            colorId++;
        }
    }

    // Draw a Segment 
    this.drawSegment = function (colorId) {
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, this.degreeEach);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color[colorId];
        this.ctx.fill();
        this.ctx.stroke();
    }

    // Rotate the canvas a degree of one-seventh of each segment degree
    this.rotate = function (degree) {
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(degree);
        this.ctx.translate(-this.centerX, -this.centerY);
    }

    // Rotate the wheel
    this.rotateWheel = function () {
        $("#canvas .spin").click(() => {
            if (this.isActive == false) {
                this.isActive = true;
                if (this.numSegments > 2) {
                    $("#result .remove-button").show();
                } else {
                    $("#result .remove-button").hide();
                }
                $(".spin").text("?");
                this.spin = setInterval(frame, 10);
                this.spinSlower1 = setInterval(frame, 15);
                this.spinSlower2 = setInterval(frame, 25);
                this.spinSlower3 = setInterval(frame, 50);
                let rotateNumber = 600 - this.counter;
                this.rotateAngle = rotateNumber * Math.PI / 18;
                this.endAngle = this.startAngle + this.rotateAngle - Math.PI / 18;
                let pinNumber = Math.floor((this.endAngle % (2 * Math.PI)) / this.degreeEach);
                this.pinNumber = this.name.length - 1 - pinNumber;
            }
        });
    }

    function drawback() {
        let counter = 0;
        let draw = setInterval(function () { drawbackFrame(-Math.PI / 180) }, 30);
        function drawbackFrame(degree) {
            if (counter == 10) {
                clearInterval(draw);
            } else {
                console.log(counter)
                self.rotate(degree);
                self.draw();
                counter++;
            }
        }
    }

    function frame() {
        if (self.counter == 300) {
            clearInterval(self.spin);
        }
        if (self.counter == 480) {
            clearInterval(self.spinSlower1);
        }
        if (self.counter == 595) {
            clearInterval(self.spinSlower2);
        }
        if (self.counter == 600) {
            clearInterval(self.spinSlower3);
            setTimeout(() => {
                drawback();
            }, 50);
            $("#canvas .spin").text("SPIN");
            $("#canvas .pointer-image").removeClass("rotate");

            let p = document.createElement("p");
            p.id = "text-result";
            p.innerText = `${self.name[self.pinNumber]}`;
            setTimeout(() => {
                $("#result").show();
                $("#result .result-item").append(p);
                self.isActive = false;
                ResultArea.isActive = true;
            }
                , 1000)
            self.startAngle += self.rotateAngle - Math.PI / 18;
            self.counter = 0;
        }
        else {
            $("#canvas .pointer-image").removeClass("rotate");
            self.clearCanvas();
            self.rotate(Math.PI / 18);
            self.draw();
            self.counter++;
            self.i++;
            if (self.i == 7) {
                $("#canvas .pointer-image").addClass("rotate");
                self.i = 0;
            }
        }
    }

    // delete option when clicking remove button
    this.deleteOption = function () {
        this.name.splice(this.pinNumber, 1);
        this.setProperty();
        this.draw();
    }

    // Get random color
    function getRandomColor() {
        let color = "hsl(" + 360 * Math.random() + ',' +
            ( 20 + 70 * Math.random()) + '%,' +
            ( 40 + 20 * Math.random()) + '%)';
        // let letters = '0123456789ABCDEF';
        // let color = '#';
        // for (let i = 0; i < 6; i++) {
        //     color += letters[Math.floor(Math.random() * 16)];
        // } if (color == '#000000') {
        //     color = '#123456';
        // }
        return color;
    }
}










