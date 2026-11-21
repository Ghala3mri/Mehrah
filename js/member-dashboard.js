document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".filter-btn");
    const requestCards = document.querySelectorAll(".request-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

         
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            // تفعيل الزر الحالي
            button.classList.add("active");

            const selectedFilter = button.dataset.filter;

            requestCards.forEach(card => {

                const cardStatus = card.dataset.status;

                if (
                    selectedFilter === "all" ||
                    selectedFilter === cardStatus
                ) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });

});