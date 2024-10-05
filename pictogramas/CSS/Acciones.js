function narrate(text) {
  // Crear una instancia del objeto SpeechSynthesisUtterance
  let utterance = new SpeechSynthesisUtterance(text);
  
  // Establecer el idioma en español
  utterance.lang = 'es-ES';
  
  // Ajustar velocidad, tono y volumen para una narración más natural
  utterance.rate = 1;   // Velocidad normal
  utterance.pitch = 1.1; // Ligero aumento en el tono para sonar más animado
  utterance.volume = 0.9; // Volumen ligeramente ajustado

  // Buscar una voz más natural disponible en el sistema
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find(voice => voice.lang === 'es-ES' && (voice.name.includes('Microsoft') || voice.name.includes('Google'))) || voices[0]; 
  if (selectedVoice) {
    utterance.voice = selectedVoice; // Usar la voz seleccionada si está disponible
  }

  // Iniciar la narración
  window.speechSynthesis.speak(utterance);
}

