$(document).ready(function () {

    //Gets music for game
    //const miamiBass = document.createElement("audio");
    //miamiBass.setAttribute("src", "assets/sounds/2LiveCrew-HoochieMama.mp3");

    //Selectors for JQuery
    let $questionText = $("#question-text");
    let $answerImg = $("#answerImg");
    let timer;
    let time = 6;

    //Global Variables
    let arrChoices = [];
    let arrQuestions = [];
    let arrTriviaGame = [];
    let image = "";

    function resetTime() {
        time = 21;
    }


    //Trivia Questions Array
    arrTriviaGame.push(new question(
        "Where was the original home of the Miami Hurricanes Football team?",
        "MiamiOrangeBowl.jpg",
        "Miami Arena",
        "Joe Robbie Stadium",
        "Miami Orange Bowl",
        "Mark Light Stadium"))

    function startTime() {
        clearInterval(timer);
        timer = setInterval(displayTimer, 1000);
    }

    function displayTimer() {
        time--;
        $("#timer").html("<p>Time: " + time + "</p>");

        if (time <=0) {
            stopTime();
        }
    }

    function stopTime() {
        clearInterval(timer);
        resetTime();
        setTimeout(startTime, 3000);
    }

    
    function question (questionText, image, choice1, choice2, choice3, choice4) {
        this.questionText = questionText;
        this.image = image;
        this.choices = [choice1, choice2, choice3, choice4];
    }


    function gameStart() {
        $("#question-text").css({ display: "block" });
        question();
    }



    //Starts game when #start button clicked
    $("#start").on("click", function () {
        console.log("Start button clicked");
        $(welcome).css({ display: "none" });
        $(start).css({ display: "none" });
        //miamiBass.play();
        startTime();
    });

});