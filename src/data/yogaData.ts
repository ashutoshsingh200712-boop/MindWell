import { YogaPose } from '../types';

export const YOGA_POSES: YogaPose[] = [
  {
    id: 'pose-1',
    name: "Child's Pose",
    sanskritName: 'Balasana',
    difficulty: 'Beginner',
    category: 'Stress Relief',
    durationSeconds: 180,
    benefits: [
      'Gently releases tension in back, shoulders, and chest',
      'Calms the nervous system and triggers parasympathetic response',
      'Lengthens the spine and relaxes the hips',
      'Encourages conscious abdominal breathing'
    ],
    steps: [
      'Kneel on your mat with knees hip-width apart and big toes touching.',
      'Exhale and lower your torso between your thighs.',
      'Extend your arms forward with palms facing down, or rest them alongside your calves.',
      'Rest your forehead gently on the mat and soften your neck muscles.',
      'Breathe deeply into your lower back and let gravity support your weight.'
    ],
    breathingCues: [
      'Inhale deeply into your ribcage and lower back (4s)',
      'Pause gently at the top of the breath (2s)',
      'Exhale slowly through the nose, releasing all tension (6s)',
      'Feel your hips sinking toward your heels with each out-breath'
    ],
    contraindications: ['Recent knee surgery or severe joint inflammation', 'Third trimester pregnancy without bolster support'],
    iconType: 'child'
  },
  {
    id: 'pose-2',
    name: 'Legs Up the Wall',
    sanskritName: 'Viparita Karani',
    difficulty: 'Beginner',
    category: 'Sleep',
    durationSeconds: 300,
    benefits: [
      'Slows heart rate and calms hyperactive nervous system',
      'Alleviates heavy, fatigued legs and encourages venous return',
      'Promotes restorative melatonin release before bedtime',
      'Soothes tension headaches and chronic mental exhaustion'
    ],
    steps: [
      'Sit sideways next to a clear wall with your hip almost touching it.',
      'Gently swing your legs up onto the wall as you lower your shoulders to the floor.',
      'Adjust so your sit bones are snug against or slightly away from the wall.',
      'Rest your arms out in a cactus shape or place one hand on heart and one on belly.',
      'Close your eyes and allow all muscles in your legs to completely surrender.'
    ],
    breathingCues: [
      'Soft belly inhale, feeling your abdomen rise (4s)',
      'Smooth, effortless exhale through parted lips (6s)',
      'Notice the gentle sensation of blood draining toward your heart',
      'Repeat the 4-7-8 rhythm for deep pre-sleep relaxation'
    ],
    contraindications: ['Glaucoma or eye pressure conditions', 'Severe neck or unmanaged high blood pressure'],
    iconType: 'lotus'
  },
  {
    id: 'pose-3',
    name: 'Tree Pose',
    sanskritName: 'Vrikshasana',
    difficulty: 'Intermediate',
    category: 'Focus',
    durationSeconds: 120,
    benefits: [
      'Builds laser-like mental focus and sensory grounding',
      'Strengthens ankles, calves, and stabilizing core muscles',
      'Enhances vestibular balance and bilateral brain hemisphere harmony',
      'Cultivates poise and emotional equilibrium under pressure'
    ],
    steps: [
      'Stand tall in Mountain Pose (Tadasana), rooting through all four corners of your feet.',
      'Shift weight onto your left leg and bend your right knee.',
      'Place your right foot against your inner left calf or upper inner thigh (avoid the knee joint).',
      'Bring your hands to Anjali Mudra (prayer position) at heart center.',
      'Fix your gaze (Drishti) on an unmoving point at eye level. When steady, reach arms skyward.'
    ],
    breathingCues: [
      'Inhale: lengthen through the crown of your head like branching trees (3s)',
      'Hold focus at your heart center (2s)',
      'Exhale: root firmly into the earth through your standing foot (4s)',
      'Maintain an unbroken, calm breath regardless of physical wobbles'
    ],
    contraindications: ['Severe vertigo or balance disorders (use a wall for fingertip support)', 'Acute ankle sprain'],
    iconType: 'tree'
  },
  {
    id: 'pose-4',
    name: 'Warrior II',
    sanskritName: 'Virabhadrasana II',
    difficulty: 'Intermediate',
    category: 'Energy',
    durationSeconds: 90,
    benefits: [
      'Ignites inner vitality, courage, and grounding stamina',
      'Opens hips, chest, and enhances respiratory lung capacity',
      'Strengthens quads, hamstrings, and upper shoulder stabilizers',
      'Discharges stagnant lethargy and depressive sluggishness'
    ],
    steps: [
      'Step your feet wide apart (about 3.5 to 4 feet).',
      'Turn your right foot out 90 degrees and angle your left foot slightly inward.',
      'Bend your right knee until it is directly stacked over your ankle.',
      'Extend arms parallel to the floor, actively reaching through fingertips.',
      'Gaze steadily over your right middle finger, shoulders relaxed away from ears.'
    ],
    breathingCues: [
      'Deep energizing inhalation expanding front and back chest (4s)',
      'Powerful exhalation rooting pelvis into solid foundation (4s)',
      'Channel strength through the midline with steady cadence'
    ],
    contraindications: ['Chronic hip impingement', 'Recent shoulder rotator cuff injury'],
    iconType: 'warrior'
  },
  {
    id: 'pose-5',
    name: 'Bridge Pose',
    sanskritName: 'Setu Bandha Sarvangasana',
    difficulty: 'Beginner',
    category: 'Stress Relief',
    durationSeconds: 150,
    benefits: [
      'Expands thoracic cage and relieves chronic chest tightness from anxiety',
      'Stimulates thyroid and parathyroid glands for hormone regulation',
      'Re-energizes tired spines and counteracts prolonged desk slouching',
      'Stimulates calming baroreceptors in the carotid arteries'
    ],
    steps: [
      'Lie on your back with knees bent and feet flat on the floor, hip-width apart.',
      'Place arms alongside your body, palms down, fingertips lightly brushing heels.',
      'Press firmly into feet and palms as you lift your hips towards the ceiling.',
      'Interlace fingers beneath your pelvis and roll shoulder blades underneath.',
      'Keep thighs parallel and press the sternum gently toward the chin.'
    ],
    breathingCues: [
      'Inhale: lift the heart higher and expand the chest (4s)',
      'Exhale: soften the jaw and throat while keeping glutes active (4s)',
      'Feel the rhythmic wave of breath opening the anterior body'
    ],
    contraindications: ['Acute neck cervical trauma', 'Severe disc herniation'],
    iconType: 'bridge'
  },
  {
    id: 'pose-6',
    name: 'Cobra Pose',
    sanskritName: 'Bhujangasana',
    difficulty: 'Beginner',
    category: 'Energy',
    durationSeconds: 90,
    benefits: [
      'Releases emotional constriction held in heart and solar plexus',
      'Strengthens spinal erectors and improves posture',
      'Stimulates abdominal organs, aiding digestion and sluggish energy',
      'Elevates mood and combats postural fatigue'
    ],
    steps: [
      'Lie prone (face down) with tops of feet pressing into the floor.',
      'Place hands under your shoulders, elbows hugged close to your ribcage.',
      'Press through the pubic bone and slowly inhale, lifting chest off the floor.',
      'Keep neck long and gaze slightly upward without crunching cervical spine.',
      'Maintain broad collarbones and relaxed lower glutes.'
    ],
    breathingCues: [
      'Inhale: draw the heart forward and upward like a rising cobra (4s)',
      'Exhale: keep the lift while releasing tension from your brow and teeth (4s)',
      'Notice the spark of warmth across your spine'
    ],
    contraindications: ['Carpal tunnel syndrome', 'Pregnancy', 'Recent abdominal surgery'],
    iconType: 'cobra'
  },
  {
    id: 'pose-7',
    name: 'Seated Lotus Meditation',
    sanskritName: 'Padmasana / Sukhasana',
    difficulty: 'Beginner',
    category: 'Focus',
    durationSeconds: 360,
    benefits: [
      'Anchors awareness into the present moment and reduces racing thoughts',
      'Aligns the primary energetic channels (Nadis) along the spinal column',
      'Slows brainwave frequency from Beta to relaxing Alpha/Theta states',
      'Builds stillness, emotional tolerance, and mindful equanimity'
    ],
    steps: [
      'Sit comfortably cross-legged on a mat or meditation cushion.',
      'Elongate the spine, imagining a gentle cord lifting the crown of your head.',
      'Rest hands on knees with palms facing up in Gyan Mudra (thumb and index touching).',
      'Relax your facial muscles, jaw, tongue, and eyelids.',
      'Draw your awareness inward to the natural touch of breath at the nostrils.'
    ],
    breathingCues: [
      'Silent inhale observing the coolness entering the nostrils (4s)',
      'Brief tranquil pause in the sacred space between breaths (2s)',
      'Warm, steady exhale letting thoughts dissolve into silence (6s)',
      'Repeat with full presence'
    ],
    contraindications: ['Severe knee joint pain (substitute with chair seated meditation)'],
    iconType: 'meditation'
  },
  {
    id: 'pose-8',
    name: 'Sun Salutation A Flow',
    sanskritName: 'Surya Namaskar A',
    difficulty: 'Advanced',
    category: 'Energy',
    durationSeconds: 240,
    benefits: [
      'Full-body cardiovascular and somatic kinetic activation',
      'Builds heat, clears brain fog, and flushes metabolic toxins',
      'Harmonizes breath with synchronized physical movement',
      'Elevates endorphin and dopamine levels naturally'
    ],
    steps: [
      'Mountain Pose (Tadasana) -> Inhale: Upward Salute (Urdhva Hastasana).',
      'Exhale: Forward Fold (Uttanasana) -> Inhale: Halfway Lift (Ardha Uttanasana).',
      'Exhale: Step or jump back to Chaturanga Dandasana (low plank).',
      'Inhale: Upward-Facing Dog (Urdhva Mukha Svanasana).',
      'Exhale: Downward-Facing Dog (Adho Mukha Svanasana), holding for 5 deep breaths.'
    ],
    breathingCues: [
      'One breath per movement: Inhale to expand and open',
      'Exhale to contract, fold, and ground',
      'Synchronize smooth rhythmic oceanic Ujjayi breathing'
    ],
    contraindications: ['Wrist strain or carpal tunnel', 'Severe vertigo during quick elevation changes'],
    iconType: 'sun'
  }
];
