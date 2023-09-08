import { createStore } from 'redux';
import rootReducer from './reducer';

const store = createStore(rootReducer);

// 存储的JSON数据
const jsonData = {
  "id": "500700556000",
  "name": "快涂宝面层腻子粉",
  "sold": 34,
  "images": [
    "https://ysg-tsp.obs.cn-north-4.myhuaweicloud.com/1ecea349-a411-4b4d-990d-80fa320101c0.png",
    "https://s1.ax1x.com/2022/10/09/xJIKU0.png",
    "https://s1.ax1x.com/2022/10/09/xJIKU0.png",
    "https://s1.ax1x.com/2022/10/09/xJIKU0.png"
  ],
  "thumbnail": "https://ysg-tsp.obs.cn-north-4.myhuaweicloud.com/b13680e9-231e-4f81-9c84-1cb8f7256f96.jpeg",
  "skus": [
    {
      "inventory": 10,
      "price": 820,
      "id": "500700556001",
      "attributes": [
        {
          "type": "颜色",
          "value": "红色"
        },
        {
          "type": "体积",
          "value": "1L"
        }
      ]
    },
    {
      "inventory": 10,
      "price": 822,
      "id": "500700556002",
      "attributes": [
        {
          "type": "颜色",
          "value": "奶白色"
        },
        {
          "type": "体积",
          "value": "1L"
        }
      ]
    },
    {
      "inventory": 3,
      "price": 850,
      "id": "500700556003",
      "attributes": [
        {
          "type": "颜色",
          "value": "金色"
        },
        {
          "type": "体积",
          "value": "1L"
        }
      ]
    },
    {
      "inventory": 2,
      "price": 1610,
      "id": "500700556004",
      "attributes": [
        {
          "type": "颜色",
          "value": "红色"
        },
        {
          "type": "体积",
          "value": "2L"
        }
      ]
    },
    {
      "inventory": 5,
      "price": 1620,
      "id": "500700556005",
      "attributes": [
        {
          "type": "颜色",
          "value": "奶白色"
        },
        {
          "type": "体积",
          "value": "2L"
        }
      ]
    }
  ]
}

// 将数据存储到Redux状态容器中
store.dispatch({ type: 'ADD_DATA', payload: jsonData });

export default store;