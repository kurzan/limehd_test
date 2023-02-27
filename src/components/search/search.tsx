import { FC, useContext, useRef } from 'react';
import search_img from '../../images/search.svg';
import { FilterContext } from '../../services/appContext';
import styled from 'styled-components';

type TSearch = {
  placeholder: string;
};

const SearchContainer = styled.div`
  display: inline-flex;
  height: 70px;
  width: 100%;
  align-items: center;
  border: 0;
  border-radius: 16px;
  padding: 10px;
  background-color: #484E53;
  box-sizing: border-box;
  margin-left: 32px;
  margin-right: 32px;
`;

const SearchInput = styled.input<TSearch>`
  border: 0;
  outline: none;
  width: 100%;
  color: #BCC5CD;
  background-color: #484E53;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  border: 0; 

  &::placeholder {
    color: #BCC5CD;
  }

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 10px;
  order: -1;
`;

export const Search: FC<TSearch> = ({ placeholder }) => {

  const { setFilter } = useContext(FilterContext);
  const ref = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <SearchContainer tabIndex={-1}>
      <SearchInput ref={ref} placeholder={placeholder} onChange={onChange} />
      <SearchIcon src={search_img} alt="search"/>
    </SearchContainer>
    )
};
