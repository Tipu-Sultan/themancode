import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, VStack, Container, Heading, Input } from "@chakra-ui/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function EditorApp() {
  const { cid } = useParams();
  const editorRef = useRef(null);
  const [input, setInput] = useState({ title: "", languages: "" });
  const [codeString, setCodeString] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  let HOST = "";
  if (process.env.NODE_ENV === "production") {
    HOST = "https://mancode.onrender.com";
  } else {
    // Assuming development environment
    HOST = "http://localhost:8080";
  }

  const log = async () => {
    setisLoading(true);
    if (cid) {
      if (editorRef.current) {
        const content = editorRef.current.getContent();
        const title = input.title;
        const languages = input.languages;

        try {
          // Use Axios to send a POST request
          const response = await axios.put(
            `${HOST}/api/codeblocks/${cid}`,
            { title, languages, content },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 201) {
            setisLoading(false);
            toast.success(response.data.message);
          } else {
            setisLoading(false);
            console.error("Error saving content:", response.statusText);
          }
        } catch (error) {
          setisLoading(false);
          toast.success(error.response.data.message);
          console.error("Error saving content:", error.message);
        }
      }
    } else {
      if (editorRef.current) {
        const content = editorRef.current.getContent();
        const title = input.title;
        const languages = input.languages;

        try {
          // Use Axios to send a POST request
          const response = await axios.post(
            `${HOST}/api/codeblocks`,
            { title, languages, content },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 201) {
            setisLoading(false);
            toast.success(response.data.message);
          } else {
            setisLoading(false);
            console.error("Error saving content:", response.statusText);
          }
        } catch (error) {
          setisLoading(false);
          toast.success(error.response.data.message);
          console.error("Error saving content:", error.message);
        }
      }
    }
  };

  useEffect(() => {
    const fetchCodeContent = async () => {
      try {
        const response = await axios.get(`${HOST}/api/codeblocks/${cid}`);
        setCodeString(response.data);
        setInput({
          title: response.data.title || "",
          languages: response.data.languages || "",
        });
      } catch (error) {
        console.error("Error fetching code content:", error);
      }
    };

    fetchCodeContent();
  }, [HOST, cid]);
  return (
    <Layout>
      <Container maxW="container.xl" mt={90}>
        <VStack spacing={4} align="stretch">
          <Heading as="h1" fontSize="2xl" mb={4}>
            Add Your Code Here
          </Heading>
          <Input
            required
            type={"text"}
            name="title"
            value={input.title}
            onChange={handleInput}
            css={{
              "&::file-selector-button": {
                border: "none",
                width: "calc(100% + 36px)",
                height: "100%",
                marginLeft: "-18px",
                color: "purple",
                backgroundColor: "white",
                cursor: "pointer",
              },
            }}
            placeholder="Add Title..."
          />
          <Input
            required
            type={"text"}
            name="languages"
            onChange={handleInput}
            value={input.languages}
            css={{
              "&::file-selector-button": {
                border: "none",
                width: "calc(100% + 36px)",
                height: "100%",
                marginLeft: "-18px",
                color: "purple",
                backgroundColor: "white",
                cursor: "pointer",
              },
            }}
            placeholder="Add the programming languages used in this code..."
          />
          <Editor
            apiKey="c2j38nas64n4hpeke9u8fvf25ykj41nhnvqqxqp23gkxjvl4"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={codeString.content}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.5; }",
            }}
          />
          <Button colorScheme="purple" onClick={log}>
            {isLoading ? "Please wait..." : "Log editor content"}
          </Button>
        </VStack>
      </Container>
    </Layout>
  );
}
