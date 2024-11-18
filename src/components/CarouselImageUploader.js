import React, { useState } from 'react';

const CarouselImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${ process.env.REACT_APP_API_URL}}/api/carousel-images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (response.ok) {
        // Handle success
        console.log('Image uploaded successfully');
      }
    } catch (err) {
      console.error('Error uploading file', err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload Image</button>
    </div>
  );
};

export default CarouselImageUploader;
