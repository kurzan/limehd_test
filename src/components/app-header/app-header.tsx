import { Search } from "../search/search";
import logo from '../../images/logo.png';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: center;
  background-color: #2C2C33;
  box-shadow: 0px 4px 8px rgba(18, 18, 20, 0.1);
`

export const AppHeader = () => {
  return (
    <Header>
      <img src={logo} alt="logo" />
      <Search placeholder='Поиск телеканалов'/>
    </Header>
  )
};