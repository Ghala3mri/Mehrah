// ===== Add a New Offering Page =====

// Get the form and all its fields
var offerForm = document.getElementById("add-offer-form");
var nameInput = document.getElementById("offer-name");
var dateInput = document.getElementById("offer-date");
var timeInput = document.getElementById("offer-time");
var instructorInput = document.getElementById("offer-instructor");
var descriptionInput = document.getElementById("offer-description");
var imageInput = document.getElementById("offer-image");
var priceInput = document.getElementById("offer-price");
var materialInput = document.getElementById("offer-material");
var levelInput = document.getElementById("offer-level");
var uploadText = document.getElementsByClassName("add-offer-upload-text")[0];

// Returns true if the text is empty or has spaces only
function isEmpty(text) {
  return text.search(/\S/) == -1;
}

// Shows the name of the chosen image inside the upload box
function showImageName() {
  var path = imageInput.value;
  if (path == "") {
    uploadText.innerHTML = "اسحب الصورة هنا";
  } else {
    uploadText.innerHTML = "تم اختيار: " + path.substring(path.lastIndexOf("\\") + 1);
  }
}

// Puts the original text back in the upload box
function resetImageText() {
  uploadText.innerHTML = "اسحب الصورة هنا";
}

// Runs when the user clicks the Submit button
function addOffering() {
  var errors = "";

  // 1) Check every field and collect what is missing or wrong
  if (isEmpty(nameInput.value)) {
    errors += "- يرجى إدخال اسم العرض\n";
  } else if (nameInput.value.search(/^[0-9٠-٩]/) != -1) {
    errors += "- اسم العرض لا يمكن أن يبدأ بأرقام\n";
  }

  if (isEmpty(dateInput.value)) {
    errors += "- يرجى تحديد فترة العرض\n";
  }

  if (isEmpty(timeInput.value)) {
    errors += "- يرجى تحديد وقت العرض\n";
  }

  if (isEmpty(instructorInput.value)) {
    errors += "- يرجى اختيار المدرب\n";
  }

  if (isEmpty(descriptionInput.value)) {
    errors += "- يرجى كتابة وصف العرض\n";
  }

  if (isEmpty(imageInput.value)) {
    errors += "- يرجى اختيار صورة العرض\n";
  }

  if (isEmpty(priceInput.value)) {
    errors += "- يرجى إدخال رسوم التسجيل (أرقام فقط)\n";
  } else if (isNaN(priceInput.value) || parseFloat(priceInput.value) < 0) {
    errors += "- رسوم التسجيل يجب أن تكون رقمًا (صفر أو أكثر)\n";
  }

  if (isEmpty(materialInput.value)) {
    errors += "- يرجى اختيار نوع الخامة\n";
  }

  if (isEmpty(levelInput.value)) {
    errors += "- يرجى اختيار مستوى الحرفة\n";
  }

  // If there is any error: show it and stop (the offering is not added)
  if (errors != "") {
    alert("لم تتم إضافة العرض، يرجى تصحيح التالي:\n\n" + errors);
    return false;
  }

  // 2) Choose the offering picture based on its material
  //    (localStorage stores text only, so it cannot keep the image file itself)
  var image = "images/pottery.jpg";
  if (materialInput.value == "fabric") {
    image = "images/embrodry.png";
  } else if (materialInput.value == "wax") {
    image = "images/candles.jpg";
  }

  // 3) Get the old offerings from localStorage (or start an empty array)
  var offerings = JSON.parse(localStorage.getItem("mehrah-offerings"));
  if (offerings == null) {
    offerings = [];
  }

  // 4) Create the new offering object and add it to the array
  var newOffering = {
    name: nameInput.value,
    date: dateInput.value,
    time: timeInput.value,
    instructor: instructorInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    material: materialInput.value,
    level: levelInput.value,
    image: image
  };
  offerings.push(newOffering);

  // 5) Save the whole array back to localStorage
  localStorage.setItem("mehrah-offerings", JSON.stringify(offerings));

  // 6) Show a success message with the offering name
  alert("تمت إضافة العرض \"" + newOffering.name + "\" بنجاح");

  // 7) Clear the form
  nameInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
  instructorInput.value = "";
  descriptionInput.value = "";
  imageInput.value = "";
  priceInput.value = "";
  materialInput.value = "";
  levelInput.value = "";
  resetImageText();

  return false;
}

// Connect the functions to the form
offerForm.onsubmit = addOffering;      // when Submit is clicked
offerForm.onreset = resetImageText;    // when Cancel is clicked
imageInput.onchange = showImageName;   // when an image is chosen
