import { useState } from "react";
import "./wheel.css";
// import { Row, Col } from "antd";
import { Modal } from 'antd';
import img1 from "../../../assets/mayphatdien.png"
import img2 from "../../../assets/quatcay.png"
import img3 from "../../../assets/noicom.png"
import img4 from "../../../assets/xedien.png"
import img5 from "../../../assets/noichien.png"
import img6 from "../../../assets/noiinox.png"
import img7 from "../../../assets/amsieutoc.png"
const listGift = [
  { text: "MÁY PHÁT ĐIỆN 8,5 TRIỆU", percent: 0 / 100, imageSrc: img1 },
  { text: "QUẠT CÂY", percent: 25 / 100, imageSrc: img2 },
  { text: "NỒI CƠM ĐIỆN", percent: 14 / 100, imageSrc: img3 },
  { text: "XE ĐIỆN 8 TRIỆU", percent: 0 / 100, imageSrc: img4 },
  { text: "NỒI CHIÊN KHÔNG DẦU", percent: 10 / 100, imageSrc: img5 },
  { text: "BỘ NỒI INOX", percent: 35 / 100, imageSrc: img6 },
  { text: "ẤM SIÊU TỐC", percent: 15 / 100, imageSrc: img7 },
  { text: "CHÚC BẠN MAY MẮN LẦN SAU", percent: 0 / 100 },
];

interface WheelProps {
  indexCustomer: number;
}
export const Wheel: React.FC<WheelProps> = ({ indexCustomer }) => {
  const [isRotating, setIsRotating] = useState(false);
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
      if (indexCustomer === 36 || indexCustomer === 89) {
        gift = { ...listGift[3], index: 3 }; // Xe điện 8tr
      } else if (
        indexCustomer === 9 ||
        indexCustomer === 58 ||
        indexCustomer === 118 ||
        indexCustomer === 155
      ) {
        gift = { ...listGift[0], index: 0 }; // Máy phát điện
      } else if (
        indexCustomer === 1 ||
        indexCustomer === 2 ||
        indexCustomer === 3 ||
        indexCustomer === 4
      ) {
        const randomIndex = Math.random() < 0.5 ? 4 : 2;
        gift = { ...listGift[randomIndex], index: randomIndex };
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
      wheel.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2
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
      Modal.success({
        title: <span style={{ color: 'red', fontSize: '20px', fontFamily: 'revert' }}>XIN CHÚC MỪNG QUÝ KHÁCH!</span>,
        content: (
          <div style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px', marginRight: '30px' }}>
            <p>Bạn đã nhận được "{gift.text}"</p>
            <img
              src={gift.imageSrc}
              style={{
                width: '100px',
                height: '100px',
                margin: 'auto',
                display: 'block',
                marginTop: '30px',
              }}
              alt="Hình ảnh quà tặng"
            />
            <div className="pyro">
              <div className="before"></div>
              <div className="after"></div>
            </div>
          </div>
        ),
        centered: true, // Hiển thị modal ở giữa màn hình
        width: '400px',
      });
    }, 7000);
  };

  return (
    <div className="wheel" >
      {/* <Row justify={"space-between"}>
        <Col>
        </Col>
      </Row> */}
      <main>
        <section className="main-wheel">
          <span>
            <ul className="">
              {listGift.map((item, index) => (
                <li
                  key={index}
                  style={{
                    transform: `rotate(${rotate * index
                      }deg) skewY(-${skewY}deg)`,
                  }}
                >
                  <p
                    style={{
                      transform: `skewY(${skewY}deg) rotate(${rotate / 2}deg)`,
                    }}
                    className={`text-wheel text-wheel-${index % 2 === 0 ? "1" : "2"
                      }`}
                  >
                    <b>{item.text}</b>
                  </p>
                </li>
              ))}
            </ul>
            
          </span>   
          <button onClick={start}></button>      
        </section>    
        <div className="msg-wheel">{showMsg}</div>        
      </main>      
    </div>
  );
};
