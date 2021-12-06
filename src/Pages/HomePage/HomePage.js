import React from "react";
import { useHistory } from "react-router";
import "./HomePage.scss";

let user = "";
function HomePage() {
  const location = useHistory();
  return (
    <section className="homepage">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          location.push("/chat");
        }}
        className="joinContainer"
      >
        <div className="header">
          <h1>
            <span>Dev</span> Chat
          </h1>
        </div>
        <div className="formcontainer">
          <input
            type="text"
            placeholder="User Name"
            autoComplete="off"
            required
            minLength={5}
            autoCorrect="off"
            autoCapitalize="off"
            onChange={(e) => (user = e.target.value)}
          />

          <button className="submibutton" type="submit">
            submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default HomePage;
export { user };
