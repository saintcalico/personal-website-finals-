<template>
  <div class="app-container">
    <!-- Navigation folders on left side -->
    <div class="folder-section left">
      <div class="folder" @click="navigateTo('about')">
        <img src="./assets/images/file.png" alt="Folder icon" class="folder-icon">
        <span>About me</span>
      </div>
      
      <div class="folder" @click="navigateTo('it-experience')">
        <img src="./assets/images/file.png" alt="Folder icon" class="folder-icon">
        <span>IT experience</span>
      </div>
      
      <div class="folder" @click="navigateTo('education')">
        <img src="./assets/images/file.png" alt="Folder icon" class="folder-icon">
        <span>Education</span>
      </div>
      
      <div class="folder" @click="navigateTo('interests')">
        <img src="./assets/images/file.png" alt="Folder icon" class="folder-icon">
        <span>Interests</span>
      </div>
    </div>
    
    <!-- Center content with penguin and bio -->
    <div class="center-content">
      <div class="penguin-container">
        <img src="./assets/images/pingu.png" alt="Feliz the penguin" class="penguin-image">
        <div class="penguin-text">
          <h1>HI</h1>
          <h1>I'M FELIZ!</h1>
        </div>
      </div>
      
      <!-- Bio section with conditional content based on navigation -->
      <div class="bio-section">
        <div v-if="currentSection === 'home'">
          <p>
            I'm an aspiring software engineer currently studying in Asia Pacific College,
            enrolled in an undergrad program which is Bachelor of Science in Information
            Technology with a specialization in Internet and Mobile Technologies.
            Random facts about me: I have a dog with a human name, I'm an only child
          </p>
        </div>
        
        <div v-if="currentSection === 'about'">
          <h2>About Me</h2>
          <p>
            Hello! I'm Feliz, an aspiring software engineer with a passion for creating 
            innovative solutions. I'm currently pursuing my Bachelor's degree in Information Technology
            with a focus on Internet and Mobile Technologies at Asia Pacific College.
          </p>
          <p>
            When I'm not coding, I enjoy spending time with my dog and exploring new technologies.
            I'm always eager to learn and take on new challenges in the tech world.
          </p>
        </div>
        
        <div v-if="currentSection === 'it-experience'">
          <h2>IT Experience</h2>
          
          <ul>
            <li>I previously worked on "CropSurplus" with my colleague Isaac Estabillo, it's an e-commerce app for overproduced goods. </li>
            <li>I also worked on "FurBnB" with my colleagues Lalainne Andaya, Atasha Doria, and Michelle Pineda, it's an app for booking pet services </li>
          </ul>
        </div>
        
        <div v-if="currentSection === 'education'">
          <h2>Education</h2>
          <p>
            <strong>Bachelor of Science in Information Technology</strong>
            <br>
            Specialization in Internet and Mobile Technologies
            <br>
            <li>Dean's Lister (A.Y. 2023-2024)</li>
            <li>Graduated With Honors-Pasay City National Science High School(A.Y. 2022-2023)</li>
            <li> Asia Pacific College | 2023-Present </li>
          </p>
          <p>
            <strong>Relevant Coursework:</strong>
          </p>
          <ul>
            <li>Web Programming</li>
            <li>Mobile Application Development</li>
            <li>Database Management</li>
          </ul>
        </div>
        
        <div v-if="currentSection === 'interests'">
          <h2>Interests</h2>
          <ul>
            <li>I'm interested in films, you can add me on Letterboxd ihatefilmsboo.</li>
            <li>I'm also interested in books, add me on goodreads!</li>
          </ul>
        </div>
        
        <div v-if="currentSection === 'gallery'">
          <h2>Picture Gallery</h2>
          <div class="gallery-grid">
            <img src="./assets/images/f.jpg" alt="Feliz" class="gallery-image">
            <img src="./assets/images/fel1.jpg" alt="Feliz" class="gallery-image">
            <img src="./assets/images/fel2.jpg" alt="Feliz" class="gallery-image">
          </div>
        </div>
        
        <div v-if="currentSection === 'goals'">
          <h2>Goals and References</h2>
          <h3>Career Goals</h3>
          <ul>
            <li>My goal is to literally just get through my classes at this point. For now I don't have a long term goal.</li>
          </ul>
          
          <h3>References</h3>
          <p>
            <li>https://www.w3schools.com/vue/</li> 
            <li>https://www.w3schools.com/js/js_functions.asp</li>
          </p>
        </div>
        
        <div v-if="currentSection === 'contact'">
          <h2>Contact Me</h2>
          <p>
            <strong>Email:</strong> feliz.salting@gmail.com
            <br>
            <strong>LinkedIn:</strong> Feliz Angelica Salting
            <br>
            <strong>GitHub:</strong> github.com/saintcalico
          </p>
          <p>
            Feel free to reach out if you'd like to collaborate on a project
            or just want to connect!
          </p>
          
          <h6>SHARE YOUR COMMENTS</h6>
          <div class="flex-item-survey">
            <p v-if="message" :class="messageType">{{ message }}</p>
            <input type="text" v-model="inpName" placeholder="Name">
            <input type="text" v-model="inpSuggestion" placeholder="Comment/s*">
            <button @click="submitSuggestion" :disabled="loading">
              {{ loading ? "Submitting..." : "Submit" }}
            </button>
            <br><br>
            <br>
            <div data-layer="Line 1" class="Line1"></div>
            <br>
            <h6>YOUR COMMENTS</h6>
            <table class="comment-table" v-if="comments.length">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="comment in comments" :key="comment.id">
                  <td>{{ comment.name }}</td>
                  <td>{{ comment.suggestion }}</td>
                </tr>
              </tbody>
            </table>
            <p v-else>No comments yet. Be the first to share your thoughts!</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Navigation folders on right side -->
    <div class="folder-section right">
      <div class="folder" @click="navigateTo('gallery')">
        <img src="./assets/images/file.png" alt="Folder icon" class="folder-icon">
        <span>Picture Gallery</span>
      </div>
      
      <div class="folder" @click="navigateTo('goals')">
        <img src="./assets/images/file.png" alt="Folder icon" class="folder-icon">
        <span>Goals and References</span>
      </div>
      
      <div class="folder" @click="navigateTo('contact')">
        <img src="./assets/images/file.png" alt="Folder icon" class="folder-icon">
        <span>Contact me</span>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = 'https://wksimigtgkfcdutaacie.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrc2ltaWd0Z2tmY2R1dGFhY2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMTc4NjQsImV4cCI6MjA1Mzc5Mzg2NH0.eR1TH9Gj1GKxM5OR6M45-4q3-opnxOLaNcOOMooqehI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default {
  name: 'App',
  data() {
    return {
      currentSection: 'home',
      inpName: '',
      inpSuggestion: '',
      message: '',
      messageType: '',
      loading: false,
      comments: []
    };
  },
  methods: {
    navigateTo(section) {
      this.currentSection = section;
    },
    
    async submitSuggestion() {
      // Validation
      if (!this.inpName.trim()) {
        this.showMessage('Please enter your name', 'error');
        return;
      }
      
      if (!this.inpSuggestion.trim()) {
        this.showMessage('Please enter a comment', 'error');
        return;
      }
      
      // Set loading state
      this.loading = true;
      
      try {
        // Insert data into Supabase
        const { data, error } = await supabase
          .from('comments')
          .insert([
            { 
              name: this.inpName.trim(), 
              comment: this.inpSuggestion.trim() 
            }
          ]);
          
        if (error) {
          throw error;
        }
        
        // Refresh comments list
        this.fetchComments();
        
        // Reset form
        this.inpName = '';
        this.inpSuggestion = '';
        
        // Show success message
        this.showMessage('Comment submitted successfully!', 'success');
      } catch (error) {
        console.error('Error submitting comment:', error);
        this.showMessage('Failed to submit comment. Please try again.', 'error');
      } finally {
        // Reset loading state
        this.loading = false;
      }
    },
    
    async fetchComments() {
      try {
        // Fetch comments from Supabase
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        // Map the database fields to match the expected template fields
        this.comments = data.map(item => ({
          id: item.id,
          name: item.name,
          suggestion: item.comment // Map 'comment' from database to 'suggestion' for the template
        }));
        
      } catch (error) {
        console.error('Error fetching comments:', error);
        this.showMessage('Failed to load comments.', 'error');
      }
    },
    
    showMessage(text, type) {
      this.message = text;
      this.messageType = type;
      
      // Clear message after 3 seconds
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  },
  async mounted() {
    // Load existing comments from Supabase when component mounts
    await this.fetchComments();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8efbb; /* Light yellowish background */
}

.folder-section {
  width: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.folder {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.folder:hover {
  transform: scale(1.05);
}

.folder-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.folder span {
  margin-top: 5px;
  text-align: center;
  font-weight: bold;
}

.center-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.penguin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.penguin-image {
  width: 300px;
  height: 300px;
  object-fit: contain;
}

.penguin-text {
  margin-top: -40px; /* Overlap with the penguin image */
  text-align: center;
}

.penguin-text h1 {
  font-size: 36px;
  line-height: 1.2;
  font-weight: bold;
}

.bio-section {
  background-color: #afba65; /* Greenish background for bio */
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  text-align: left;
  min-height: 200px;
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.bio-section h2 {
  margin-bottom: 15px;
  border-bottom: 2px solid #7a9930;
  padding-bottom: 5px;
}

.bio-section h3 {
  margin-top: 15px;
  margin-bottom: 10px;
}

.bio-section p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 15px;
}

.bio-section ul {
  margin-left: 20px;
  margin-bottom: 15px;
}

.bio-section ul li {
  margin-bottom: 5px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.gallery-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
  
  .folder-section {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .penguin-image {
    width: 200px;
    height: 200px;
  }
  
  .bio-section {
    max-width: 90%;
  }
}
</style>