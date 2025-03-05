import { supabase } from './src/supabase.js';

const app = Vue.createApp({
    data() {
        return {
            name: '',
            message: '',
            guestbookEntries: [],
            confirmationMessage: '',
            isLoading: false,
            errorMessage: ''
        };
    },
    methods: {
        async fetchEntries() {
            try {
                this.isLoading = true;
                const { data, error } = await supabase
                    .from('guestbook_entries')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                this.guestbookEntries = data;
            } catch (error) {
                console.error('Error fetching entries:', error);
                this.errorMessage = 'Failed to load guestbook entries';
            } finally {
                this.isLoading = false;
            }
        },
        async addEntry() {
            if (!this.name || !this.message) {
                this.errorMessage = 'Please provide both name and message';
                return;
            }
            
            try {
                this.isLoading = true;
                
                const newEntry = {
                    name: this.name,
                    message: this.message,
                    created_at: new Date().toISOString()
                };
                
                // Insert entry into Supabase
                const { data, error } = await supabase
                    .from('guestbook_entries')
                    .insert([newEntry])
                    .select();
                
                if (error) throw error;
                
                // Add to local array only if Supabase insert was successful
                if (data && data.length > 0) {
                    this.guestbookEntries.unshift(data[0]);
                    this.confirmationMessage = `Your message has been submitted, ${this.name}!`;
                    this.name = '';
                    this.message = '';
                    
                    setTimeout(() => {
                        this.confirmationMessage = '';
                    }, 5000);
                }
            } catch (error) {
                console.error('Error adding entry:', error);
                this.errorMessage = 'Failed to submit your message. Please try again.';
                
                setTimeout(() => {
                    this.errorMessage = '';
                }, 5000);
            } finally {
                this.isLoading = false;
            }
        }
    },
    mounted() {
        // Fetch existing entries when the component is mounted
        this.fetchEntries();
    }
});

app.mount('#app');