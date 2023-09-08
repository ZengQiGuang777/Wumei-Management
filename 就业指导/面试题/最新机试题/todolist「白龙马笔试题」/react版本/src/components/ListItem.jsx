import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

/* 组件私有的样式 */
const ItemBoxStyled = styled.div`
    margin: 15px 0;
    .content {
        margin-bottom: 5px;
        .textCon {
            line-height: 30px;
        }
    }
    .btnBox {
        button {
            margin-right: 10px;
        }
    }
`;

const ListItem = function ListItem(props) {
    const { info, change } = props;
    let [text, setText] = useState(info.text),
        [isUpdate, setUpdate] = useState(false);

    return <ItemBoxStyled>
        <div className="content">
            {isUpdate ?
                <input type="text" className="textInp"
                    value={text}
                    onChange={ev => {
                        setText(ev.target.value.trim())
                    }} /> :
                <span className="textCon">{text}</span>
            }
        </div>
        <div className="btnBox">
            <button className="delete" onClick={() => {
                let flag = window.confirm('您确定要删除此数据吗？');
                if (!flag) return;
                change({
                    id: info.id,
                    type: 'delete'
                });
            }}>
                删除
            </button>

            <button className="update" onClick={() => {
                if (!isUpdate) {
                    setUpdate(true);
                    return;
                }
                if (text === '') {
                    alert('请您先输入内容');
                    return;
                }
                change({
                    id: info.id,
                    text,
                    type: 'update'
                });
                setUpdate(false);
            }}>
                {isUpdate ? '确定' : '修改'}
            </button>

            {isUpdate ? <button className="update" onClick={() => {
                setUpdate(false);
                setText(info.text);
            }}>取消</button> : null}
        </div>
    </ItemBoxStyled>;
};
ListItem.defaultProps = {};
ListItem.propTypes = {
    info: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired
};

export default ListItem;
