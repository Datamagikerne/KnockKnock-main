// use https (http secure).
// http (non-secure) will make the app complain about mixed content when running the app from Azure
const baseUrl = "https://knockknockrestw.azurewebsites.net/api/arrivals"
//const baseUrl = "http://localhost:5093/api/arrivals"
//const baseUrl = "http://localhost:59528/api/arrivals" //Ann-Sofies lokal rest

const app = Vue.createApp({
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
    },
}).mount("#app")

// Call getAllArrivals every 10 seconds
// setInterval(() => {
//     app.getAllArrivals();
//   }, 10000);
