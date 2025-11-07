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
});

// Telegram integration placeholders (to be filled when credentials are provided)
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


