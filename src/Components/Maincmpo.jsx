import React, { useCallback, useEffect, useRef, useState } from "react";

function Maincmpo() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [charac, setCharac] = useState(false);
  const [password, setPassword] = useState("");
  let passwordref = useRef(null);

  const func1 = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) {
      str = str + "0123456789";
    }
    if (charac) {
      str = str + "@#$%^&|";
    }
    for (let i = 1; i <= length; i++) {
      let index = Math.random() * str.length + 1;
      pass = pass + str.charAt(index);
    }
    setPassword(pass);
  }, [length, num, charac, setPassword]);
  useEffect(() => {
    func1();
  }, [length, num, charac]);
  function onChangeSlider(e) {
    setLength(e.target.value);
  }
  function numCheckHandle(e) {
    if (e.target.checked) {
      setNum(true);
    } else {
      setNum(false);
    }
  }
  function charCheckHandle(e) {
    if (e.target.checked) {
      setCharac(true);
    } else {
      setCharac(false);
    }
  }
  function copyClipBoard() {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
    alert("Password Copied to clipboard");
  }

  return (
    <>
      <h2>Password Generator</h2>
      <input type="text" value={password} ref={passwordref} />
      <button onClick={copyClipBoard}>Copy</button>
      <br />
      <input
        type="range"
        id="slider"
        name="slider"
        value={length}
        min="8"
        max="18"
        onChange={(e) => {
          onChangeSlider(e);
        }}
      />
      <label for="slider">Length({length})</label>
      <input
        type="checkbox"
        id="num"
        name="num"
        onChange={(e) => {
          numCheckHandle(e);
        }}
      />
      <label for="num">Numbers</label>
      <input
        type="checkbox"
        id="char"
        name="char"
        onChange={(e) => {
          charCheckHandle(e);
        }}
      />
      <label for="char">Characters</label>
    </>
  );
}

export default Maincmpo;
