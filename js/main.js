document.getElementById('qr-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const inputStudentName = document.getElementById('input-student-name').value;
    const inputText = document.getElementById('input-text').value;
    const inputSize = document.getElementById('input-size').value;
    const qrCodeImg = document.getElementById('qr-code');
    const inputAddress = document.getElementById('input-address').value;
    const inputEmail = document.getElementById('input-email').value;
    const inputPassword = document.getElementById('input-password').value;

    if (inputStudentName && inputText && inputSize && inputAddress && inputEmail && inputPassword) {
        const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${inputText}&size=${inputSize}x${inputSize}`;

        try {
            const response = await axios.get(apiUrl, { responseType: 'blob' });
            const imageUrl = URL.createObjectURL(response.data);
            qrCodeImg.src = imageUrl;
            qrCodeImg.style.display = 'inline';

            // Send the student name, email, password, and QR code data to the REST API
            const restApiUrl = 'https://knockknockrestw.azurewebsites.net/api/students';
            const studentData = {
                name: inputStudentName,
                address: inputAddress,
                email: inputEmail,
                password: inputPassword,
                qrCode: inputText,
                QrImageUrl: imageUrl // Add the QR code URL to the studentData object
            };
            console.log(studentData);
            await axios.post(restApiUrl, studentData);

        } catch (error) {
            console.error('Error generating QR code or sending data to REST API:', error);
            const errorMessage = error.response ? error.response.data : error.message;
            alert(`Error sending data to server: ${errorMessage}`);
        }
    } else {
        alert('Please fill in all fields.');
    }
});
//var QRInput = document.getElementById("input-text").maxLength = 8;

