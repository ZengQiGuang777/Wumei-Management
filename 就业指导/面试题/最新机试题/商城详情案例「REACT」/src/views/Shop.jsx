import React, { useMemo } from 'react';
import './Shop.less';
import { Swiper, Image } from 'antd-mobile';
import { LinkOutline, RightOutline } from 'antd-mobile-icons';
import ShopCart from '../components/ShopCart';
import { connect } from 'react-redux';
import SkeletonAgain from '../components/SkeletonAgain';

const App = function App(props) {
  // 从redux中拿到所需的样本数据
  const { name, images: mike, skus, sold } = props.data;

  // 获取sku价格
  const priceInfo = useMemo(() => {
    const allPrice = skus.map((item) => {
      return item.price;
    });
    const maxPrice = Math.max(...allPrice).toFixed(2),
      minPrice = Math.min(...allPrice).toFixed(2),
      maxP = maxPrice.split('.'),
      minP = minPrice.split('.');
    return { maxP, minP };
  }, [skus]);

  const { maxP, minP } = priceInfo;

  return <div className='shop-box' >
    {!props.data ? <SkeletonAgain /> : <>
      {/* 轮播图 */}
      <div className="swiper-box">
        <Swiper autoplay={true} loop={true} indicator={(total, current) => (
          <div className='swiper-number'>
            {`${current + 1} / ${total}`}
          </div>
        )}>
          {mike.map((item, index) => {
            return <Swiper.Item key={index}>
              <Image src={item} lazy />
            </Swiper.Item>
          })}
        </Swiper>
      </div>

      {/* 商品信息 */}
      <div className='shop-detail'>
        <div className='title-box'>
          <h2>{name}</h2>
          <div className='share'>
            <LinkOutline /><span>分享</span>
          </div>
        </div>
        <div className='price-box'>
          <div className='shop-price'>
            <span>￥</span>
            <span>{`${minP[0]}.`}</span>
            <span>{`${minP[1]}`}</span>
            <span>  -  </span>
            <span>{`${maxP[0]}.`}</span>
            <span>{`${maxP[1]}`}</span>
            <div className='sold'>
              <span>已售</span><span>{sold}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 可选规格 */}
      <div className='shop-norms'>
        <div className='sn-context'>
          <span>可选规格</span>
          <span>请选择</span>
          <span><RightOutline /></span>
        </div>
      </div>

      {/* 可送达城市 */}
      <div className='choose-city'>
        <div className='cc-context'>
          <span>可送达城市</span>
          <span>天津市</span>
        </div>
      </div>

      {/* 底部购物车 */}
      <ShopCart></ShopCart>
    </>}
  </div >
}
export default connect(state => {
  return {
    data: state.data
  }
})(App);
