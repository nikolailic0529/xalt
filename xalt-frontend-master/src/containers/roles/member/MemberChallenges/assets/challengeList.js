// External Imports
import React from 'react';
import { Box } from '@material-ui/core';

// Internal Imports
import materialStyles from "../materialStyles";
import ChallengeListEntry from "./challengeListEntry";

const ChallengeList = (props) => {
    const listOfChallenges = props.listOfChallenges;

    const classes = materialStyles();

    const challengeListEntries = () => {
        return listOfChallenges.map((challenge, idx) => {
            return <li key={challenge.id}><ChallengeListEntry challenge={challenge} idx={idx}/></li>
        })
    }

    return (<Box className={classes.challengeList}>
        {challengeListEntries()}
    </Box>);
}


export default ChallengeList;