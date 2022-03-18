const Schema = require('validate');

export class UserDto {
  index: string | number;

  size: number;
}

const id = { required: true, type: String, match: /^[a-f\d]{24}$/i, message: 'id must be a valid MongoDB ObjectID.' };
const email = { required: true, type: String, match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: 'email must be a valid email address.' };
const name = { required: true, type: String, length: { min: 3, max: 32 }, message: 'name length must be between 3 and 32 chars.' };

export const createUserCheck = new Schema({ name, email });

export const idCheck = new Schema({ id });

export const manyUserCheck = new Schema({
  id: { ...id, required: false },
  email: { ...email, required: false },
  name: { ...name, required: false, length: { min: 1 } },
  index: { required: false, type: Number, message: 'index must be a number.' },
  size: { required: false, type: Number, message: 'size must be a number.' },
});
