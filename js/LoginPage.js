new Vue({
  el: '#app',
  data: {
    email: '',
    password: '',
    currentStudent: null,
    isLoggedIn: false
  },
  methods: {
    submitForm() {
      axios.get(`https://knockknockrestapi.azurewebsites.net/api/students/email=${this.email}&password=${this.password}`)
        .then(response => {
          this.currentStudent = response.data;
          console.log('Data received:', response.data);
          this.currentStudent.qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(this.currentStudent.qrCode)}&size=200x200`;
          this.isLoggedIn = true;
        })
        .catch(error => {
          console.error(error);
          const errorMessage = error.response ? error.response.data : error.message;
          alert(errorMessage);
        });
    }
  }
});