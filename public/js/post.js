const displayUpdateForm = document.querySelectorAll(".edit")
const cancelEdit = document.querySelectorAll(".cancel")

// Finally this works, took 3 hours
// The key here is to add the eventlistener to all of the buttons
// Then through a series of pathing to the proper element we toggle hidden
displayUpdateForm.forEach(elem => elem.addEventListener("click", 
    (e) => {
        // e.target.parentElement.previousElementSibling.classList.toggle("hidden")
        e.target.parentElement.parentElement.previousElementSibling.lastElementChild.classList.toggle("hidden")
    }
))

cancelEdit.forEach(elem => elem.addEventListener("click",
    (e) => {
        e.target.parentElement.parentElement.parentElement.classList.toggle("hidden")
    }
))
