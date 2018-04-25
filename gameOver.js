function homePage()
{
  location.href = "homepage.html"
  //If the user decides to go to the homepage
  //When they click a button, they will be sent to back to the homepage
}
window.onload = function()
{
  if(sessionStorage.getItem("BBTrivianame") == null)
  {
    location.href = "index.html"
  }
  //Checks to see if the user logged in
}
