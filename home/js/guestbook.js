const app = Vue.createApp({
    data() {
        return {
            name: '',
            message: '',
            guestbookEntries: [],
            confirmationMessage: ''
        };
    },
    methods: {
        addEntry() {
            const newEntry = {
                name: this.name,
                message: this.message
            };
            this.guestbookEntries.push(newEntry);
           
            this.confirmationMessage = `Your message has been submitted, ${this.guestName}!`;
 
            this.name = '';
            this.message = '';
 
            setTimeout(() => {
                this.confirmationMessage = '';
            }, 5000);
        }
    }
});
 
app.mount('#app');