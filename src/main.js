/**
 * ==========================================================================
 * mega-suite-landing / src/main.js
 * Lógica da Landing Page - Modais de Vídeo e Configuração de Redirecionamento
 * ==========================================================================
 *// BANCO DE DADOS DE VÍDEOS
const VIDEO_DATABASE = {
  main: {
    title: "Mega Suite Lab",
    url: "https://www.youtube.com/embed/iu2qGCbH83g?autoplay=1"
  }
};

// Helper para converter URL padrão/curta do YouTube em formato de embed compatível com iframe
function getEmbedUrl(url) {
  if (!url) return '';
  
  // Se já for link de embed, retorna ele mesmo
  if (url.includes('/embed/')) {
    return url;
  }
  
  // YouTube watch link (youtube.com/watch?v=ID)
  if (url.includes('youtube.com/watch')) {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
    } catch (e) {
      console.error("Erro ao converter URL do YouTube:", e);
    }
  }
  
  // YouTube short link (youtu.be/ID)
  if (url.includes('youtu.be/')) {
    const parts = url.split('youtu.be/');
    const videoId = parts[1]?.split('?')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  }
  
  return url;
}

// 2. ELEMENTOS DO DOM (obtidos ao carregar a página)
let modal = null;
let modalWrapper = null;
let modalTitle = null;

// 3. CONTROLE DO MODAL DE VÍDEO
function openVideoModal(videoId) {
  if (!modal || !modalWrapper) return;

  const videoInfo = VIDEO_DATABASE[videoId];
  
  // Limpa o conteúdo anterior
  modalWrapper.innerHTML = '';

  if (videoInfo && videoInfo.url) {
    const embedUrl = getEmbedUrl(videoInfo.url);
    const isYoutube = embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be') || embedUrl.includes('/embed/');
    
    if (modalTitle) {
      modalTitle.textContent = videoInfo.title;
    }
    
    if (isYoutube) {
      modalWrapper.innerHTML = `
        <iframe 
          src="${embedUrl}" 
          title="${videoInfo.title}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    } else {
      // Caso seja um arquivo MP4 local ou na nuvem
      modalWrapper.innerHTML = `
        <video controls autoplay style="width: 100%; height: 100%; object-fit: contain;">
          <source src="${embedUrl}" type="video/mp4">
          Seu navegador não suporta a tag de vídeo.
        </video>
      `;
    }
  } else {
    // Fallback amigável caso não haja vídeo
    modalWrapper.innerHTML = `
      <div class="modal-video-fallback" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px;">
        <span style="font-size: 48px; margin-bottom: 16px;">🎬</span>
        <h3 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; margin-bottom: 12px; color: #ffffff;">
          Vídeo em Desenvolvimento
        </h3>
        <p style="color: #91c0eb; font-size: 14px; max-width: 500px; line-height: 1.6;">
          Este espaço é o placeholder para a demonstração do módulo <strong>"${videoInfo ? videoInfo.title : videoId}"</strong>.
        </p>
      </div>
    `;
  }

  // Ativa a transição de opacidade e escala no CSS
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Impede o scroll de fundo
}

function closeVideoModal() {
  if (!modal || !modalWrapper) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Devolve o scroll de fundo
  
  // Limpa o iframe para parar o áudio do vídeo tocando ao fundo após a transição
  setTimeout(() => {
    modalWrapper.innerHTML = '';
  }, 300);
}

// Expõe as funções para o escopo global (importante para chamadas do HTML como onclick)
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;

// 4. ATIVAR OS EVENTOS DOS VÍDEOS E OUTROS AJUSTES DE INTERAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa referências do DOM após o carregamento completo do documento
  modal = document.getElementById('videoModal');
  modalWrapper = modal ? modal.querySelector('.modal-video-wrapper') : null;
  modalTitle = document.getElementById('modalTitle');
  
  // Captura cliques no placeholder do vídeo principal da Hero
  const mainVideoPlaceholder = document.querySelector('.video-placeholder');
  if (mainVideoPlaceholder) {
    mainVideoPlaceholder.addEventListener('click', () => {
      const videoId = mainVideoPlaceholder.getAttribute('data-video-id') || 'main';
      openVideoModal(videoId);
    });
  }

  // Fechar o modal ao clicar fora da caixa do container (.modal-overlay)
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeVideoModal();
      }
    });
  }

  // Fechar o modal pressionando a tecla 'ESC'
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeVideoModal();
    }
  });

  // 5. ROLAGEM SUAVE (SMOOTH SCROLL) PARA ANCORAS DO MENU
  const menuLinks = document.querySelectorAll('.nav-link, .btn-secondary[href^="#"]');
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
