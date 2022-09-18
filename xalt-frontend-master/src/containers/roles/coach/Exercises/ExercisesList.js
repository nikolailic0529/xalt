import React, { useEffect, useState } from 'react';
import VideoPreview from 'components/VideoPreview';
import { Col, Row, Empty } from 'antd';
import FiltersPanel from 'components/shared/FiltersPanel';
import Flex from 'components/shared/Flex';
import When from 'components/shared/When';
import ExercisesActions from 'lib/redux/reducers/exercises';
import { EXERCISE_OPTIONS } from 'lib/constants';
import ButtonAux from 'components/shared/ButtonAux';
import SvgIcon from 'components/shared/SvgIcon';

import styled from 'styled-components';
import colors from 'lib/theme/colors';
import { connect } from 'react-redux';

const FiltersPanelWapper = styled.div`
  margin: 1.5rem 0rem 0.5rem 0rem;

  @media (min-width: 1200px) and (max-width: 1630px) {
    .filters-panel span {
      font-size: 12px;
    }
  }
`;

const ExerciseChoice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const ChooseWarning = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: ${colors.darkPink};
  padding: 0 12px;
  margin-left: 0;
`;

const WarningWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ActionButtons = styled.div`
  width: 25%;
  min-width: 275px;
  display: flex;
  justify-content: space-between;
`;

const Exercises = (props) => {
  const {
    getAllExercisesRequest,
    getMyExercisesRequest,
    my,
    competition,
    exercises,
    profile,
    setVisible,
    chooseExercise,
  } = props;

  const [currentExercise, setCurrentExercise] = useState({});

  useEffect(() => {
    if (competition) {
      getAllExercisesRequest({ is_competition: true });
    } else {
      getAllExercisesRequest({});
    }
  }, [competition]);

  // const [page, setPage] = useState(0);
  // const PER_PAGE = 6;

  const getSort = ({ name, created_at }) => {
    if (name) {
      return name === 'asc' ? 'name' : '-name';
    }
    if (created_at) {
      return created_at === 'asc' ? 'created_at' : '-created_at';
    }
  };

  const applyFilters = (filters) =>
    my
      ? getMyExercisesRequest({
          search_string: filters.search_string,
          difficulty: filters.difficulty,
          categorie: filters.categorie,
          equipment: filters.equipment,
          sort: getSort(filters),
          coach_id: profile.id,
        })
      : competition
      ? getAllExercisesRequest({
          search_string: filters.search_string,
          difficulty: filters.difficulty,
          categorie: filters.categorie,
          equipment: filters.equipment,
          sort: getSort(filters),
          is_competition: true,
        })
      : getAllExercisesRequest({
          search_string: filters.search_string,
          difficulty: filters.difficulty,
          categorie: filters.categorie,
          equipment: filters.equipment,
          sort: getSort(filters),
        });

  const addExercise = () => {
    chooseExercise(currentExercise);
    setVisible(false);
  };

  const goBack = () => {
    setVisible(false);
  };

  return (
    <>
      <FiltersPanelWapper>
        {chooseExercise && (
          <>
            <ExerciseChoice>
              <WarningWrapper>
                <SvgIcon name="warning" width="24px" height="24px" />
                <ChooseWarning>
                  If you want to upload a new exercise, you should go to exercises and upload it
                  there first.
                </ChooseWarning>
              </WarningWrapper>
              <ActionButtons>
                <ButtonAux pinkBrdrBtn onClick={goBack}>
                  Cancel
                </ButtonAux>
                <ButtonAux pinkBtn onClick={addExercise}>
                  Add exercise
                </ButtonAux>
              </ActionButtons>
            </ExerciseChoice>
            <br />
          </>
        )}
        <FiltersPanel
          onChange={applyFilters}
          filters={[
            {
              name: 'search_string',
              type: 'search',
              span: 7,
            },
            {
              name: 'created_at',
              title: 'Date',
              type: 'asc/desc',
              showDefaultArrow: true,
              span: 2,
            },
            {
              name: 'name',
              title: 'A to Z',
              type: 'asc/desc',
              showDefaultArrow: true,
              span: 2,
            },
            {
              name: 'difficulty',
              title: 'Level',
              type: 'dropdown',
              span: 2,
              options: EXERCISE_OPTIONS.DIFFICULTIES,
            },
            {
              name: 'categorie',
              title: 'Target Joint',
              type: 'dropdown',
              span: 4,
              options: EXERCISE_OPTIONS.CATEGORIES,
              noTruncate: true,
            },
            {
              name: 'equipment',
              title: 'Equipment',
              type: 'dropdown',
              span: 3,
              options: EXERCISE_OPTIONS.EQUIPMENTS,
            },
          ]}
          clearable
          clearableText="Show All"
        />
      </FiltersPanelWapper>

      <Row gutter={16}>
        {exercises.map((exercise) => (
          <Col
            className={exercise.id === currentExercise.id ? 'active' : ''}
            key={exercise.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={4.5}
            xxl={4}
          >
            <VideoPreview
              isChooseMode={chooseExercise}
              setCurrentExercise={setCurrentExercise}
              data={exercise}
              lockable={my}
            />
          </Col>
        ))}
      </Row>

      <When condition={!exercises.length}>
        <Flex className="h-100" alignItems="center" justifyContent="center">
          <Empty />
        </Flex>
      </When>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  exercises: state.exercises.exercises || [],
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMyExercisesRequest: (filters) => dispatch(ExercisesActions.getMyExercisesRequest(filters)),
  getAllExercisesRequest: (filters) => dispatch(ExercisesActions.getAllExercisesRequest(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);
