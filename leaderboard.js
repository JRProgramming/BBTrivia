var questionsAsked = []
var questionsAnswered = []
var questionsSubmitted = []
var totalGames = []
var gamesWon = []
var userArray = []
window.onload = function()
{
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
        questionsAsked.push(userArray[i].totalQuestions)
        questionsAnswered.push(userArray[i].questionsAnswered)
        questionsSubmitted.push(userArray[i].questionsSubmitted)
        totalGames.push(userArray[i].totalGames)
        gamesWon.push(userArray[i].gamesWon)
      }
      var maxQuestionsAsked = Math.max(...questionsAsked)
      var maxQuestionsAnswered = Math.max(...questionsAnswered)
      var maxQuestionSubmitted = Math.max(...questionsSubmitted)
      var maxTotalGames = Math.max(...totalGames)
      var maxGamesWon = Math.max(...gamesWon)
      document.getElementById("questionsAnswered").innerHTML = maxQuestionsAnswered
      document.getElementById("amountOfQuestionsAsked").innerHTML = maxQuestionsAsked
      document.getElementById("gamesWon").innerHTML = maxGamesWon
      document.getElementById("gamesPlayed").innerHTML = maxTotalGames
      document.getElementById("submittedQuestions").innerHTML = maxQuestionSubmitted
      for(var i=0;i<userArray.length;i++)
      {
        if(maxQuestionsAsked == userArray[i].totalQuestions)
        {
          console.log(userArray[i].username)
          document.getElementById("nameQuestionsAsked").innerHTML = userArray[i].username
        }
        if(maxQuestionsAnswered == userArray[i].questionsAnswered)
        {
          document.getElementById("nameQuestionsAnswered").innerHTML = userArray[i].username
        }
        if(maxQuestionSubmitted == userArray[i].questionsSubmitted)
        {
          document.getElementById("nameSubmittedQuestions").innerHTML = userArray[i].username
        }
        if(maxTotalGames == userArray[i].totalGames)
        {
          document.getElementById("nameGamesPlayed").innerHTML = userArray[i].username
        }
        if(maxGamesWon == userArray[i].gamesWon)
        {
          document.getElementById("nameGamesWon").innerHTML = userArray[i].username
        }
      }
    }
  })
}

function homepage()
{
  location.href = "homepage.html"
}

