import React, { Fragment, useEffect, useState } from "react";

const Logintest = () => {
  const [passwd, setpasswdValue] = useState("");
  const [account, setaccountValue] = useState("");
  const [user, setUser] = useState([]);
  const [data, setData] = useState(""); // Add this line to import the `setData` function

  //給後端資料庫資料
  const handleclick = (event) => {
    event.preventDefault();
    const student = { account, passwd };
    console.log(student);

    // 更新 URL 为 Spring Boot 控制器的 URL
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then((response) => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then((data) => {
          // 檢查用戶是否存在
          const userExists = (user as { account: string }[]).some(
            (u) => u.account === account
          );
          if (userExists) {
            setData("Username: " + account);
          } else {
            setData("User does not exist");
          }
        });
      } else {
        fetch("http://localhost:8080/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        }).then((response) => {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then((data) => {
              // 檢查用戶是否存在
              const userExists = (user as { account: string }[]).some(
                (u) => u.account === account
              );
              if (userExists) {
                setData("Username: " + account);
              } else {
                setData("User does not exist");
              }
            });
          } else {
            return response.text().then((text) => {
              // 處理非 JSON 響應
              setData(text);
            });
          }
        });
      }
    });
  };
  //跟後端資料庫要資料
  useEffect(() => {
    fetch("http://localhost:8080/api/login")
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      return response.text().then((text) => {
        setData(text);
      });
    });
  }, []);

  return (
    <Fragment>
      <label htmlFor="inputAccount" className="form-label">
        Account
      </label>
      <input
        value={account}
        className="form-control"
        type="text"
        placeholder=""
        aria-label="default input example"
        onChange={(event) => setaccountValue(event.target.value)}
      />
      <label htmlFor="inputPassword" className="form-label">
        Password
      </label>
      <input
        value={passwd}
        type="password"
        id="inputPassword"
        className="form-control"
        aria-describedby="passwordHelpBlock"
        onChange={(event) => setpasswdValue(event.target.value)}
      />
      <div id="passwordHelpBlock" className="form-text">
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </div>
      <button type="button" className="btn btn-primary" onClick={handleclick}>
        Submit
      </button>
      <hr />

      <p className="h3">getDatatest</p>
      <p>{data}</p>
    </Fragment>
  );
};

export default Logintest;
