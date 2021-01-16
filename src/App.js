import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({
    heading: "",
    content: "",
    url: "",
  });

  const [formArr, setFormArr] = useState([]);

  const [current, setCurrent] = useState(0);
  const length = formArr.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

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
  };

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
        <button className="left-button" onClick={nextSlide}>
          {"<"}
        </button>
        <button className="right-button" onClick={prevSlide}>
          {">"}
        </button>
        {formArr.map((data, idx) => {
          return (
            <div className={current === idx ? "slide active" : "slide"}>
              {idx === current && (
                <div className="card" key={idx}>
                  <h2>{data.heading}</h2>
                  <img src={`${data.url}`} alt="re here"></img>
                  <div className="content">{data.content}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
