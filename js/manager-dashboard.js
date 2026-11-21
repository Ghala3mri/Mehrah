// ===== Club Manager Dashboard Page =====

var offersList = document.getElementById("offers-list");

// Returns true if the text is empty or has spaces only
function isEmpty(text) {
  return text.search(/\S/) == -1;
}

// Gets the saved offerings array from localStorage (or an empty array)
function getSavedOfferings() {
  var offerings = JSON.parse(localStorage.getItem("mehrah-offerings"));
  if (offerings == null) {
    offerings = [];
  }
  return offerings;
}

// Saves the offerings array in localStorage
function saveOfferings(offerings) {
  localStorage.setItem("mehrah-offerings", JSON.stringify(offerings));
}

// Returns the offering name written in the card title 
function getCardName(card) {
  var title = card.getElementsByTagName("h3")[0].innerHTML;
  return title.split("</span>")[1].replace(/^\s+/, "");
}

// Builds the HTML of one saved offering card
// (data-index = the place of the offering in the saved array)
function cardHTML(offering, index) {
  return '<li class="manager-offer-card" data-index="' + index + '">' +
           '<img src="' + offering.image + '" alt="' + offering.name + '" class="manager-offer-img">' +
           '<div class="manager-offer-info">' +
             '<h3><span class="manager-offer-label">اسم الورشة:</span> ' + offering.name + '</h3>' +
             '<p>' + offering.description + '</p>' +
             '<div class="manager-offer-buttons">' +
               '<button type="button" class="btn btn-small manager-delete-btn">حذف</button>' +
               '<button type="button" class="btn btn-small">تعديل</button>' +
             '</div>' +
           '</div>' +
         '</li>';
}

// Shows the saved offerings under the original offerings
function showSavedOfferings() {
  // 1) Remove the saved cards that are already shown (if any)
  var oldCards = offersList.querySelectorAll("li[data-index]");
  for (var i = 0; i < oldCards.length; i++) {
    offersList.removeChild(oldCards[i]);
  }

  // 2) Add a card for every saved offering
  var offerings = getSavedOfferings();
  for (var j = 0; j < offerings.length; j++) {
    offersList.innerHTML += cardHTML(offerings[j], j);
  }

  // 3) Connect the buttons again (innerHTML removes the old connections)
  connectButtons();
}

// Runs when the manager clicks "delete"
function deleteOffering() {
  // button -> buttons box -> info box -> card (li)
  var card = this.parentNode.parentNode.parentNode;
  var name = getCardName(card);

  var answer = confirm("هل تريد حذف العرض: " + name + "؟");
  if (!answer) {
    return;
  }

  var index = card.getAttribute("data-index");
  if (index == null) {
    // An original offering: remove it from the page
    offersList.removeChild(card);
  } else {
    // A saved offering: remove it from the array, save, and show the list again
    var offerings = getSavedOfferings();
    offerings.splice(index, 1);
    saveOfferings(offerings);
    showSavedOfferings();
  }

  alert("تم حذف العرض: " + name);
}

// Runs when the manager clicks "edit"
function editOffering() {
  var card = this.parentNode.parentNode.parentNode;
  var title = card.getElementsByTagName("h3")[0];
  var text = card.getElementsByTagName("p")[0];

  // Ask for the new name and description (the old values are written by default)
  var newName = prompt("اسم العرض:", getCardName(card));
  if (newName == null) {
    return; // the manager clicked Cancel
  }
  var newDescription = prompt("وصف العرض:", text.innerHTML);
  if (newDescription == null) {
    return;
  }

  // Check the new values (same rules as the Add a New Offering page)
  if (isEmpty(newName) || isEmpty(newDescription)) {
    alert("لم يتم التعديل: اسم العرض ووصفه لا يمكن أن يكونا فارغين");
    return;
  }
  if (newName.search(/^[0-9٠-٩]/) != -1) {
    alert("لم يتم التعديل: اسم العرض لا يمكن أن يبدأ بأرقام");
    return;
  }

  var index = card.getAttribute("data-index");
  if (index == null) {
    // An original offering: change it on the page
    title.innerHTML = '<span class="manager-offer-label">اسم الورشة:</span> ' + newName;
    text.innerHTML = newDescription;
  } else {
    // A saved offering: change it in the array, save, and show the list again
    var offerings = getSavedOfferings();
    offerings[index].name = newName;
    offerings[index].description = newDescription;
    saveOfferings(offerings);
    showSavedOfferings();
  }

  alert("تم تعديل العرض: " + newName);
}

// Connects every "delete and "edit" button to its function
function connectButtons() {
  var buttons = offersList.querySelectorAll(".manager-offer-buttons .btn");
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].innerHTML == "حذف") {
      buttons[i].onclick = deleteOffering;
    } else {
      buttons[i].onclick = editOffering;
    }
  }
}

// When the page opens: show the offerings added from the "Add a New Offering" page
showSavedOfferings();
