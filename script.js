document.getElementById('clickToContinue').addEventListener('click', function() {
    // גלילה אל האלמנט עם class "scroll-target"
    let target = document.querySelector('#scroll-target');
        let targetPosition = target.offsetTop; // המיקום של האלמנט במסך
        let startPosition = window.pageYOffset; // המיקום הנוכחי של הגלילה
        let distance = targetPosition - startPosition; // המרחק שיש לגלול
        let duration = 1000; // זמן הגלילה במילישניות (1000 מ"ל = 1 שניה)
        let startTime = null;

        // פונקציה לביצוע הגלילה בצורה חלקה
        function scrollAnimation(currentTime) {
            if (!startTime) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
            let progress = timeElapsed / duration; // אחוז הזמן שעבר

            // חישוב המרחק הנכון
            let scrollDistance = startPosition + (distance * progress);

            // מבצעים את הגלילה
            window.scrollTo(0, scrollDistance);

            // אם לא עבר זמן הגלילה כולו, נמשיך את האנימציה
            if (timeElapsed < duration) {
                requestAnimationFrame(scrollAnimation);
            }
        }

        // מתחילים את האנימציה של הגלילה
        requestAnimationFrame(scrollAnimation);
    });

    const images = document.querySelectorAll('.gallery img'); // כל התמונות בגלריה
    let currentIndex = 0; // תמונה פעילה נוכחית

    function changeImage() {
        images[currentIndex].classList.remove('active'); // הסרת מחלקת "active" מהתמונה הנוכחית
        currentIndex = (currentIndex + 1) % images.length; // מעבר לתמונה הבאה (וחזרה להתחלה)
        images[currentIndex].classList.add('active'); // הוספת מחלקת "active" לתמונה החדשה
    }

    setInterval(changeImage, 2500); // שינוי תמונה כל 2.5 שניות

  document.getElementById('viewOurProducts').addEventListener('click', function() {
    // הפניה לדף אחר
    window.location.href = 'products.html'; // הכנס כאן את הקישור לדף הרצוי
});