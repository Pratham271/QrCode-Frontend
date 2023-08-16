import React, { useState } from 'react';

const QrFrontend = () => {
  const [showText, setShowText] = useState(false);
  const [qrImage, setQrImage] = useState('');
  const [inputText, setInputText] = useState('');

  const generateQR = async () => {
    try {
      const response = await fetch('http://143.110.177.177:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputtext: inputText }),
      });

      if (response.ok) {
        const data = await response.json();
        setQrImage(data.qr_image);
        setShowText(true);
      } else {
        console.error('Failed to generate QR code');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='p-4 md:p-6 flex flex-col gap-2 justify-center items-center'>
        <h1 className='text-xl md:text-2xl mt-2'>QR Code Generator 🔥</h1>
        <h2 className='text-sm font-medium md:font-normal md:text-xl mt-2'>
          Insert a link below to generate a QR Code
        </h2>
      </div>
      <form
        className='p-4 md:p-6 flex flex-col md:flex-row justify-center items-center gap-2'
        onSubmit={(e) => {
          e.preventDefault();
          generateQR();
        }}
      >
        <input
          type='text'
          name='link'
          className='text-white bg-black px-2 py-1 w-full md:w-2/6 h-9'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type='submit'
          className='text-white bg-blue-600 border-none px-2 py-1 cursor-pointer rounded-md md:ml-2'
          style={{ backgroundColor: 'rgb(41, 64, 121)' }}
        >
          Generate QR
        </button>
      </form>
      <div className='p-4 md:p-6 flex flex-col justify-center items-center'>
        {showText && (
          <>
            <img src={qrImage} alt='QR Code' />
            <p className='text-sm md:text-lg'>
              Here is the QR code we generated for you 🚀
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default QrFrontend;
