import React, { useState, useEffect } from "react";
import cloudinary from 'cloudinary'
import { Cloudinary as CoreCloudinary, Util } from "cloudinary-core";
import { Container, Card, Button, Grid, Text, Input } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function UserPost() {
    const stream = require('getstream');



  const session = useSession();

  const userToken = session.data?.user?.userToken;
  const usename = session.data?.user?.username;
//   const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
//   const appId = process.env.NEXT_PUBLIC_STREAM_APP_ID as string;
//   const client = stream.connect(apiKey, userToken, appId);
  const [postInfoFormState, setPostInfoFormState] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [image, setImage] = useState([]);

  const inputChange = (event) => {
    const { name, value } = event.target;
    setPostInfoFormState({
      ...postInfoFormState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event, postInfoFormState, username, userToken) => {
    event.preventDefault();
    event.preventDefault();
    setPostInfoFormState({
        title: "",
        description: "",
        image: "",
      });
    
        const data = {
            postInfoFormState: postInfoFormState,
          username: username,
          userToken: userToken,
        };
    
        await axios.post("/api/userPost/${username}", data)
          .then(function (result) {
            router.push(result.url);
          })
          .catch((err) => {
            alert("Failed to register: " + err.toString());
          });
  }
 
    


  

//   const beginUpload = (tag) => {
//     const uploadOptions = {
//       cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//       tags: [tag, "anImage"],
//       uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
//     };
//     openUploadWidget(uploadOptions, (error, photos) => {
//       if (!error) {
//         if (photos.event === "success") {
//           setPostInfoFormState({
//             ...postInfoFormState,
//             image: photos.info.public_id,
//           });
//         }
//       } else {
//         console.error(error);
//       }
//     });
//   };

  const url = (publicId, options) => {
    const scOptions = Util.withSnakeCaseKeys(options);
    const cl = CoreCloudinary.new();
    return cl.url(publicId, scOptions);
  };

  async function fetchPhotos(imageTag, setter) {
    const options = {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      format: "json",
      type: "list",
      version: Math.ceil(new Date().getTime() / 1000),
    };

    const urlPath = url(imageTag.toString(), options);

    fetch(urlPath)
      .then((res) => res.text())
      .then((text) =>
        text
          ? setter(JSON.parse(text).resources.map((image) => image.public_id))
          : []
      )
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchPhotos("image", setImage);
  }, []);

  return (
    <Container>
      <Grid>
        <Grid >
          <div >
            <Text>Tell everyone about your amazing adventure!</Text>
            <form onSubmit={handleFormSubmit} noValidate>
              <Container>
                <Grid >
                  <Input
                    required
                    fullWidth
                    id="title"
                    label="Post Title"
                    name="title"
                    autoComplete="title"
                    onChange={inputChange}
                    value={postInfoFormState.title}
                  />
                </Grid>
                <Grid >
                  <Input
                
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    onChange={inputChange}
                    value={postInfoFormState.description}
              
                
                  />
                </Grid>
                <Grid>
                  {/* <Button
                    onClick={() => beginUpload("image")}
                    color="secondary"
                  >
                    Upload Photo
                  </Button> */}
                </Grid>
                <Grid>
                  <Input
                
                    fullWidth
                    id="image"
                    label="Image"
                    name="image"
                    disabled
                    autoComplete="image"
                    onChange={inputChange}
                    value={postInfoFormState.image}
                  />
                </Grid>
              </Container>
              <Button type="submit" color="primary" value="register">
                Post
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

// export async function getServerSideProps() {
//     let stream = require('getstream');
  
  
  
//     const client = stream.connect(apiKey, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamFrZSJ9.DcUg0vGH-JPuy4Tv0HYXuWvRdnNqEajgu_YuFVXmK9w', appId);
  
  
   
//     //worked!
  
//     // const alexFlatFeed = client.feed('home', 'Alex', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQWxleCJ9.WrMUsq2v2CQ1vWydp-umS2qAIxRb-nWgodbjWTZNJ0Q');
//     // const jakeFlatFeed = client.feed('home', 'jake', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamFrZSJ9.DcUg0vGH-JPuy4Tv0HYXuWvRdnNqEajgu_YuFVXmK9w');
//     // alexFlatFeed.follow('user', 'jake', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamFrZSJ9.DcUg0vGH-JPuy4Tv0HYXuWvRdnNqEajgu_YuFVXmK9w');
//     // alexFlatFeed.follow('user', 'Lottie', ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTG90dGllIn0.V0kKg0t5vF5IViHhhyJvzNqr7gvYkWNvqUIZKOjOMtw');
  
//     // const alexFlatFeed
  
//     return {
//       props: {},
//     };
//   }
