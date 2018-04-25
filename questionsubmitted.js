window.onload = function()
{
  if(sessionStorage.getItem("BBTrivianame") == null)
  {
    location.href = "index.html"
  }
  //Checks to see if the user is signed in
}
function homePage()
{
  location.href = "homePage.html"
  //Goes to the homepage when a button is clicked
}
function submitQuestion()
{
  location.href = "submitAQuestion.html"
  //Goes to the "Submit a question" page when this button is clicked
}
