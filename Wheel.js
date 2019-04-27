var Wheel = new function __Wheel() {

    this.name = [1, 2, 3, 4];
    this.color = [];
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.radius = this.canvas.width / 2 - 10;
    this.pinNumber = 0;
    

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
    this.rotate = function () {
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(Math.PI / 18);
        this.ctx.translate(-this.centerX, -this.centerY);
    }

    // Rotate the wheel
    this.rotateWheel = function () {
        let startAngle = 0;
        $(".spin").click(() => {
            if (this.numSegments > 2) {
                $(".remove-button").show();
            } else {
                $(".remove-button").hide();
            }
            $(".spin").text("?");
            let counter = Math.floor(Math.random() * 100);
            let spin = setInterval(frame, 10);
            let spinSlower1 = setInterval(frame, 15);
            let spinSlower2 = setInterval(frame, 25);
            let spinSlower3 = setInterval(frame, 35);
            let spinSlower4 = setInterval(frame, 50);
            let self = this;
            let rotateNumber = 600 - counter;
            let rotateAngle = rotateNumber * Math.PI / 18;
            let endAngle = startAngle + rotateAngle;
            let pinNumber = Math.floor((endAngle % (2 * Math.PI)) / this.degreeEach);
            this.pinNumber = this.name.length - pinNumber - 1;
            let i = 0;

            function frame() {
                if (counter == 300) {
                    clearInterval(spin);
                }
                if (counter == 380) {
                    clearInterval(spinSlower1);
                }
                if (counter == 460) {
                    clearInterval(spinSlower2);
                }
                if (counter == 540) {
                    clearInterval(spinSlower3)
                }
                if (counter == 600) {
                    clearInterval(spinSlower4);
                    $(".spin").text("SPIN");
                    let p = document.createElement("p");
                    p.id = "text-result";
                    p.innerText = `${self.name[self.pinNumber]}`;

                    setTimeout(() => {
                        $("#result").show();
                        $("#result-item").append(p);
                    }
                        , 1000);
                    startAngle += rotateAngle;
                }
                else {
                    $(".pointer-image").css("transform", "none");
                    self.clearCanvas();
                    self.rotate();
                    self.draw();
                    counter++;
                    i++;
                    if (i == 18) {
                        $(".pointer-image").css("transform", "rotate(-15deg)");
                        i = 0;
                    }
                }
            }
        });
    }

    // delete option when clicking remove button
    this.deleteOption = function () {
        this.name.splice(this.pinNumber, 1);
        this.setProperty();
        this.draw();
    }

    // Get random color
    function getRandomColor () {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        } if (color == '#000000') {
            color = '#123456';
        }
        return color;
    }
}










