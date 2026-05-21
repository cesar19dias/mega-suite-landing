/**
 * ==========================================================================
 * mega-suite-landing / src/main.js
 * Lógica da Landing Page - Modais de Vídeo e Configuração de Redirecionamento
 * ==========================================================================
 */

// 1. BANCO DE DADOS DE VÍDEOS (INSIRA SEUS LINKS DE GRAVAÇÕES AQUI)
// Você pode usar links do YouTube (formato embed), Vimeo, ou caminhos para arquivos MP4 locais
const VIDEO_DATABASE = {
  main: {
    title: "Apresentação do Mega Suite Lab",
    // Substitua pelo seu link de embed do YouTube ou arquivo local:
    // Exemplo de YouTube: "https://www.youtube.com/embed/SEU_VIDEO_ID?autoplay=1"
    url: "" 
  },
  medidas: {
    title: "Demonstração - Mega Medidas",
    url: ""
  },
  letreiros: {
    title: "Demonstração - Mega Letreiros",
    url: ""
  },
  design: {
    title: "Demonstração - Mega Design",
    url: ""
  },
  fontes: {
    title: "Demonstração - Mega Fontes",
    url: ""
  }
};

// 2. ELEMENTOS DO DOM
const modal = document.getElementById('video-modal');
const modalWrapper = modal ? modal.querySelector('.modal-video-wrapper') : null;
const modalClose = modal ? modal.querySelector('.modal-close') : null;

// 3. CONTROLE DO MODAL DE VÍDEO
function openVideoModal(videoId) {
  if (!modal || !modalWrapper) return;

  const videoInfo = VIDEO_DATABASE[videoId];
  
  // Limpa o conteúdo anterior
  modalWrapper.innerHTML = '';

  if (videoInfo && videoInfo.url) {
    // Se houver um link de vídeo configurado, renderiza o iframe ou tag de vídeo
    const isYoutube = videoInfo.url.includes('youtube.com') || videoInfo.url.includes('youtu.be');
    
    if (isYoutube) {
      modalWrapper.innerHTML = `
        <iframe 
          src="${videoInfo.url}" 
          title="${videoInfo.title}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    } else {
      // Caso seja um arquivo MP4 local ou na nuvem
      modalWrapper.innerHTML = `
        <video controls autoplay>
          <source src="${videoInfo.url}" type="video/mp4">
          Seu navegador não suporta a tag de vídeo.
        </video>
      `;
    }
  } else {
    // Fallback amigável caso o usuário ainda não tenha gravado/colocado o vídeo
    modalWrapper.innerHTML = `
      <div class="modal-video-fallback" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px;">
        <span style="font-size: 48px; margin-bottom: 16px;">🎬</span>
        <h3 style="font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; margin-bottom: 12px; color: #ffffff;">
          Vídeo em Desenvolvimento
        </h3>
        <p style="color: #91c0eb; font-size: 14px; max-width: 500px; line-height: 1.6;">
          Este espaço é o placeholder para a demonstração do módulo <strong>"${videoInfo ? videoInfo.title.replace('Demonstração - ', '') : videoId}"</strong>.
          <br><br>
          <span style="font-size: 12px; opacity: 0.8; font-family: monospace; background: rgba(0,0,0,0.3); padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
            Para ativar, adicione o link do seu vídeo em: <code>src/main.js</code>
          </span>
        </p>
      </div>
    `;
  }

  // Ativa a classe que faz a transição de opacidade e escala no CSS
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Impede o scroll de fundo
}

function closeVideoModal() {
  if (!modal || !modalWrapper) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Devolve o scroll de fundo
  
  // Limpa o iframe para parar o áudio do vídeo tocando ao fundo
  setTimeout(() => {
    modalWrapper.innerHTML = '';
  }, 300);
}

// 4. ATIVAR OS EVENTOS DOS VÍDEOS
document.addEventListener('DOMContentLoaded', () => {
  
  // Captura cliques no placeholder do vídeo principal da Hero
  const mainVideoPlaceholder = document.querySelector('.video-placeholder');
  if (mainVideoPlaceholder) {
    mainVideoPlaceholder.addEventListener('click', () => {
      const videoId = mainVideoPlaceholder.getAttribute('data-video-id') || 'main';
      openVideoModal(videoId);
    });
  }

  // Captura cliques nos slots de vídeos dos cards (grade de recursos)
  const featureVideoSlots = document.querySelectorAll('.feature-video-slot');
  featureVideoSlots.forEach(slot => {
    slot.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita ativar ações do card em si
      const videoId = slot.getAttribute('data-video-id');
      if (videoId) openVideoModal(videoId);
    });
  });

  // Fechar o modal ao clicar no botão "X"
  if (modalClose) {
    modalClose.addEventListener('click', closeVideoModal);
  }

  // Fechar o modal ao clicar fora da caixa do container
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeVideoModal();
      }
    });
  }

  // Fechar o modal pressionando a tecla 'ESC'
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
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
