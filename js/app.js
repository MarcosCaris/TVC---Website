// Keep track of selected cards
let selectedCards = [];

function toggleCard(glass__server__card) {
	glass__server__card.classList.toggle('selected');

	// Update the selected cards array
	selectedCards = Array.from(document.querySelectorAll('.glass__server__card.selected'));
}

function elegirCartaRandom() {
	const numberOfSelectedCards = selectedCards.length;

	if (numberOfSelectedCards === 0) {
		alert('Please select at least one card.');
		return;
	}

	// Calculate the probability for each card
	const probability = 100 / numberOfSelectedCards;

	// Generate a random number between 0 and 100
	const randomValue = Math.random() * 100;

	// Find the selected card based on the random number
	let selectedCardIndex = Math.floor(randomValue / probability);

	// If the random number is exactly 100, adjust the index
	selectedCardIndex = selectedCardIndex === numberOfSelectedCards ? numberOfSelectedCards - 1 : selectedCardIndex;

	const selectedCard = selectedCards[selectedCardIndex];

	// Simulate a server request (replace this with an actual server request)
	simulateServerRequest(selectedCard);
}

function simulateServerRequest(selectedCard) {
	// Remove the 'selected' class from all server cards
	document.querySelectorAll('.glass__server__card').forEach((card) => {
		card.classList.remove('selected');
		card.classList.remove('chosen');
	});

	// Add the 'selected' and 'chosen' classes to the clicked server card
	selectedCard.classList.add('selected');
	selectedCard.classList.add('chosen');
}
function reiniciarSorteo() {
	document.querySelectorAll('.glass__server__card').forEach((card) => {
		card.classList.remove('selected');
		card.classList.remove('chosen');
	});
}

let observador = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		console.log(entry);
		if (entry.isIntersecting) {
			entry.target.classList.add('mostrar');
		} else {
			entry.target.classList.remove('mostrar');
		}
	});
});

let cartasAnimacion = document.querySelectorAll('.oculto');
cartasAnimacion.forEach((el) => observador.observe(el));

function ScrollToServidores() {
	const targetSection = document.getElementById('tp__servidores');
	const sectionStart = targetSection.offsetTop;

	// Adjust the scroll position to be a little higher, e.g., subtracting 20 pixels
	const scrollPosition = sectionStart - 310;

	window.scrollTo({
		top: scrollPosition,
		behavior: 'smooth',
	});
}

document.addEventListener('DOMContentLoaded', function () {
	const cards = document.querySelectorAll('.mejora__carta');
	const pickedCardsContainer = document.getElementById('pickedCardsContainer');
	const ultimaSeleccionCarta = document.getElementById('ultima__seleccion__carta');

	let lastSelectedCard = null;

	// Shuffle the cards
	const shuffledCards = Array.from(cards).sort(() => Math.random() - 0.5);

	// Add click event listeners to each card
	cards.forEach((card) => {
		card.addEventListener('click', () => revealCard(card));
	});

	function revealCard(card) {
		const cardId = card.id;

		// Clone the selected card
		const pickedCard = card.cloneNode(true);

		pickedCardsContainer.insertBefore(pickedCard, pickedCardsContainer.firstChild);

		lastSelectedCard = pickedCard;

		// Display the entire last selected card in ultima__seleccion__carta
		ultimaSeleccionCarta.innerHTML = ''; // Clear previous content
		if (lastSelectedCard) {
			const lastSelectedCardClone = lastSelectedCard.cloneNode(true);
			ultimaSeleccionCarta.appendChild(lastSelectedCardClone);
		}

		// Remove the selected card from the pool
		card.style.display = 'none';

		// Check if all cards are picked
		if (document.querySelectorAll('.mejora__carta:visible').length === 0) {
			alert('All cards have been picked!');
		}
	}
});
