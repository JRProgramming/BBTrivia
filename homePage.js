function join()
{
  location.href = "playGame.html"
}
function submitAQuestion()
{
  location.href = "submitAQuestion.html"
}
window.onload = function() {windowOnload()}
function windowOnload()
{
  if (sessionStorage.getItem("BBTrivianame") != null)
  {
  document.getElementById("headline").innerHTML = "Welcome " + sessionStorage.getItem("BBTrivianame")
  }
}
