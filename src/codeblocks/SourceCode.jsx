import { useParams } from "react-router-dom";
import CodeReader from "./CodeReader"; // Adjust the import path accordingly
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
const YourComponent = () => {
  const { cid } = useParams();
  const [codeString, setCodeString] = useState("");
  const [languages, setLanguage] = useState("javascript"); // Set your default language here
  const HOST = process.env.REACT_APP_API_HOST

  useEffect(() => {
    const fetchCodeContent = async () => {
      try {
        const response = await axios.get(`${HOST}/api/codeblocks/${cid}`);
        const { content, languages } = response.data; // Assuming your API returns content and language
        setCodeString(content);
        setLanguage(languages);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching code content:", error);
      }
    };

    fetchCodeContent();
  }, [HOST, cid]);
  return (
    <Layout>
      <div>
      <CodeReader codeString={codeString} languages={languages} />
    </div>
    </Layout>
  );
};

export default YourComponent;
