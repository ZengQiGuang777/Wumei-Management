import React, { useState } from "react";
import ListItem from "../components/ListItem";
import styled from "styled-components";
import storage from '../assets/storage';

/* 组件私有的样式 */
const TodoBoxStyled = styled.div`
    box-sizing: border-box;
    margin: 20px auto;
    padding: 10px;
    width: 400px;
    border: 1px solid #DDD;

    .handle {
        padding-bottom: 10px;
        border-bottom: 1px dashed #DDD;

        .createBtn {
            margin-left: 20px;
            background: #93d5ed;
            border-color: #8bd5f0;
        }
    }
`;

const TodoList = function TodoList() {
    /* 创建状态 */
    let [text, setText] = useState('');
    let [list, setList] = useState(() => {
        let value = storage.get('totoList');
        return value || [];
    });

    /* 新增任务 */
    const submit = () => {
        if (text === '') {
            alert('请您先输入内容!');
            return;
        }
        list.push({
            id: +new Date(),
            text
        });
        setList([...list]);
        setText('');
        storage.set('totoList', list);
    };

    /* 子组件改变父组件数据 */
    const change = ({ id, text, type }) => {
        // 删除
        if (type === 'delete') {
            list = list.filter(item => {
                return +item.id !== +id;
            });
            setList([...list]);
            storage.set('totoList', list);
            return;
        }
        // 修改
        list = list.map(item => {
            if (+item.id === +id) {
                item.text = text;
            }
            return item;
        });
        setList([...list]);
        storage.set('totoList', list);
    };

    return <TodoBoxStyled>
        <div className="handle">
            <input type="text" className="textInp"
                value={text}
                onChange={ev => {
                    setText(ev.target.value.trim())
                }} />
            <button className="createBtn" onClick={submit}>新建任务</button>
        </div>
        {list.map(item => {
            return <ListItem key={item.id} info={item} change={change} />;
        })}
    </TodoBoxStyled>;
};
export default TodoList;