var s = [],t = document.getElementsByClassName("twit");
for(var b = 0; b < t.length; b++){ s.push(t[b]); }
function open() {
  var txt = document.getElementById("create-twit-modal"), Author = document.getElementById("modal-backdrop");
  txt.style.display = Author.style.display = "flex";
}
function add(text, author) {
  articles = document.getElementsByClassName("twit-container")[0];
  article = document.createElement("article");
  article.classList.add("twit");
  icon = document.createElement("div");
  icon.classList.add("twit-icon");
  article.appendChild(icon);
  image = document.createElement("i");
  image.classList.add("fas", "fa-bullhorn");
  icon.appendChild(image);
  content = document.createElement("div");
  content.classList.add("twit-content");
  article.appendChild(content);
  var t = document.createElement("p");
  t.classList.add("twit-text");
  t.textContent = text;
  content.appendChild(t);
  txt = document.createElement("p");
  txt.classList.add("twit-author");
  content.appendChild(txt);
  ntt = document.createElement("twitText");
  ntt.setAttribute("href", "#");
  ntt.textContent = author;
  txt.appendChild(ntt);
  articles.appendChild(article);
  s.push(article);
  closeModal();
}
function validate(){
  var txt = document.getElementById("twit-text-input").value, Author = document.getElementById("twit-attribution-input").value;
  if(txt === "" && Author === ""){ alert("Please the Twit Text and Author."); }
  else if(txt === ""){ alert("Please enter the Twit Text."); } 
  else if(Author ===""){ alert("Please enter the Author."); }
  else { add(txt, Author); }
}
function search() {
  resetModal();
  var txt = document.getElementById("navbar-search-input").value.toLowerCase();
  for(var b = s.length - 1; b >= 0; b--){
    var Author = s[b].children[1].children[0].textContent.toLowerCase();
    var c = s[b].children[1].children[1].textContent.toLowerCase();
    if(Author.search(txt) === -1 && c.search(txt) === -1){ t[b].remove(); }
  }
}
function resetModal() {
  for(var b = t.length - 1; b >=0; b--){ t[b].remove(); }
  var txt = document.getElementsByClassName("twit-container")[0];
  for(var i = 0; i < s.length; i++){txt.appendChild(s[i]);}
}
function closeModal() {
  document.getElementById("create-twit-modal").style.display = "";
  document.getElementById("modal-backdrop").style.display = "";
  /* Clean the input box */
  document.getElementById("twit-text-input").value = "";
  document.getElementById("twit-attribution-input").value = "";
}
document.getElementById("create-twit-button").addEventListener("click", open);
document.getElementById("navbar-search-button").addEventListener("click", search);
document.getElementById("navbar-search-input").addEventListener("input", search);
document.getElementsByClassName("modal-close-button")[0].addEventListener("click", closeModal);
document.getElementsByClassName("modal-cancel-button")[0].addEventListener("click", closeModal);
document.getElementsByClassName("modal-accept-button")[0].addEventListener("click", validate);

