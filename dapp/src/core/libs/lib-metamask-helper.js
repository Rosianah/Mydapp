export function requestAccountAccess(callback) {
  const { ethereum } = window

 //if the user allows access, ethereum.enable() promise returns an account
  ethereum.enable().then((account) => { 
    if (callback) {callback(account[0]) } //takes the first account 
  })
}
