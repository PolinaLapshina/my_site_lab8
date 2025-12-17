/**
 * Простой скрипт для сайта-портфолио
 * Студент 1 курса
 */

// 1. Когда страница загрузится
window.onload = function() {
    console.log("Страница загружена!");
    
    // 2. Плавная прокрутка
    let links = document.querySelectorAll('a[href^="#"]');
    
    for(let i = 0; i < links.length; i++) {
        links[i].onclick = function(e) {
            let targetId = this.getAttribute('href');
            
            if(targetId !== '#') {
                let target = document.querySelector(targetId);
                if(target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 50,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }
    
    // 3. Проверка формы
    let form = document.querySelector('form');
    if(form) {
        form.onsubmit = function(e) {
            e.preventDefault(); // не отправляем сразу
            
            let name = document.querySelector('input[name="name"]');
            let email = document.querySelector('input[name="email"]');
            let message = document.querySelector('textarea[name="message"]');
            let ok = true;
            
            // Проверяем поля
            if(!name.value) {
                alert("Введите имя!");
                ok = false;
            }
            
            if(!email.value.includes('@')) {
                alert("Введите правильный email!");
                ok = false;
            }
            
            if(!message.value) {
                alert("Напишите сообщение!");
                ok = false;
            }
            
            // Если всё ок
            if(ok) {
                alert("Спасибо! Ваше сообщение отправлено.");
                form.reset(); // очищаем форму
            }
        }
    }
    
    // 4. Кнопка "Наверх"
    let topButton = document.createElement('button');
    topButton.innerHTML = '↑ Наверх';
    topButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 15px;
        background: #38a169;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        display: none;
        z-index: 100;
    `;
    
    document.body.appendChild(topButton);
    
    // Показываем кнопку при прокрутке
    window.onscroll = function() {
        if(window.scrollY > 300) {
            topButton.style.display = 'block';
        } else {
            topButton.style.display = 'none';
        }
    }
    
    // Прокрутка наверх
    topButton.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // 5. Подсветка активного меню
    let menuLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let fromTop = window.scrollY + 100;
        
        for(let i = 0; i < menuLinks.length; i++) {
            let link = menuLinks[i];
            let section = document.querySelector(link.hash);
            
            if(section) {
                if(section.offsetTop <= fromTop && 
                   section.offsetTop + section.offsetHeight > fromTop) {
                    link.style.backgroundColor = '#48bb78';
                    link.style.color = 'white';
                } else {
                    link.style.backgroundColor = '#f0f7f4';
                    link.style.color = '#2d3748';
                }
            }
        }
    });
}

// 6. Простая функция для копирования email
function copyEmail() {
    let email = "example@mail.com";
    
    // Пробуем скопировать
    navigator.clipboard.writeText(email)
        .then(function() {
            alert("Email скопирован!");
        })
        .catch(function() {
            // Старый способ
            let temp = document.createElement('textarea');
            temp.value = email;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            alert("Email скопирован!");
        });
}

// 7. Показ текущего года в футере
function showYear() {
    let year = new Date().getFullYear();
    let yearElement = document.getElementById('current-year');
    if(yearElement) {
        yearElement.textContent = year;
    }
}

// Запускаем показ года
showYear();
