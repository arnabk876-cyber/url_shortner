import { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import QRCodeGenarator from "qrcode";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
function App() {
const [url, setUrl] = useState("");
const [shortUrl, setShortUrl] = useState("");
const [copied, setCopied] = useState(false);
const [qrImg, setQrImg] = useState("");

const handleSubmit = async () => {
  if (!url) {
    return;
  }
  try{
    const res = await axios.post(`${API_BASE_URL}/shorten`, 
      { originalUrl: url

      });
    const newShortUrl = res.data.shortUrl;
    setShortUrl(newShortUrl);
    setCopied(false);

    const qr = await QRCodeGenarator.toDataURL(newShortUrl);
    setQrImg(qr);
    }
    
    catch(error){
      console.log(error);
      alert("Error shortening URL");
    }
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }
return  <div className="min-h-screen flex flex-col items-center justify-center p-6">
 <h1 className="text-3xl font-bold mb-4 text-center">URL Shortener</h1>
  <div className="text-center mb-4 font-bold text-lg text-center">
  <input type="text"  className="input input-success w-full" placeholder="Enter URL to shorten" value={url} onChange={(e) => setUrl(e.target.value)} />
  <button className="btn btn-primary w-full sm:w-auto" onClick={handleSubmit}>Shorten</button>
  </div>
  {shortUrl && (
    <>
    <div className="text-center mt-4 flex flex-col items-center">
<p className="font-medium mb-2">Your short url</p>
<a className="link link-primary break-all" href={shortUrl}>{shortUrl}</a>
<button className={`btn mt-2 w-full ${copied ? 'btn-success' : 'btn-secondary'}`}
 onClick={handleCopy}>
  {copied ? "Copied!" : "Copy to clipboard"}
</button>
</div>
<div className="bg-white p-4 rounded-lg shadow-md mt-6">
  <p className="font-semibold text-center  mb-2 text-gray-700">QR Code</p>
  <QRCode value={shortUrl} size={180} />
</div>    
{qrImg && (
  <a href={qrImg} className="btn btn-accent mt-3 w-full" download="qrcode.png">
    Download QR Code
  </a>
)} 
  </>
)}
</div>
}
export default App;
