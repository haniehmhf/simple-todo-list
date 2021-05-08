import React from 'react';
import styled from 'styled-components'

const HeaderStyle = styled.div`
    width:100%;
    height:40px;
    font-size:1rem;
    font-weight:700;
    background-color: var(--primary-color);
    color:var(--color-1);
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:6px;
`;


const Header = () => {
    return(
        <HeaderStyle>Todo List</HeaderStyle>
    )
}
export default Header