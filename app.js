//Using code that lives on Firebase's servers, that's where 'import'
//keyword comes from. initializeApp, getDatabase, ref, push, remove are all 
//firebase functions that we're using and the file links are their code:
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-28a7f-default-rtdb.europe-west1.firebasedatabase.app/"
}
//Connecting our project and the databse it contains to Firebase's 
//functions:
const app = initializeApp(appSettings)
const database = getDatabase(app)

//Before we can start pushing data onto Firebase, we need to create a 
//reference, or any location inside of the database
const commentsInDB = ref(database, "comments")

const inputFieldEl = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const commentListEl = document.getElementById("comment-list")

addButton.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(commentsInDB, inputValue)

    clearInputFieldEl() //as soon as a value is entered, clear the field.
    
})
//Turning object into an array so we can use a loop. 'Object' method
//can be used to return an array: Object.value, Object.keys, 
//and Object.entries (this one returns an array with smaller arrays
//for both the keys and values inside)
onValue(commentsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let commentsArray = Object.entries(snapshot.val())

        clearCommentListEl()
        
        for (let i = 0; i < commentsArray.length; i++) {
            let currentComment = commentsArray[i]
            let currentCommentID = currentComment[0]
            let currentCommentValue = currentComment[1]
            
            appendCommentToList(currentComment)
            commentListEl.style.color = "black";
        }
    } else {
        commentListEl.innerHTML = "No endorsements yet..."
        commentListEl.style.color = "white";
    }
  
})

function clearCommentListEl() {
    commentListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

//this function below needs a parameter because we want to use inputValue
//but can't since it was made inside ANOTHER function. Since
//inputValue is out of scope, we use commentValue here and can plug-in
//inputValue when we call appendCommentToList in the click function:
function appendCommentToList(comment) {
    //commentListEl.innerHTML += `<li>${commentValue}`
    let commentID = comment[0]
    let commentValue = comment[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = commentValue

    newEl.addEventListener("dblclick", function() {
        let locationOfCommentInDB = ref(database, `comments/${commentID}`)

        remove(locationOfCommentInDB)
    })
    
    commentListEl.append(newEl)
}



