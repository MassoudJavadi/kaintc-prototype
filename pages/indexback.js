import * as React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Form,
  Button,
} from "react-bootstrap";

import axios from "axios";

//import { server } from "../next.config";

// export const getStaticProps = async () => {
//   const res = await fetch("/api/slides");
//   const data = await res.json();

//   return {
//     props: { mySlides: data },
//   };
// };

const HomePage = (props) => {
  const [img, setImg] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [slides, setSlides] = useState([]);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    });
  };

  async function addSlideHandler(enteredData) {
    const response = await fetch("api/slides");
  }
  // useEffect(() => {
  //   const fetch = async () => {
  //     const { data } = await axios.get("/api/slides");
  //     console.log(data);

  //     setSlides(data);
  //   };
  //   fetch();
  // }, []);
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; //first file would be [0]
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", FormData);
      setImg(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // const [colorMap, setColors] = React.useState<ColorMap>({
  //   a: ["blue", "red", "yellow"],
  //   b: ["pink"],
  //   c: ["green", "tan"],
  // });

  // const [slides, setSlides] = useState([
  //   { id: "1", name: "slide1" },
  //   { id: "2", name: "slide2" },
  // ]);

  // console.log(slides);

  return (
    <Form>
      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image url"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        ></Form.Control>
        <Form.Group
          controlId="formFile"
          className="mb-3"
          onClick={uploadFileHandler}
        >
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </Form.Group>
    </Form>
  );
};

export default HomePage;
