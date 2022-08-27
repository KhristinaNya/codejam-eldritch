import blueCards from './blueCards.js';
import yellowCards from './yellowCards.js';
import greenCards from './greenCards.js';
import ancientsData from './ancients.js';
import difficulties from './difficulties.js';

document.addEventListener("DOMContentLoaded", async () => {
    const body = document.querySelector('body');
    const btnStart = document.querySelector('.start-menu .btn');
    const ancients = document.querySelector('.ancients-cards');
    const imgCards = document.querySelectorAll('.img-cards img');
    const lvlCards = document.querySelectorAll('.lvl-card div');
    const shuffle = document.querySelector('.shuffle');
    const deckCards = document.querySelector('.cards-deck');
    const prev = document.querySelector('.prev');
    const dot = document.querySelectorAll('.dot');
    const nameLvl = document.querySelector('.lvl-name span');

    let numAncient = 0;
    let numLvl = 0;

    const ancientCurrent = ancientsData[0];

    const cardsSumSameColor = {
        'greenCards': 0,
        'yellowCards': 0,
        'blueCards': 0,
    }
    const deckOfCard = [
        {
            'name': 'greenCards',
            'cardsImgName': [],
            'cardsImgNotTake': [],
            'allImage': greenCards,
        },
        {
            'name': 'yellowCards',
            'cardsImgName': [],
            'cardsImgNotTake': [],
            'allImage': yellowCards,
        },
        {
            'name': 'blueCards',
            'cardsImgName': [],
            'cardsImgNotTake': [],
            'allImage': blueCards,
        }
    ]

    //стартовая кнопка
    btnStart.addEventListener('click', (event) => {
        btnStart.classList.add('click');
        ancients.classList.remove('hidden');
        body.style.alignItems = 'center';
    });

    // выбор картинки древнего
    imgCards.forEach((element, index) => {
        element.addEventListener('click', (event) => {
            numAncient = index;
            selectImg();
        });
    })

    function selectImg() {
        imgCards.forEach((event, index) => {
            if (index === numAncient) {
                event.classList.add('active');
            }
            else {
                event.classList.remove('active');
            }
        })
    }

    //выбор уровня
    lvlCards.forEach((element, index) => {
        element.addEventListener('click', (event) => {
            numLvl = index;
            selectLvl();
        });
    })

    function setBg(nameImg) {
        const img = new Image();
        img.src = `../assets/img/${nameImg}.jpg`;
        img.onload = () => {
            body.style.backgroundImage = `url('../assets/img/${nameImg}.jpg')`;
        };
    }

    function selectLvl() {
        lvlCards.forEach((event, index) => {
            if (index === numLvl) {
                event.classList.add('active');
            }
            else {
                event.classList.remove('active');
            }
        })
    }

    const getNumberOfCards = () => {
        dot.forEach((element, index) => {
            const nameColor = element.className.split(' ')[1] + 'Cards';
            const stageDots = Math.floor(index / 3);
            const nameStage = (stageDots === 0 ? 'first' : stageDots === 1 ? 'second' : 'third') + 'Stage';
            element.innerText = ancientCurrent[nameStage][nameColor];
        });
    };

    //вернуться назад
    const clearDeckOfCard = () => {
        Object.keys(cardsSumSameColor).forEach(key => cardsSumSameColor[key] = 0);
        deckOfCard.forEach(elemenet => {
            elemenet['cardsImgName'] = [];
            elemenet['cardsImgNotTake'] = [];
        });
    };

    prev.addEventListener('click', (event) => {
        ancients.classList.remove('hidden');
        deckCards.classList.add('hidden');
        body.style.alignItems = 'center';

        setBg('eldritch-horror-banner');
        clearDeckOfCard();
    });

    //Создание колоды
    //сумма всех карт
    const getCardsCounter = () => {
        Object.keys(ancientsData[numAncient])
            .forEach(keys => {
                ancientCurrent[keys] = ancientsData[numAncient][keys];
            });

        for (let element in ancientCurrent) {
            if (typeof ancientCurrent === 'object') {
                Object.keys(ancientCurrent[element]).forEach(key => {
                    if (key in cardsSumSameColor) {
                        cardsSumSameColor[key] += ancientCurrent[element][key];
                    }
                });
            }
        }
    }

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    };

    const getRandomNameCard = (min, max, array, array2, name) => {
        const nameImg = name + getRandomNumber(min, max);
        return (array.indexOf(nameImg) >= 0 && array2.indexOf(nameImg) >= 0) ? getRandomNameCard(min, max, array, array2, name) : nameImg;
    };

    const getNameDeckOfCard = () => {
        deckOfCard.forEach((element, index) => {
            let numberImage = cardsSumSameColor[element['name']];
            [...Array(numberImage)].forEach(item => element['cardsImgName'].push(getRandomNameCard(1, numberImage, element['cardsImgName'], element['cardsImgNotTake'], element['name'])));
        });
        console.log(deckOfCard)
    }

    const getCurrentCard = () => {
        
        Object.keys(ancientCurrent[element]).forEach(key => {

        });
    }

    //Старт окна
    const getStartWindowsDeckOfCard = () => {
        ancients.classList.add('hidden');
        deckCards.classList.remove('hidden');

        getCardsCounter();
        getNumberOfCards();
        setBg(ancientCurrent['name']);

        nameLvl.innerText = difficulties[numLvl]['name'];
        body.style.alignItems = 'start';
    };

    shuffle.addEventListener('click', (event) => { getStartWindowsDeckOfCard(); getNameDeckOfCard(); });

})