import { useEffect, useState } from "react";
import "./App.css";

const Overview = () => {
  const [overview, setOverview] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getOverview")
      .then((response) => response.json())
      .then((data) => setOverview(data))
      .catch((error) => console.error("Error fetching education", error));
  }, []);

  return (
    <div className="content" style={{ margin: "30px 10%", width: "80%" }}>
      <div>
        <h2>Background</h2>
        {overview.length > 0 && <div>{overview[0].summary}</div>}
      </div>
      <br></br>
      <div>{overview.length > 0 && <div>{overview[0].otherSkills}</div>}</div>
    </div>
  );
};

export default Overview;
