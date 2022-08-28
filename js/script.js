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
    const deckImg = document.querySelector('.deckImg');

    let numAncient = 0;
    let numLvl = 0;
    let currentStage = 0;
    let numbersCars = 0;

    const ancientCurrent = {
        firstStage: {
            greenCards: 1,
            yellowCards: 2,
            blueCards: 1,
        },
        secondStage: {
            greenCards: 3,
            yellowCards: 2,
            blueCards: 1,
        },
        thirdStage: {
            greenCards: 2,
            yellowCards: 4,
            blueCards: 0,
        }
    };

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
            'neededImage': [],
            'color': 'green',
            'numbers': 18,
        },
        {
            'name': 'yellowCards',
            'cardsImgName': [],
            'cardsImgNotTake': [],
            'allImage': yellowCards,
            'neededImage': [],
            'color': 'yellow',
            'numbers': 21,
        },
        {
            'name': 'blueCards',
            'cardsImgName': [],
            'cardsImgNotTake': [],
            'allImage': blueCards,
            'neededImage': [],
            'color': 'blue',
            'numbers': 12,
        }
    ]
    //стартовая кнопка
    btnStart.addEventListener('click', (event) => {
        btnStart.classList.add('click');
        ancients.classList.remove('hidden');
        body.style.alignItems = 'center';
        imgCards[0].classList.add('active');
        lvlCards[0].classList.add('active');
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
            selectNameLvl();
        });
    })

    const selectNameLvl = () => {
        lvlCards.forEach((event, index) => {
            if (index === numLvl) {
                event.classList.add('active');
            }
            else {
                event.classList.remove('active');
            }
        })
    }

    const selectLvlImage = (image) => {
        let arrCardsImage = [];
        let numbersColor = cardsSumSameColor[image[0]['color'] + 'Cards'];
        let lenArrImage = 0;

        switch (numLvl) {
            case 0:
                image.forEach(element => {
                    if (element['difficulty'] === 'easy') {
                        arrCardsImage.push(element['id']);
                    }
                });
                break;
            case 1:
                image.forEach(element => {
                    if (element['difficulty'] === 'easy' || element['difficulty'] === 'normal') {
                        arrCardsImage.push(element['id']);
                    }
                });
                break;
            case 2:
                image.forEach(element => {
                    arrCardsImage.push(element['id']);
                });
                break;
            case 3:
                image.forEach(element => {
                    if (element['difficulty'] !== 'easy') {
                        arrCardsImage.push(element['id']);
                    }
                });
                break;
            case 4:
                image.forEach(element => {
                    if (element['difficulty'] === 'hard') {
                        arrCardsImage.push(element['id']);
                    }
                });
                break;
        }
        lenArrImage = arrCardsImage.length;
        if (lenArrImage < numbersColor) {
            for (let obj of image) {
                if (lenArrImage === numbersColor) {
                    break;
                }
                if (obj['difficulty'] === 'normal') {
                    arrCardsImage.push(obj['id']);
                    lenArrImage += 1;
                }
            }
        }

        return arrCardsImage;
    }



    function setBg(nameImg) {
        const img = new Image();
        img.src = `assets/img/${nameImg}.jpg`;
        img.onload = () => {
            body.style.backgroundImage = `url('assets/img/${nameImg}.jpg')`;
        };
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
            elemenet['neededImage'] = [];
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
        Object.keys(ancientsData[numAncient]).forEach(keys => {
            if (keys in ancientCurrent) {
                Object.assign(ancientCurrent[keys], ancientsData[numAncient][keys]);
                Object.keys(ancientCurrent[keys]).forEach(item => cardsSumSameColor[item] += ancientCurrent[keys][item]);
            }
        });
        //ancientCurrent.forEach(element => Object.keys(ancientCurrent[element]).forEach(item => cardsSumSameColor[item] += ancientCurrent[element][item]));
    }

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    };

    const getRandomNameCard = (min, max, arrayUse, array, name) => {
        const nameImg = name + getRandomNumber(min, max);
        return (array.indexOf(nameImg) >= 0) ? getRandomNameCard(min, max, arrayUse, array,name) :
            (arrayUse.indexOf(nameImg) < 0 ? getRandomNameCard(min, max, arrayUse, array, name) : nameImg);
    };

    const getNameDeckOfCard = () => {
        deckOfCard.forEach((element) => {
            element['neededImage'] = selectLvlImage(element['allImage']);
            let numberImage = element['numbers'];
            [...Array(cardsSumSameColor[element['name']])].forEach(item => {
                element['cardsImgName'].push(getRandomNameCard(1, numberImage, element['neededImage'], element['cardsImgName'], element['color']))
                numbersCars += 1;
            });
        });
    }

    function setImageCard(nameImg) {
        const img = new Image();
        img.src = `assets/MythicCards/${nameImg}.png`;
        img.onload = () => {
            deckImg.src = `assets/MythicCards/${nameImg}.png`;
        };
    }

    const getRandomCardColor = () => {
        const randomNumer = getRandomNumber(0, 2);
        const currentStageName = Object.keys(ancientCurrent)[currentStage];
        const currentColor = Object.keys(ancientCurrent[currentStageName])[randomNumer];
        let nameImg = '';
        if (ancientCurrent[currentStageName][currentColor] === 0) {
            getRandomCardColor();
        }
        else {
            ancientCurrent[currentStageName][currentColor] -= 1;
            getNumberOfCards();
            deckOfCard.forEach(element => {
                if (element['name'] === currentColor) {
                    nameImg = getRandomNameCard(1, element['numbers'], element['neededImage'], element['cardsImgNotTake'], element['color']);
                    element['cardsImgNotTake'].push(nameImg);
                    nameImg = element['color'] + '/' + nameImg;
                }
            })
            numbersCars -= 1;
            setImageCard(nameImg);
        }
    }

    const getCurrentCard = () => {
        currentStage = 0;
        for (let key in ancientCurrent) {
            if (Object.values(ancientCurrent[key]).reduce((a, b) => a + b, 0) > 0) {
                break;
            }
            currentStage += 1;
        }
        if (numbersCars > 0) {
            getRandomCardColor();
        }
    }

    //Клик по картинке 
    deckImg.addEventListener('click', (event) => {
        getCurrentCard();
    })

    //Старт окна
    const getStartWindowsDeckOfCard = () => {
        ancients.classList.add('hidden');
        deckCards.classList.remove('hidden');

        getCardsCounter();
        getNumberOfCards();
        setBg(ancientsData[numAncient]['name']);

        nameLvl.innerText = difficulties[numLvl]['name'];
        body.style.alignItems = 'start';
        deckImg.src = `assets/img/${ancientsData[numAncient]['name']}.png`;
    };

    shuffle.addEventListener('click', (event) => { getStartWindowsDeckOfCard(); getNameDeckOfCard(); });

})