
// For Pop Up 
const pawButton = document.getElementById("pawButtonOne");
const popup = document.getElementById("popupAbout");
const exitButton = document.getElementById("exitButton");

pawButton.addEventListener("click", () => {
    popup.style.display = "block";
});

exitButton.addEventListener("click", () => {
    popup.style.display = "none";
});


// Play Button
const playButton = document.getElementById("playButton");
playButton.addEventListener("click", function() {
    window.location.href = "/assets/gamePage.html";
});