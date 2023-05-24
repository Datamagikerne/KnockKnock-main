const baseUrl = "https://knockknockrestapi.azurewebsites.net/api/arrivals"

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
}).mount("#vueArrivals")