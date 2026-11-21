var donateForm = document.getElementById("donate-form");
var photoInput = document.getElementById("piece-photo");
var uploadText = document.getElementById("donate-upload-text");

var workshopNames = ["صناعة الفخار", "الرسم على الخزف", "صناعة الشموع"];
var workshopValues = ["pottery", "ceramics", "candles"];

var pendingPiece = null;
var pendingDonor = "";

var photoReader = new FileReader();
var photoImage = new Image();
var photoMaxSize = 500;

function cleanText(text) {
  return text.replace(/^\s+|\s+$/g, "");
}

function getWorkshopIndex(value) {
  for (var i = 0; i < workshopValues.length; i++) {
    if (workshopValues[i] == value) {
      return i;
    }
  }
  return 0;
}

function saveDonation(piece) {
  var donations = [];
  var saved = localStorage.getItem("mehrah-donations");
  if (saved != null) {
    donations = JSON.parse(saved);
  }
  donations.push(piece);
  localStorage.setItem("mehrah-donations", JSON.stringify(donations));
}

function clearForm() {
  document.getElementById("donor-name").value = "";
  document.getElementById("donor-email").value = "";
  document.getElementById("piece-name").value = "";
  document.getElementById("workshop").value = "";
  document.getElementById("piece-photo").value = "";
  document.getElementById("donation-value").value = "";
  document.getElementById("beneficiary").value = "";
  document.getElementById("display-in-gallery").checked = false;
  uploadText.innerHTML = "اسحب الصورة هنا";
}

function checkDonation() {
  var donorName = cleanText(document.getElementById("donor-name").value);
  var donorEmail = cleanText(document.getElementById("donor-email").value);
  var pieceName = cleanText(document.getElementById("piece-name").value);
  var workshop = document.getElementById("workshop").value;
  var photo = document.getElementById("piece-photo").value;
  var donationValue = cleanText(document.getElementById("donation-value").value);
  var beneficiary = document.getElementById("beneficiary").value;
  var showName = document.getElementById("display-in-gallery").checked;

  if (donorName == "" || donorEmail == "" || pieceName == "" || workshop == "" ||
      photo == "" || donationValue == "" || beneficiary == "") {
    alert("يرجى تعبئة جميع الحقول المطلوبة.");
    return false;
  }

  if (donorName.match(/^[a-zA-Zء-ي]+( [a-zA-Zء-ي]+)+$/) == null) {
    alert("يرجى إدخال الاسم الكامل باستخدام الحروف فقط.");
    return false;
  }

  if (donorEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == null) {
    alert("يرجى إدخال بريد إلكتروني صحيح.");
    return false;
  }

  if (pieceName.match(/[a-zA-Zء-ي]/) == null || pieceName.match(/[<>]/) != null) {
    alert("يرجى إدخال اسم صحيح للقطعة.");
    return false;
  }

  if (photo.match(/\.(jpg|jpeg|png|gif|webp)$/i) == null) {
    alert("يرجى اختيار ملف صورة فقط.");
    return false;
  }

  if (donationValue.match(/^\d+$/) == null || parseInt(donationValue) <= 0) {
    alert("يرجى إدخال قيمة تبرع أكبر من صفر.");
    return false;
  }

  var amount = parseInt(donationValue);
  var index = getWorkshopIndex(workshop);

  var maker = "فاعل خير";
  if (showName) {
    maker = donorName;
  }

  var piece = {
    name: pieceName,
    maker: maker,
    workshop: workshopNames[index],
    img: "",
    price: amount
  };

  pendingPiece = piece;
  pendingDonor = donorName;
  photoReader.readAsDataURL(photoInput.files[0]);

  return false;
}

function photoLoaded() {
  photoImage.src = photoReader.result;
}

function imageLoaded() {
  var width = photoImage.width;
  var height = photoImage.height;

  if (width > photoMaxSize || height > photoMaxSize) {
    if (width > height) {
      height = Math.round(height * photoMaxSize / width);
      width = photoMaxSize;
    } else {
      width = Math.round(width * photoMaxSize / height);
      height = photoMaxSize;
    }
  }

  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext("2d");
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, width, height);
  context.drawImage(photoImage, 0, 0, width, height);

  pendingPiece.img = canvas.toDataURL("image/jpeg", 0.8);
  saveDonation(pendingPiece);

  alert("تم استلام طلب التبرع بنجاح!\n" +
        "اسم المتبرع: " + pendingDonor + "\n" +
        "اسم القطعة: " + pendingPiece.name + "\n" +
        "قيمة التبرع المقترحة: " + pendingPiece.price + " ريال\n" +
        "ستظهر قطعتك في معرض العطاء في الصفحة الرئيسية.");

  pendingPiece = null;
  clearForm();
}

function imageFailed() {
  pendingPiece = null;
  alert("تعذر قراءة الصورة، يرجى اختيار صورة أخرى.");
}

function showPhotoName() {
  var path = photoInput.value;
  if (path == "") {
    uploadText.innerHTML = "اسحب الصورة هنا";
  } else {
    uploadText.innerHTML = "تم اختيار: " + path.substring(path.lastIndexOf("\\") + 1);
  }
}

function resetUploadText() {
  uploadText.innerHTML = "اسحب الصورة هنا";
}

donateForm.onsubmit = checkDonation;
donateForm.onreset = resetUploadText;
photoInput.onchange = showPhotoName;
photoReader.onload = photoLoaded;
photoImage.onload = imageLoaded;
photoImage.onerror = imageFailed;