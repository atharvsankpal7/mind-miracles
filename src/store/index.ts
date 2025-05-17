import { atom } from 'recoil';

export interface FormState {
  name: string;
  email: string;
  whatsapp: string;
  age: number;
}

export const registrationFormStateAtom = atom<FormState>({
  key: 'formState',
  default: {
    name: '',
    email: '',
    whatsapp: '',
    age: 0,
  },
});
