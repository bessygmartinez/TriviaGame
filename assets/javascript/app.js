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
        answerText: "\"Words are just words.\" - Luther 'Uncle Luke' Cambpell"
    },
    {
        question: "Which iconic restaurant offers Wing It Wednesdays & Joe's Meal Deals?",
        choices: ["Chili's", "La Carreta", "Flanigan's", "Versailles"],
        answer: 2,
        photo: "assets/images/FlanigansRibRolls.jpg",
        answerText: "Broooo, those rib rolls are FIRE."
    },
    {
        question: "It's 3:05 p.m. on a weekday. What are we pouring around the workplace?",
        choices: ["Cafecito", "Mimosas", "Beer", "Water"],
        answer: 0,
        photo: "assets/images/Cafecito.jpg",
        answerText: "You gotta pinch the tip for a perfect pour."
    },
    {
        question: "We all know that Cubans are the #1 Hispanic population in Miami, but who is #2?",
        choices: ["Colombians", "Venezuelans", "Haitians", "Nicaraguans"],
        answer: 3,
        photo: "assets/images/FritangaNica.jpg",
        answerText: "If you haven't eaten Fritanga yet, go get some!! ~Queso frito~"
    },
    {
        question: "This quintessential Southerneastern supermaket chain opened up seven stores sub-branded 'Sabor' to cater to the large Hispanic population in Miami.",
        choices: ["Aldi", "Publix", "Winn-Dixie", "Piggly Wiggly"],
        answer: 1,
        photo: "assets/images/PublixSabor.jpg",
        answerText: "As long as you still have those delicious Publix subs, who cares what the name is."
    },
    {
        question: "The unofficial motto of this Miami-Dade County city is 'Agua, Fango, y Factoría.'",
        choices: ["Aventura", "Miami-Beach", "Hialeah", "Tamiami"],
        answer: 2,
        photo: "assets/images/Hialeah.jpg",
        answerText: "Don't you ever dare confuse East Hialeah with West Hialeah."
    },
    {
        question: "How many times have the Miami Dolphins won the SuperBowl?",
        choices: ["1", "Never, bro", "3", "2"],
        answer: 3,
        photo: "assets/images/MiamiDolphins.jpg",
        answerText: "1972 & 1973. Can you believe it? Don Shula is the man!"
    },
    {
        question: "OMG! The Miami Heat and/or Dolphins and/or Marlins just won a championship (or Fidel just died)! Which of these is an essential celebratory noisemaker?",
        choices: ["Fireworks", "Pots & Pans", "A whistle", "Clapping"],
        answer: 1,
        photo: "assets/images/MiamiFans.jpg",
        answerText: "WE'RE GOING TO LA CARRETA!!!!"
    },
]; 

    //Gets music for game
    const miamiBass = document.createElement("audio");
    miamiBass.setAttribute("src", "assets/sounds/2LiveCrew-HoochieMama.mp3");

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
		timeUp: "La cagaste. Time's up.",
		finished: "Ya se acabo. Here's your score:"
    };

    $("#message").hide();
    
    //Starts game when #start button clicked
    $("#start").on("click", function () {
        $("#welcome").hide();
        $(this).hide();
        miamiBass.play();
        startNewGame();
    });

    //Starts game over again when #resetGameBtn is clicked at the end
    $("#resetGameBtn").on("click", function() {
        $(this).hide();
        $("#final-pic").hide();
        $("#result-message").hide();
        $("#correctAnswers").hide();
        $("#incorrectAnswers").hide();
        $("#unanswered").hide();
        startNewGame();
    })

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
        $("#message").show();
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
    $("#question-text").addClass("mt-1 mb-3 text-center");
    $("#question-text").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");

    for (let i = 0; i <= 4; i++) {
        let choiceList = $("<div>");
        choiceList.text(triviaQuestions[currentQuestion].choices[i]);
        choiceList.attr({"data-index": i});
        choiceList.addClass("thisChoice m-2 text-center");
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
        $("#question-text").empty();
        $("#answerImg").show();
        $("#answer-text").show();

        let correctAnswerText = triviaQuestions[currentQuestion].choices[triviaQuestions[currentQuestion].answer];
        let correctAnswerIndex = triviaQuestions[currentQuestion].answer;

        let answerImgLink = triviaQuestions[currentQuestion].photo;
        let newAnsImg = $("<img width='400' class='border border-info img-fluid'>");
        newAnsImg.attr("src", answerImgLink);
        newAnsImg.addClass("answerImg mt-2");
        $("#answerImg").html(newAnsImg);

        let imgCaption = triviaQuestions[currentQuestion].answerText;
        newAnsCaption = $("<div class='mt-3'>");
        newAnsCaption.html("<h2>" + imgCaption + "</h2>");
        newAnsCaption.addClass("imgCaption mt-3 text-center");
        $("#answer-text").html(newAnsCaption);

        if((userSelect == correctAnswerIndex) && (answered === true)){
            correctAnswers++;
            $("#message").html("<h2>" + messages.correct + "</h2>");
        }
        else if ((userSelect != correctAnswerIndex) && (answered === true)){
            incorrectAnswers++;
            $("#message").html("<h2>" + messages.incorrect + "</h2>");
            $("#actualAnswer").html("The correct answer was:<br>" + correctAnswerText);
        }
        else {
            unanswered++;
            $("#message").html("<h2>" + messages.timeUp + "</h2>");
            $("#actualAnswer").html("The correct answer was:<br>" + correctAnswerText);
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

        $("#result-message").html("<h3>" + messages.finished + "</h3>");
        $("#result-message").show();
        $("#correctAnswers").html("<h3>Que tremendo. You got " + correctAnswers + " right.</h3>");
        $("#correctAnswers").show();
        $("#incorrectAnswers").html("<h3>La cagaste on " + incorrectAnswers + " of them.</h3>");
        $("#incorrectAnswers").show();
        $("#unanswered").html("<h3>You left " + unanswered + " without answer.</h3>");
        $("#unanswered").show();
        $("#final-pic").html("<img src='assets/images/PitBull305.jpg' class='img-fluid border border-info mt-3' width='400'>");
        $("#final-pic").show();
        $("#resetGameBtn").html("<button type='button' class='btn btn-info btn-lg mt-3'>Try Again!</button>");
        $("#resetGameBtn").show();
    }

});