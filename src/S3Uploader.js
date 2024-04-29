import React, { useState } from 'react';
import AWS from 'aws-sdk';

const S3_BUCKET = 'nagp-assignment-s3-aws-bucket-001';
const REGION = 'ap-south-1';

AWS.config.update({
  region: REGION,
  credentials: new AWS.S3({
    accessKeyId: 'AKIA5FTZD6RCYINRSS5G',
    secretAccessKey: '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'
  })
});

const S3Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const params = {
      Bucket: S3_BUCKET,
      Key: selectedFile.name,
      Body: selectedFile,
      ACL: 'public-read' // Change as needed
    };

    const s3 = new AWS.S3();
    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading file:', err);
      } else {
        console.log('File uploaded successfully:', data.Location);
        // Handle success, e.g., show a success message or redirect
      }
    });
  };

  return (
    <div>
      <h1>Upload a File to Amazon S3</h1>
      <input type="file" onChange={handleFileInput} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default S3Uploader;