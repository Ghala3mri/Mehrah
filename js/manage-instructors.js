// قائمة المدربين وقادة الأنشطة
const instructorsList = document.querySelector(".instructors-list");
const deleteForm = document.getElementById("delete-instructors-form");
const addForm = document.querySelector(".add-instructor-form");
const searchInput = document.getElementById("instructor-search");

// إنشاء مصفوفة من المدربين الموجودين في الصفحة
let instructors = [];

const existingCards = instructorsList.querySelectorAll(".instructor-card");

existingCards.forEach(function (card) {
const checkbox = card.querySelector(".instructor-select");
const name = card.querySelector("h2").textContent.replace("اسم المدرب:", "").trim();
const craft = card.querySelector("p").textContent.replace("الحرفة:", "").trim();

instructors.push({
id: checkbox.value,
name: name,
craft: craft,
card: card
});
});

// عرض المدربين في القائمة
function displayInstructors() {
instructorsList.innerHTML = "";

const searchText = searchInput.value.trim().toLowerCase();

instructors.forEach(function (instructor) {
if (
instructor.name.toLowerCase().includes(searchText) ||
instructor.craft.toLowerCase().includes(searchText)
) {
instructorsList.appendChild(instructor.card);
}
});
}

// البحث عن مدرب
searchInput.addEventListener("input", function () {
displayInstructors();
});

// حذف المدربين المحددين
deleteForm.addEventListener("submit", function (event) {
event.preventDefault();

const selected = instructorsList.querySelectorAll(
".instructor-select:checked"
);

// التأكد من تحديد مدرب واحد على الأقل
if (selected.length === 0) {
alert("يرجى تحديد مدرب واحد على الأقل للحذف.");
return;
}

// تأكيد عملية الحذف
const confirmed = confirm("هل أنت متأكد من حذف المدربين المحددين؟");

if (confirmed) {
const selectedIds = Array.from(selected).map(function (checkbox) {
return checkbox.value;
});

instructors = instructors.filter(function (instructor) {
return !selectedIds.includes(instructor.id);
});

displayInstructors();
}
});

// التحقق من نموذج إضافة مدرب جديد
addForm.addEventListener("submit", function (event) {
event.preventDefault();

const name = document.getElementById("instructor-name").value.trim();
const dob = document.getElementById("instructor-dob").value;
const skills = document.getElementById("instructor-skills").value.trim();
const email = document.getElementById("instructor-email").value.trim();
const expertise = document.getElementById("instructor-expertise").value.trim();
const education = document.getElementById("instructor-education").value.trim();
const photo = document.getElementById("instructor-photo").files[0];

// التأكد من تعبئة جميع الحقول
if (!name || !dob || !skills || !email || !expertise || !education || !photo) {
alert("يرجى تعبئة جميع الحقول المطلوبة.");
return;
}

// التحقق من اسم المدرب
const namePattern = /^[\p{L}\s]+$/u;

if (!namePattern.test(name)) {
    alert("يرجى إدخال اسم مدرب صحيح باستخدام الحروف فقط.");
    return;
}

// التحقق من البريد الإلكتروني
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
alert("يرجى إدخال بريد إلكتروني صحيح.");
return;
}

// التحقق من تاريخ الميلاد
if (dob > new Date().toISOString().split("T")[0]) {
alert("تاريخ الميلاد لا يمكن أن يكون في المستقبل.");
return;
}

// التحقق من نوع الصورة
if (!photo.type.startsWith("image/")) {
alert("يرجى اختيار ملف صورة فقط.");
return;
}

// قراءة صورة المدرب الجديد
const reader = new FileReader();

reader.onload = function () {
const id = "instructor-" + Date.now();

// إنشاء بطاقة المدرب الجديد
const card = document.createElement("article");
card.className = "instructor-card";

const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.className = "instructor-select";
checkbox.name = "selected-instructors";
checkbox.value = id;
checkbox.setAttribute("aria-label", "تحديد " + name);

const info = document.createElement("div");
info.className = "instructor-info";

const heading = document.createElement("h2");
heading.textContent = "اسم المدرب: " + name;

const craft = document.createElement("p");
craft.textContent = "الحرفة: " + expertise;

info.appendChild(heading);
info.appendChild(craft);

const image = document.createElement("img");
image.src = reader.result;
image.alt = "المدرب " + name;
image.className = "instructor-img";

card.appendChild(checkbox);
card.appendChild(info);
card.appendChild(image);

// إضافة المدرب إلى مصفوفة المدربين
instructors.push({
id: id,
name: name,
craft: expertise,
dob: dob,
skills: skills,
email: email,
education: education,
card: card
});

// تحديث القائمة
searchInput.value = "";
displayInstructors();

// رسالة نجاح وإفراغ النموذج
alert("تمت إضافة المدرب " + name + " بنجاح.");
addForm.reset();
};

reader.readAsDataURL(photo);
});
// إظهار اسم الصورة بعد اختيارها
const instructorPhotoInput = document.getElementById("instructor-photo");
const instructorUploadText = document.querySelector(".instructor-upload-text");

instructorPhotoInput.addEventListener("change", function () {
    if (this.files.length > 0) {
        instructorUploadText.textContent = "تم اختيار: " + this.files[0].name;
    } else {
        instructorUploadText.textContent = "اسحب الصورة هنا";
    }
});

// إعادة النص الأصلي عند إلغاء النموذج
addForm.addEventListener("reset", function () {
    instructorUploadText.textContent = "اسحب الصورة هنا";
});