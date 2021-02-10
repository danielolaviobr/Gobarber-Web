import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 144px;
    background-color: #28262e;
    display: flex;

    a {
      text-decoration: none;
      align-self: center;
      margin-right: auto;
      margin-left: 161px;
      color: #999591;
      height: 50px;
      width: 50px;

      svg {
        height: 32px;
        width: 32px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    div:nth-child(5) {
      margin-top: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    height: 186px;
    width: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 48px;
    width: 48px;
    background: #ff9000;
    border-radius: 50%;
    border: 0;
    transition: background-color 0.2s;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
