module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Implementar ouvintes de eventos do Node aqui
    },
    video: true, // Garante que os vídeos sejam gravados
    videosFolder: 'cypress/videos' // Opcional: Personalize a pasta de saída para os vídeos
  },
};
