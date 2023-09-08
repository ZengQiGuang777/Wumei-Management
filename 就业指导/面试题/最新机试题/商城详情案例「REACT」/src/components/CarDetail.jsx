import React, { useState, useEffect } from 'react'
import { Form, Button, Selector, Stepper, Toast } from 'antd-mobile'
import { connect } from 'react-redux';
import './CarDetail.less';

// 通用筛选：从attributes中筛选出颜色和体积的值
const commonFilter = (attributes, type) => {
  return attributes.find(item => item.type === type).value;
};

const CarDetail = function CarDetail(props) {
  let { images, skus } = props.data;
  // 定义需要的状态
  let [optionsColor, setOptionsColor] = useState([]);
  let [optionsVolume, setOptionsVolume] = useState([]);
  let [price, setPrice] = useState('0.00');
  let [formIns] = Form.useForm();

  // 颜色/体积数据绑定 
  const filterData = (type) => {
    let options = [];
    skus.forEach(sku => {
      let { inventory, attributes } = sku,
        val = commonFilter(attributes, type);
      if (+inventory === 0) return;
      if (options.includes(val)) return;
      options.push(val);
    });
    options = options.map(item => {
      return {
        label: item,
        value: item
      };
    });
    return options;
  };
  useEffect(() => {
    let colorArr = filterData('颜色'),
      volumnsArr = filterData('体积');
    setOptionsColor(colorArr);
    setOptionsVolume(volumnsArr);
    formIns.setFieldValue('color', colorArr.length === 0 ? [] : [colorArr[0].value]);
    formIns.setFieldValue('volumns', volumnsArr.length === 0 ? [] : [volumnsArr[0].value]);
    changeSelect();
  }, [skus]);

  // 条件筛选：获取价格
  const changeSelect = () => {
    let { color, volumns } = formIns.getFieldsValue();
    color = color[0];
    volumns = volumns[0];
    let item = skus.find(sku => {
      let { attributes } = sku,
        colorItero = commonFilter(attributes, '颜色'),
        volumeItero = commonFilter(attributes, '体积');
      return color === colorItero && volumns === volumeItero;
    });
    if (item) {
      setPrice(Number(item.price).toFixed(2));
    } else {
      setPrice('0.00');
    }
  };

  // 条件筛选：级联控制
  const changeVolumnsData = (val) => {
    val = val[0];
    let useableVolumes = [];
    skus.forEach(sku => {
      let { attributes } = sku,
        color = commonFilter(attributes, '颜色'),
        volume = commonFilter(attributes, '体积');
      if (color === val && !useableVolumes.includes(volume)) {
        useableVolumes.push(volume);
      }
    });
    optionsVolume = optionsVolume.map(item => {
      if (!useableVolumes.includes(item.value)) {
        item.disabled = true;
        let volumns = formIns.getFieldValue('volumns')[0];
        if (volumns === item.value) {
          formIns.setFieldValue('volumns', useableVolumes.length === 0 ? [] : [useableVolumes[0]]);
          changeSelect();
        }
      } else {
        item.disabled = false;
      }
      return item;
    });
    setOptionsVolume(optionsVolume);
  };

  // 最后提交
  const onFinish = () => {
    let { color, volumns, campute } = formIns.getFieldsValue();
    color = color.length === 0 ? '' : color[0];
    volumns = volumns.length === 0 ? '' : volumns[0];
    if (!color || !volumns) {
      Toast.show({
        icon: 'fail',
        content: '请选择规格'
      });
      return;
    }
    // 应该向服务器发送请求了
      // 模拟获取数据
    if (color && volumns){
      Toast.show({
        icon: 'success',
        content: `颜色:${color};体积:${volumns};数量:${campute}单价${price};总价${(price * campute).toFixed(2)}`
      });
      return;
    }
  };

  return <div className='all-context'>
    <div className='introduce'>
      <div className='all-message'>
        <img src={images[1]} alt="" />
        <div className='text'>
          <p>
            <span>￥</span>
            <span>{parseInt(price)}</span>
            <span>.{/\.(\d{2})/.exec(price)[1]}</span>
          </p>
          <span className='context'>请选择颜色  体积</span>
        </div>
      </div>
    </div>

    <Form
      form={formIns}
      onFinish={onFinish}
      footer={<Button
        block
        type="submit"
        size="large"
        style={{
          backgroundColor: "#19307A",
          color: "white",
          letterSpacing: "0.1rem",
          fontSize: "14px",
        }}
      >
        加入购物车
      </Button>
      }
      initialValues={{
        color: [],
        volumns: [],
        campute: 1
      }}
    >
      <Form.Item name="color" label="颜色" >
        <Selector
          showCheckMark={false}
          options={optionsColor}
          onChange={(val) => {
            changeSelect(val);
            changeVolumnsData(val);
          }}
        />
      </Form.Item>
      <Form.Item name="volumns" label="体积">
        <Selector
          showCheckMark={false}
          options={optionsVolume}
          onChange={changeSelect}
        />
      </Form.Item>
      <Form.Item name="campute" label="购买数量">
        <Stepper min={0} max={1000} />
      </Form.Item>
    </Form>
  </div>
}

export default connect(state => {
  return {
    data: state.data
  }
})(CarDetail)