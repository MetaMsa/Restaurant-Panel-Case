import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/main/Footer.tsx";

function App() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <main className="rounded-3 bg-white h-25">
        <div
          style={{
            height: "25vh",
            backgroundImage: `url('./burger.jpg')`,
            backgroundPosition: `center ${offset * -0.1 - 40}%`,
          }}
          className="d-flex justify-content-center align-items-center rounded-top-3"
        >
          <h1 className="text-white">SUITABLE</h1>
        </div>
        <div className="p-3 container">
          <div className="row">
            <div className="col-8 border">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bootstrap
              container içinde normal içerik.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Bootstrap container içinde normal
              içerik.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Bootstrap container içinde normal içerik.Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Bootstrap container içinde
              normal içerik.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Bootstrap container içinde normal içerik.
            </div>
            <div className="col-4 border">
              <select class="form-select" aria-label="Default select example">
                <option value="1">Hamburgerler</option>
                <option value="pizza">Pizzalar</option>
                <option value="salad">Salatalar</option>
                <option value="dessert">Tatlılar</option>
              </select>
            </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="fixed-bottom">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
