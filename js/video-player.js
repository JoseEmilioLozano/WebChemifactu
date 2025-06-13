// Script para asegurar la correcta reproducción del video
document.addEventListener('DOMContentLoaded', function() {
    // Referencia al contenedor del video
    const videoContainer = document.querySelector('.video-responsive');
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (videoPlaceholder) {
        // Crear un botón de reproducción más visible
        const playButton = document.createElement('div');
        playButton.className = 'play-button-large';
        playButton.innerHTML = '<i class="fas fa-play-circle"></i>';
        playButton.style.position = 'absolute';
        playButton.style.top = '50%';
        playButton.style.left = '50%';
        playButton.style.transform = 'translate(-50%, -50%)';
        playButton.style.fontSize = '80px';
        playButton.style.color = '#0056B3';
        playButton.style.cursor = 'pointer';
        playButton.style.zIndex = '10';
        playButton.style.opacity = '0.9';
        playButton.style.transition = 'all 0.3s ease';
        
        // Añadir efecto hover
        playButton.addEventListener('mouseover', function() {
            this.style.opacity = '1';
            this.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        
        playButton.addEventListener('mouseout', function() {
            this.style.opacity = '0.9';
            this.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Añadir el botón al placeholder
        videoPlaceholder.style.position = 'relative';
        videoPlaceholder.appendChild(playButton);
        
        // Función para reproducir el video
        function playVideo() {
            // Crear elemento de video con controles
            const videoElement = document.createElement('video');
            videoElement.controls = true;
            videoElement.autoplay = true;
            videoElement.width = '100%';
            videoElement.style.borderRadius = '8px';
            videoElement.poster = 'videos/escena1_intro.png';
            
            // Añadir múltiples fuentes para compatibilidad
            const sourceMP4 = document.createElement('source');
            sourceMP4.src = 'videos/escena1_intro.png'; // Temporalmente usamos una imagen como placeholder
            sourceMP4.type = 'video/mp4';
            
            // Mensaje de fallback
            videoElement.innerHTML = 'Su navegador no soporta la reproducción de videos.';
            
            // Añadir fuentes al video
            videoElement.appendChild(sourceMP4);
            
            // Reemplazar placeholder con video
            if (videoContainer) {
                videoContainer.innerHTML = '';
                videoContainer.appendChild(videoElement);
                
                // Simular reproducción con secuencia de imágenes
                let currentScene = 1;
                const totalScenes = 7;
                const sceneInterval = setInterval(() => {
                    currentScene++;
                    if (currentScene <= totalScenes) {
                        videoElement.poster = `videos/escena${currentScene}_${getSceneName(currentScene)}.png`;
                    } else {
                        clearInterval(sceneInterval);
                        // Volver a la primera escena al finalizar
                        setTimeout(() => {
                            videoElement.poster = 'videos/escena1_intro.png';
                        }, 2000);
                    }
                }, 3000); // Cambiar cada 3 segundos
            }
        }
        
        // Función para obtener el nombre de la escena
        function getSceneName(sceneNumber) {
            const sceneNames = [
                'intro',
                'problema',
                'solucion',
                'funcionamiento',
                'beneficios',
                'implementacion',
                'cierre'
            ];
            return sceneNames[sceneNumber - 1];
        }
        
        // Añadir evento de clic para reproducir
        playButton.addEventListener('click', playVideo);
        videoPlaceholder.addEventListener('click', function(e) {
            // Solo reproducir si se hace clic fuera del botón
            if (e.target !== playButton && !playButton.contains(e.target)) {
                playVideo();
            }
        });
    }
});
