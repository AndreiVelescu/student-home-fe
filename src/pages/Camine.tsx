import StepForm from "../components/Camine/StepForm";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const SINGLE_UPLOAD_MUTATION = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file)
  }
`;

const Camine = () => {
  const [uploadFile] = useMutation(SINGLE_UPLOAD_MUTATION);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      await uploadFile({
        variables: {
          file: selectedFile,
        },
      });
    } catch (err) {
      console.error("Upload error", err);
      alert("Upload failed");
    }
  };
  return (
    <>
      {/* <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Trimite file-ul
      </button> */}

      <StepForm />
    </>
  );
};

export default Camine;
