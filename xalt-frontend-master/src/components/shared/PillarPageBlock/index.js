import React from 'react';

import Container from 'components/shared/Container';
import Flex from 'components/shared/Flex';
import SvgIcon from 'components/shared/SvgIcon';
import {
  BaseTitle,
  BaseText,
  ArticleItemWithImage,
  CardHeaderWrapper,
} from 'components/shared/General';
import image1 from './image-1.png';
import image2 from './image-2.png';
import image3 from './image-3.png';
import image4 from './image-4.png';
import image5 from './image-5.png';
import image6 from './image-6.png';
import image7 from './image-7.png';


const PillarPageBlock = () => (
  <Flex bg="white" pt={[6, null, 10, null, null]} pb={[4, null, 8, null, null]}>
    <Container medium>
      <BaseTitle fontWeight="700" mb={2}>
        Focus on what matters.
      </BaseTitle>
      <BaseText mb={[4, null, 6, null, null]}>
        Everything we do is done with an eye towards transferring knowledge to
        our trainers and members of the optimal way to live the highest quality
        life. xAlt recognizes that the only way to achieve optimum fitness and
        longevity are if you also maximize your sleep, diet/nutrition, stress,
        happiness, and engagement in the community - our pillars.
      </BaseText>
      <ArticleItemWithImage variant="darkPink" image={image1}>
        Our focus demonstrates the interconnectedness of the Pillars of Health
        in achieving optimal physical fitness. If our levels of sleep,
        diet/nutrition, stress, happiness, and connectedness are inadequate, we
        will fail to receive the host of benefits associated with optimal
        physical fitness; we will lack the ability to achieve longevity.
        Awareness of these Pillars will increase the health literacy of our
        members, their capacity to obtain, communicate, process, and understand
        basic health information in order to make appropriate health decisions.
      </ArticleItemWithImage>
      <BaseText mt={[5, 10]} mb={[5, 10]}>
        Awareness is the precondition to change our default behaviours;
        although, it is not enough. Too many health and fitness initiatives
        focus on knowledge only without considering the individual’s motives, or
        their social, cultural, and economic circumstances. The solution is not
        to fix a bad behaviour, but rather to address the chain of events that
        support it. For this to happen, programming needs to be personalized,
        actionable, tracked, and followed up on over time. xAlt has designed
        their dashboard and certified their coaches to make this possible. With
        consistent, individualized, weekly check-ins, clients have coaches who
        understand their needs and motives. Coaches support our members on their
        paths to change the things they can, and work toward teaching them the
        potential of cumulative, small changes in behaviour to produce
        significant health outcomes.
      </BaseText>
      <BaseTitle fontWeight="700" mb={2}>
        Our Pillars
      </BaseTitle>
      <BaseText mb={[4, null, 6, null, null]}>
        Our members do a basic assessment of their knowledge and fitness in each
        of the Pillars of Health. Over the course of a year at xAlt, members
        re-visit their level of understanding of each pillar as it relates to
        their overall health. Tracking this over time will generate awareness of
        the triggers and/or factors that impede one’s health. When individuals
        are more in-tune with their lifestyle and have an understanding of what
        this means, they will be able to intervene and make behavioural changes
        that produce lasting health benefits. xAlt’s objective is to educate our
        coaches on how to interact with our members on a weekly basis such that
        they can successfully take them on a journey to achieve their highest
        levels of fitness, health, and well-being.
      </BaseText>
      <ArticleItemWithImage
        header={
          <CardHeaderWrapper>
            <SvgIcon name="sleep" width="47px" height="44px" />
            <BaseText
              p="0 16px"
              fontSize={['18px', null, '24px']}
              fontWeight="bold"
              lineHeight="24px"
            >
              Sleep
            </BaseText>
          </CardHeaderWrapper>
        }
        variant="blue"
        image={image2}
        imageProps={{ maxWidth: '262px', top: 54, margin: ['0 auto', 'unset'] }}
        textBoxProps={{
          lineHeight: '24px',
          p: [3, 5],
          maxWidth: ['100%', 430, 640, 719],
          top: [0, '18px'],
        }}
        textWrapperProps={{
          maxWidth: ['100%', 430, 640, 719],
          height: ['calc(100% - 180px)', null, 'calc(100% - 36px)'],
        }}
        mb={8}
      >
        Inadequate sleep is directly associated with physical and mental health
        problems. In the short-term, fatigue impairs learning and memory, and
        results in mood changes. Insufficient sleep over the long-term increases
        risk of morbidity and mortality by 15%. A continuous lack of sleep is
        correlated with an increased risk of heart attack, stroke, diabetes,
        obesity, and cancer. Sleep deprivation also increases the risk of mental
        illnesses such as depression, anxiety, dementia, schizophrenia, and
        Alzheimer’s. Inadequate sleep reduces immune functioning and increases
        susceptibility to illnesses such as the flu.It reduces aerobic output,
        decreases peak and sustained muscle strength, and reduces respiration
        capacity.
        <p />
        xAlt wants to ensure clients are getting enough sleep each night to
        enhance their cognitive performance, and ensure their bodies are
        resting, healing, and balanced. xAlt coaches ask clients about their
        sleep every week and continuously remind them of its importance. They
        direct clients to resources that can aid in improving sleep quality.
        When we sleep well, our bodies are energized and alert; we feel happier;
        we are more productive; we take on new challenges and are motivated
        towards achieving our goals. Being able to eat well, move, cope with
        stress, and interact with those around us increases our quality of life,
        well-being, and longevity.
      </ArticleItemWithImage>
      <ArticleItemWithImage
        header={
          <CardHeaderWrapper justifyContent="center">
            <SvgIcon name="diet" width="67px" height="62px" />
            <BaseText
              p="0 16px"
              fontSize={['18px', null, '24px']}
              fontWeight="bold"
              lineHeight="24px"
            >
              Diet and Nutrition
            </BaseText>
          </CardHeaderWrapper>
        }
        variant="yellow"
        image={image3}
        imageProps={{ maxWidth: '100%', top: 54, position: 'static' }}
        textBoxProps={{
          lineHeight: '24px',
          p: [3, 5],
          maxWidth: ['100%', 766, null, 886],
          margin: ['0 auto'],
          top: [0, '-200px', '-72px'],
          right: 'unset',
        }}
        textWrapperProps={{
          maxWidth: ['100%', 766, null, 886],
          top: '542px',
          height: '666px',
        }}
        mb={8}
      >
        The number of people eating healthy foods and getting enough nutrients
        is suboptimal. One in five deaths are linked to poor diet, with
        cardiovascular disease being the largest contributor. A poor diet now
        causes more deaths than smoking and high blood pressure. Suboptimal
        diets are an important preventable risk factor for non-communicable
        diseases. Up to 80% of premature deaths and chronic diseases, such as
        cancer, diabetes, obesity, heart disease, and strokes can be prevented
        by means of diet and lifestyle changes.
        <p />
        The average person eats about 115,000 pounds of food in their lifetime,
        and food is the largest source of exposure our bodies have to the
        outside world, more so than our skin; yet, diet and nutrition is hardly
        the focus for treatments. With the amount of volume and frequency food
        has to interact with our bodies, diet and nutrition should be of
        consideration when improving health outcomes. Eating a health, balanced
        diet is one of the most important things you can do to protect your
        health.
        <p />
        xAlt places the foods we eat as one of the primary drivers of health and
        longevity. We raise awareness that when we eat healthy foods we will
        have energy to be physically active. Our bodies will optimize its
        ability to develop lean muscle mass and burn fat, while properly resting
        and recovering. Nutritional diets will also improve the quality and
        restorativeness of our sleep as proper nutrients provide the brain with
        the chemical environment they need to maintain both adequate sleep and
        build proteins for recovery. Food has the ability to alter our bodies
        internal clocks and metabolism. When we are well rested and energized,
        we are more likely to engage more with those around us, boosting
        happiness and mood and reducing stress. This chain reaction is
        contagious - researchers have proven that who you eat with has a
        significant impact on the types of foods you eat, your overall diet, and
        the activities you engage in.
        <p />
        xAlt coaches continuously remind clients of the importance of healthy
        nutrition and guide them in the direction to make sound decisions. xAlt
        reminds its members that food is our fuel - what we put in, we get out!
      </ArticleItemWithImage>
      <ArticleItemWithImage
        header={
          <CardHeaderWrapper>
            <SvgIcon name="fitness" width="49px" height="47px" />
            <BaseText
              p="0 16px"
              fontSize={['18px', null, '24px']}
              fontWeight="bold"
              lineHeight="24px"
            >
              Physical fitness
            </BaseText>
          </CardHeaderWrapper>
        }
        variant="darkPink"
        image={image4}
        imageProps={{
          maxWidth: ['75%', '492px'],
          maxHeight: ['400px', '86.5%'],
          margin: ['0 auto', 'unset'],
          right: 0,
          left: 'unset',
          zIndex: [1, 2],
          width: ['50%', '100%'],
        }}
        textWrapperProps={{
          maxWidth: 'unset',
          zIndex: [2, 'unset'],
          width: ['calc(100% - 158px)', 'calc(100% - 188px)'],
          height: ['calc(50% - 64px)', 'calc(100% - 64px)'],
          top: ['calc(50% - 34px)', 34],
          left: [68, null, 158],
          right: 'unset',
        }}
        textBoxProps={{
          zIndex: 3,
          top: [0, 48],
          p: [3, 5],
          right: 'unset',
          alignSelf: 'unset',
          width: '100%',
          maxWidth: ['100%', '430px', '580px', '690px'],
          mt: 0,
        }}
        mb={[8, 16]}
      >
        We are spending increasing amounts of time in environments that limit
        physical activity and require prolonged sitting. More than 60% of
        American adults do not engage in the recommended amount of activity, and
        25% do not move at all. At an early age of 40, we begin to experience
        age-related muscle loss, sarcopenia, which is associated with increased
        cardiovascular and all-cause mortality. Regular physical activity is a
        vital element of a healthy lifestyle. Lifelong physical activity
        preserves muscle mass, strength, and mobility, all precursors for
        longevity. Engagement in regular movement prevents the loss of
        functional mobility and independence as we age.
        <p />
        xAlt wants clients to be confident in transmitting forces from the body
        to the outside world and carry loads through their joints in the safest
        manner possible. We empower people to move more and to move with
        confidence. We train our coaches to increase the physical literacy of
        our members, teaching them the host of benefits associated with moving
        more and moving properly. Physical fitness encompasses movement in any
        form; it should be enjoyable, relevant to the client, and doesn't have
        to be structured. Take this example: if an xAlt trainer can work with a
        client to set a goal to improve their hip hinge and move a little more
        such that they can squat down to play with their child and keep up with
        them without debilitating back, knee, or hip pain, their quality of life
        with increase substantially. They will feel happier, less stressed, and
        engage in meaningful relationships.
        <p />
        Optimal levels of strength, mobility, and confidence in movement are
        critical for longevity. xAlt ensures that our approach matches each
        individual's goals, lifestyle, and abilities, to prevent them from being
        discouraged from taking action on their health and behaviours. Moving
        more, in any way possible, is xAlt’s philosophy. The theme of increased
        health-span and life-span are interwoven with every aspect of xAlt.
      </ArticleItemWithImage>
      <ArticleItemWithImage
        header={
          <CardHeaderWrapper>
            <SvgIcon name="stress" width="57px" height="49px" />
            <BaseText
              p="0 16px"
              fontSize={['18px', null, '24px']}
              fontWeight="bold"
              lineHeight="24px"
            >
              Stress
            </BaseText>
          </CardHeaderWrapper>
        }
        variant="blue"
        image={image5}
        imageProps={{
          maxWidth: ['100%', '90%'],
          top: [0, -200, -73],
          margin: '0 auto',
          position: 'relative',
          zIndex: [1, 2],
        }}
        textBoxProps={{
          lineHeight: '24px',
          p: [3, 5],
          maxWidth: '100%',
          margin: ['0 auto'],
          top: [0, '-200px', '-72px'],
          right: 'unset',
        }}
        textWrapperProps={{
          maxWidth: ['100%', '90%'],
          top: ['661px', null, null, '641px'],
          height: '366px',
        }}
        mb={[4, 0, 8]}
        isBottomImage
      >
        Stress is a normal part of life; it’s our bodies physical, mental, and
        emotional response to changes in the environment. However, when stress
        is prolonged over time, or chronic, it alters the body’s natural
        functioning and processes, compromising both physical and mental health.
        The morbidity and mortality due to stress-related illness are alarming.
        75-90% of all human diseases are related to the activation of the stress
        system.
        <p />
        Continuous stress causes chronic inflammation, the primary component of
        irregular body functioning and chronic disease. People under stress are
        more likely to have impaired immune systems as the body has a greater
        inability to initiate an effective reaction, resulting in more frequent
        illness. Chronic stress is correlated with an increased risk of
        cardiovascular disease, cancer, diabetes, stomach ulcers, colitis,
        fatigue, musculoskeletal pain, headaches, and asthma. Stress also alters
        aspects of brain functioning such as memory and cognition, and increases
        risk of depression and anxiety.
        <p />
        When we are stressed our bodies enter a vicious cycle of unhealthy
        behaviours. We have less energy to mobilize towards physical activity;
        however, stress breaks down tissues in our bodies, including our
        muscles. Being stressed makes it hard to sleep, and not enough sleep is
        a stressor. Our food choices tend towards heavy amounts of
        carbohydrates, saturated fats, and salt, with an increase in caloric
        intake. When we are stressed we tend to isolate ourselves, but isolation
        is stress to the body.
        <p />
        The key to optimizing health is knowing how to cope with stressors.
        Focusing on feelings of control, having outlets for frustration, and
        social connectedness are highly recommended strategies. xAlt strives to
        help clients identify their sources of stress and come up with effective
        means to manage them. We make our members aware of how they sleep, eat,
        engage, and move, and how these directly impact how they experience and
        handle stress.
      </ArticleItemWithImage>
      <ArticleItemWithImage
        header={
          <CardHeaderWrapper justifyContent="center">
            <SvgIcon name="community" width="64px" height="60px" />
            <BaseText
              p="0 16px"
              fontSize={['18px', null, '24px']}
              fontWeight="bold"
              lineHeight="24px"
            >
              Community
            </BaseText>
          </CardHeaderWrapper>
        }
        variant="yellow"
        image={image6}
        imageProps={{
          maxWidth: ['100%', '433px'],
          maxHeight: ['400px', '1000px'],
          width: ['50%', '100%'],
          margin: ['0 auto', 'unset'],
          zIndex: [1, 2],
        }}
        textBoxProps={{
          lineHeight: '24px',
          p: [3, 5],
          maxWidth: ['100%', '470px', '620px', '730px'],
          zIndex: 3,
          right: 0,
          mt: 0,
        }}
        textWrapperProps={{
          right: 150,
          zIndex: 1,
          top: '14px',
          maxWidth: ['100%', '370px', '520px', '730px'],
        }}
        mb={8}
      >
        The single most consistent factor to a happy and healthy life depends on
        your relationship with others. Humans are physiologically, biologically,
        and fundamentally social. Social interaction and human connection are
        core human needs and are necessary for optimal brain health. We are
        brought into the world through interaction and our brains have evolved
        and are wired for intricate communication to promote a sense of safety,
        belonging, and security.
        <p />
        Human connection reinforces and contributes to health and longevity,
        while feeling lonely increases our risk for mortality by 50%. The fewer
        social relationships a person has, the shorter their life expectancy and
        the worse the impact of various diseases. One of the most notable
        impacts of a lack of loneliness is that it raises levels of inflammation
        and lower levels of dopamine throughout the body, down-regulating viral
        protection. A sense of belonging and social support fosters resilience
        and reduces the risk for developing illness. Relationships are, thus,
        medically protective. A sense of community enables mental both physical
        and mental health.
        <p />
        Communities provide us with belonging, support, and purpose. Interacting
        with others gives us purpose when we embed ourselves in communities
        where we feel a true sense of belonging. Social support makes us feel
        cared for and safe. Without a sense of community we cannot have good
        mental health, and without mental health, we cannot successfully work
        towards improving other aspects of our lives. This effect ripples and
        affects health outcomes like our sleep quality, nutritional food
        choices, ability to cope with stress, and motivation to engage in
        physical activity.
        <p />
        Community is a key pillar to good health but is bound by complexity that
        may be difficult to address without energy and optimism. For this
        reason, xAlt’s goal is to help our members achieve vitality, mental
        clarity, and the positivity needed to become thriving members of their
        community. In turn, connection to others will reinforce and maximize
        health outcomes. xAlt cultivates the relationships that drive both
        physical and psychological health outcomes. The simple act of checking
        in with people, which xAlt coaches do once a week with their clients,
        shifts our values away from depression-generating messaging that causes
        us to seek happiness in the wrong places, to more meaningful and
        authentic values that lifts us out of negative mentalities. We strive to
        create a community of people engaging in like-behaviours that will be
        contagious to improving health and longevity.
      </ArticleItemWithImage>
      <ArticleItemWithImage
        header={
          <CardHeaderWrapper>
            <SvgIcon name="happiness" width="66px" height="66px" />
            <BaseText
              p="0 16px"
              fontSize={['18px', null, '24px']}
              fontWeight="bold"
              lineHeight="24px"
            >
              Happiness
            </BaseText>
          </CardHeaderWrapper>
        }
        variant="darkPink"
        image={image7}
        imageProps={{
          maxWidth: ['75%', '492px'],
          maxHeight: ['400px', '86.5%'],
          margin: ['0 auto', 'unset'],
          right: 0,
          left: 'unset',
          zIndex: [1, 2],
          width: ['50%', '100%'],
        }}
        textWrapperProps={{
          maxWidth: 'unset',
          zIndex: [2, 'unset'],
          width: ['calc(100% - 158px)', 'calc(100% - 188px)'],
          height: ['calc(50% - 64px)', 'calc(100% - 64px)'],
          top: ['calc(50% - 34px)', 34],
          left: [68, null, 158],
          right: 'unset',
        }}
        textBoxProps={{
          zIndex: 3,
          top: [0, 48],
          p: [3, 5],
          right: 'unset',
          alignSelf: 'unset',
          width: '100%',
          maxWidth: ['100%', '430px', '580px', '690px'],
          mt: 0,
        }}
        mb={[4, 8]}
      >
        Being happier doesn’t just make you feel better - it actually brings a
        host of potential health benefits. The physical health benefits
        surrounding happiness include a stronger immune system, stronger
        resilience in the face of stress, a stronger heart and less risk of
        cardiovascular disease, as well as quicker recovery times when
        overcoming illness.
        <p />
        Happiness prompts individuals to engage in a range of lifestyle habits
        that are positive for their overall health and well-being, including
        physical activity, eating healthy, not smoking, and sleeping well. One
        of the most interesting findings from current research for health
        benefits of happiness is its connection with life longevity. Because of
        the impacts happiness has engaging in lifestyle behaviours that promote
        positive health outcomes, it can help you live a longer life.
        <p />
        Behaviours that are scientifically linked to improved happiness and
        well-being include being kind, connecting with others, valuing time,
        practicing gratitude, getting more sleep, eating better, exercising, and
        being outdoors. This is the essence of xAlt. We empower our members to
        be aware of their current lifestyles and health outcomes, and work with
        their coach to make positive changes, over time. xAlt helps people
        recognize that the only way to better their health and achieve longevity
        is that happiness is interconnected to our ability to achieve all of the
        other pillars of health. With greater understanding and awareness, xAlt
        strives to change lives.
      </ArticleItemWithImage>
    </Container>
  </Flex>
);

export default PillarPageBlock;
