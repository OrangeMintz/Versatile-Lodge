import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";

function About() {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="About">
      {user.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <h1>{user.age}</h1>
        </div>
      ))}
    </div>
  );
}

export default About;
