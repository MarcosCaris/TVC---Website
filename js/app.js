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
	const cartas = document.querySelectorAll('.mejora__carta');
	const contenedorCartasSeleccionadas = document.getElementById('pickedCardsContainer');
	const contenedorUltimaSeleccion = document.getElementById('ultima__seleccion__carta');
	const botonMezclar = document.getElementById('shuffleButton');

	let ultimaCartaSeleccionada = null;
	let cartasRestantes = Array.from(cartas);

	// Mezclar y distribuir las cartas inicialmente
	mezclarCartas();

	// Agregar reconocedor de eventos de click a cada carta
	cartas.forEach((carta) => {
		carta.addEventListener('click', () => revelarCarta(carta));
	});

	// Agregar reconocedor de eventos de clic al botón de mezclar
	botonMezclar.addEventListener('click', mezclarCartasRestantes);

	function revelarCarta(carta) {
		// Clonar el div de la carta seleccionada
		const cartaSeleccionada = carta.cloneNode(true);

		// Mostrar la carta clonada en el contenedor de cartas seleccionadas
		contenedorCartasSeleccionadas.insertBefore(cartaSeleccionada, contenedorCartasSeleccionadas.firstChild);

		// Actualizar la última carta seleccionada
		ultimaCartaSeleccionada = cartaSeleccionada;

		// Mostrar toda la última carta seleccionada en el contenedor de última selección
		contenedorUltimaSeleccion.innerHTML = ''; // Limpiar contenido anterior
		if (ultimaCartaSeleccionada) {
			const ultimaCartaSeleccionadaClon = ultimaCartaSeleccionada.cloneNode(true);
			contenedorUltimaSeleccion.appendChild(ultimaCartaSeleccionadaClon);
		}

		// Quitar la carta seleccionada del grupo restante
		cartasRestantes = cartasRestantes.filter((c) => c !== carta);
		carta.parentElement.removeChild(carta);
	}

	function mezclarCartasRestantes() {
		// Mezclar solo las cartas restantes
		const cartasRestantesMezcladas = cartasRestantes.sort(() => Math.random() - 0.5);

		// Distribuir las cartas restantes mezcladas entre los contenedores, con un máximo de 5 cartas cada uno
		const contenedores = document.querySelectorAll('.container__superior, .container__inferior, .container__final');
		contenedores.forEach((contenedor, index) => {
			contenedor.innerHTML = ''; // Limpiar contenido anterior
			const cartasEnContenedor = cartasRestantesMezcladas.slice(index * 5, (index + 1) * 5);
			cartasEnContenedor.forEach((carta) => {
				contenedor.appendChild(carta);
			});
		});
	}

	function mezclarCartas() {
		// Mezclar todas las cartas inicialmente
		const cartasMezcladas = Array.from(cartas).sort(() => Math.random() - 0.5);

		// Distribuir las cartas mezcladas entre los contenedores, con un máximo de 5 cartas cada uno
		const contenedores = document.querySelectorAll('.container__superior, .container__inferior, .container__final');
		contenedores.forEach((contenedor, index) => {
			contenedor.innerHTML = ''; // Limpiar contenido anterior
			const cartasEnContenedor = cartasMezcladas.slice(index * 5, (index + 1) * 5);
			cartasEnContenedor.forEach((carta) => {
				contenedor.appendChild(carta);
			});
		});

		// Actualizar las cartas restantes después de la mezcla inicial
		cartasRestantes = Array.from(cartas);
	}
});
function ScrollToCartas() {
	const targetSection = document.getElementById('tp__cartas');
	const sectionStart = targetSection.offsetTop;

	// Adjust the scroll position to be a little higher, e.g., subtracting 20 pixels
	const scrollPosition = sectionStart - 150;

	window.scrollTo({
		top: scrollPosition,
		behavior: 'smooth',
	});
}
