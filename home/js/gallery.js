const app = Vue.createApp({
    data() {
      return {
        photos: [
          { name: 'Me and a cat', url: 'fel2.jpg' },
          { name: 'My ID picture', url: 'fel1.jpg' },
          { name: 'Me eating at nanyang', url: 'f.jpg' },
        
        ]
      };
    }
  });
  
  app.mount('#app');