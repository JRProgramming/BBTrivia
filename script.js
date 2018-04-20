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
            var save = firebase.database().ref('user/').push({
                username: name,
                email: email,
                eligible: true
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
      alert("Both textfields are empty. Please type in your full name and your email.")
    }
    else if(name == "")
    {
      alert("You didn't type in your name. Please type in your first and last name.")
    }
    else
    {
      alert("You didn't type in your school email. Please do that right now.")
    }
  }
}
