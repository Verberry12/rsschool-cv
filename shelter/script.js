/*----------------------------------------------- Berger -----------------------------------------------*/



/*----------------------------------------------- Popup -----------------------------------------------*/

// Получаем в переменную все объекты с классом popup-link
// Это ссылки, при клике на которые должны открываться попапы
const popupLinks = document.querySelectorAll(".popup-link");

// Переменная unlock по умолчанию true
// Она нужна для того, чтобы предотвратить двойное нажатие на ссылку
// Например, если пользователь быстро нажмет на ссылку несколько раз, попап должен открыться только один раз
let unlock = true;

// Переменная timeout используется для задержки перед разблокировкой ссылки (unlock = true)
// Это число должно совпадать с продолжительностью анимации открытия/закрытия попапа в CSS
const timeout = 700;

// Функция для прикрепления обработчиков событий к модальным ссылкам
function attachModalListeners() {
    const popupLinks = document.querySelectorAll(".popup-link");
    if (popupLinks.length > 0) {
        for (let i = 0; i < popupLinks.length; i++) {
            const popupLink = popupLinks[i];
            popupLink.removeEventListener("click", handlePopupClick); 
            popupLink.addEventListener("click", handlePopupClick); 
        }
    }
}

// Обработчик клика по ссылке .popup-link
function handlePopupClick(e) {
    const popupName = this.getAttribute("href").replace("#", "");
    const currentPopup = document.getElementById(popupName);
    popupOpen(currentPopup);
    e.preventDefault();
}

// Функция для получения ширины полосы прокрутки браузера
function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}
  
// Функция, которая отвечает за открытие попапа
function popupOpen(currentPopup) {
    // Проверяем, существует ли объект попапа и разблокирована ли ссылка
    if (currentPopup && unlock) {
        // Вычисляем ширину полосы прокрутки
        const scrollbarWidth = getScrollbarWidth();
        // Добавляем отступ справа к body, равный ширине полосы прокрутки
        // Это нужно, чтобы предотвратить скачок контента при скрытии полосы прокрутки
        document.body.style.paddingRight = scrollbarWidth + 'px';
        // Добавляем класс "open" к попапу, чтобы сделать его видимым
        currentPopup.classList.add("open");

        // Находим элемент popup-body внутри currentPopup
        const popupBody = currentPopup.querySelector('.popup-body'); 

        // Вешаем обработчик события клика на popup-body
        popupBody.addEventListener("click", function (e) {
            // Проверяем, был ли клик сделан вне popup-content
            if (!e.target.closest('.popup-content')) { 
                // Если клик был сделан вне popup-content, закрываем попап
                popupClose(currentPopup);
            } 
        });

        // Блокируем скролл
        document.body.style.overflowY = 'hidden';

        // Сохраняем текущее положение прокрутки страницы
        let scrollPosition = window.scrollY;
        // Возвращаем прокрутку на то же место
        window.scrollTo(0, scrollPosition);
    }
}


// Получаем все элементы с классом close-popup (кнопки закрытия попапов)
const popupCloseIcon = document.querySelectorAll(".close-popup");

// Проверяем, есть ли на странице такие элементы
if (popupCloseIcon.length > 0) {
    // Цикл, который проходит по всем найденным кнопкам закрытия
    for (let i = 0; i < popupCloseIcon.length; i++) {
        // Получаем кнопку закрытия из цикла.
        const el = popupCloseIcon[i];
        
        // Вешаем на кнопку обработчик события клика
        // При клике на кнопку будет выполняться код в этой функции
        el.addEventListener("click", function (e) {
            // Вызываем функцию popupClose для закрытия попапа
            // Передаем в нее ближайший родительский элемент кнопки с классом "popup"
            popupClose(el.closest(".popup"));
            
            // Предотвращаем стандартное поведение ссылки (переход по ней)
            e.preventDefault();
        });
    }
}

// Функция, которая отвечает за закрытие попапа
function popupClose(popupActive) {
    if (unlock) {
      popupActive.classList.remove("open");
  
      // Получаем начальное значение paddingRight
      const initialPaddingRight = parseInt(document.body.style.paddingRight || 0);
      // Получаем ширину полосы прокрутки
      const scrollbarWidth = getScrollbarWidth();
  
      // Создаем анимацию с помощью requestAnimationFrame
      const animatePadding = () => {
        let start = null;
  
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / timeout, 1); // timeout - время анимации
  
          // Линейно уменьшаем paddingRight
          const currentPadding = initialPaddingRight - scrollbarWidth * progress;
          document.body.style.paddingRight = currentPadding + "px";
  
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            // По завершении анимации устанавливаем paddingRight в 0 и разблокируем скролл
            document.body.style.paddingRight = "0";
            // !!! Эта строка теперь выполняется синхронно с завершением анимации
            document.body.style.overflowY = "auto";
          }
        };
  
        requestAnimationFrame(step);
      };
      animatePadding();
    }
  }


/*----------------------------------------------- Carusel -----------------------------------------------*/

const petsData = [
    {
        name: "Katrine",
        image: "./assets/img/pets-katrine.png",
        link: "#Katrine-popup",
    },
    {
        name: "Jennifer",
        image: "./assets/img/pets-jennifer.png",
        link: "#Jennifer-popup",
    },
    {
        name: "Woody",
        image: "./assets/img/pets-woody.png",
        link: "#Woody-popup",
    },
    {
        name: "Sophia",
        image: "./assets/img/pets-sophia.png",
        link: "#Sophia-popup",
    },
    {
        name: "Timmy",
        image: "./assets/img/pets-timmy.png",
        link: "#Timmy-popup",
    },
    {
        name: "Charly",
        image: "./assets/img/pets-charly.png",
        link: "#Charly-popup",
    },
    {
        name: "Scarlett",
        image: "./assets/img/pets-scarlet.png",
        link: "#Scarlett-popup",
    },
    {
        name: "Freddie",
        image: "./assets/img/pets-freddie.png",
        link: "#Freddie-popup",
    },
];




// Функция для создания HTML-кода карточки питомца
function createPetCard(pet) {
    // Возвращаем строку, содержащую HTML-код карточки питомца
    // Создаем ссылку на попап с информацией о питомце
    // Создаем контейнер для карточки питомца
     // Вставляем изображение питомца
      // Вставляем имя питомца
    return `
        <a href="${pet.link}" class="popup-link">  
            <div class="pet-card">                  
                <img src="${pet.image}" alt="${pet.name}"> 
                <h4 class="name">${pet.name}</h4>           
                <div class="btn-pet">Learn more</div>     
            </div>
        </a>
    `;
}

// Функция для обновления содержимого карусели
function updateCarousel(cards) {
    // Получаем контейнер для карточек карусели
    const cardsContainer = document.querySelector('.cards');
    // Заменяем содержимое контейнера HTML-кодом карточек
    cardsContainer.innerHTML = cards.map(createPetCard).join('');

    // Прикрепляем обработчики событий к ссылкам на попапы в карточках
    attachModalListeners(); 
}

// Функция для генерации случайного набора карточек
function generateRandomCards(numCards) {
    // Создаем пустой массив для хранения карточек
    let cardsArray = [];
    // Создаем копию массива данных о питомцах, чтобы не изменять исходный массив
    let availablePets = [...petsData]; 
    // Цикл для генерации заданного количества карточек
    for (let i = 0; i < numCards; i++) {
        // Генерируем случайный индекс в массиве availablePets
        const randomIndex = Math.floor(Math.random() * availablePets.length);
        // Добавляем карточку с этим индексом в cardsArray
        cardsArray.push(availablePets[randomIndex]);
        // Удаляем выбранную карточку из availablePets, чтобы избежать повторений
        availablePets.splice(randomIndex, 1); 
    }
    // Возвращаем массив сгенерированных карточек
    return cardsArray;
}

// Функция для обновления содержимого карусели (дубликат, можно удалить)
function updateCarousel(cards) {
    // Получаем контейнер для карточек карусели
    const cardsContainer = document.querySelector('.cards');
    // Заменяем содержимое контейнера HTML-кодом карточек
    cardsContainer.innerHTML = cards.map(createPetCard).join('');

    // Прикрепляем обработчики событий к ссылкам на попапы в карточках
    attachModalListeners(); 
}



// Переменные для карусели
const carouselInner = document.querySelector('.carousel-inner');   // Получаем контейнер карусели
const cardsContainer = document.querySelector('.cards');          // Получаем контейнер для карточек карусели
const leftArrow = document.querySelector('.carousel .btn-round:first-child'); // Получаем кнопку "влево"
const rightArrow = document.querySelector('.carousel .btn-round:last-child');  // Получаем кнопку "вправо"

let currentSlideIndex = 0;                  // Инициализируем индекс текущего слайда (0 - первый слайд)
let cardsPerSlide = 3;                     // Задаем количество карточек на слайде (можно изменить)

let previousSlidesCards = {};              // Создаем объект для хранения сгенерированных карточек для каждого слайда
let lastSlideCards = [];                  // Создаем массив для хранения карточек последнего отображенного слайда

// Функция для генерации набора карточек для каждого слайда карусели
function generateCards(slideIndex) {
    // Создаем пустой массив для хранения карточек текущего слайда
    let cards = [];
    // Создаем копию массива данных о питомцах, чтобы не изменять исходный
    let availablePets = [...petsData]; 

    // Цикл для генерации карточек, пока не наберется нужное количество (cardsPerSlide)
    while (cards.length < cardsPerSlide) {
        // Генерируем случайный индекс в массиве availablePets
        const randomIndex = Math.floor(Math.random() * availablePets.length);
        // Получаем карточку с этим индексом
        const card = availablePets[randomIndex];

        // Проверяем, есть ли карточка в массиве lastSlideCards (была ли она на предыдущем слайде)
        if (!lastSlideCards.includes(card)) {
            // Добавляем карточку в массив карточек текущего слайда
            cards.push(card);
            // Удаляем выбранную карточку из availablePets, чтобы избежать ее повторного выбора на этом слайде
            availablePets.splice(randomIndex, 1); 
        } else {
            // Если карточка уже была на предыдущем слайде, просто удаляем ее из availablePets
            availablePets.splice(randomIndex, 1); 
        }

        // Если availablePets пуст (все карточки были выбраны)
        if (availablePets.length === 0) {
            // Сбрасываем availablePets, чтобы снова выбирать карточки из полного набора
            availablePets = [...petsData];
        }
    }

    // Сохраняем карточки текущего слайда в previousSlidesCards
    previousSlidesCards[slideIndex] = cards;

    // Обновляем lastSlideCards карточками текущего слайда
    lastSlideCards = [...cards];

    // Возвращаем массив сгенерированных карточек
    return cards;
}

// ... (остальной код)

// Инициализация карусели
const initialCards = generateCards(currentSlideIndex);     // Генерируем карточки для начального слайда
updateCarousel(initialCards);                            // Отображаем начальный слайд
previousSlidesCards[currentSlideIndex] = initialCards;    // Сохраняем карточки начального слайда

// Вешаем обработчики на стрелки
leftArrow.addEventListener('click', () => {             // Обработчик клика на кнопку "влево"
    currentSlideIndex = (currentSlideIndex - 1 + petsData.length) % petsData.length; // Вычисляем индекс предыдущего слайда, учитывая цикличность карусели

    // Если карточки для этого слайда еще не сгенерированы, генерируем их
    if (!previousSlidesCards[currentSlideIndex]) {
        previousSlidesCards[currentSlideIndex] = generateCards(currentSlideIndex);
    }

    updateCarousel(previousSlidesCards[currentSlideIndex]); // Отображаем предыдущий слайд
});

rightArrow.addEventListener('click', () => {            // Обработчик клика на кнопку "вправо"
    currentSlideIndex = (currentSlideIndex + 1) % petsData.length; // Вычисляем индекс следующего слайда, учитывая цикличность карусели

    // Если карточки для этого слайда еще не сгенерированы, генерируем их
    if (!previousSlidesCards[currentSlideIndex]) {
        previousSlidesCards[currentSlideIndex] = generateCards(currentSlideIndex);
    }

    updateCarousel(previousSlidesCards[currentSlideIndex]); // Отображаем следующий слайд
});
/*----------------------------------------------- Pages -----------------------------------------------*/