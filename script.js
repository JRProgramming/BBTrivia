function register(){
  var name = document.getElementById("nameTextField").value
  if(name != "")
  {
    //Confirming to see if the user typed in both of the textboxes
    var array = [];
    sessionStorage.setItem("BBTrivianame", name);
    var updateData = firebase.database().ref("user");
    updateData.on("child_added", function(data, prevChildKey) {
      var data = data.val()
      array.push(data)
    })
    firebase.database().ref('Completed/').set("Data is saved,", function(error) {
      if(error){
        alert("Data could not be saved." + error)
      } else {
        var isAMember = false
          for(var i=0;i<array.length;i++)
          {
            if(array[i].username == name)
            {
              isAMember = true
            }
          }
          if(isAMember != true)
          {
            var save = firebase.database().ref('user/').push({
                username: name,
                eligible: true,
                questionsAnswered: 0,
                totalQuestions: 0,
                gamesWon: 0,
                totalGames: 0,
                questionsSubmitted: 0,
                gamesLeft: 3
            });
            var id = save.key
            firebase.database().ref('user/' + id).update({
              identification: id
            })
            firebase.database().ref('Completed/').set("Data is saved", function(error) {
                if (error) {
                    alert("Data could not be saved." + error);
                } else {
                  sessionStorage.setItem("login", true)
                  location.href = "homepage.html"
                }
            });
          }
          else
          {
            //The user already has an account right here.
            location.href = "homepage.html"
          }
      }
    })
  }
  else
  {
   if(name == "")
    {
      alert("Please enter your name.")
    }
  }
}
