// Получаем в переменную все объекты с классом popup-link
const popupLinks = document.querySelectorAll(".popup-link");

// Переменная unlock по умолчанию true
let unlock = true;

// Переменная timeout используется для задержки перед разблокировкой ссылки (unlock = true)
const timeout = 700;

// Функция для прикрепления обработчиков событий к модальным ссылкам
function attachModalListeners() {
    const popupLinks = document.querySelectorAll(".popup-link");
    if (popupLinks.length > 0) {
        for (let i = 0; i < popupLinks.length; i++) {
            const popupLink = popupLinks[i];
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
        el.addEventListener("click", function (e) {
            // Вызываем функцию popupClose для закрытия попапа
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
            document.body.style.overflowY = "auto"; 
          }
        };
  
        requestAnimationFrame(step);
      };
      animatePadding();
    }
  }



/*----------------------------------------------- Pages -----------------------------------------------*/




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

function createPetCard(pet) {
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

// Получаем контейнер для карточек питомцев
const cardsContainer = document.querySelector(".cards");
// Получаем все кнопки пагинации
const pageButtons = document.querySelectorAll(".page-buttons button");
// Создаем пустой массив для хранения данных о питомцах
let petsArray = [];
// Устанавливаем текущую страницу на 1
let currentPage = 1;
// Устанавливаем количество страниц на 6 (для разрешения 1280px)
let pagesCount = 6;

// Функция для получения случайного целого числа в заданном диапазоне
function getRandomInt(min, max) {
  // Возвращаем случайное целое число от min до max (включительно)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для перемешивания массива (алгоритм Фишера-Йетса)
function shuffle(array) {
  // Проходим по массиву с конца до начала
  for (let i = array.length - 1; i > 0; i--) {
    // Генерируем случайный индекс от 0 до i (включительно)
    const j = Math.floor(Math.random() * (i + 1));
    // Меняем местами элементы с индексами i и j
    [array[i], array[j]] = [array[j], array[i]];
  }
  // Возвращаем перемешанный массив
  return array;
}

// Функция для создания массива питомцев для всех страниц без повторений на одной странице
function generatePetsArray() {
  // Создаем пустой массив для хранения данных
  const tempArray = [];
  // Цикл по всем страницам
  for (let page = 0; page < pagesCount; page++) {
    // Перемешиваем массив petsData для каждой страницы, создавая его копию
    const shuffledPets = shuffle([...petsData]);
    // Добавляем перемешанные питомцы в общий массив
    tempArray.push(...shuffledPets);
  }
  // Возвращаем массив со всеми питомцами
  return tempArray;
}

// Функция для отображения карточек питомцев на текущей странице
function displayPets() {
  // Вычисляем индекс первого питомца на текущей странице
  const startIndex = (currentPage - 1) * 8;
  // Вычисляем индекс последнего питомца на текущей странице
  const endIndex = startIndex + 8;
  // Получаем массив питомцев для отображения на текущей странице
  const petsToDisplay = petsArray.slice(startIndex, endIndex);

  // Очищаем контейнер для карточек
  cardsContainer.innerHTML = "";

  // Проходим по массиву питомцев для отображения
  petsToDisplay.forEach(pet => {
    // Создаем HTML-код карточки питомца
    const cardHTML = createPetCard(pet);
    // Добавляем HTML-код карточки в контейнер
    cardsContainer.innerHTML += cardHTML;
  });
  attachModalListeners(); 
}

// Функция для обновления пагинации
function updatePagination() {
  // Обновляем количество страниц в зависимости от ширины экрана
  pagesCount = window.innerWidth >= 1280 ? 6 : window.innerWidth >= 768 ? 8 : 16;

  // Делаем кнопки "<<" и "<" недоступными, если это первая страница
  pageButtons[0].disabled = currentPage === 1;
  pageButtons[1].disabled = currentPage === 1;
  // Делаем кнопки ">" и ">>" недоступными, если это последняя страница
  pageButtons[3].disabled = currentPage === pagesCount;
  pageButtons[4].disabled = currentPage === pagesCount;

  // Обновляем номер текущей страницы
  pageButtons[2].textContent = currentPage;

  // Обновляем классы кнопок пагинации
  pageButtons.forEach(button => {
    // Удаляем все классы у кнопки
    button.classList.remove("btn-current-page", "btn-inaccessible-page", "btn-for-pages");
    // Получаем элемент с текстом внутри кнопки
    const textElement = button.querySelector("span");
  
    // Добавляем классы кнопке и тексту в зависимости от состояния
    if (button.disabled) {
      
      textElement.classList.remove("h4-for-page"); // Удаляем класс черного текста (если был)
      textElement.classList.add("h4-page-buttons"); // Серый текст для неактивных
      button.classList.add("btn-inaccessible-page");
    } else if (button.textContent === currentPage.toString()) {
      button.classList.add("btn-current-page");
    } else {
      button.classList.add("btn-for-pages");
     textElement.classList.remove("h4-page-buttons"); // Удаляем класс серого текста (если был)
      textElement.classList.add("h4-for-page"); // Черный текст для остальных
    }
  });
}
// Функция для обработки клика по кнопкам пагинации
function handlePageButtonClick(event) {
  // Получаем кнопку, по которой был клик
  const button = event.target;
  // Обновляем текущую страницу в зависимости от текста на кнопке
  if (button.textContent === "<<") {
    currentPage = 1;
  } else if (button.textContent === "<") {
    currentPage--;
  } else if (button.textContent === ">") {
    currentPage++;
  } else if (button.textContent === ">>") {
    currentPage = pagesCount;
  } else {
    currentPage = parseInt(button.textContent);
  }
  // Отображаем питомцев на новой странице
  displayPets();
  // Обновляем пагинацию
  updatePagination();
}

// Добавляем обработчик клика для каждой кнопки пагинации
pageButtons.forEach(button => {
  button.addEventListener("click", handlePageButtonClick);
});

// Инициализация страницы:
petsArray = generatePetsArray();
displayPets();
updatePagination();
attachModalListeners(); // !!! Добавляем вызов функции после инициализации страницы

// Обработчик события изменения размера окна
window.addEventListener("resize", () => {
  updatePagination();
  displayPets(); 
});