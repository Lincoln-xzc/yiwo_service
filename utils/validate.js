const validateUserName = (userName)=>{
    const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    if(uPattern.test(userName)){
        return true;
    }
    return false;
}

const validatePassword = (password)=>{
    const pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    if(pPattern.test(password)){
        return true;
    }
    return false;
}

const validateEmail = (email)=>{
    const ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(ePattern.test(email)){
        return true;
    }
    return false;
}

const validateMobile = (phone)=>{
    const mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if(mPattern.test(phone)){
        return true;
    }
    return false;
}

module.exports = {
    validateUserName,
    validatePassword,
    validateMobile,
    validateEmail
}
