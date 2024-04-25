import { useState } from "react";
import "./wheel.css";
import { Row, Col } from "antd";
const listGift = [
  { text: "MÁY PHÁT ĐIỆN", percent: 0 / 100 },
  { text: "1 TRIỆU", percent: 12 / 100 },
  { text: "500K", percent: 42 / 100 },
  { text: "XE ĐIỆN 7.999K", percent: 0 / 100 },
  { text: "300K", percent: 22 / 100 },
  { text: "QUẠT CÂY", percent: 12 / 100 },
  { text: "XE ĐIỆN 14.999K", percent: 0 / 100 },
  { text: "NỒI CHIÊN", percent: 10 / 100 },
];

export const Wheel = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [currentRotate, setCurrentRotate] = useState(0);
  const [showMsg, setShowMsg] = useState("");

  const rotate = 360 / listGift.length;
  const skewY = 90 - rotate;

  const start = () => {
    if (!isRotating) {
      setIsRotating(true);
      const random = Math.random();
      let gift;
      let rotateValue = currentRotate;
      let countValue = spinCount;
      setSpinCount((prevCount) => prevCount + 1);
      countValue += 1;
      if (countValue === 2) {
        gift = { ...listGift[0], index: 0 };
      } else if (countValue === 3) {
        gift = { ...listGift[6], index: 6 };
      } else if (countValue === 4 || countValue === 7 || countValue === 9) {
        gift = { ...listGift[3], index: 3 };
      } else {
        gift = getGift(random);
      }
      setCurrentRotate((prevRotate) => prevRotate + 360 * 10);
      rotateValue += 360 * 10;
      rotateWheel(rotateValue, gift.index);
      showGift(gift);
    }
  };

  const rotateWheel = (currentRotate: any, index: any) => {
    const wheel = document.querySelector(".wheel ul") as HTMLElement;
    console.log(wheel);
    if (wheel) {
      wheel.style.transform = `rotate(${
        currentRotate - index * rotate - rotate / 2
      }deg)`;
    }
  };

  const getGift = (randomNumber: any) => {
    let currentPercent = 0;
    let list: any[] = [];

    listGift.forEach((item, index) => {
      currentPercent += item.percent;
      if (randomNumber <= currentPercent) {
        list.push({ ...item, index });
      }
    });
    return list[0];
  };

  const showGift = (gift: any) => {
    setTimeout(() => {
      setIsRotating(false);
      setShowMsg(`Chúc mừng bạn đã nhận được "${gift.text}"`);
    }, 7000); // 7 seconds
  };

  return (
    <div className="wheel">
      <Row justify={"space-between"}>
        <Col>
          <h2 style={{ margin: "20px 0" }}>VÒNG QUAY MAY MẮN</h2>
        </Col>
      </Row>
      <main>
        <section className="main-wheel">
          <span>
            <ul className="">
              {listGift.map((item, index) => (
                <li
                  key={index}
                  style={{
                    transform: `rotate(${
                      rotate * index
                    }deg) skewY(-${skewY}deg)`,
                  }}
                >
                  <p
                    style={{
                      transform: `skewY(${skewY}deg) rotate(${rotate / 2}deg)`,
                    }}
                    className={`text-wheel text-wheel-${
                      index % 2 === 0 ? "1" : "2"
                    }`}
                  >
                    <b>{item.text}</b>
                  </p>
                </li>
              ))}
            </ul>
          </span>
          <button className="btn--wheel" onClick={start}>
            Quay thưởng
          </button>
        </section>
        <h1 className="msg-wheel">{showMsg}</h1>
        <div className="spin-count">
          Số lần quay: <p className="count">{spinCount}</p>
        </div>
      </main>
    </div>
  );
};
