import bcrypt from 'bcrypt';

export async function hashPassword(pw){
    const saltRounds = 10
    const hashedPw = await bcrypt.hash(pw, saltRounds)
    return hashedPw
}

export async function comparePassword(pw, hashedPw){
    const match = await bcrypt.compare(pw, hashedPw)
    return match
}