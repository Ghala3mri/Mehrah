/* =========================================================
   صفحة من نحن: التحقق من نموذج «انضم إلى فريقنا»
   (عايده)
   ========================================================= */

// نجيب الفورم والحقول من الصفحة باستخدام الـ id
var joinForm = document.getElementById("join-form");
var nameInput = document.getElementById("join-name");
var photoInput = document.getElementById("join-photo");
var dobInput = document.getElementById("join-dob");
var uploadText = document.querySelector(".about-upload-text");


/* ========== 1. التحقق من الصورة ========== */
// حقل الصورة مخفي، فالمتصفح ما يقدر يطلّع رسالته عليه
// عشان كذا نتحقق منه بالجافا سكربت ونطلّع alert واضح

function checkPhoto() {
  // ما اختار أي ملف
  if (photoInput.files.length == 0) {
    alert("الرجاء اختيار صورة المدرب.");
    return false;
  }

  // اختار ملف بس مو صورة (نوع الصورة يبدأ بـ image/ مثل image/png)
  var fileType = photoInput.files[0].type;
  if (fileType.indexOf("image/") != 0) {
    alert("صورة المدرب لازم تكون صورة فقط (مثل JPG أو PNG).");
    photoInput.value = "";                         // نشيل الملف الغلط
    uploadText.innerHTML = "اسحب الصورة هنا";
    return false;
  }

  return true;
}


/* ========== 2. التحقق من باقي الحقول عند الإرسال ========== */
// الحقول الفاضية يمنعها المتصفح أصلًا بخاصية required (specialized form controls)
// وهنا نتحقق من الشروط الإضافية

function validateJoinForm() {
  var name = nameInput.value.trim();

  // الاسم ما يبدأ برقم: /^[0-9]/ يعني "أول حرف رقم من 0 إلى 9"
  if (name.match(/^[0-9]/)) {
    alert("الاسم الكامل لا يمكن أن يبدأ برقم.");
    nameInput.focus();
    return false;
  }

  // الصورة
  if (!checkPhoto()) {
    return false;
  }

  // سنة الميلاد 2008 أو قبل
  // قيمة حقل التاريخ تجي بالشكل 1995-04-12، فأول 4 خانات هي السنة
  var year = parseInt(dobInput.value.substring(0, 4));
  if (year > 2008) {
    alert("سنة الميلاد يجب أن تكون 2008 أو قبل.");
    dobInput.focus();
    return false;
  }

  // كل شي صحيح: رسالة تأكيد فيها اسم المرسل
  alert("شكرًا " + name + "! تم استلام طلب انضمامك إلى فريق مِهرَه، وسنتواصل معك قريبًا.");

  // نفرّغ الفورم ونرجع نص صندوق الصورة
  joinForm.reset();
  uploadText.innerHTML = "اسحب الصورة هنا";

  // نرجّع false عشان الصفحة ما تنعاد تحميل (ما فيه سيرفر يستقبل البيانات)
  return false;
}


/* ========== 3. ربط الدوال بالفورم ========== */

// دالة تشيّك هل كل الحقول (غير الصورة) مكتوبة صح
function otherFieldsValid() {
  var fields = joinForm.querySelectorAll("input, textarea");
  for (var i = 0; i < fields.length; i++) {
    if (fields[i] != photoInput && !fields[i].checkValidity()) {
      return false;
    }
  }
  return true;
}

// لما يضغط زر الإرسال:
// إذا فيه حقل فاضي أو غلط، نخلي المتصفح يطلّع رسالته عليه
// وإذا كل الحقول تمام، نتحقق من الصورة (لأن المتصفح ما يقدر يطلّع رسالة على حقل مخفي)
function onSubmitClick() {
  if (!otherFieldsValid()) {
    return true;
  }
  return checkPhoto();
}

if (joinForm != null) {
  var submitBtn = joinForm.querySelector('button[type="submit"]');
  submitBtn.onclick = onSubmitClick;

  // لما ينرسل الفورم (بعد ما يتأكد المتصفح من الحقول الفاضية)
  joinForm.onsubmit = validateJoinForm;

  // لما يختار صورة، يطلع اسمها داخل الصندوق عشان يعرف إنها انختارت
  photoInput.onchange = function () {
    if (photoInput.files.length > 0) {
      uploadText.innerHTML = "تم اختيار: " + photoInput.files[0].name;
    } else {
      uploadText.innerHTML = "اسحب الصورة هنا";
    }
  };

  // زر الإلغاء يرجع نص الصندوق كما كان
  joinForm.onreset = function () {
    uploadText.innerHTML = "اسحب الصورة هنا";
  };
}
