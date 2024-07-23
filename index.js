// import './css/style.css';
// import './css/mobile/mobile-style.css'
// import './css/pen/style.css';
// import './css/shapes/style.css';
// import './css/3D-shapes/style.css';
// import './css/square/style.css';


// import './js/app';

const menuShapes = document.querySelector('.btn.shapes');
const itemListFocus = document.querySelectorAll('.sub-tool-panel__item-list');

document.querySelectorAll('.sub-tool-panel__item-list').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.square').forEach(i => {
            i.style.display = 'block';
        })
    });
})

document.querySelector('.menu-text').addEventListener('click', () => {
    document.querySelector('.text').style.display = 'block';
})

document.querySelector('.menu-text').addEventListener('click', () => {
    let textLink = document.createElement('link');
    textLink.id = 'textLink';
    textLink.rel = 'stylesheet';
    textLink.href = './css/text/style.css';
    document.head.appendChild(textLink);
});

// для отрисовки квадрата, необходим допил через код

itemListFocus.forEach(item => {
    item.addEventListener('click', () => {
        let squareLink = document.createElement('link');
        squareLink.id = 'squareLink';
        squareLink.rel = 'stylesheet';
        squareLink.href = './css/square/style.css';
        document.head.appendChild(squareLink);
    })
})

// задержка 4 сек и добавляется в контакт-панель еще одна кнопка с заданием

setTimeout(() => {
    let correctTaskLink = document.createElement('link');
    correctTaskLink.id = 'correctTaskLink';
    correctTaskLink.rel = 'stylesheet';
    correctTaskLink.href = './css/contact-panel/task-panel/style-correct.css';
    document.head.appendChild(correctTaskLink);
}, 4000);

// для всех иконок при выпадении из кнопки "отправить задание" переключаем цвет кнопки отправить на синий

const teachersItem = document.querySelectorAll('.task__send-teachers-item');
teachersItem.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.btn-task__send').style.background = '#1043C7';
        document.querySelector('.btn-task__send').style.color = '#FFFFFF';
    })
})

// отображение нового задания

setTimeout(() => {
    const Newlabel = document.querySelector('.new-label'); 
    Newlabel.style.display = 'flex';
}, 4000);

const NewTask = document.querySelector('.new-task');
const btnTask = document.querySelector('.btn.task')

btnTask.addEventListener('click', () => {
    if (NewTask.style.display === 'flex') {
        NewTask.style.display = 'none';
    } else {
        NewTask.style.display = 'flex';
    }
})

// скролл
function setupCustomScrollbar(listSelector, scrollbarSelector, scrollThumbSelector) {
    const list = document.querySelector(listSelector);
    const customScroll = document.querySelector(scrollThumbSelector);
    const customScrollbar = document.querySelector(scrollbarSelector);

    if (!list || !customScroll || !customScrollbar) {
        console.error('One or more elements not found:', { list, customScroll, customScrollbar });
        return;
    }

    let isDragging = false;
    let startY;
    let startTop;
    let isScrolling = false;

    const updateScrollPosition = () => {
        const scrollRatio = list.scrollTop / (list.scrollHeight - list.clientHeight);
        const topPosition = scrollRatio * (customScrollbar.clientHeight - customScroll.clientHeight);
        customScroll.style.top = `${topPosition}px`;
    };

    const onScroll = () => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                updateScrollPosition();
                isScrolling = false;
            });
        }
    };

    list.addEventListener('scroll', onScroll);

    customScroll.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY;
        startTop = customScroll.offsetTop;
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.userSelect = 'auto';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaY = e.clientY - startY;
            let newTop = startTop + deltaY;
            newTop = Math.max(0, Math.min(newTop, customScrollbar.clientHeight - customScroll.clientHeight));
            customScroll.style.top = `${newTop}px`;

            const scrollRatio = newTop / (customScrollbar.clientHeight - customScroll.clientHeight);
            list.scrollTop = scrollRatio * (list.scrollHeight - list.clientHeight);
        }
    });

    list.addEventListener('wheel', (e) => {
        e.preventDefault();
        list.scrollTop += e.deltaY;
        onScroll();
    });

    updateScrollPosition();
}

document.addEventListener('DOMContentLoaded', function () {
    setupCustomScrollbar('.sub-tool-panel__list', '.sub-tool-panel__base-scroll', '.sub-tool-panel__scroll');
    setupCustomScrollbar('.sub-tool-panel__3D-shapes-list', '.sub-tool-panel-3D-shapes .sub-tool-panel__base-scroll', '.sub-tool-panel-3D-shapes .sub-tool-panel__scroll');
});