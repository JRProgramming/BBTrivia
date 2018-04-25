var isEligibleEmail = true;

function register(){
  var name = document.getElementById("nameTextField").value
  var email = document.getElementById("schoolEmailTextField").value
  if(name != "" && email != "")
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
            if(array[i].username == name && array[i].email == email)
            {
              isAMember = true
            }
          }
          if(isAMember != true)
          {
            var reversedBlindBrook = "gro.koorbdnilb"
            var reversedEmail = ""
            for(i=0;i<email.length;i++)
            {
              reversedEmail = email[i] + reversedEmail
            }
            for(i=0;i<14;i++)
            {
              if(reversedEmail[i] != reversedBlindBrook[i])
              {
                isEligibleEmail = false
              }
            }
            if(isEligibleEmail != false)
            {
              var save = firebase.database().ref('user/').push({
                  username: name,
                  email: email,
                  eligible: true,
                  questionsAnswered: 0,
                  totalQuestions: 0,
                  gamesWon: 0,
                  totalGames: 0
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
                    location.href = "homePage.html"
                  }
              });
            }
            else {
              alert("I'm sorry but this website only allows people with Blind Brook emails to have access to this site.")
              name = ""
              email = ""
            }
          }
          else
          {
            //The user already has an account right here.
            location.href = "homePage.html"
          }
      }
    })
  }
  else
  {
    if(name == "" && email == "")
    {
      //Checks to see if both of the textfields are filled in
      alert("Both textfields are empty. Please type in your full name and your email.")
    }
    else if(name == "")
    {
      //Will send an alert if the name textfield is blank
      alert("You didn't type in your name. Please type in your first and last name.")
    }
    else
    {
      //Will send an alert if the email textfield is blank
      alert("You didn't type in your school email. Please do that right now.")
    }
  }
}
