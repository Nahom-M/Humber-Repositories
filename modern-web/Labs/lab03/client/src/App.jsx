import React, { useState } from "react";
import './App.css';  // Import the stylesheet

function App() {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [fetchedSingleFile, setFetchedSingleFile] = useState(null);
  const [fetchedMultipleFiles, setFetchedMultipleFiles] = useState([]);
  const [dogImageUrl, setDogImageUrl] = useState("");

  const handleSingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const handleMultipleFilesChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append("file", singleFile);

    try {
      const response = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading single file:", error);
    }
  };

  const uploadMultipleFiles = async () => {
    const formData = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }

    try {
      const response = await fetch("http://localhost:8000/save/multiple", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading multiple files:", error);
    }
  };

  const fetchSingleFile = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/single");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setFetchedSingleFile(url);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  const fetchMultipleFiles = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/multiple");
      const data = await response.json();

      const fileData = data.files.map((file) => {
        const base64URL = `data:application/octet-stream;base64,${file.data}`;
        return {
          filename: file.filename,
          url: base64URL,
        };
      });
      setFetchedMultipleFiles(fileData);
    } catch (error) {
      console.error("Error fetching multiple files:", error);
    }
  };

  const fetchRandomDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setDogImageUrl(data);
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };

  const uploadDogImage = async () => {
    try {
      const response = await fetch(dogImageUrl.message);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append("file", blob, "dogImage.jpg");

      const uploadResponse = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });

      const data = await uploadResponse.json();
      alert(data.message);
    } catch (error) {
      console.error("Error uploading dog image:", error);
    }
  };

  return (
    <div className="container">
      <h1>File Upload and Fetch App</h1>

      <div className="section">
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button onClick={uploadSingleFile}>Upload Single File</button>
      </div>

      <div className="section">
        <h2>Upload Multiple Files</h2>
        <input type="file" multiple onChange={handleMultipleFilesChange} />
        <button onClick={uploadMultipleFiles}>Upload Multiple Files</button>
      </div>

      <div className="section">
        <h2>Fetch Single File</h2>
        <button onClick={fetchSingleFile}>Fetch Single File</button>
        {fetchedSingleFile && (
          <div className="image-container">
            <img src={fetchedSingleFile} alt="Fetched Single" />
          </div>
        )}
      </div>

      <div className="section">
        <h2>Fetch Multiple Files</h2>
        <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
        <div className="image-container">
          {fetchedMultipleFiles.length > 0 &&
            fetchedMultipleFiles.map((file, index) => (
              <img
                key={file.filename}
                src={file.url}
                alt={`Fetched File ${index}`}
              />
            ))}
        </div>
      </div>

      <div className="section">
        <h2>Fetch Dog Image</h2>
        <button onClick={fetchRandomDogImage}>Random Dog Image</button>
        {dogImageUrl && (
          <div className="image-container">
            <div>
              <h3>Sample Dog Image</h3>
              <img src={dogImageUrl.message} alt="Fetched Dog" />
              <div>
                <button onClick={uploadDogImage}>Upload Image?</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
