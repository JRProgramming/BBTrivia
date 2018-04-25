function join()
{
  location.href = "playGame.html"
  //This is when the user clicks the button to play the trivia game
}
function submitAQuestion()
{
  location.href = "submitAQuestion.html"
  //This is when the user clicks to submit a question
}
window.onload = function() {windowOnload()}
function windowOnload()
{
  if(sessionStorage.getItem("BBTrivianame") == null)
  {
    location.href = "index.html"
  }
  //makes sure that the user is logged in
  else
  {
    document.getElementById("headline").innerHTML = "Welcome " + sessionStorage.getItem("BBTrivianame")
  }
  //This code allows the homepage to say "Welcome ___"
  var updateData = firebase.database().ref("user");
  var array = [];
  updateData.on("child_added", function(data, prevChildKey) {
    var data = data.val()
    array.push(data)
  })
  //Gathers all of the users in the database
  firebase.database().ref('Completed/').set("Data is saved,", function(error) {
    if(error){
      alert("Data could not be saved." + error)
    } else {
      for(i=0;i<array.length;i++)
      {
        if(array[i].username == sessionStorage.getItem("BBTrivianame"))
        {
          //Checks to see if the user is already signed in
          document.getElementById("questionAnsweredCorrectly").innerHTML = array[i].questionsAnswered
          document.getElementById("questionsAsked").innerHTML = array[i].totalQuestions
          document.getElementById("numberofgameswon").innerHTML = array[i].gamesWon
          document.getElementById("numberofgamesplayed").innerHTML = array[i].totalGames
          //Uploads all of the statistics about the user
        }
      }
    }
  })
}
