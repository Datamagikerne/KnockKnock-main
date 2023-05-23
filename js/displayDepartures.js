const baseUrl2 = "https://knockknockrestapi.azurewebsites.net/api/departures"

const vueDepartures = Vue.createApp({
    data() {
        return {
            departures: [],
            noStudents: false
        }
    },
    methods: {
        async getAllDepartures() {
            try {
                const response = await axios.get(baseUrl2);
                this.departures = await response.data;
                this.noStudents = this.departures.length === 0;
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
    //     this.getAllDepartures();
    // }
}).mount("#vueDepartures")

// setInterval(() => {
//     vueDepartures.getAllDepartures();
//   }, 1000);
