import React, { useEffect, useState } from "react";
import './ShopCart.less';
import timg from '../assets/car.png';
import { Button, Mask } from "antd-mobile";
import CarDetail from "./CarDetail";

const ShopCart = function ShopCart() {
  //定义所需的状态
  const [visible, setVisible] = useState(false);
  // 购物车内容
  const carContext = function carContext() {
    setVisible(true)
  }

  return <div className="bottom">
    <div className="bottom-content">
      <div className="buyCar">
        <img src={timg} alt="" />
        <p>购物车</p>
      </div>

      <div className="button-box">
        <Button block
          style={{
            backgroundColor: '#19307A',
            color: 'white',
            width: '285px',
            letterSpacing: '0.1rem',
            fontSize: '14px'
          }}
          size='large'
          onClick={carContext}
        >
          <span>加入购物车</span>
        </Button>

        <Mask visible={visible} onMaskClick={() => setVisible(false)} />
      </div>
      {visible === true ?
        <div className="car-detail">
          <CarDetail />
        </div>
        : ''}
    </div>
  </div>
};

export default ShopCart;