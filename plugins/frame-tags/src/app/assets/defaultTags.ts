import { colours } from './colours';

export const defaultTags = [
  { tag: 'Draft', value: 'draft', colour: colours['blue'] },
  { tag: 'In progress', value: 'in-progress', colour: colours['blue'] },
  { tag: 'Content required', value: 'content-required', colour: colours['orange'] },
  { tag: 'Approval required', value: 'approval-required', colour: colours['orange'] },
  { tag: 'Work in progress', value: 'work-in-progress', colour: colours['orange'] },
  { tag: 'On hold', value: 'on-hold', colour: colours['yellow'] },
  { tag: 'Complete', value: 'complete', colour: colours['green'] },
  { tag: 'Approved', value: 'approved', colour: colours['green'] },
  { tag: 'Revised', value: 'revised', colour: colours['green'] },
  { tag: 'Ready for review', value: 'ready-for-review', colour: colours['purple'] },
  { tag: 'Ready for dev', value: 'ready-for-dev', colour: colours['green'] },
];
