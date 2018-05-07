var userArray = []
var correctAnswerNumber = null
var randomNumber = null
var questionAlreadyAnswered = 0
var questionsAsked = 0
var clock = 10
var day = null
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var dayOfTheMonth = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var clockActivated = null
var gamesLeft = null
day = month + "/" + dayOfTheMonth + "/" + year;
//Gets the day of the user
window.onload = function()
{
  //When the page loads
    if(sessionStorage.getItem("BBTrivianame") == null)
    {
      location.href = "index.html"
    }
    //Checks to see if they are logged in.
    document.getElementById("correctAnswer").innerHTML = "Correct Answers: 0"
    var updateData = firebase.database().ref("user");
      updateData.on("child_added", function(data, prevChildKey) {
      var data = data.val()
      userArray.push(data)
    })
    //Loads all of the accounts found on the database
    firebase.database().ref('Completed/').set("Data is saved", function(error) {
      if (error) {
          alert("Data could not be saved." + error);
      } else {
        for(var i=0;i<userArray.length;i++)
        {
          if(userArray[i].username == sessionStorage.getItem("BBTrivianame"))
          {
            //Checks to see if the the account that the user signed in matches the one found on the database

            if(gamesLeft == 0)
            {
              userArray[i].eligible = false
            }
            gamesLeft = userArray[i].gamesLeft
            gamesLeft = gamesLeft - 1
            if (performance.navigation.type == 1 || localStorage.getItem("eligible") == false) {
              gameOver()
              //Checks for cheaters
            }
            questionAlreadyAnswered = userArray[i].questionsAnswered
            if(userArray[i].eligible == true)
            {
              generateQuestion()
            }
            //Checks to see if the user hasn't lost the game today
            else if (userArray[i].date != day) {
              firebase.database().ref('user/' + userArray[i].identification).update({
                eligible: true,
                gamesLeft: 2
              })
              firebase.database().ref('Completed/').set("Data is saved", function(error) {
                  if (error) {
                      alert("Data could not be saved." + error);
                  } else {
                    generateQuestion()
                  }
               })
            } //Checks to see if the user lost the last game, but hasn't played today
            else
            {
              alert("Sorry, you can't play today.")
              location.href = "homepage.html"
            } //User has already lost the game and can no longer play
          }
        }
      }
    });
}
var questionsAnswered = 0;
var isPlaying = true
var questionArray = [];
var noRepeatQuestionArray = [];
function submitAnswer1()
{
  //When the user clicks the first multiple choice option
  //This would be considered to be "very ugly" codes
  //But I decided to go the "easy" way rather than the "sophisticated" way
    if(correctAnswerNumber == 1)
	  {
      //Checks to see if the correct answer was the first multiple choice option
	     correctAnswer()
	  }
    else
    {
        isPlaying = false
        gameOver()
        //The user clicked the wrong answer and is out of the game
	  }
}

function submitAnswer2()
{
  //The same code as the one aboce
  //This is when the user clicks multiple choice option "2"
  //Again, this is very ugly but whatever
    if(correctAnswerNumber == 2)
	{
		correctAnswer()
	}
    else
	{
      isPlaying = false
      gameOver()
	}
}

function submitAnswer3()
{
  //Same code as the one above
  //This is when the user clicks multiple choice option "3"
	if(correctAnswerNumber == 3)
	{
		correctAnswer()
	}
    else
	{
    isPlaying = false
    gameOver()
	}
}
function correctAnswer()
{
  questionsAnswered += 1
  document.getElementById("correctAnswer").innerHTML = "Correct Answers: " + questionsAnswered
  generateQuestion()
  noRepeatQuestionArray.push(document.getElementById("question").innerHTML)
}

function generateQuestion(){
  //This picks a random question out of all of the questions in the database
  //Also displays the question in the game
  if(questionsAnswered == 10)
  {
    gameOver()
    //The user wins the game
  }
  else
  {
    var updateData = firebase.database().ref("questions");
      updateData.on("child_added", function(data, prevChildKey) {
      var data = data.val()
      questionArray.push(data)
    })
    //Gathers up all of the questions that are on the database
    firebase.database().ref("Completed/").set("Data is logged", function(error) {
      if (error) {
          alert("Data could not be saved." + error);
      } else {
        if(clockActivated != null)
        {
          clearInterval(clockActivated)
        }
        //Clears the clock whenever a question is answered correctly

        var availableQuestionArray = []
        for(i=0;i<questionArray.length;i++)
        {
          if(!noRepeatQuestionArray.includes(questionArray[i].questionName))
          {
            availableQuestionArray.push(questionArray[i])
          }
        }
        if(availableQuestionArray.length != 0)
        {
          randomNumber = Math.floor((Math.random() * availableQuestionArray.length))
          document.getElementById("question").innerHTML = availableQuestionArray[randomNumber].questionName
          //Picks a random question out of all of the questions in the database
          var mcArray = [1,2,3]
          correctAnswerNumber = Math.floor((Math.random() * 3) +1)
          //Picks which button should the correct answer be displayed
          mcArray.splice((correctAnswerNumber - 1), 1)
          document.getElementById("mc" + correctAnswerNumber).innerHTML = availableQuestionArray[randomNumber].correctAnswer
          var wrongAnswer1number = Math.floor((Math.random() * 2) + 1)
          document.getElementById("mc" + mcArray[wrongAnswer1number - 1]).innerHTML = availableQuestionArray[randomNumber].wrongAnswer1
          mcArray.splice((wrongAnswer1number - 1), 1)
          document.getElementById("mc" + mcArray).innerHTML = availableQuestionArray[randomNumber].wrongAnswer2
          //Chooses which button should the wrong answer be displayed at
          questionsAsked += 1
          //Records the amount of questions asked during the game
          clock = 10
          document.getElementById("countdownClock").innerHTML = "Number of seconds left: 10"
          clockActivated = setInterval(showCountdown, 1000);
          //Sets a 10 second timer for each question
        }
        else
        {
          location.href = "nomorequestion.html"
        }
      }
    });
  }
}

function showCountdown()
{
  if(clock != 1)
  {
    clock -= 1
    document.getElementById("countdownClock").innerHTML = "Number of seconds left: " + clock
  }
  else
  {
    clearInterval(clockActivated)
    gameOver()
  }
}

function gameOver()
{
  //This function is called whenever someone wins or loses a game
  userArray = [];
  var updateData = firebase.database().ref("user");
    updateData.on("child_added", function(data, prevChildKey) {
    var data = data.val()
    userArray.push(data)
  })
  //Gathers all of the users
  firebase.database().ref('Completed/').set("Data is saved", function(error) {
    if (error) {
        alert("Data could not be saved." + error);
    } else {
      for(var i=0;i<userArray.length;i++)
      {
        if(userArray[i].username == sessionStorage.getItem("BBTrivianame"))
        {
          if(questionsAnswered == 10)
          {
            var totalGamesWon = userArray[i].gamesWon + 1
          }
          else
          {
            var totalGamesWon = userArray[i].gamesWon
          }
          //Checks to see if the user has won the game or not
          if(gamesLeft == 0)
          {
            userArray[i].eligible = false
            localStorage.setItem("eligible", false)
          }
          var updatedAnsweredQuestionCount = questionAlreadyAnswered + questionsAnswered
          var amountOfQuestionsAsked = userArray[i].totalQuestions + questionsAsked
          //Updates all of the statistics
          //Ex: The total number of questions answered correctly = The amount of previously answered questions + the amount of questions answered just now
          if(performance.navigation.type == 1)
          {
            var totalAmountOfGamesPlayed = userArray[i].totalGames
          }
          else {
            var totalAmountOfGamesPlayed = userArray[i].totalGames + 1
          }
          //Checks to see if the user cheated by refreshing the page.
          //If the users cheated, it resets all of the statistics that were recorded
          firebase.database().ref('user/' + userArray[i].identification).update({
              eligible: userArray[i].eligible,
              date: day,
              questionsAnswered: updatedAnsweredQuestionCount,
              totalQuestions: amountOfQuestionsAsked,
              gamesWon: totalGamesWon,
              totalGames: totalAmountOfGamesPlayed,
              gamesLeft: gamesLeft
          })
          //Updates the database with the new statistics, along with disabling the user from playing again
          firebase.database().ref('Completed/').set("Data is saved", function(error) {
              if (error) {
                alert("Data could not be saved." + error)
              }
              else{
                if(questionsAnswered == 10)
                {
                  location.href = "winner.html"
                }
                //If the user wins, the user would be taken to the winning page
                else
                {
                  location.href = "gameOver.html"
                }
                //If the user loses, the user would be taken to the losing page
              }
          });
        }
      }
    }
  });
}
