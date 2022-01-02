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

      setImg(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", img);
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    });
  };

  return (
    <div>
      <div>
        <img src={createObjectURL} />
        <h4>Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </div>
    </div>
  );
};

export default HomePage;
