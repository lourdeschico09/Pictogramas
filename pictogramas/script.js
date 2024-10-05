// Hacer que las caras sean arrastrables
let faces = document.querySelectorAll('.face');
faces.forEach(face => {
  face.addEventListener('dragstart', dragStart);
});

// Hacer que las emociones sean destinos donde soltar
let emotions = document.querySelectorAll('.emotion');
emotions.forEach(emotion => {
  emotion.addEventListener('dragover', dragOver);
  emotion.addEventListener('drop', drop);
});

// Agregar evento al botón de reiniciar
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);

function dragStart(event) {
  event.dataTransfer.setData('text', event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  let faceId = event.dataTransfer.getData('text');
  let draggedElement = document.getElementById(faceId);
  
  // Validar emparejamiento correcto
  if ((event.target.id === 'felicidad' && faceId === 'cara-feliz') ||
      (event.target.id === 'tristeza' && faceId === 'cara-triste') ||
      (event.target.id === 'enojo' && faceId === 'cara-enojo')) {
    event.target.style.backgroundColor = '#a8e6cf'; // Indicar éxito visualmente
    draggedElement.remove(); // Remover la cara una vez emparejada
    document.getElementById('resultado').textContent = '¡Correcto!';
  } else {
    document.getElementById('resultado').textContent = 'Inténtalo de nuevo';
  }
}

function reiniciarJuego() {
  // Reiniciar la visualización de las caras (reagregar al DOM si es necesario)
  faces.forEach(face => {
    // Suponiendo que tienes un contenedor donde agregas las caras
    document.getElementById('contenedor-caras').appendChild(face);
    face.style.display = 'block'; // Mostrar las caras nuevamente
  });
  
  // Restablecer el fondo de las emociones
  emotions.forEach(emotion => {
    emotion.style.backgroundColor = ''; // Limpiar el fondo
  });

  // Restablecer el resultado
  document.getElementById('resultado').textContent = '';
}
