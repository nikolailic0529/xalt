const Exercises = {
  glute_bridge: {
    muscle: 'Hamstrings',
    exercise: 'Glute Bridge',
    muscleDescription:
      'Hamstrings act to bend the knee and extend the hip, and also stabilize the knee. They play a significant role in daily activities such as walking, running, and jumping. The hamstrings acts eccentrically to slow the leg and prepare the leg for ground contact during any daily movements. Having strong hamstrings will reduce the risk of injury and help to maintain posture.',
    exerciseDescription: `Begin with the client lying on their back with their knees bent to roughly 90 degrees, maintaining feet flat on the floor and legs shoulder-width apart, arms at a 45-degree angle away from their midline. Client’s should maintain five points of contact: feet, glutes, back, shoulders, and head. 
        Instruct the client to stiffen their core and abdominal muscles (“bracing) to stabilize their spine. Have them drive their hands and feet into the ground, maintaining their shoulders and head on the floor as they raise their hips. While raising their hips to full extension, ensure they drive their knees outward while contracting their glutes.
        Once the client is in full extension, initiate the downward movement by having them slowly lower their hips. Cue them to focus on maintaining a neutral spine as they make their way down to the starting position.`,
    variations: ['Elevated glute bridge', 'Banded glute bridge', 'Single leg glute bridge'],
    minimumValue: 0,
    units: 'seconds',
    type: 'Strength',
  },
  squat: {
    muscle: 'Quadriceps',
    exercise: 'Body Weight Squat',
    muscleDescription:
      'Squatting is a basic movement necessary for everyday function (think of getting in and out of a desk chair). The body weight squat is a great exercise to engrain proper mechanics with minimal risk of injury while strengthening the quads, glutes, and core. The bodyweight squat also aids in reducing the risk of knee and aknle injury. It is a perfect symmertrical exercise that allows the body to build muscle and ligament strength necessary to prevent injury and move with no pain.',
    exerciseDescription: `Have the client begin standing with their feet slightly wider than hip-width, with toes turned slightly outwards and hands by their sides so palms are facing inwards. Depress and retract the scapulae (pull shoulders down and back). Instruct the client to stiffen their core/abdominal muscles (“bracing”) to stabilize the spine. Their chest should be held up and out, with head titled slightly up, and their weight shifted back into their heels while pushing hips towards the wall behind them.
        Begin their downward phase by having them shift their hips backward, then downwards, to create a hinge-like movement at the hips and knees. As they lower their hips the knees will then start to shift forward slowly; cue them to control the amount of forward translation (movement) of the tibia (shinbone) and continue bracing to keep their back flat. 
        The client will continue to lower until their thighs are parallel, or almost parallel, with the floor, or until the torso begins to round/flex forward. Monitor their feet, ankles, and knees, ensuring that the feet don't move, the ankles do not collapse in or out and the knees remain aligned over toes. Bodyweight should be evenly distributed between the balls and heels of the feet.
        While maintaining form, instruct the client to exhale and extend their hips and knees by pushing their feet into the floor through their heels. Their hips and torso need to rise together while keeping the heels flat on the floor and knees aligned over the toes. Continue extending until they reach your starting position.
        `,
    variations: ['Sit to stand squat', 'Banded squat'],
    minimumValue: 0,
    units: 'repetitions',
    type: 'Strength',
  },
  wrist_curl: {
    muscle: 'Forearms',
    exercise: 'Wrist Curl',
    muscleDescription: `Peforming exercises that target muscles of the forearm provides a structural bridge between the upper arm bone and forearm. It increases one's ability to lift heavier weights, as grip strength increases, as well as corrects muscle imbalances between flexor and extensor muscles.`,
    exerciseDescription: `Elbows resting on thighs or bench at a 90° bend. Curl wrists up away from the ground`,
    variations: ['Palms up', 'Palms down'],
    minimumValue: 0,
    units: 'repetitions',
    type: 'Strength',
  },
  bicep_curl: {
    muscle: 'Biceps',
    exercise: 'Bicep Curl',
    muscleDescription:
      'The bicep curl helps to strengthen the arms, which can boost athletic performance and facilitate daily activities, such as picking up objects or carrying around children. Biceps collaborate in forearm supinatino, elbow flexion, and shoulder stabilization; thus, having stronger biceps is essential to maintain a healthy upper body.',
    exerciseDescription: `The client will begin standing with the center of a resistance band under one foot, grasping the handles with one in each hand. They can also hold a dumbbell, canvas grocery bag, or any other type of weight. 
        With palms facing the ceiling, instruct them to bend at the elbow to bring their hands toward their shoulders. Have their elbow kept in close to their sides through the movement, and guide them to slowly lower back down to complete the repetition.`,
    variations: ['Isometric bicep contraction'],
    minimumValue: 0,
    units: 'repetitions',
    type: 'Strength',
  },
  dips: {
    muscle: 'Triceps',
    exercise: 'Body Weight Bench Dips',
    muscleDescription:
      'Increasing tricep strength and endurance brings stability to the shoulders and arms, improves flexibility, and increases range of motion. Sufficient shoulder stability and elbow extension are needed to complete daily tasks and to perform well during activity.',
    exerciseDescription: `Instruct the client to sit down on a bench, or another sturdy surface, such as a chair or stairs, with their hands next to their thighs. They will then walk their feet out and extend their legs, lifting their bottom off of the surface of the bench, holding there with extended arms. Their arms should be shoulder-width apart on the surface. Cue them to bend at the elbow, lower their body as far down as they can go, or until the arms form a 90-degree angle. Tell the client to push through their plams back to the start. be sure to remind the client to keep their chest and chin up during the movement.`,
    variations: ['Bent knees', 'Straight legs', 'Single leg elevation', 'Elevated'],
    minimumValue: 0,
    units: 'repetitions',
    type: 'Strength',
  },
  y_raise: {
    muscle: 'Rotator Cuff',
    exercise: 'Standing Y-Raise',
    muscleDescription:
      'The 4 muscles that make up the rotator cuff play an intricate role in stabilizing the shoulder and supporting sufficient range of motion. A strong rotator cuff is necessary to prevent pain in the shoulder caused by a lack of control and stability. ',
    exerciseDescription: `The client begins standing with their feet shoulder-width apart and holding dumbbells in each hand with palms facing their hips. Instruct them to raise the dumbbells about their head, with their palms facing each other, and form a "Y" with their body. They will lower the dumbbells to starting position. Ensure their shoulder are down and back during the movement.`,
    variations: [],
    minimumValue: 0,
    units: 'seconds',
    type: 'Strength',
  },
  hip_thrust: {
    muscle: 'Glutes',
    exercise: 'Hip Thrust',
    muscleDescription:
      'Proper glute engagement is so important for pain-free movement, especially in the knees and back. Glute bridges are often part of a physical therapy regimen to decrease knee or back pain, but can double as a strength exercise for most. This exercise stabilizes the core, pelvis, and lower body which is necessary to perform daily activities such as hinging (bending) at the hips to pick up an item. According to Peter Attia, 80% of morbility comes from not being able to hip hinge correctly, making the glute bridge a perfect foundational movement. ',
    exerciseDescription: `Sit on the ground with a bench behind you, bending your knees so your feet are planted on the ground and holding a barbell resting below your hips. Lean back so your shoulders are on the bench and position the bar above your hips. Drive your hips up lifting the bar. In the top position your knees should be bent at 90° and your shoulders should be near the top of the bench, with your body forming a straight line between them. Pause at the top of the lift and squeeze your glutes, then lower your hips slowly.`,
    variations: ['Single-leg', 'Two-leg'],
    minimumValue: 0,
    units: 'repetitions',
    type: 'Strength',
  },
  calf_raise: {
    muscle: 'Calves',
    exercise: 'Calf Raise',
    muscleDescription:
      'Strong calf muscles result in better stability and balance, decrease risk of ankle and knee injuries, and better agility when running and jumping. Having sufficient ankle stabiliy and control is necessary to safely and effectively perform other exercises, especially with a load.',
    exerciseDescription: `Begin with the client standing feet hip width apart, and instruct them to stand tall, engage their core. The client can rest their hands on a wall or sturdy object for balance if needed. Instruct them to raise their heel a few inches above the ground so that they are on their tiptoes. To return to the starting position, the client will lower their heel down slowly. Cue the client to lift as high as they can on their toes and lower as much as their ankle flexibility allows, as well as to push evenly through the entire width of the foot.`,
    variations: ['Elevated', 'Single-leg'],
    minimumValue: 0,
    units: 'repetitions',
    type: 'Strength',
  },
  push_up: {
    muscle: 'Chest',
    exercise: 'Push-Up',
    muscleDescription:
      'Traditional push-ups are beneficial for building upper body strength. Simply holding the top of a push-up position forces the body to work against gravity, placing emphasis on stabilizing the scapula and spine. When performed properly, push-ups can also strengthen the lower back and core by engaging the abdominal muscles. Because push-ups are a compound exercise they elicit multiple benefits: (1) you train the most important muscles at once; (2) as you lower to the ground and push back up, the muscles are stretched which not only improves flexibility, but prevents innjury; (3) large muscle groups working causes the heart to work more to deliver adequate O2 levels to the working muscle, which improves cardiovascular health and promotes the reduction of body fat; (4) protects the shoulder joints from injury; and (5) strengthens back/core muscles to improve posture and prevent low back injuries.',
    exerciseDescription: `The client will begin kneeling on an exercise mat or floor, bringing their feet together behind them
        They will slowly bend forward to place their palms flat on the mat, positioning their hands shoulder-width apart with fingers facing forward or turned slightly inward. Then, they will slowly shift their weight forward until their shoulders are positioned directly over their hands. Cue them to reposition their hands as needed to allow full extension of their body without any bend at the hips or knees. Instruct the client to stiffen (“brace”) their torso by squeezing the core/abdominal muscles, glutes, and quadriceps, keeping head aligned with spine. The client’s feet are placed together with ankles dorsiflexed (toes pointed towards shins).
        Downward Phase: the client’s body slower lowers towards the floor while maintaining a rigid torso and head aligned with the spine. Ensure their lower back does not sag or hips hike upwards. Guide them to continue lowering until their chest or chin touches the mat/floor. Allow elbows to flare outwards during the lowering phase.
        Upward Phase: instruct the client to press upwards through their arms while maintaining a rigid torso and head aligned with spine. For extra strength, cue the client to think about pushing the floor away. Ensure their lower back does not sag or hips hike upwards. Continue pressing until the arms are fully extended at the elbows and the client is back to starting position.`,
    variations: ['Wall push-up', 'Desk push-up', 'Kneeling push-up'],
    minimumValue: 0,
    units: 'repetitions',
    type: 'Strength',
  },
  narrow_bentover_row: {
    muscle: 'Lats',
    exercise: 'Narrow Bent-Over Row',
    muscleDescription: `When you're performing a pull-up, you're lifting your entire body mass against gravity to move. This compound, multi-joint, movement greatly improves strength and joint stability. Once the traditioanl pull-up is perfected, modifications can be made to target muscles from different angles, eliciting futher health benefits and gaining even more muscular strength.`,
    exerciseDescription: `Have the palms facing the torso. Bend the knees slightly and bring your torso forward by bending at the waist, keeping your back straight until it is almost parallel with the floor. The weights should hang directly in front of you, perpendicular to the floor.  While keeping the torso stationary, glide the elbows back past the ribs, and lift the dumbbells to your side, keeping the elbows close to the body. On the top contracted position, squeeze the back muscles and hold for a second.`,
    variations: ['Banded', 'Dumbbell'],
    minimumValue: 0,
    units: 'repetitions',
    type: 'Strength',
  },
  lateral_raise: {
    muscle: 'Deltoids',
    exercise: 'Lateral Raise',
    muscleDescription:
      'Working to strengthen the deltoids enhances posture and range of movement of the shoulder joint, creating stability and an overall sturdied body structure. Our shoulders are used every single day, whether we are pushing, pulling, or liefting things over our heads. Strong shoulders will make most arm movements easier and aids in injury prevention.',
    exerciseDescription:
      'Starting with dumbbells held in a closed grip by your thigh, and elbows slightly bent. Raise elbows up laterally, slightly in front of the ribs until you get to shoulder height, with arms parallel to the floor.',
    variations: ['bilateral'],
    minimumValue: 0,
    units: 'repetitions',
    type: 'Strength',
  },
  bentover_row: {
    muscle: 'Rhomboids',
    exercise: 'Bent-Over Row',
    muscleDescription:
      'Rhomboids work to help retract and stabilize the scapula, supporting a good posture and a healthy upper back. If the rhomboid muscles are weak for injured, people often experience chronic back and neck pain.',
    exerciseDescription:
      'Hinging from the hips, let shoulders, elbows and wrists hang in line towards the ground. Keeping a straight back, pull elbows down towards your hips and back behind the rib cage, pinching the centre of your back together. Elbows stay parallel to the sides of the body throughout the entire movement.',
    variations: ['Scapular wall slides', 'Band pull aparts'],
    minimumValue: 0,
    units: 'repetitions',
    type: 'Strength',
  },
  plank: {
    muscle: 'Abdominals',
    exercise: 'Plank',
    muscleDescription:
      'Core muscles are the base of support of the entire body. They play a dominant role in movement in every plane of motion. Not only do abdominal muscles stabilize the torso to maintain good posture, they play a role in supporting healthy movements in all the bodies joints. Strong abdominals are necessary for preventing injuries, especially chronic lower back pain. It is important to build enough core strength before building strength anywhere else, as even with exercises that are not primarily working the abs, they are being activated to support the rest of the body through the movement.',
    exerciseDescription: `Have the client begin face down on a mat resting on their forearms and knees. Instruct them to push off the floor, raising up off their knees onto their toes and resting mainly on their elbows. Cue them to contract their abdominals, glutes, and legs to keep them stable. Their back should reamin flat, not drooping at the hips. The client will hold this position for as long as they can, or until their posture fails.`,
    variations: ['Side plank', 'Elbow Plank', 'Straight Arm Plank'],
    goalDescription: 'This value is the target duration for this exercise.',
    currentDescription:
      'This value is the current duration your member can hold this exercise for with perfect technique.',
    minimumValue: 0,
    units: 'seconds',
    type: 'Strength',
  },
  spinal_rotation: {
    muscle: "Spinal Stabilizers",
    exercise: "Spinal Rotation",
    exerciseDescription: "This movement is assessing the capacity for the client to rotate their spine while flexing/extending.",
    variations: [],
    minimumValue: 0,
    units: 'degrees of rotation',
    type: 'Mobility',
  },
  spinal_extension: {
    muscle: "Spinal Erectors",
    exercise: "Spinal Extension",
    exerciseDescription: "This movement is assessing if the client has segmental control of their spinal regions, that is if they can flex/extend their lumbar-, thoracic-, and cervical-spine with general ease. It is assessing if the client has the capacity to load linearly. ",
    variations: [],
    minimumValue: 0,
    units: 'ease of movement (subjective)',
    type: 'Mobility',
  },
  foo: {
    exercise: 'Spinal Extension',
    muscle: 'Spinal Erectors',
    muscleDescription: `This movement is assessing if the client has segmental control of their spinal regions, that is if they can flex/extend their lumbar-, thoracic-, and cervical-spine with general ease. It is assessing if the client has the capacity to load linearly. `,
    variations: [],
    minimumValue: 0,
    units: '',
    type: 'Mobility',
  },
  shoulder_internal_rotation: {
    exercise: 'Shoulder Internal Rotation',
    muscle: 'Shoulder Stabilizers',
    muscleDescription: `This movement is assessing the capacity of the client to internally rotate their shoulders.`,
    variations: [],
    minimumValue: 0,
    units: 'degrees of rotation',
    type: 'Mobility',
  },
  shoulder_external_rotation: {
    exercise: 'Shoulder External Rotation',
    muscle: 'Shoulder Stabilizers',
    muscleDescription: `This movement is assessing the capacity of the client to externally rotate their shoulders.`,
    variations: [],
    minimumValue: 0,
    units: 'degrees of rotation',
    type: 'Mobility',
  },
  shoulder_flexion: {
    exercise: 'Shoulder Flexion',
    muscle: 'Shoulder Stabilizers',
    muscleDescription: `This movement is assessing the capacity of the client to flex their shoulders. This is crucial to assess for any overhead movements.`,
    variations: [],
    minimumValue: 0,
    units: 'degrees from horizontal plane',
    type: 'Mobility',
  },
  shoulder_extension: {
    exercise: 'Shoulder Extension',
    muscle: 'Shoulder Stabilizers',
    muscleDescription: `This movement is assessing the capacity for the client to extend at the shoulder joint.`,
    variations: [],
    minimumValue: 0,
    units: 'degrees below horizontal plane',
    type: 'Mobility',
  },
  hip_internal_rotation: {
    exercise: 'Hip Internal Rotation',
    muscle: 'Hip Flexors',
    muscleDescription: `This movement is assessing the client's ability to internally rotate their hips. This assessment can either be done standing or seated on a mat, depending on the client’s level of balance and stability.`,
    variations: [],
    minimumValue: 0,
    units: 'degrees from vertical plane',
    type: 'Mobility',
  },
  hip_external_rotation: {
    exercise: 'Hip External Rotation',
    muscle: 'Hip Flexors',
    muscleDescription: `This movement is assessing the client's ability to externally rotate their hips. This assessment can either be done standing or seated on a mat, depending on the client’s level of balance and stability.`,
    variations: [],
    minimumValue: 0,
    units: 'degrees from vertical plane',
    type: 'Mobility',
  },
  hip_flexion: {
    exercise: 'Hip Flexion',
    muscle: 'Hip Flexors',
    muscleDescription: `This movement is assessing the client’s ability to flex their hips.`,
    variations: [],
    minimumValue: 0,
    units: 'degrees from frontal plane',
    type: 'Mobility',
  },
  hip_extension: {
    exercise: 'Hip Extension',
    muscle: 'Hip Flexors',
    muscleDescription: `This movement is assessing if the client can extend their hip.`,
    variations: [],
    minimumValue: 0,
    units: 'degrees from frontal plane',
    type: 'Mobility',
  },
  ankle_dorsiflexion: {
    exercise: 'Ankle Dorsiflexion',
    muscle: 'Gastrocnemius (calves)',
    muscleDescription: `This movement is assessing the client’s ankle range of motion, largely to see if they can tolerate load and safely perform other compound movements.`,
    variations: [],
    minimumValue: 0,
    units: 'degrees beyond horizontal plane',
    type: 'Mobility',
  }
};

export default Exercises;
