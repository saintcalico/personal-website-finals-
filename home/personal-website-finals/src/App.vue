<template>
  <div class="center-container">
    <img src="https://raw.githubusercontent.com/saintcalico/webprogMI231-personal-website/midterm_draft/home/pingu.png" 
         alt="Centered PNG" class="center-image" />
    <h1>HI <br /> I'M FELIZ!</h1>
    
    <div class="folder-content-container">
      <div v-if="activeSection === 'about'" id="about" class="folder-content">
        <p>I'm an aspiring software engineer currently studying in Asia Pacific College...</p>
      </div>
      <div v-if="activeSection === 'it-experience'" id="it-experience" class="folder-content">
        <li>I previously worked on "CropSurplus"...</li>
        <li>I also worked on "FurBnB"...</li>
      </div>
      <div v-if="activeSection === 'education'" id="education" class="folder-content">
        <li>Dean's Lister (A.Y. 2023-2024)</li>
        <li>Graduated With Honors - Pasay City National Science High School</li>
      </div>
      <div v-if="activeSection === 'interests'" id="interests" class="folder-content">
        <li>I'm interested in films...</li>
        <li>I'm also interested in books...</li>
      </div>
      
      <div v-if="activeSection === 'gallery'" id="gallery" class="folder-content">
        <div class="gallery-container">
          <figure v-for="photo in photos" :key="photo.name">
            <img :src="getImageUrl(photo.url)" :alt="photo.name" />
            <figcaption>{{ photo.name }}</figcaption>
          </figure>
        </div>
      </div>
      
      <div v-if="activeSection === 'goals'" id="goals" class="folder-content">
        <strong>Goals</strong>
        <li>My goal is to literally just get through my classes...</li>
        <strong>References:</strong>
        <li><a href="https://www.w3schools.com/vue/" target="_blank">Vue.js Docs</a></li>
        <li><a href="https://www.w3schools.com/js/js_functions.asp" target="_blank">JavaScript Functions</a></li>
      </div>
      
      <div v-if="activeSection === 'contact'" id="contact" class="folder-content">
        <p>Contact Me!.</p>
        <form @submit.prevent="addEntry">
          <div>
            <p>Your Name:<br /><input type="text" v-model="name" required /></p>
            <p>Your thoughts:<br /><input type="text" v-model="message" required /></p>
            <button type="submit">Submit</button>
          </div>
        </form>
        <p v-if="confirmationMessage">{{ confirmationMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
    
    <div class="folders left">
      <div class="folder" @click="showContent('about')">
        <img src="@/assets/images/file.png" alt="Folder" /> About me
      </div>
      <div class="folder" @click="showContent('it-experience')">
        <img src="@/assets/images/file.png" alt="Folder" /> IT experience
      </div>
      <div class="folder" @click="showContent('education')">
        <img src="@/assets/images/file.png" alt="Folder" /> Education
      </div>
      <div class="folder" @click="showContent('interests')">
        <img src="@/assets/images/file.png" alt="Folder" /> Interests
      </div>
    </div>
    
    <div class="folders right">
      <div class="folder" @click="showContent('gallery')">
        <img src="@/assets/images/file.png" alt="Folder" /> Picture Gallery
      </div>
      <div class="folder" @click="showContent('goals')">
        <img src="@/assets/images/file.png" alt="Folder" /> Goals and References
      </div>
      <div class="folder" @click="showContent('contact')">
        <img src="@/assets/images/file.png" alt="Folder" /> Contact me
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../src/supabase.js";

export default {
  data() {
    return {
      activeSection: "about",
      photos: [
        { name: "Me and a cat", url: "fel2.jpg" },
        { name: "My ID picture", url: "fel1.jpg" },
        { name: "Me eating at Nanyang", url: "f.jpg" }
      ],
      name: "",
      message: "",
      guestbookEntries: [],
      confirmationMessage: "",
      isLoading: false,
      errorMessage: ""
    };
  },
  methods: {
    async fetchEntries() {
      try {
        this.isLoading = true;
        const { data, error } = await supabase.from("guestbook_entries").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        this.guestbookEntries = data;
      } catch (error) {
        console.error("Error fetching entries:", error);
        this.errorMessage = "Failed to load guestbook entries";
      } finally {
        this.isLoading = false;
      }
    },
    async addEntry() {
      if (!this.name || !this.message) {
        this.errorMessage = "Please provide both name and message";
        return;
      }
      try {
        this.isLoading = true;
        const newEntry = { name: this.name, message: this.message, created_at: new Date().toISOString() };
        const { data, error } = await supabase.from("guestbook_entries").insert([newEntry]).select();
        if (error) throw error;
        if (data && data.length > 0) {
          this.guestbookEntries.unshift(data[0]);
          this.confirmationMessage = `Your message has been submitted, ${this.name}!`;
          this.name = "";
          this.message = "";
          setTimeout(() => { this.confirmationMessage = ""; }, 5000);
        }
      } catch (error) {
        console.error("Error adding entry:", error);
        this.errorMessage = "Failed to submit your message. Please try again.";
        setTimeout(() => { this.errorMessage = ""; }, 5000);
      } finally {
        this.isLoading = false;
      }
    },
    showContent(section) {
      this.activeSection = section;
    },
    getImageUrl(imagePath) {
      return new URL(`../assets/images/${imagePath}`, import.meta.url).href;
    }
  },
  mounted() {
    this.fetchEntries();
  }
};
</script>

<style scoped>
body {

    margin: 0;
  
    font-family: Arial, sans-serif;
  
    background-color: #f3eac1;
  
  }
  
  
  
  .container {
  
    position: relative;
  
    width: 100%;
  
    height: 100vh;
  
  }
  
  
  
  .folders.left {
  
    position: absolute;
  
    top: 20%;
  
    left: 5%;
  
  }
  
  
  
  .folders.right {
  
    position: absolute;
  
    top: 20%;
  
    right: 5%;
  
  }
  
  
  
  .folder {
  
    display: flex;
  
    flex-direction: column;
  
    align-items: center;
  
    margin-bottom: 20px;
  
    cursor: pointer;
  
    font-weight: bold;
  
    color: black;
  
    text-align: center;
  
  }
  
  
  
  .folder img {
  
    width: 40px;
  
    height: 40px;
  
    margin-bottom: 5px;
  
  }
  
  
  
  h1 {
  
    position: absolute;
  
    top: 50%;
  
    left: 50%;
  
    transform: translate(-50%, -50%);
  
    margin: 0;
  
    font-size: 45px;
  
    font-weight: bold;
  
    text-align: center;
  
  }
  
  .folder-content-container {
  
    position: absolute;
  
    top: calc(50% + 100px);
  
    left: 50%;
  
    transform: translateX(-50%);
  
    display: flex;
  
    justify-content: center;
  
    flex-direction: column;
  
    align-items: center;
  
    width: 80%;
  
    max-width: 600px;
  
  }
  
  .confirmation {
  
    position: absolute;
  
    top: calc(50% + 100px);
  
    left: 35%;
  
    transform: translateX(-50%);
  
    display: flex;
  
    justify-content: center;
  
    flex-direction: column;
  
    align-items: center;
  
    width: 80%;
  
    max-width: 600px;
  
  }
  
  .center-container {
  
    display: flex;
  
    justify-content: center;
  
    align-items: center;
  
    height: 100vh;
  
    background-color: #f3eac1;
  
   }
  
   .center-image {
  
    max-width: 100%;
  
    max-height: 100%;
  
    object-fit: contain;
  
   }
  
   .gallery-container {
  
    display: flex;
  
    flex-wrap: wrap;
  
    justify-content: center;
  
    gap: 20px;
  
  }
  
  figure {
  
    width: 120px;
  
    padding: 10px;
  
    background-color: #FFDAF1;
  
    color: #E37E91;
  
    border-radius: 10px;
  
    display: flex;
  
    flex-direction: column;
  
    align-items: center;
  
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  }
  
  
  
  img {
  
    width: 100%;
  
    height: auto;
  
    border-radius: 5px;
  
  }
  
  
  
  figcaption {
  
    margin-top: 10px;
  
    font-weight: bold;
  
    text-align: center;
  
  }
  
  .folder-content {
  
    display: none;
  
    flex-direction: column;
  
    align-items: center;
  
    justify-content: center;
  
    background-color: #b0ba63;
  
    border: 1px solid #ccc;
  
    padding: 20px;
  
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
    border-radius: 10px;
  
    margin-top: 20px;
  
  }
  
  form p {
  
    margin: 15px 0;
  
    font-size: 14px;
  
    text-align: left;
  
    color: #FFDAF1;
  
  }
  
  
  
  form input, form textarea,
  
  form button {
  
    width: 100%;
  
    margin-top: 5px;
  
    padding: 10px;
  
    border-radius: 5px;
  
    border: 1px solid #E37E91;
  
    outline: none;
  
    font-size: 14px;
  
    box-sizing: border-box;
  
  }
  
  
  
  form input::placeholder,
  
  form textarea::placeholder {
  
    color: #E37E91;
  
  }
  
  
  
  form button {
  
    background-color: #E37E91;
  
    color: #FFDAF1;
  
    font-weight: bold;
  
    cursor: pointer;
  
    transition: background-color 0.3s ease;
  
  }
  
  
  
  form button:hover {
  
    background-color: #C85D73;
  
  }
  
  
  
  .confirmation {
  
    margin-top: 10px;
  
    font-size: 14px;
  
    color: #FFDAF1;
  
    font-weight: bold;
  
    text-align: center;
  
  }
  
  
  
  .folder-content.active {
  
    display: flex;}
  
    .folders.left {
  
    position: absolute;
  
    top: 20%;
  
    left: 5%;
  
  }
  
  
  
  .folders.right {
  
    position: absolute;
  
    top: 20%;
  
    right: 5%;
  
  }
  
  
  
  .folder {
  
    display: flex;
  
    flex-direction: column;
  
    align-items: center;
  
    margin-bottom: 20px;
  
    cursor: pointer;
  
    font-weight: bold;
  
    color: black;
  
    text-align: center;
  
  }
  
  
  
  .folder img {
  
    width: 40px;
  
    height: 40px;
  
    margin-bottom: 5px;
  
  }
  
  
  
  .folder-content-container {
  
    position: absolute;
  
    top: calc(50% + 100px);
  
    left: 50%;
  
    transform: translateX(-50%);
  
    display: flex;
  
    justify-content: center;
  
    flex-direction: column;
  
    align-items: center;
  
    width: 80%;
  
    max-width: 600px;
  
  }
  
  
  
  .folder-content {
  
    display: none;
  
    flex-direction: column;
  
    align-items: center;
  
    justify-content: center;
  
    background-color: #b0ba63;
  
    border: 1px solid #ccc;
  
    padding: 20px;
  
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
    border-radius: 10px;
  
    margin-top: 20px;
  
  }
  
  
  
  .folder-content.active {
  
    display: flex;
  
  }
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-image: url("https://raw.githubusercontent.com/saintcalico/webprogMI231-personal-website/webprogMI231-personal-website/main/home/bgg.jpg");
    background-size: cover; 
    background-repeat: no-repeat; 
    background-position: center; 
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
h1 {
    position: relative;
    font-size: 3rem;
    color: #fff;
    text-align: center;
    -webkit-text-stroke: 0.1rem #252839;
    text-transform: uppercase;
    z-index: 2;
}

h1::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    color: #0ef;
    -webkit-text-stroke: 0;
    border-right: 2px solid #0ef;
    overflow: hidden;
    animation: animate 6s linear infinite;
}

@keyframes animate {
    0%, 10%, 100% {
        width: 0;
    }
    70%, 90% {
        width: 100%;
    }
}

/* Container Styling */
.container {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    background: rgba(232, 237, 217, 0.9); 
    border-radius: 10px;
    text-align: center;
}
.profile-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%; 
    display: block;
    margin: 0 auto;
    border: 5px solid rgba(232, 237, 217, 0.9); 
}

/* Typography */
h2 {
    color: #555;
    margin-bottom: 1rem;
}

.content {
    text-align: center;
    font-size: 1.1rem;
}

h3 {
    margin-top: 1rem;
    font-size: 1rem;
}

/* Links */
a:link, a:visited {
    background-color: #f4f4f4;
    color: black;
    padding: 10px 15px;
    text-decoration: none;
    border-radius: 5px;
}

a:hover, a:active {
    background-color: red;
    color: white;
}
</style>
