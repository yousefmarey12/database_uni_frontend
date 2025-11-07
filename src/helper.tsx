export function getChatID(uid1, uid2) {
    if (uid1 > uid2) {
        return uid2 + '_' + uid1
    }
    else {
        return uid1 + '_' + uid2
    }
}

export function extractOtherUser(currentUser, id) {
    let [str1, str2] = id.split('_')
    if (str1 == currentUser) {
        return str2
    }
    else {
        return str1
    }
}