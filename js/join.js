
// تحديد نموذج طلب الانضمام
const joinForm = document.getElementById("join-form");

// تحديد مكان عرض الطلبات
const requestsList = document.getElementById("requests-list");


// تخزين الطلبات مؤقتًا أثناء البقاء في الصفحة
let requests = [];


// تحويل الطلبات إلى أسماء عربية
function displayRequests() {

    requestsList.innerHTML = "";

    // إذا لم توجد طلبات
    if (requests.length === 0) {
        requestsList.textContent = "لا توجد طلبات مضافة حتى الآن.";
        return;
    }

    // عرض جميع الطلبات
    requests.forEach(function(request, index) {

        const requestCard = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = "الطلب رقم " + (index + 1);

        const name = document.createElement("p");
        name.textContent = "الاسم: " + request.name;

        const booking = document.createElement("p");
        booking.textContent = "نوع الحجز: " + request.booking;

        const workshop = document.createElement("p");
        workshop.textContent = "الورشة: " + request.workshop;

        const date = document.createElement("p");
        date.textContent = "الفترة المفضلة: " + request.date;

        const celebration = document.createElement("p");
        celebration.textContent = "باقة الاحتفال: " + request.celebration;

        requestCard.appendChild(title);
        requestCard.appendChild(name);
        requestCard.appendChild(booking);
        requestCard.appendChild(workshop);
        requestCard.appendChild(date);
        requestCard.appendChild(celebration);

        requestsList.appendChild(requestCard);

    });
}


// التحقق من البيانات وإرسال الطلب
joinForm.addEventListener("submit", function(event) {

    // منع إعادة تحميل الصفحة
    event.preventDefault();

    // قراءة بيانات النموذج
    const name = document.getElementById("full-name").value.trim();

    const bookingInput = document.querySelector(
        'input[name="booking"]:checked'
    );

    const workshopInput = document.getElementById("workshop");

    const dateInput = document.getElementById("preferred-date");

    const celebrationInput = document.querySelector(
        'input[name="celebration_package"]'
    );


    // التحقق من الاسم
    if (name === "") {
        alert("الرجاء إدخال الاسم الكامل.");
        document.getElementById("full-name").focus();
        return;
    }

    // جديد: التحقق من أن الاسم كامل ولا يحتوي على أرقام أو رموز
    const fullNamePattern = /^[\p{L}\p{M}]+(?:\s+[\p{L}\p{M}]+)+$/u;

    if (!fullNamePattern.test(name)) {
        alert("الرجاء إدخال الاسم الأول واسم العائلة بدون أرقام أو رموز.");
        document.getElementById("full-name").focus();
        return;
    }


    // التحقق من نوع الحجز
    if (!bookingInput) {
        alert("الرجاء اختيار نوع الحجز.");
        return;
    }

    // التحقق من الورشة
    if (workshopInput.value === "") {
        alert("الرجاء اختيار الورشة الحرفية.");
        workshopInput.focus();
        return;
    }

    // التحقق من الفترة
    if (dateInput.value === "") {
        alert("الرجاء اختيار الفترة المفضلة.");
        dateInput.focus();
        return;
    }

    // التحقق من أن التاريخ في المستقبل
    const chosenDate = new Date(dateInput.value);
    if (chosenDate <= new Date()) {
        alert("الرجاء اختيار تاريخ في المستقبل.");
        dateInput.focus();
        return;
    }


    // تجهيز بيانات الطلب
    const newRequest = {

        name: name,

        booking: bookingInput.value === "personal"
            ? "حجز شخصي"
            : "إهداء لصديق",

        workshop: workshopInput.options[
            workshopInput.selectedIndex
        ].text,

        date: dateInput.value,

        celebration: celebrationInput.checked
            ? "مضافة (+150 ريال)"
            : "غير مضافة"

    };


    // إضافة الطلب إلى القائمة
    requests.push(newRequest);


    // عرض الطلبات المضافة
    displayRequests();

    // إعادة تعيين النموذج
    joinForm.reset();


    // رسالة تأكيد وخيار البقاء أو العودة
    const stayOnPage = confirm(
        "تم إرسال طلبك بنجاح!\n\n" +
        "اضغطي موافق للبقاء في الصفحة.\n" +
        "أو إلغاء للعودة إلى مساحتي."
    );

    if (!stayOnPage) {
        window.location.href = "member-dashboard.html";
    }

});


//  حذف الطلبات المؤقتة عند مغادرة الصفحة
window.addEventListener("pagehide", function() {

    requests = [];

    requestsList.innerHTML = "";

});


// عرض الطلبات عند فتح الصفحة
displayRequests();
