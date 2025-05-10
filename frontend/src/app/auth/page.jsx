import { useState } from "react";
function Auth() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleachange = (e) => {
    setUsername(e.target.value);
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {};

  return (
    <form>
      <input
        onChange={handleachange}
        type="text"
        name="name"
        placeholder="Enter username"
      ></input>
      <input
        onChange={handleachange}
        type="text"
        name="password"
        placeholder="Enter password"
      ></input>
      <button onClick={handleSubmit} type="submit"></button>
    </form>
  );
}

export default Auth;
