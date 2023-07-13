//Using code that lives on Firebase's servers, that's where 'import'
//keyword comes from. initializeApp, getDatabase, ref, push are all 
//firebase functions that we're using and the file links are their code:
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    let commentsArray = Object.values(snapshot.val())

    clearCommentListEl()
    
    for (let i = 0; i < commentsArray.length; i++) {
        let currentComment = commentsArray[i]
        appendCommentToList(currentComment)
        console.log(currentComment)
    }
})

function clearCommentListEl() {
    commentListEl.innerHTML = ""
}
//this function needs a parameter because we want to use inputValue
//but can't since it was made inside ANOTHER function. Since
//inputValue is out of scope, we use commentValue here and can plug-in
//inputValue when we call appendCommentToList in the click function:
function appendCommentToList(commentValue) {
    commentListEl.innerHTML += `<li>${commentValue}`
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}
