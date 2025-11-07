// ОПОРА - Main JavaScript

// Accordion functionality
function toggleAccordion(index) {
	const items = document.querySelectorAll('.accordion-item');
	const item = items[index];
	if (!item) return;
	
	const content = item.querySelector('.accordion-content');
	const isActive = item.classList.contains('active');
	
	// Close all items
	items.forEach((it, idx) => {
		if (idx !== index) {
			it.classList.remove('active');
			const cont = it.querySelector('.accordion-content');
			if (cont) cont.classList.remove('active');
		}
	});
	
	// Toggle current item
	if (isActive) {
		item.classList.remove('active');
		content.classList.remove('active');
	} else {
		item.classList.add('active');
		content.classList.add('active');
	}
}

// Make function globally available
window.toggleAccordion = toggleAccordion;

document.addEventListener('DOMContentLoaded', () => {
    // Apply theme class for future CSS overrides
    document.body.classList.add('opora-theme');

    // Side navigation dots (placeholder wiring)
    const dots = document.querySelectorAll('.opora-nav-dots button[data-target]');
    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const target = document.querySelector(dot.getAttribute('data-target'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Закрытие модальных окон по клику вне контента
    window.addEventListener('click', (event) => {
        const cityModal = document.getElementById('cityModal');
        if (event.target === cityModal) {
            closeCityModal();
        }
    });

    // Предотвращаем закрытие модального окна при клике на его содержимое
    const modalContent = document.querySelector('#cityModal .modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }
});

// Telegram integration placeholders (to be filled when credentials are provided)
// City selection functionality
function openCitySelect(event) {
    if (event) {
        event.preventDefault();
    }
    const modal = document.getElementById('cityModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
    }
}

function closeCityModal() {
    const modal = document.getElementById('cityModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

function selectCity(cityName) {
    // Update visible city labels in header and menus
    const currentCityElements = document.querySelectorAll('.current-city');
    currentCityElements.forEach(el => el.textContent = cityName);

    // Обновляем активный класс у кнопок городов
    document.querySelectorAll('.city-button').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(cityName));
    });

    // Попытка найти ключ города (cityKey) в глобальном cityData по видимому имени
    try {
        let cityKey = null;
        if (typeof cityData !== 'undefined') {
            const name = (cityName || '').toString().trim();
            for (const key in cityData) {
                if (!cityData.hasOwnProperty(key)) continue;
                const c = cityData[key];
                // Сравниваем по разным полям: geoPlace (именительный), name (инфлексия), а также по ключу
                if ((c.geoPlace && c.geoPlace === name) || (c.name && c.name === name) || key === name.toLowerCase()) {
                    cityKey = key;
                    break;
                }
            }
        }

        // Если нашли соответствие — вызываем общий обработчик смены города для полной подмены контента
        if (cityKey) {
            if (typeof changeCityContent === 'function') {
                changeCityContent(cityKey, null);
            } else if (typeof updateContentForCity === 'function') {
                updateContentForCity(cityKey);
            }
        } else {
            // Если ключ не найден — логируем и просто закрываем модал/меню
            console.warn('selectCity: Не найден cityKey для имени:', cityName);
        }
    } catch (err) {
        console.error('selectCity error mapping cityName -> cityKey', err);
    }

    // Закрываем модальное окно
    closeCityModal();

    // Если открыто мобильное меню, закрываем его
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.style.display === 'block') {
        if (typeof closeMobileMenu === 'function') closeMobileMenu();
    }
}

// Make city functions globally available
window.openCitySelect = openCitySelect;
window.closeCityModal = closeCityModal;
window.selectCity = selectCity;

// Telegram integration placeholders
window.telegramIntegration = {
    sendLead: async function(formPayload) {
        // TODO: implement with bot token/chat id when provided
        return Promise.resolve({ ok: true, mock: true, payload: formPayload });
    },
    publishWebinar: async function(webinarPayload) {
        // TODO: implemented by separate Telegram bot per requirements
        return Promise.resolve({ ok: true, mock: true, payload: webinarPayload });
    }
};


