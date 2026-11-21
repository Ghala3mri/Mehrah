
// تحديد نموذج التقييم
const evaluationForm = document.getElementById("evaluation-form");

// التحقق من إرسال النموذج
evaluationForm.addEventListener("submit", function(event) {

    // منع إعادة تحميل الصفحة
    event.preventDefault();

    // الحصول على الورشة المختارة
    const workshop = document.getElementById("workshop");

    // الحصول على التقييم المختار
    const rating = document.querySelector(
        'input[name="rating"]:checked'
    );

    // الحصول على التعليق
    const comment = document.getElementById("evaluation-comment");


    // التحقق من اختيار الورشة
    if (workshop.value === "") {

        alert("الرجاء اختيار الورشة التي تريد تقييمها.");

        workshop.focus();

        return;
    }


    // التحقق من اختيار عدد النجوم
    if (!rating) {

        alert("الرجاء اختيار تقييمك بالنجوم.");

        return;
    }


    // التحقق من كتابة التعليق
    if (comment.value.trim() === "") {

        alert("الرجاء كتابة تعليقك قبل إرسال التقييم.");

        comment.focus();

        return;
    }


    // قراءة قيمة التقييم
    const ratingValue = Number(rating.value);


    // عرض رسالة حسب التقييم
    if (ratingValue >= 4) {

        alert(
            "شكرًا لك على تقييمك!\n" +
            "نسعد بأن تجربتك في مِهرَه كانت مميزة."
        );

    } else {

        alert(
            "نعتذر لأن تجربتك لم تكن بالمستوى المتوقع.\n" +
            "نسعى دائمًا إلى تحسين عروضنا وتطوير تجربتك."
        );

    }


    // الانتقال إلى لوحة العضو
    window.location.href = "member-dashboard.html";

});
