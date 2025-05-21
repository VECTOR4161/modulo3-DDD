import 'dotenv/config';
import { get } from 'env-var' 


export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    SECRET_KEY: get('SECRET_KEY').required().asString(),
}