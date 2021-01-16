import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({
    heading: "",
    content: "",
    url: "",
  });

  const [formArr, setFormArr] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (form.heading && form.content && form.url) {
      fetch("http://localhost:8080/card", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((r) => r.json())
        .then((resp) => {
          formArr.push(resp);
          setForm({
            heading: "",
            content: "",
            url: "",
          });
        });
      // formArr.push(form);
      // setForm({
      //   heading: "",
      //   content: "",
      //   url: "",
      // });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/card", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((arr) => {
        setFormArr(arr);
      });
  }, []);

  const changeHandler = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    // console.log(e);
    // console.log(form);
  };

  const slide = (heading, content, url) => (
    <div className="card">
      <h2>{heading}</h2>
      <img src={`${url}`}></img>
      <div className="content">{content}</div>
    </div>
  );

  return (
    <div className="App">
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <label htmlFor="heading">Heading</label>
          <input
            type="text"
            name="heading"
            onChange={changeHandler}
            value={form.heading}
          />
          <br />
          <label htmlFor="content">Content</label>
          <input
            type="text"
            name="content"
            onChange={changeHandler}
            value={form.content}
          />
          <br />
          <label htmlFor="url">Url</label>
          <input
            type="url"
            name="url"
            onChange={changeHandler}
            value={form.url}
          />
          <br />
          <button>Add</button>
        </form>
      </div>
      <div className="card-container">
        {formArr.map((data, idx) => (
          <div className="card" key={idx}>
            <h2>{data.heading}</h2>
            <img src={`${data.url}`}></img>
            <div className="content">{data.content}</div>
          </div>
        ))}
        {/* <div>
          <button>{"<"}</button>
          <div>
            {formArr.map((data, idx) =>
              slide(data.content, data.heading, data.url, idx)
            )}
            {slide(formArr[0].heading, formArr[0].content, formArr[0].url)}
          </div>
          <button>{">"}</button>
        </div> */}
      </div>
    </div>
  );
}

export default App;
