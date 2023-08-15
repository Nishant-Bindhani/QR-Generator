const form = document.getElementById("create-frm");
const qrcodeElement = document.getElementById("qrcode");
const btnSave = document.getElementById("btn-save");
const spinner = document.getElementById("loading");

// Button submit
const generateQRCode = async(o) => {
    o.preventDefault();
    const url = document.getElementById("url").value;
    const size = document.getElementById("size").value;

    if (url === "") {
        alert("Please Enter A URL...");
    } else {
        spinner.style.display = 'flex';

        // Clear previous QR code
        qrcodeElement.innerHTML = "";

        // Generate QR code
        const qrcode = new QRCode(qrcodeElement, {
            text: url,
            width: size,
            height: size,
        });

        // Wait for QR code image to render
        await new Promise(resolve => setTimeout(resolve, 500));

        spinner.style.display = 'none';
        btnSave.style.pointerEvents = 'auto';
        btnSave.style.opacity = "1";
        createDownloadLink();
    }
};

form.addEventListener('submit', generateQRCode);

const createDownloadLink = () => {
  const imgSrc = qrcodeElement.querySelector('img').src;
    if (imgSrc) {
        btnSave.href = imgSrc;
    }
};

const downloadit = () => {

    btnSave.download = 'QRCode.jpeg';
};
