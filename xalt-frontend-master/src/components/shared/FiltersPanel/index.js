import React, { useState } from 'react';

import { Col } from 'antd';
import When from 'components/shared/When';
import Button from 'components/shared/Button';
import Flex from 'components/shared/Flex';
import Text from 'components/shared/Text';
import { SearchOutlined } from '@ant-design/icons';
import colors from 'lib/theme/colors';
import AscDescFilter from './filters/AscDescFilter';
import DropdownFilter from './filters/DropdownFilter';
import SearchableDropdownFilter from './filters/SearchableDropdownFilter';
import TabsFilter from './filters/Tabs';
import { FilterWrapper, Panel, StyledSearchField, StyledSearchFieldWrapper } from './styles';

export default ({ filters: filtersSettings, clearable, clearableText, onChange }) => {
  const [filters, setFilters] = useState({});
  const [isClearUp, setIsClearUp] = useState();
  const [searchFieldValue, setSearchFieldValue] = useState();

  const onSubmit = (filterName, value) => {
    setIsClearUp(false);

    const newFilters = {
      ...filters,
      [filterName]: value,
    };

    setFilters(newFilters);

    onChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onChange({});
    setIsClearUp(true);
    setSearchFieldValue('');
  };

  const clearSpecificFilters = (filtersToClear, newFilter) => {
    const newFilters = {
      ...filters,
      ...newFilter,
      ...Object.assign({}, ...filtersToClear.map((f) => ({ [f]: undefined }))),
    };
    setFilters(newFilters);
    setIsClearUp(filtersToClear);
    onChange(newFilters);
  };

  const clearableOffset = clearable ? 4 : 0;

  const colOffset =
    24 - clearableOffset - filtersSettings.map(({ span }) => span).reduce((a, b) => a + b);

  return (
    <Panel className="filters-panel">
      {filtersSettings.map(
        ({
          title,
          name,
          tabs,
          options,
          type,
          span,
          onUpdated,
          action,
          noTruncate,
          showDefaultArrow,
        }) => (
          <>
            <When condition={type === 'search'}>
              <Col xl={span} xs={24}>
                <StyledSearchFieldWrapper>
                  <StyledSearchField
                    name={name}
                    placeholder="Type here ..."
                    value={searchFieldValue}
                    onChange={(e) => {
                      onSubmit(name, e.target.value);
                      setSearchFieldValue(e.target.value);
                    }}
                    prefix={<SearchOutlined />}
                  />
                </StyledSearchFieldWrapper>
              </Col>
            </When>
            <When condition={type === 'asc/desc'}>
              <Col xl={span} xs={12}>
                <Flex justifyContent="center">
                  <AscDescFilter
                    title={title}
                    name={name}
                    onChange={(value) => {
                      const filtersToClear = filtersSettings
                        .filter(
                          ({ name: _name, type: _type }) => _type === 'asc/desc' && _name !== name,
                        )
                        .map(({ name: _name }) => _name);

                      clearSpecificFilters(filtersToClear, { [name]: value });
                    }}
                    clearUp={isClearUp}
                    showDefaultArrow={showDefaultArrow}
                  />
                </Flex>
              </Col>
            </When>

            <When condition={type === 'dropdown'}>
              <Col xl={span} xs={12}>
                <Flex justifyContent="center">
                  <DropdownFilter
                    title={title}
                    name={name}
                    options={options}
                    onChange={(value) => onSubmit(name, value)}
                    clearUp={isClearUp}
                    noTruncate={noTruncate}
                  />
                </Flex>
              </Col>
            </When>

            <When condition={type === 'searchable_dropdown'}>
              <Col xl={span} xs={12}>
                <Flex justifyContent="center">
                  <SearchableDropdownFilter
                    title={title}
                    name={name}
                    options={options}
                    onChange={(value) => onSubmit(name, value)}
                    onUpdated={onUpdated}
                    action={action}
                    clearUp={isClearUp}
                  />
                </Flex>
              </Col>
            </When>

            <When condition={type === 'tabs'}>
              <TabsFilter title={title} tabs={tabs} onChange={(value) => onSubmit(name, value)} />
            </When>
          </>
        ),
      )}

      <Col span={colOffset < 0 ? 0 : colOffset} />

      <When condition={clearable}>
        <Col xl={clearableOffset} xs={24}>
          <Flex justifyContent="flex-end">
            <FilterWrapper>
              <div className="selection" />

              <Button bg={colors.transparent} onClick={clearFilters}>
                <Text bold darkPink>
                  {clearableText || 'Clear all'}
                </Text>
              </Button>
            </FilterWrapper>
          </Flex>
        </Col>
      </When>
    </Panel>
  );
};
