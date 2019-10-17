$(document).ready(function () {

    //Trivia Questions
   let triviaQuestions = [
    {
        question: "Where was the original home of the Miami Hurricanes Football team?",
        choices: ["Miami Arena", "Joe Robbie Stadium", "Miami Orange Bowl", "Mark Light Stadium"],
        answer: 2,
        photo: "assets/images/MiamiOrangeBowl.jpg",
        answerText: "RIP Orange Bowl"
    },
    {
        question: "Who is known as the 'Mother of Miami'?",
        choices: ["Marjory Stoneman Douglas", "Julia Tuttle", "Roxcy Bolton", "Polita Grau"],
        answer: 1,
        photo: "assets/images/JuliaTuttle.jpg",
        answerText: "CAUTION: Don't go under the causeway named after her."

    },
    {
        question: "This Miami-based group holds the distinction of releasing the first sound recording to be declared 'obscene' by the Broward County Court. (This was later appealed and overturned in the 11th U.S. Circuit Court of Appeals).",
        choices: ["Miami Sound Machine", "Pretty Ricky", "Against All Authority", "2 Live Crew"],
        answer: 3,
        photo: "assets/images/2LiveCrew.jpg",
        answerText: "\"If it wasn't for 2 Live Crew, videos wouldn't look like they do and rappers wouldn't sound like they do.\""
    }
]; 

    //Gets music for game
    //const miamiBass = document.createElement("audio");
    //miamiBass.setAttribute("src", "assets/sounds/2LiveCrew-HoochieMama.mp3");

	let currentQuestion; 
	let correctAnswers; 
	let incorrectAnswers; 
	let unanswered; 
	let seconds; 
	let time; 
	let answered; 
	let userSelect;
	let messages = {
		correct: "Eso! You got it right, Pipo!",
		incorrect: "Bro, what happened? That's wrong.",
		timeUp: "Se acabo. Time's up.",
		finished: "Here's how you did, bro."
    };

    $("#currentQuestion").hide();
    
    //Starts game when #start button clicked
    $("#start").on("click", function () {
        $("#welcome").hide();
        $(this).hide();
        //miamiBass.play();
        startNewGame();
        
    });

    //-------------Timer functions-------------
    function timer() {
        seconds = 20;
        $("#timer").html("00:" + seconds);
        answered = true;
        time = setInterval(displayTimer, 1000);
    }

    //Displays timer
    function displayTimer() {
        seconds--;
        if(seconds < 10) {
            $("#timer").html("00:0" + seconds);
        }
        else {
            $("#timer").html("00:" + seconds);
        }
        if (seconds < 1){
            clearInterval(time);
            answered = false;
            displayAnswer();
        }
      }
    //-------------End Timer functions-------------

    //------------Starts new game------------------
    function startNewGame() {
        $("#welcome").hide();
        $("#result-message").empty();
        $("#answeredCorrectly").empty();
        $("#answeredIncorrectly").empty();
        $("#notAnswered").empty();
        $("#answerImg").hide();
        $("#answer-text").hide();
        currentQuestion = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        newQuestion();
    }

    //--------------Displays next question----------------
    function newQuestion () {
        $("#message").empty();
        $("#actualAnswer").empty();
        $("#answerImg").hide();
        $("#answer-text").hide();
        answered = true;

    //--------------Displays new question------------------
    $("#currentQuestion").html("Question " + (currentQuestion+1) + " of " + triviaQuestions.length);
    $("#question-text").html(triviaQuestions[currentQuestion].question);

    for (let i = 0; i <= 5; i++) {
        let choiceList = $("<div>");
        choiceList.text(triviaQuestions[currentQuestion].choices[i]);
        choiceList.attr({"data-index": i});
        choiceList.addClass("thisChoice");
        $("#choices-text").append(choiceList);
    }

    timer();

    $(".thisChoice").on("click", function() {
        userSelect = $(this).data("index");
        clearInterval(time);
        displayAnswer();
    });
    }

    function displayAnswer(){
        $("#currentQuestion").empty();
        $(".thisChoice").empty();
        $(".question").empty();
        $("#answerImg").show();
        $("#answer-text").show();

        let correctAnswerText = triviaQuestions[currentQuestion].choices[triviaQuestions[currentQuestion].answer];
        let correctAnswerIndex = triviaQuestions[currentQuestion].answer;

        let answerImgLink = triviaQuestions[currentQuestion].photo;
        let newAnsImg = $("<img width='400' class='border border-info'>");
        newAnsImg.attr("src", answerImgLink);
        newAnsImg.addClass("answerImg");
        $("#answerImg").html(newAnsImg);

        let imgCaption = triviaQuestions[currentQuestion].answerText;
        newAnsCaption = $("<div>");
        newAnsCaption.html(imgCaption);
        newAnsCaption.addClass("imgCaption");
        $("#answer-text").html(newAnsCaption);

        if((userSelect == correctAnswerIndex) && (answered === true)){
            correctAnswers++;
            $("#message").html(messages.correct);
        }
        else if ((userSelect != correctAnswerIndex) && (answered === true)){
            incorrectAnswers++;
            $("#message").html(messages.incorrect);
            $("#actualAnswer").html("The correct answer was:<p>" + correctAnswerText + "</p>");
        }
        else {
            unanswered++;
            $("#message").html(messages.timeUp);
            $("#actualAnswer").html("The correct answer was:<p>" + correctAnswerText + "</p>");
            answered = true;
        }

        if (currentQuestion == (triviaQuestions.length-1)){
            setTimeout(scores, 6000);
        }
        else {
            currentQuestion++;
            setTimeout(newQuestion, 6000);
        }
    }

    function scores() {
        $("#current-question").empty();
        $("#question-text").empty();
        $("#timer").empty();
        $("#message").empty();
        $("#actualAnswer").empty();
        $("#answerImg").hide();
        $("#answer-text").hide();

        $("#result-message").html(messages.finished);
        $("#correctAnswers").html("Te la comistes with " + correctAnswers + " right.");
        $("#incorrectAnswers").html("You got " + incorrectAnswers + " wrong, man.");
        $("#unanswered").html("You left " + unanswered + " hanging.");
        $("#final-pic").html("<img src='assets/images/PitBull305.jpg' class='img-fluid border border-info' width='400'>")


    }

});