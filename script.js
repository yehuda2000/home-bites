

document.querySelector('.conversion').textContent = convertToSuperscript('2024');

function convertToSuperscript(input) {
    const superscriptMap = {
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',
        '.': '·' 
    };

    return input.split('').map(char => superscriptMap[char] || char).join('');
}

if (window.location.pathname === '/home-bites/'){

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

}

if (window.location.pathname === '/home-bites/products.html') {

    // פונקציה ליצירת כרטיסים מתוך המידע במערך
function createProductCards() {
    const container = document.getElementById('productContainer'); // תוודא שיש אלמנט עם id 'productContainer'

    productList.forEach(product => {
        // יצירת אלמנט div עם class 'product-card' ו-id מהנתונים
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.id = product.id;

        // הוספת אירוע click לפתיחת כרטיס
        card.setAttribute('onclick', `openCard('${product.id}')`);

        // יצירת אלמנט img עם התמונה של המוצר
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;

        // יצירת כותרת המוצר
        const title = document.createElement('p');
        title.classList.add('product-title');
        title.textContent = product.name;

        // יצירת תיאור המוצר
        const description = document.createElement('p');
        description.classList.add('product-description');

        const descriptionText = convertToSuperscript(product.description).split(' '); // חותכים את המשפט לפי רווחים
        const firstWord = descriptionText.shift(); // משיגים את המילה הראשונה ומסירים אותה מהמשפט
        const firstWordBefore =(product.description).split(' ').shift()
        
        if(!isNaN(firstWordBefore)){
            const span = document.createElement('span'); // יוצרים את ה-span
            span.classList.add('number3'); // נותנים לו קלאס description
            span.textContent = firstWord; // מניחים את המילה הראשונה בתוך ה-span

            // מחברים את ה-span והמילים הנותרות
            description.appendChild(span);
            description.appendChild(document.createTextNode(' ' + descriptionText.join(' '))); // מצרפים את שאר המשפט
        }else{
            description.textContent = product.description;
        }
        
        // יצירת פסקה עבור המחיר
        const price = document.createElement('p');
        price.classList.add('product-price');

        // יצירת המחיר הישן
        const oldPrice = document.createElement('span');
        oldPrice.classList.add('old-price');
        oldPrice.innerHTML = `$<span class="number2">${convertToSuperscript(product.oldPrice)}</span>`;

        // יצירת המחיר החדש
        const newPrice = document.createElement('span');
        newPrice.innerHTML = `  $<span class="number1">${convertToSuperscript(product.newPrice)}</span>`;

        // הוספת המחירים לפסקה
        price.appendChild(oldPrice);
        price.appendChild(newPrice);

        // הוספת כל האלמנטים ל-card
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(price);

        // הוספת ה-card ל-container
        container.appendChild(card);
    });
}

// קריאה לפונקציה ליצירת כרטיסים
createProductCards();

    function openCard(cardId) {
        // מציאת פרטי הכרטיס שנבחר
        const card = document.getElementById(cardId);
        const image = card.querySelector('img').src;
        const title = card.querySelector('.product-title').textContent;
        const description = card.querySelector('.product-description').textContent;
        const price = card.querySelector('.product-price').innerHTML;
        
        // הצגת הכרטיסייה המורחבת עם התוכן המתאים
        document.getElementById('expandedImage').src = image;
        document.getElementById('expandedTitle').textContent = title;
        document.getElementById('expandedDescription').textContent = description;
        document.getElementById('expandedPrice').innerHTML = price;
        
        // מציגים את הכרטיסייה המורחבת
        const expandedCard = document.getElementById('expandedCard');
        expandedCard.style.display = 'flex';
        setTimeout(() => {
            expandedCard.classList.add('show'); // מוסיפים את מחלקת 'show' להפעיל את האנימציה
        }, 10); // מוסיפים זמן קטן כדי להבטיח שהאנימציה תתבצע לאחר שה-display יהיה 'flex'
        
        // מציגים את האוברליי (רקע מעומעם)
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        setTimeout(() => {
            overlay.classList.add('show'); // מוסיפים את מחלקת 'show' לאוברליי
        }, 10);
        
        document.getElementById('expandedAmount').value = productList.find(e=>e.id === cardId).amount
    }
    
    function closeCard() {
        // הסרת מחלקת 'show' כדי להתחיל את האנימציה של סגירה
        const expandedCard = document.getElementById('expandedCard');
        expandedCard.classList.remove('show');
    
        // מחכים לסיום האנימציה ואז מכבים את ה-display
        setTimeout(() => {
            expandedCard.style.display = 'none';
        }, 500); // זמן שמחכה עד סיום האנימציה (500ms)
        
        // הסרת מחלקת 'show' מה-overlay
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('show');
        
        // מחכים לסיום האנימציה ואז מכבים את ה-display
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300); // זמן שמחכה עד סיום האנימציה של האוברליי (300ms)
    }
    

}

