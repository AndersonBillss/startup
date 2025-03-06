import bcrypt from 'bcrypt';

export async function hashPassword(pw){
    const saltRounds = 10
    const hashedPw = await bcrypt.hash(pw, saltRounds)
    return hashedPw
}

export function comparePassword(pw, hashedPw){
    const match = bcrypt.compare(pw, hashPassword)
    return match
}