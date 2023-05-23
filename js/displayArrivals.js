// use https (http secure).
// http (non-secure) will make the app complain about mixed content when running the app from Azure
// const baseUrl = "https://knockknockrestw.azurewebsites.net/api/arrivals"
const baseUrl = "https://knockknockrestapi.azurewebsites.net/api/arrivals"
//const baseUrl = "http://localhost:59528/api/arrivals" //Ann-Sofies lokal rest

const vueArrivals = Vue.createApp({
    data() {
        return {
            arrivals: [],
            noStudents: false
        }
    },
    methods: {
        async getAllArrivals() {
            try {
                const response = await axios.get(baseUrl);
                this.arrivals = await response.data;  
                this.noStudents = this.arrivals.length === 0;
            } catch (ex) {
                alert(ex.message);
            }

        },
        formatTime(timeString) {
            let date = new Date(timeString);
            let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
            let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1); // Months are zero indexed, hence the +1
            let hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
            let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            return `${day}/${month} ${hours}:${minutes}`;
          }
    },
    // created() {
    //     this.getAllArrivals();
    // }
}).mount("#vueArrivals")



// // Call getAllArrivals every 10 seconds
// setInterval(() => {
//     vueArrivals.getAllArrivals();
//   }, 1000);
