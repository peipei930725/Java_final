import React, { Fragment, useState } from 'react';

const Logintest = () => {
  const [passwd, setpasswdValue] = useState('');
  const [account, setaccountValue] = useState('');

  const handleclick = (event) => {
    event.preventDefault();
    const student = { account, passwd };
    console.log(student);

    // 更新 URL 为 Spring Boot 控制器的 URL
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    }).then(response => response.text())
      .then(data => {
        console.log(data);
      });
  };

  return (
    <Fragment>
      <label htmlFor="inputAccount" className="form-label">Account</label>
      <input
        value={account}
        className="form-control"
        type="text"
        placeholder=""
        aria-label="default input example"
        onChange={(event) => setaccountValue(event.target.value)}
      />
      <label htmlFor="inputPassword" className="form-label">Password</label>
      <input
        value={passwd}
        type="password"
        id="inputPassword"
        className="form-control"
        aria-describedby="passwordHelpBlock"
        onChange={(event) => setpasswdValue(event.target.value)}
      />
      <div id="passwordHelpBlock" className="form-text">
        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
      </div>
      <button type="button" className="btn btn-primary" onClick={handleclick}>Submit</button>
    </Fragment>
  );
}

export default Logintest;
