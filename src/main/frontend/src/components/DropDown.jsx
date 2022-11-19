import React, {useState} from "react";
import styled, { css } from "styled-components";
import useDetectClose from "../hooks/useDetectClose";


const DropDown = ({year, yearList, selectYear}) => {
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);

  return (
    <Wrapper>
      <DropdownContainer>
        <DropdownButton onClick={myPageHandler} ref={myPageRef}>
          {year}
        </DropdownButton>
        <Menu isDropped={myPageIsOpen}>
          <Ul>
            {yearList.map(item =>
              <Li>
                <LinkWrapper key={item} onClick={selectYear} item={item} >{item}</LinkWrapper>
              </Li>
            )}
          </Ul>
        </Menu>
      </DropdownContainer>

    </Wrapper>
  );
};

export default DropDown;

const Wrapper = styled.div`
`;

const DropdownContainer = styled.div`
  position: relative;
  
  width: 51px;
  height: 19px;
  text-align: center;
  align-items: center;
  justify-content: center;

  background: rgba(102, 160, 145, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  display: flex;

  color: #FFFFFF;
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

const Menu = styled.div`
  background: rgba(102, 160, 145, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: absolute;
  top: 40px;
  left: 50%;
  width: 51px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: rgba(102, 160, 145, 0.8);;
  }

  ${({ isDropped }) =>
  isDropped &&
  css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 6px;
  }

  & > li:first-of-type {
    margin-top: 6px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li``;

const LinkWrapper = styled.div`
  font-size: 12px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  text-decoration: none;
  color: #ffffff;
`;

