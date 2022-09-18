import React, { useState } from 'react';
import { ChallengeCardWrapper, ImageRight, ImageLeft } from './styles';
import card1 from './card-image-1.png';
import card2 from './card-image-2.png';
import Container from '../../../components/shared/Container';



const ChallengeCards = () => {

    return(
        <ChallengeCardWrapper id='Wrapper'>
            <Container id='Container' medium>
        <ImageRight id='ImgRight'
          text="Companies who implement workplace fitness challenges produce employees that are 66% more productive."
          image={card1}
          />
        <ImageLeft id='ImgLeft'
          flexDirection="reverse"
          text="Engaged employees boost company profitability by 21%."
          image={card2}
          />
          </Container>
          </ChallengeCardWrapper>
    )
}

export default ChallengeCards;