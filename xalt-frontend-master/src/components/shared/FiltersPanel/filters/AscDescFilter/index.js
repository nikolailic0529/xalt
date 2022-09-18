import React, { useEffect, useState } from 'react';
import Flex from 'components/shared/Flex';
import Text from 'components/shared/Text';
import When from 'components/shared/When';
import { FilterWrapper } from 'components/shared/FiltersPanel/styles';
import { Wrapper, ArrowDownOutlinedIcon, ArrowUpOutlinedIcon } from './styles';

export default ({ title, name, onChange, defaultValue, clearUp, showDefaultArrow }) => {
  const [sortType, setSortType] = useState(defaultValue);

  const toggle = () => {
    const newSortType = sortType === 'desc' ? 'asc' : 'desc';

    setSortType(newSortType);
    onChange(newSortType);
  };

  useEffect(() => {
    if (clearUp) {
      if (Array.isArray(clearUp)) {
        if (clearUp.includes(name)) {
          setSortType(null);
        }
      } else {
        setSortType(null);
      }
    }
  });

  return (
    <FilterWrapper>
      <When condition={sortType}>
        <div className="selection" />
      </When>
      <Wrapper onClick={toggle}>
        <Flex alignItems="center">
          <Text>{title}</Text>

          <When condition={sortType === 'desc' || (!sortType && showDefaultArrow)}>
            <ArrowDownOutlinedIcon />
          </When>

          <When condition={sortType === 'asc'}>
            <ArrowUpOutlinedIcon />
          </When>
        </Flex>
      </Wrapper>
    </FilterWrapper>
  );
};
