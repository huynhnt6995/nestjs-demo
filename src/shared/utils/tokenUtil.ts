const BEARER = 'Bearer '

export const validToken = (token: string) => {
    
    if(token === BEARER + "#VNTRIP20!9@4749") return true
    return false
}