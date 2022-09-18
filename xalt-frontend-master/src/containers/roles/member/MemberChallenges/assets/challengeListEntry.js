// External Imports
import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

// Internal Imports
import materialStyles from "../materialStyles";
import ButtonAux from 'components/shared/ButtonAux';
import ChallengesActions from 'lib/redux/reducers/challenges';


const ChallengeListEntry = ({ currentChallenge, challenge, idx, setCurrentChallenge}) => {
    const classes = materialStyles();

    var style = idx % 2 == 0 ? classes.challengeEntry1 : classes.challengeEntry2;
    if (currentChallenge && currentChallenge.id == challenge.id) {
    style = idx % 2 == 0 ? classes.challengeEntrySelected1 : classes.challengeEntrySelected2;
    }
    return (
    <ButtonAux
        className={style}
        onClick={() => {
        if ( currentChallenge && currentChallenge.id == challenge.id) {
            setCurrentChallenge(null);
        } else {
            setCurrentChallenge(challenge);
        }
        }}
    >
        <Box className={classes.challengeEntryNames}>
        <Box className={classes.challengeEntryName}>{challenge.name}</Box>
        <Box className={classes.challengeEntryUsername}>{challenge.user.name}</Box>
        </Box>
        <Box className={classes.challengeEntryParticipantCount}>
        Participants: {challenge.user_member_challenges.length}
        </Box>
    </ButtonAux>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentChallenge: state.challenges.currentChallenge,
        challenge: ownProps.challenge,
        idx: ownProps.idx,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        setCurrentChallenge: (data) => dispatch(ChallengesActions.setCurrentChallengeRequest(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeListEntry);